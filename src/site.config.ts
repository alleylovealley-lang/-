// ✏️ 사이트 전체 설정 — 이 파일만 고치면 이름·소개·링크가 모든 페이지에 반영됩니다.
export const SITE = {
  name: '홍길동',
  title: '홍길동의 공간',
  description: '생각을 기록하고, 만든 것을 모아두는 평생의 작업실.',
  intro: '안녕하세요. 저는 무언가를 만들고, 배우고, 기록하는 사람입니다.',
  lang: 'ko',
  locale: 'ko-KR',
  startYear: 2026,
  // 비워두면 표시되지 않습니다.
  links: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'Email', href: 'mailto:hello@example.com' },
  ],
  nav: [
    { label: '글', href: '/blog' },
    { label: '작업', href: '/projects' },
    { label: '정원', href: '/garden' },
    { label: '소개', href: '/about' },
  ],
} as const;
