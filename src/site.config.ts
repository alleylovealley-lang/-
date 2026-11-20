// ✏️ 사이트 전체 설정 — 이 파일만 고치면 이름·소개·꾸미기 이미지가 모든 페이지에 반영됩니다.
//
// 🖼 이미지 넣는 법
//   1) 이미지 파일을 public/images/deco/ 폴더에 넣고
//   2) 아래에 '/images/deco/파일이름.png' 처럼 적으면 끝!
//   비워두면('') 회색 줄무늬 자리표시가 보입니다. (gif 움짤도 OK)

export type Deco = { src: string; alt?: string; href?: string };
export type NavItem = { label: string; ko: string; href: string; desc?: string };
export type NavGroup = { key: string; label: string; ko: string; desc?: string; children: NavItem[] };

export const SITE = {
  name: '홍길동',
  title: '홍길동의 작은 방',
  /** 헤더 배너 위에 크게 올라가는 제목 (비우면 표시 안 함) */
  headerTitle: "HONG'S ROOM",
  description: '만들고, 기록하고, 좋아하는 걸 모아두는 평생의 작은 방.',
  lang: 'ko',
  locale: 'ko-KR',
  startYear: 2026,

  /** 홈 환영 박스 */
  welcome: {
    title: 'welcome to my room ♡',
    /** 나를 소개하는 키워드 태그 */
    keywords: ['INFP', '♥ cutie', '기록러', '☁ 몽글'],
    text: [
      '🐰 안녕! 홍길동의 작은 홈페이지에 온 걸 환영해요.',
      '일기, 일정, 사진, 좋아하는 것들을 모아두는 곳이에요.',
      '천천히 구경하고 가세요 ♡',
    ],
  },

  /** 좌측바 '오늘 기분' */
  mood: '☁ 몽글몽글',

  /** 메뉴 — 오른쪽 바에는 대주제만 보이고, 대주제를 누르면 하위 메뉴 카드 페이지가 열려요 */
  nav: [
    {
      key: 'record', label: 'RECORD', ko: '기록', desc: '하루하루의 기록',
      children: [
        { label: 'DIARY', ko: '일기', href: '/diary', desc: '일상과 생각, 감정을 기록하는 공간' },
        { label: 'PHOTO', ko: '사진', href: '/photo', desc: '사진과 일상의 순간을 보관하는 공간' },
        { label: 'COLLECTION', ko: '컬렉션', href: '/collection', desc: '좋아하는 순간과 문장을 모아두는 공간' },
      ],
    },
    {
      key: 'life', label: 'LIFE', ko: '생활 관리', desc: '일정과 할 일 관리',
      children: [
        { label: 'SCHEDULE', ko: '일정', href: '/schedule', desc: '오늘의 일정, 월간 캘린더, D-Day' },
        { label: 'QUEST', ko: '퀘스트', href: '/schedule/quest', desc: '할 일을 완료하고 포인트 모으기' },
      ],
    },
    {
      key: 'review', label: 'REVIEW', ko: '취향 기록', desc: '읽고, 가보고, 마음에 남은 것들',
      children: [
        { label: 'READING', ko: '독서', href: '/review/reading', desc: '요즘 읽는 책, 다 읽은 책' },
        { label: 'PLACES', ko: '장소', href: '/review/places', desc: '다시 가고 싶은 곳' },
        { label: 'NOTES', ko: '문장·메모', href: '/review/notes', desc: '마음에 남은 문장, 틈틈이 적은 생각' },
      ],
    },
    {
      key: 'finance', label: 'FINANCE', ko: '가계부', desc: '돈의 흐름 관리',
      children: [
        { label: 'LEDGER', ko: '가계부', href: '/finance/ledger', desc: '수입·지출 기록 (준비 중)' },
        { label: 'SUBSCRIPTION', ko: '구독 관리', href: '/finance/subscription', desc: '정기구독 목록과 결제일' },
      ],
    },
    {
      key: 'work', label: 'WORK', ko: '작업 관리', desc: '만든 것과 하고 있는 것',
      children: [
        { label: 'PORTFOLIO', ko: '작업', href: '/portfolio', desc: '만들고, 참여하고, 배운 것들' },
      ],
    },
    {
      key: 'archive', label: 'ARCHIVE', ko: '자료 보관', desc: '오래 보관할 자료와 백업',
      children: [
        { label: 'FILES', ko: '자료', href: '/archive/files', desc: '보관하고 싶은 자료 (준비 중)' },
        { label: 'BACKUP', ko: '백업', href: '/backup', desc: '사이트와 기록의 저장 기록' },
      ],
    },
    {
      key: 'etc', label: 'ETC', ko: '기타', desc: '그 밖의 것들',
      children: [
        { label: 'ABOUT', ko: '소개', href: '/about', desc: '나에 대한 이야기와 링크' },
        { label: 'TAGS', ko: '태그', href: '/tags', desc: '태그별로 모아보기' },
      ],
    },
  ] as NavGroup[],

  /** ABOUT 페이지 아래 링크 모음 */
  links: [
    { label: 'GitHub', href: 'https://github.com/', note: '코드' },
    { label: 'Email', href: 'mailto:hello@example.com', note: '연락' },
  ],

  /** 업데이트 기록 — 새 글은 자동으로 추가되고, 여기 적은 소식도 함께 표시됩니다 */
  updates: [
    { date: '2026-11-20', text: '홈페이지 리뉴얼!' },
  ],

  /** 꾸미기 이미지 */
  images: {
    icon: { src: '', alt: '아이콘' } as Deco, // 헤더 왼쪽 정사각형 (150×150)
    banner: { src: '', alt: '헤더 배너' } as Deco, // 헤더 배너 (860×150)
    mascot: { src: '', alt: '캐릭터' } as Deco, // 좌측바 캐릭터
    sideBanner: { src: '', alt: '세로 배너' } as Deco, // 좌측바 세로 배너 (130×160)
    navTitle: { src: '', alt: 'navigation' } as Deco, // 메뉴 위 제목 이미지 (150×46)
    photo: { src: '', alt: '포토' } as Deco, // 홈 포토 박스
    myButton: { src: '', alt: '내 버튼' } as Deco, // 'link me!' 내 88×31 버튼
    /** 홈 꾸미기 띠: 88×31 버튼 */
    buttons: [{ src: '' }, { src: '' }, { src: '' }, { src: '' }, { src: '' }, { src: '' }] as Deco[],
    /** 홈 꾸미기 띠: 스탬프 (72×56 정도) */
    stamps: [{ src: '' }, { src: '' }, { src: '' }, { src: '' }, { src: '' }, { src: '' }, { src: '' }] as Deco[],
    /** 홈 꾸미기 띠: 긴 블링키 (150×31 정도) */
    blinkies: [{ src: '' }, { src: '' }, { src: '' }, { src: '' }] as Deco[],
    /** 좌측바 친구 버튼 (href에 친구 사이트 주소) */
    friends: [{ src: '', href: '' }, { src: '', href: '' }, { src: '', href: '' }] as Deco[],
  },

  /** 이미지가 비어 있을 때 자리표시를 보여줄지 (꾸미기 다 끝나면 false 추천) */
  showPlaceholders: true,
};
