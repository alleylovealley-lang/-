// 사이트 안에서 GitHub 저장소에 기록 파일을 저장하기 (브라우저 전용)
// 열쇠(토큰)는 이 브라우저의 localStorage 에만 저장돼요.
import { load, save } from './client';

export type Repo = { owner: string; name: string; branch: string };
/** 붙여넣을 때 섞여 들어온 공백·줄바꿈·보이지 않는 글자 제거 */
export const cleanToken = (t: string) => t.replace(/[\s​-‍﻿]/g, '');
export const getToken = () => cleanToken(load<string>('gh.token', ''));
export const setToken = (t: string) => save('gh.token', cleanToken(t));

/** 열쇠 모양 확인 — 문제가 있으면 안내 문구, 없으면 '' */
export function tokenProblem(t: string) {
  const v = cleanToken(t);
  if (!v) return '열쇠를 붙여넣어 주세요';
  if (!/^[A-Za-z0-9_]+$/.test(v)) return '열쇠에 영문·숫자·밑줄(_) 말고 다른 글자가 섞여 있어요. GitHub에서 다시 복사해 주세요.';
  if (!/^(github_pat_|ghp_)/.test(v)) return "GitHub 열쇠는 보통 'github_pat_'로 시작해요. 비밀번호가 아니라 토큰을 붙여넣어 주세요.";
  return '';
}

// 주의: 주소 끝에 '/'가 붙으면 GitHub가 받아주지 않아요
const api = (repo: Repo, path = '') =>
  `https://api.github.com/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.name)}${path ? `/${path}` : ''}`;
const contentsUrl = (repo: Repo, path: string) => api(repo, `contents/${path.split('/').map(encodeURIComponent).join('/')}`);

const headers = (token: string) => ({
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
});

/** 요청이 아예 실패했을 때(응답 없음) 이유 추측 */
const networkMessage = (e: unknown) =>
  typeof navigator !== 'undefined' && !navigator.onLine
    ? '인터넷 연결이 끊겨 있어요'
    : `GitHub에 요청을 보내지 못했어요. 광고·추적 차단 기능이나 보안 프로그램이 막고 있을 수 있어요. (${(e as Error)?.message ?? e})`;

async function call(url: string, init: RequestInit = {}) {
  try {
    return await fetch(url, init);
  } catch (e) {
    throw new Error(networkMessage(e));
  }
}

/** UTF-8 문자열 → base64 */
function b64(text: string) {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

/** 연결 확인: 저장소에 쓸 수 있는지 */
export async function checkConnection(repo: Repo, token = getToken()) {
  const problem = tokenProblem(token);
  if (problem) return { ok: false, message: problem };
  try {
    const r = await call(api(repo), { headers: headers(token) });
    if (r.status === 401) return { ok: false, message: '열쇠가 올바르지 않거나 만료됐어요. 새로 만들어 다시 연결해 주세요.' };
    if (r.status === 403) return { ok: false, message: '이 열쇠로는 저장소에 접근할 수 없어요 (권한 또는 조직 승인 확인)' };
    if (r.status === 404) return { ok: false, message: `이 열쇠로는 ${repo.owner}/${repo.name} 저장소를 볼 수 없어요. 열쇠를 만들 때 이 저장소를 선택했는지 확인해 주세요.` };
    if (!r.ok) return { ok: false, message: `GitHub 응답 오류 (${r.status})` };
    const j = await r.json();
    if (j.permissions && !j.permissions.push) return { ok: false, message: '읽기만 가능한 열쇠예요 (Contents: Read and write 필요)' };
    return { ok: true, message: `${j.full_name} 저장소에 연결됐어요` };
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
}

const saveError = (status: number, detail: { message?: string }) =>
  new Error(
    status === 401 ? '열쇠가 만료됐거나 올바르지 않아요. 설정에서 다시 연결해 주세요.'
      : status === 403 || status === 404 ? '저장 권한이 없어요. 열쇠 권한(Contents: Read and write)을 확인해 주세요.'
        : status === 409 ? '다른 곳에서 먼저 고쳐졌어요. 새로고침 후 다시 해 주세요.'
          : `저장하지 못했어요 (${status} ${detail.message ?? ''})`,
  );

/** 새 파일 만들기 (같은 이름이 있으면 실패) */
export async function createFile(repo: Repo, path: string, content: string, message: string) {
  const token = getToken();
  if (!token) throw new Error('NO_TOKEN');
  const r = await call(contentsUrl(repo, path), {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: b64(content), branch: repo.branch }),
  });
  if (!r.ok) throw saveError(r.status, await r.json().catch(() => ({})));
  return r.json();
}

/** 파일 고치기 (최신 버전을 확인한 뒤 덮어쓰기) */
export async function updateFile(repo: Repo, path: string, content: string, message: string) {
  const token = getToken();
  if (!token) throw new Error('NO_TOKEN');
  const url = contentsUrl(repo, path);
  const cur = await call(`${url}?ref=${encodeURIComponent(repo.branch)}`, { headers: headers(token) });
  if (cur.status === 404) return createFile(repo, path, content, message);
  if (!cur.ok) throw saveError(cur.status, await cur.json().catch(() => ({})));
  const { sha } = await cur.json();
  const r = await call(url, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: b64(content), branch: repo.branch, sha }),
  });
  if (!r.ok) throw saveError(r.status, await r.json().catch(() => ({})));
  return r.json();
}

/** 파일 지우기 (이미 없으면 그냥 성공) */
export async function deleteFile(repo: Repo, path: string, message: string) {
  const token = getToken();
  if (!token) throw new Error('NO_TOKEN');
  const url = contentsUrl(repo, path);
  const cur = await call(`${url}?ref=${encodeURIComponent(repo.branch)}`, { headers: headers(token) });
  if (cur.status === 404) return;
  if (!cur.ok) throw saveError(cur.status, await cur.json().catch(() => ({})));
  const { sha } = await cur.json();
  const r = await call(url, {
    method: 'DELETE',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, branch: repo.branch, sha }),
  });
  if (!r.ok && r.status !== 404) throw saveError(r.status, await r.json().catch(() => ({})));
}

/** YAML 안전한 문자열 (큰따옴표 + 이스케이프) */
export const yq = (s: string) => JSON.stringify(s);
/** 파일 이름용 짧은 고유값 */
export const uid = () => Date.now().toString(36);
