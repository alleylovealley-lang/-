// 사이트 안에서 GitHub 저장소에 기록 파일을 저장하기 (브라우저 전용)
// 열쇠(토큰)는 이 브라우저의 localStorage 에만 저장돼요.
import { load, save } from './client';

export type Repo = { owner: string; name: string; branch: string };
export const getToken = () => load<string>('gh.token', '');
export const setToken = (t: string) => save('gh.token', t.trim());

const api = (repo: Repo, path: string) =>
  `https://api.github.com/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.name)}/${path}`;

const headers = (token: string) => ({
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
});

/** UTF-8 문자열 → base64 */
function b64(text: string) {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

/** 연결 확인: 저장소에 쓸 수 있는지 */
export async function checkConnection(repo: Repo, token = getToken()) {
  if (!token) return { ok: false, message: '열쇠가 없어요' };
  try {
    const r = await fetch(api(repo, ''), { headers: headers(token) });
    if (r.status === 401) return { ok: false, message: '열쇠가 올바르지 않거나 만료됐어요' };
    if (r.status === 404) return { ok: false, message: '이 열쇠로는 저장소를 볼 수 없어요 (저장소 선택을 확인해 주세요)' };
    if (!r.ok) return { ok: false, message: `GitHub 응답 오류 (${r.status})` };
    const j = await r.json();
    if (j.permissions && !j.permissions.push) return { ok: false, message: '읽기만 가능한 열쇠예요 (Contents: Read and write 필요)' };
    return { ok: true, message: `${j.full_name} 저장소에 연결됐어요` };
  } catch {
    return { ok: false, message: 'GitHub에 연결하지 못했어요 (인터넷 연결을 확인해 주세요)' };
  }
}

/** 새 파일 만들기 (같은 이름이 있으면 실패) */
export async function createFile(repo: Repo, path: string, content: string, message: string) {
  const token = getToken();
  if (!token) throw new Error('NO_TOKEN');
  const r = await fetch(api(repo, `contents/${path.split('/').map(encodeURIComponent).join('/')}`), {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: b64(content), branch: repo.branch }),
  });
  if (!r.ok) {
    const detail = await r.json().catch(() => ({}));
    throw new Error(r.status === 401 ? '열쇠가 만료됐거나 올바르지 않아요. 설정에서 다시 연결해 주세요.' : r.status === 403 || r.status === 404 ? '저장 권한이 없어요. 열쇠 권한(Contents: Read and write)을 확인해 주세요.' : `저장하지 못했어요 (${r.status} ${detail.message ?? ''})`);
  }
  return r.json();
}

/** YAML 안전한 문자열 (큰따옴표 + 이스케이프) */
export const yq = (s: string) => JSON.stringify(s);
/** 파일 이름용 짧은 고유값 */
export const uid = () => Date.now().toString(36);
