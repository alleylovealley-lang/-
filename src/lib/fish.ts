// 픽셀 낚시터: 물고기 도감 데이터 + 픽셀 그림 (브라우저 전용)
// 그림 글자: o 테두리 · b 몸 · f 지느러미 · s 무늬 · w 흰색 · e 눈 · . 빈칸

export type Rarity = 1 | 2 | 3; // 1 일반 · 2 희귀 · 3 전설
export type When = 'any' | 'day' | 'night';
export type Fish = {
  id: string; n: string; shape: keyof typeof SHAPES;
  c: { b: string; f?: string; s?: string };
  r: Rarity; t: When; p: number; sz: [number, number]; big?: boolean;
};

export const SHAPES = {
  fish: ['....ooooo......', '..oobbbbboo..oo', '.obbbbsbbbbo.of', 'obebbbsbbbbbofo', 'obbbbbsbbbbbbfo', '.obbbbsbbbbo.of', '..ooffbbboo..oo', '....ooooo......'],
  flat: ['....ooooooo....', '..oobebebbboo.o', '.obbsbsbsbsbbof', 'obbbbbbbbbbbbfo', '.obbsbsbsbsbbof', '..oobbbbbbboo.o', '....ooooooo....'],
  round: ['...ooooo...', '.oosbsbsoo.', 'osbbbbbbbso', 'obebbbbbbfo', 'obbbbbbbbfo', 'osbbbbbbbso', '.oosbsbsoo.', '...ooooo...'],
  shrimp: ['....oooo....', '..oobbsbo...', '.obbbsbbbo..', 'oebbsbbbboo.', '.oobbbbbbfo.', '...oooooo.ff'],
  crab: ['oo.......oo', 'ofo.....ofo', '.oo.ooo.oo.', '..obbbbbo..', '.obebbbebo.', 'obbbbbbbbbo', '.ofofofofo.', '..o.o.o.o..'],
  star: ['....o....', '...obo...', 'ooobsbooo', 'obbbbbbbo', '.obebebo.', '..obbbo..', '.obbobbo.', '.obo.obo.', '.oo...oo.'],
  shell: ['....ooo....', '..oobsboo..', '.obsbsbsbo.', 'obsbsbsbsbo', 'obsbsbsbsbo', '.obbbbbbbo.', '..ooooooo..', '....ooo....'],
  pearl: ['..ooo..', '.owbbo.', 'owbbbbo', 'obbbbbo', 'obbbbso', '.obsso.', '..ooo..'],
  squid: ['...ooo...', '..obbbo..', '.obbbbbo.', '.obbbbbo.', 'obebbbebo', '.obbbbbo.', '.obsbsbo.', 'obobobobo', 'o.o.o.o.o', 'o.o.o.o.o', '..o...o..'],
  octopus: ['...ooooo...', '..obbbbbo..', '.obbbbbbbo.', '.obebbbebo.', '.obbbbbbbo.', '..obsbsbo..', '.obobobobo.', 'obo.o.o.obo', 'o..o...o..o'],
  eel: ['..oooo............', '.obbbbooooooooo...', 'obebbbsbsbsbsbboo.', '.obbbbbbbbbbbbbbfo', '..oooooooooooooo..'],
  jelly: ['..ooooo..', '.obbbbbo.', 'obwbbbbbo', 'obbbbbbbo', 'ooooooooo', '.s.s.s.s.', '.s.s.s.s.', 's.s.s.s..', '.s.s.s.s.', '..s...s..'],
  seahorse: ['..ooo..', '.obbbo.', 'obebbo.', 'oobbbo.', '...obo.', '..obbfo', '..obbfo', '..obbo.', '...obo.', '..obo..', '.obo...', '..oo...'],
  ray: ['......ooo......', '....oobbboo....', '..oobbbbbbboo..', 'oobbebbbbbebboo', '..oobbbbbbboo..', '....oobsboo....', '......oso......', '.......s.......'],
  turtle: ['....oooo......', '..oossssoo....', '.osfsfsfsso.oo', 'osfsfsfsfsoobo', 'osssssssssobeo', '.oooooooooobbo', '.obo....obo.oo', '.oo.....oo....'],
  whale: ['......oooooooo......', '....oobbbbbbbboo....', '..oobbbbbbbbbbbbo.oo', '.obebbbbbbbbbbbbboob', 'obbbbbbbbbbbbbbbbbo.', 'owwwwwwbbbbbbbbbbo..', '.owwwwwwwwbbbbboo...', '..ooooooooooooo.....'],
  boot: ['..oooooo..', '..obbbbo..', '..obsbbo..', '..obbbbo..', '..obbbbo..', '..obbbboo.', '.obbbbbbbo', 'obbbbbbbbo', 'offffffffo', 'oooooooooo'],
  can: ['oooooooo', 'owssssso', 'obbbbbbo', 'obwwwwbo', 'obwwwwbo', 'obbbbbbo', 'obbbbbbo', 'osssssso', 'oooooooo'],
  weed: ['..o....', '.obo...', '.obo.o.', '..obobo', '..obbo.', '.obo...', 'obo..o.', 'obo.obo', '.obobo.', '..obo..', '..obo..', '..obo..'],
  box: ['...oo.oo...', '..ofo.ofo..', '...ooooo...', 'ooooofooooo', 'obbbbfbbbbo', 'offfffffffo', 'obbbbfbbbbo', 'obbbbfbbbbo', 'obbbbfbbbbo', 'ooooooooooo'],
  axolotl: ['f.f..........', '.fooooo......', 'fobbbbbo.....', '.obebbbboooo.', '.obbbbbbbbbbo', '..obbbbbbbbo.', '...obo..obo..', '...oo...oo...'],
} as const;

