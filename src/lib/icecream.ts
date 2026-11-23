// 31 아이스크림 가게: 맛 목록 · 매장 배치 · 경영 설정
// ✏️ 테이블·냉장고·카운터 위치나 맛을 바꾸고 싶으면 이 파일만 고치면 돼요.
//    좌표는 픽셀 화면(가로 240 × 세로 160) 기준이에요. 왼쪽 위가 (0, 0).

export type Flavor = { id: string; n: string; c: string; dot?: string; cost: number };

/** 맛 목록 — 앞의 6개는 처음부터 열려 있고, 나머지는 코인으로 열어요 (cost) */
export const FLAVORS: Flavor[] = [
  { id: 'vanilla', n: '바닐라', c: '#fff6dc', cost: 0 },
  { id: 'strawberry', n: '딸기', c: '#f7a8c0', dot: '#e0506f', cost: 0 },
  { id: 'choco', n: '초코', c: '#8a5a44', cost: 0 },
  { id: 'mint', n: '민트초코', c: '#a8e6d0', dot: '#5a3a2a', cost: 0 },
  { id: 'greentea', n: '녹차', c: '#b5cf8a', cost: 0 },
  { id: 'cookie', n: '쿠키앤크림', c: '#f2f0ea', dot: '#3a3a3a', cost: 0 },
  { id: 'mango', n: '망고', c: '#ffc94d', cost: 40 },
  { id: 'blueberry', n: '블루베리', c: '#a9a6e8', dot: '#5a4ab0', cost: 40 },
  { id: 'cherry', n: '체리', c: '#f07a8a', dot: '#b02040', cost: 50 },
  { id: 'cotton', n: '솜사탕', c: '#c9e4ff', dot: '#f7a8c0', cost: 50 },
  { id: 'pistachio', n: '피스타치오', c: '#cfe3a0', dot: '#8aa050', cost: 60 },
  { id: 'sesame', n: '흑임자', c: '#8a8a8a', dot: '#3a3a3a', cost: 60 },
  { id: 'caramel', n: '카라멜', c: '#e0a860', dot: '#a86a2a', cost: 70 },
  { id: 'yogurt', n: '요거트', c: '#ffffff', dot: '#f7a8c0', cost: 70 },
  { id: 'peach', n: '복숭아', c: '#ffcbb0', cost: 80 },
  { id: 'rainbow', n: '무지개 셔벗', c: '#ffb0d0', dot: '#8ad0ff', cost: 100 },
];
export const START_FLAVORS = FLAVORS.filter((f) => f.cost === 0).map((f) => f.id);

/** 매장 배치 */
export const LAYOUT = {
  W: 240, H: 160,
  /** 진열 냉장고 (아이스크림 통이 놓이는 곳) — 2줄 × 8칸 */
  freezer: { x: 56, y: 34, cols: 8, rows: 2, cell: 16 },
  /** 카운터 (손님 쪽) */
  counter: { x: 52, y: 68, w: 136, h: 6 },
  /** 계산대 */
  register: { x: 196, y: 58 },
  /** 직원이 서 있는 줄 (냉장고 뒤쪽) */
  staffY: 26,
  /** 손님이 줄 서는 자리 (맨 앞 → 뒤) */
  queue: [{ x: 120, y: 86 }, { x: 104, y: 92 }, { x: 88, y: 98 }, { x: 72, y: 104 }],
  /** 테이블 자리 — 업그레이드하면 앞에서부터 하나씩 생겨요 (최대 6개) */
  tables: [{ x: 40, y: 126 }, { x: 200, y: 126 }, { x: 160, y: 104 }, { x: 40, y: 98 }, { x: 160, y: 140 }, { x: 200, y: 100 }],
  /** 입구 (아래쪽 가운데) */
  door: { x: 120, y: 158 },
  /** 화분 장식 */
  plants: [{ x: 8, y: 24 }, { x: 226, y: 24 }, { x: 8, y: 146 }, { x: 226, y: 146 }],
};

/** 경영 규칙 */
export const RULES = {
  dayLength: 120, // 하루 영업 시간(초)
  scoopPrice: 3, // 한 스쿱 가격(코인)
  basePrice: { cone: 2, cup: 1 },
  tipMax: 4, // 빨리 줄수록 팁 (최대)
  patience: 28, // 손님이 기다려주는 시간(초)
  restockCost: 6, // 한 통 채우기 비용
  tubSize: 12, // 한 통 = 12스쿱
  tableCost: 50, // 테이블 하나 늘리기
  startTables: 2,
};
