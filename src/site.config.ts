// ✏️ 사이트 전체 설정 — 이 파일만 고치면 이름·소개·꾸미기 이미지가 모든 페이지에 반영됩니다.
//
// 🖼 이미지 넣는 법
//   1) 이미지 파일을 public/images/deco/ 폴더에 넣고
//   2) 아래에 '/images/deco/파일이름.png' 처럼 적으면 끝!
//   비워두면('') 회색 줄무늬 자리표시가 보입니다. (gif 움짤도 OK)

export type Deco = { src: string; alt?: string; href?: string };
export type NavItem = { label: string; ko: string; href: string; desc?: string };
export type NavGroup = { key: string; label: string; ko: string; children: NavItem[] };

export const SITE = {
  name: '홍길동',
  title: '홍길동의 작은 방',
  /** 헤더 배너 위에 크게 올라가는 제목 (비우면 표시 안 함) */
  headerTitle: '',
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

  /** 좌측바 프로필 카드 — 사진 + 간단한 내 정보 (항목은 자유롭게 추가·삭제) */
  profile: {
    photo: { src: '', alt: '프로필 사진' } as Deco, // 정사각형 추천 (gif 가능)
    status: '☁ 오늘도 기록 중', // 사진 아래 한 줄 상태 메시지
    items: [
      { label: '생일', value: '1월 1일' },
      { label: 'MBTI', value: 'INFP' },
      { label: '좋아함', value: '산책 · 사진 · 기록' },
      { label: '요즘', value: '홈피 꾸미기' },
    ],
  },

  /** 메뉴 — 대주제 띠를 누르면 접기/펼치기, 소주제를 누르면 해당 페이지로 이동 */
  nav: [
    {
      key: 'record', label: 'RECORD', ko: '기록',
      children: [
        { label: 'DIARY', ko: '일기', href: '/diary', desc: '날짜별 일기' },
        { label: 'SCRAPBOOK', ko: '스크랩북', href: '/scrapbook', desc: '이미지, 링크, 문장 스크랩' },
        { label: 'MEMO', ko: '메모', href: '/memo', desc: '자유 메모 및 백업 관련 메모' },
      ],
    },
    {
      key: 'life', label: 'LIFE', ko: '생활 관리',
      children: [
        { label: 'SCHEDULE', ko: '일정', href: '/schedule', desc: '일정 및 캘린더' },
        { label: 'TODO', ko: '할 일', href: '/todo', desc: '할 일 관리' },
        { label: 'DIET', ko: '식단·운동', href: '/diet', desc: '식단 및 운동' },
        { label: 'HOSPITAL', ko: '병원', href: '/hospital', desc: '병원 방문 기록' },
        { label: 'HABIT', ko: '습관', href: '/habit', desc: '고정적으로 매일 할 일' },
      ],
    },
    {
      key: 'review', label: 'REVIEW', ko: '취향 기록',
      children: [
        { label: 'BOOK', ko: '도서', href: '/review/book', desc: '도서 리뷰' },
        { label: 'ANIME', ko: '애니메이션', href: '/review/anime', desc: '애니메이션 리뷰' },
        { label: 'MOVIE & DRAMA', ko: '영화·드라마', href: '/review/movie', desc: '영화 및 드라마 리뷰' },
        { label: 'PLAYLIST', ko: '플레이리스트', href: '/playlist', desc: '애플뮤직 플레이리스트' },
      ],
    },
    {
      key: 'finance', label: 'FINANCE', ko: '가계부',
      children: [
        { label: 'MONEY', ko: '수입·지출', href: '/finance/money', desc: '수입 및 지출' },
        { label: 'SUBSCRIPTION', ko: '구독 관리', href: '/finance/subscription', desc: '정기구독 목록과 결제일' },
      ],
    },
    {
      key: 'work', label: 'WORK', ko: '작업',
      children: [
        { label: 'COMMISSION', ko: '커미션', href: '/work/commission', desc: '의뢰, 진행 상황, 마감일, 작업 수입' },
        { label: 'PORTFOLIO', ko: '포트폴리오', href: '/portfolio', desc: '작업물 및 포트폴리오' },
      ],
    },
    {
      key: 'archive', label: 'ARCHIVE', ko: '자료',
      children: [
        { label: 'MOODBOARD', ko: '무드보드', href: '/archive/moodboard', desc: '작업할 때 쓰는 자유 무드보드' },
        { label: 'REFERENCE', ko: '레퍼런스', href: '/archive/reference', desc: '종류별 레퍼런스 앨범' },
        { label: 'PHOTO', ko: '사진', href: '/photo', desc: '앨범별 사진 보관' },
        { label: 'BACKUP LINKS', ko: '백업 링크', href: '/archive/backup', desc: '사이트 및 자료 백업 링크' },
      ],
    },
    {
      key: 'game', label: 'GAME', ko: '게임',
      children: [
        { label: 'PET', ko: '다마고치', href: '/game/pet', desc: '나만의 펫 키우기' },
        { label: 'FISHING', ko: '낚시터', href: '/game/fishing', desc: '물고기 낚고 도감 채우기' },
        { label: 'BR 31', ko: '배스킨라빈스 31', href: '/game/31', desc: '31을 말하면 지는 숫자 게임' },
        { label: 'ROULETTE', ko: '베팅 룰렛', href: '/game/roulette', desc: '코인을 걸고 룰렛 돌리기' },
      ],
    },
    {
      key: 'etc', label: 'ETC', ko: '기타',
      children: [
        { label: 'QUEST', ko: '퀘스트', href: '/etc/quest', desc: '할 일·습관으로 포인트 모으기' },
        { label: 'YEAR IN REVIEW', ko: '연말 결산', href: '/etc/year', desc: '한 해 기록 돌아보기' },
        { label: 'SETTINGS', ko: '설정', href: '/etc/settings', desc: '글자 크기, 메뉴, 게임 데이터 관리' },
      ],
    },
  ] as NavGroup[],

  /** 맨 위 얇은 바에 흘러가는 문구 (이모지 OK) */
  topbar: ['✧ welcome to my little room ✧', '♡ 오늘도 기록하는 하루', '☁ 천천히 둘러보고 가세요', '🎀 since 2026'],

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
    banner: { src: '', alt: '헤더 배너' } as Deco, // 헤더 배너 (가로로 긴 이미지, 1400×160 정도)
    sideBanner: { src: '', alt: '세로 배너' } as Deco, // 좌측바 세로로 긴 배너 (190×560 정도, 컨셉 이미지)
    navTitle: { src: '', alt: 'navigation' } as Deco, // 메뉴 위 제목 이미지 (150×46)
    photo: { src: '', alt: '포토' } as Deco, // 홈 포토 박스
    /** 홈 꾸미기 띠: 88×31 버튼 */
    buttons: [{ src: '' }, { src: '' }, { src: '' }, { src: '' }, { src: '' }, { src: '' }] as Deco[],
    /** 홈 꾸미기 띠: 스탬프 (72×56 정도) */
    stamps: [{ src: '' }, { src: '' }, { src: '' }, { src: '' }, { src: '' }, { src: '' }, { src: '' }] as Deco[],
    /** 홈 꾸미기 띠: 긴 블링키 (150×31 정도) */
    blinkies: [{ src: '' }, { src: '' }, { src: '' }, { src: '' }] as Deco[],
  },

  /** 이미지가 비어 있을 때 자리표시를 보여줄지 (꾸미기 다 끝나면 false 추천) */
  showPlaceholders: true,
};