export const FISH: Fish[] = [
  // ── 일반 ──
  { id: 'crucian', n: '붕어', shape: 'fish', c: { b: '#a89a5a', f: '#7d7240', s: '#c9bd7d' }, r: 1, t: 'any', p: 5, sz: [12, 30] },
  { id: 'carp', n: '잉어', shape: 'fish', c: { b: '#f0a868', f: '#e07b3a', s: '#ffffff' }, r: 1, t: 'any', p: 6, sz: [25, 60] },
  { id: 'minnow', n: '피라미', shape: 'fish', c: { b: '#cfd6dc', f: '#f3a5bf', s: '#e0709a' }, r: 1, t: 'any', p: 3, sz: [6, 15] },
  { id: 'goby', n: '망둥어', shape: 'fish', c: { b: '#9a8470', f: '#6e5a48', s: '#c2ad98' }, r: 1, t: 'any', p: 4, sz: [8, 20] },
  { id: 'shrimp', n: '새우', shape: 'shrimp', c: { b: '#f3a5bf', f: '#e0709a', s: '#ffffff' }, r: 1, t: 'any', p: 6, sz: [5, 12] },
  { id: 'mackerel', n: '고등어', shape: 'fish', c: { b: '#7fa7c9', f: '#4a6f8f', s: '#2f4f6f' }, r: 1, t: 'day', p: 7, sz: [25, 45] },
  { id: 'flatfish', n: '광어', shape: 'flat', c: { b: '#b5a48a', f: '#8a7a60', s: '#6e5e48' }, r: 1, t: 'day', p: 8, sz: [30, 70] },
  { id: 'clam', n: '조개', shape: 'shell', c: { b: '#f6e6d6', s: '#d9b9a0' }, r: 1, t: 'any', p: 4, sz: [4, 10] },
  { id: 'catfish', n: '메기', shape: 'fish', c: { b: '#6a6a5a', f: '#4a4a3a', s: '#8a8a7a' }, r: 1, t: 'night', p: 7, sz: [30, 70] },
  { id: 'boot', n: '헌 장화', shape: 'boot', c: { b: '#6a6a6a', f: '#4a4a4a', s: '#8a8a8a' }, r: 1, t: 'any', p: 0, sz: [25, 30] },
  { id: 'can', n: '빈 깡통', shape: 'can', c: { b: '#cfcfcf', s: '#e0709a' }, r: 1, t: 'any', p: 0, sz: [10, 12] },
  { id: 'seaweed', n: '미역', shape: 'weed', c: { b: '#5f8a5a' }, r: 1, t: 'any', p: 1, sz: [20, 80] },
  // ── 희귀 ──
  { id: 'tropical', n: '열대어', shape: 'fish', c: { b: '#ffd34d', f: '#4da3ff', s: '#ff8a3d' }, r: 2, t: 'day', p: 15, sz: [8, 18] },
  { id: 'clownfish', n: '흰동가리', shape: 'fish', c: { b: '#ff8a3d', f: '#3a3a3a', s: '#ffffff' }, r: 2, t: 'day', p: 18, sz: [6, 11] },
  { id: 'bream', n: '참돔', shape: 'fish', c: { b: '#f3a5bf', f: '#e0709a', s: '#fdeef3' }, r: 2, t: 'day', p: 20, sz: [30, 60] },
  { id: 'crab', n: '꽃게', shape: 'crab', c: { b: '#e0709a', f: '#c75a83' }, r: 2, t: 'any', p: 15, sz: [10, 20] },
  { id: 'starfish', n: '불가사리', shape: 'star', c: { b: '#ff9e7a', s: '#ffd0b8' }, r: 2, t: 'day', p: 12, sz: [10, 25] },
  { id: 'puffer', n: '복어', shape: 'round', c: { b: '#e8d9a8', f: '#c9b98a', s: '#8a7a50' }, r: 2, t: 'any', p: 18, sz: [15, 35] },
  { id: 'goldfish', n: '금붕어', shape: 'fish', c: { b: '#ffb03a', f: '#ff8a1a', s: '#ffe0a0' }, r: 2, t: 'any', p: 20, sz: [5, 15] },
  { id: 'seahorse', n: '해마', shape: 'seahorse', c: { b: '#ffb86b', f: '#e08a3a' }, r: 2, t: 'day', p: 28, sz: [8, 15] },
  { id: 'squid', n: '오징어', shape: 'squid', c: { b: '#f6d6e0', s: '#e0709a' }, r: 2, t: 'night', p: 22, sz: [20, 40] },
  { id: 'octopus', n: '문어', shape: 'octopus', c: { b: '#e07b7b', s: '#c75a5a' }, r: 2, t: 'night', p: 30, sz: [30, 80] },
  { id: 'eel', n: '장어', shape: 'eel', c: { b: '#5a5a4a', f: '#3a3a2a', s: '#7a7a6a' }, r: 2, t: 'night', p: 25, sz: [40, 90] },
  { id: 'jelly', n: '해파리', shape: 'jelly', c: { b: '#d9e8ff', s: '#f3a5bf' }, r: 2, t: 'night', p: 16, sz: [10, 30] },
  { id: 'lantern', n: '샛비늘치', shape: 'fish', c: { b: '#3a4a6a', f: '#9adfff', s: '#9adfff' }, r: 2, t: 'night', p: 26, sz: [5, 10] },
  { id: 'axolotl', n: '우파루파', shape: 'axolotl', c: { b: '#ffc0d0', f: '#e0709a' }, r: 2, t: 'night', p: 35, sz: [15, 25] },
  // ── 전설 ──
  { id: 'ray', n: '가오리', shape: 'ray', c: { b: '#7a8a9a', s: '#5a6a7a' }, r: 3, t: 'any', p: 60, sz: [60, 150] },
  { id: 'turtle', n: '바다거북', shape: 'turtle', c: { b: '#8fbf7f', f: '#a8d098', s: '#6a8a5a' }, r: 3, t: 'day', p: 80, sz: [50, 100] },
  { id: 'tuna', n: '참치', shape: 'fish', c: { b: '#4a5a7a', f: '#2f3f5a', s: '#c9d6e6' }, r: 3, t: 'day', p: 90, sz: [100, 200], big: true },
  { id: 'pearl', n: '진주', shape: 'pearl', c: { b: '#fdf6f0', s: '#e6d6e6' }, r: 3, t: 'night', p: 70, sz: [1, 2] },
  { id: 'ribbon', n: '리본 상자', shape: 'box', c: { b: '#fdeef3', f: '#e0709a' }, r: 3, t: 'any', p: 50, sz: [20, 30] },
  { id: 'whale', n: '아기 고래', shape: 'whale', c: { b: '#6f8fb0' }, r: 3, t: 'any', p: 100, sz: [300, 500], big: true },
  { id: 'koi', n: '전설의 벚꽃 잉어', shape: 'fish', c: { b: '#ffffff', f: '#f3a5bf', s: '#e0709a' }, r: 3, t: 'any', p: 120, sz: [60, 90] },
];

export const RARITY = { 1: { n: '일반', star: '★', chance: 0.72, window: 1000 }, 2: { n: '희귀', star: '★★', chance: 0.24, window: 800 }, 3: { n: '전설', star: '★★★', chance: 0.04, window: 650 } } as const;
export const WHEN = { any: { icon: '✧', hint: '언제나' }, day: { icon: '☀', hint: '낮에 나와요' }, night: { icon: '☾', hint: '밤에 나와요' } } as const;

/** 실제 시간으로 낮·노을·밤 */
export type Phase = 'day' | 'dusk' | 'night';
export function phaseNow(d = new Date()): Phase {
  const h = d.getHours();
  return h >= 6 && h < 17 ? 'day' : h >= 17 && h < 19 ? 'dusk' : 'night';
}
const fits = (f: Fish, ph: Phase) => f.t === 'any' || ph === 'dusk' || f.t === ph;

/** 지금 시간대에 맞춰 무작위로 한 마리 */
export function rollFish(ph: Phase, rnd = Math.random): Fish {
  const x = rnd();
  const r: Rarity = x < RARITY[3].chance ? 3 : x < RARITY[3].chance + RARITY[2].chance ? 2 : 1;
  const pool = FISH.filter((f) => f.r === r && fits(f, ph));
  return pool[Math.floor(rnd() * pool.length)];
}
export const rollSize = (f: Fish, rnd = Math.random) => Math.round((f.sz[0] + rnd() * (f.sz[1] - f.sz[0])) * 10) / 10;

/** 픽셀 그림 그리기 (silhouette = 검은 실루엣) */
export function drawSprite(ctx: CanvasRenderingContext2D, f: Fish, x: number, y: number, px = 1, silhouette = false, flip = false) {
  const rows = SHAPES[f.shape];
  const w = rows[0].length;
  const col: Record<string, string> = { o: '#3a3a3a', b: f.c.b, f: f.c.f ?? f.c.b, s: f.c.s ?? f.c.f ?? f.c.b, w: '#ffffff', e: '#2f2f2f' };
  rows.forEach((row, j) => {
    for (let i = 0; i < row.length; i++) {
      const ch = row[i];
      if (ch === '.' || !(ch in col)) continue;
      ctx.fillStyle = silhouette ? '#3a3a3a' : col[ch];
      ctx.fillRect(Math.round(x + (flip ? w - 1 - i : i) * px), Math.round(y + j * px), px, px);
    }
  });
}
export const spriteSize = (f: Fish) => ({ w: SHAPES[f.shape][0].length, h: SHAPES[f.shape].length });

/** 도감·바구니용 이미지 주소 */
const cache = new Map<string, string>();
export function spriteURL(f: Fish, px = 3, silhouette = false) {
  const k = `${f.id}-${px}-${silhouette}`;
  if (cache.has(k)) return cache.get(k)!;
  const { w, h } = spriteSize(f);
  const c = document.createElement('canvas');
  c.width = w * px; c.height = h * px;
  drawSprite(c.getContext('2d')!, f, 0, 0, px, silhouette);
  const u = c.toDataURL();
  cache.set(k, u);
  return u;
}
