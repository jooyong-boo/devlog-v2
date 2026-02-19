# Jooyong DevLog

Next.js 16 기반의 풀스택 블로그 프로젝트 템플릿입니다.

## 기술 스택

- **프레임워크**: Next.js 16.1.6 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4.1
- **데이터베이스**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **테스트**: Vitest + Testing Library
- **UI 개발**: Storybook 10
- **코드 품질**: ESLint, Prettier
- **Git Hooks**: Husky + lint-staged
- **패키지 매니저**: pnpm

## 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성하고, Supabase 프로젝트 정보를 입력합니다.

```bash
cp .env.example .env
```

다음 정보를 입력해야 합니다:

- `DATABASE_URL`: Supabase PostgreSQL 연결 문자열 (Transaction mode)
- `DIRECT_URL`: Supabase PostgreSQL 직접 연결 문자열 (Session mode)
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key

### 3. Prisma 설정

```bash
# Prisma 클라이언트 생성
pnpm prisma:generate

# 데이터베이스 마이그레이션
pnpm prisma:migrate

# Prisma Studio 실행 (선택사항)
pnpm prisma:studio
```

### 4. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 사용 가능한 스크립트

### 개발

- `pnpm dev` - 개발 서버 실행 (Turbopack 사용)
- `pnpm build` - 프로덕션 빌드
- `pnpm start` - 프로덕션 서버 실행

### 코드 품질

- `pnpm lint` - ESLint 실행
- `pnpm format` - Prettier로 코드 포맷팅
- `pnpm format:check` - 포맷팅 확인

### 테스트

- `pnpm test` - Vitest 테스트 실행
- `pnpm test:ui` - Vitest UI 모드
- `pnpm test:coverage` - 테스트 커버리지 확인

### Storybook

- `pnpm storybook` - Storybook 개발 서버 실행 (http://localhost:6006)
- `pnpm build-storybook` - Storybook 정적 빌드

### Prisma

- `pnpm prisma:generate` - Prisma 클라이언트 생성
- `pnpm prisma:migrate` - 데이터베이스 마이그레이션 실행
- `pnpm prisma:studio` - Prisma Studio 실행

## 프로젝트 구조

[Feature-Sliced Design (FSD)](https://feature-sliced.design/) 아키텍처를 적용하고 있습니다.
임포트 방향: `app → widgets → features → entities → shared`

```
jooyong-devlog/
├── app/                        # Next.js App Router 페이지
│   ├── (public)/               # 공개 페이지
│   ├── (admin)/                # 관리자 페이지
│   ├── auth/                   # 인증 페이지
│   ├── api/                    # API 라우트
│   ├── layout.tsx              # 루트 레이아웃
│   └── globals.css             # 글로벌 스타일 (Tailwind CSS v4)
├── src/
│   ├── widgets/                # 레이아웃 조합 컴포넌트
│   │   ├── header/
│   │   ├── footer/
│   │   ├── sidebar/
│   │   ├── admin-sidebar/
│   │   └── post-list/
│   ├── features/               # 유스케이스별 비즈니스 로직
│   │   ├── post/               # 게시글 생성, 필터링
│   │   ├── comment/            # 댓글 생성
│   │   ├── portfolio/          # 포트폴리오 편집
│   │   ├── resume/             # 이력서 편집
│   │   └── view-tracking/      # 조회수 추적
│   ├── entities/               # 도메인 모델
│   │   ├── post/
│   │   ├── comment/
│   │   ├── portfolio/
│   │   └── resume/
│   └── shared/                 # 공유 모듈
│       ├── ui/                 # 재사용 UI 컴포넌트
│       ├── lib/                # 유틸리티 (prisma, auth, utils 등)
│       ├── config/             # 사이트 설정, 테스트 설정
│       └── types/              # 타입 정의
├── prisma/                     # Prisma 스키마 및 마이그레이션
│   └── schema.prisma
├── .storybook/                 # Storybook 설정
└── public/                     # 정적 파일
```

각 FSD 슬라이스는 `ui/`, `model/`, `api/` 세그먼트로 구성되며, 테스트는 해당 슬라이스 내 `__tests__/` 폴더에 공존 배치합니다.

## Tailwind CSS v4

이 프로젝트는 Tailwind CSS v4를 사용합니다. v4는 CSS-first 설정 방식을 채택하여 `tailwind.config.js` 파일 대신 `app/globals.css`에서 직접 테마를 설정합니다.

```css
@import 'tailwindcss';

@theme {
  /* 커스텀 테마 설정 */
}
```

자세한 내용은 [Tailwind CSS v4 문서](https://tailwindcss.com/blog/tailwindcss-v4)를 참조하세요.

## Git Hooks

이 프로젝트는 Husky와 lint-staged를 사용하여 Git hooks를 관리합니다.

- **pre-push**: push 전에 자동으로 lint와 타입 체크를 실행합니다.
- **pre-commit**: commit 전에 staged 파일에 대해 lint와 포맷팅을 실행합니다.

## Vercel 배포

### 1. Vercel에 프로젝트 연결

```bash
pnpm vercel
```

### 2. 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정합니다:

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. 배포

```bash
pnpm vercel --prod
```

## Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. Settings > Database에서 Connection string 확인
3. Settings > API에서 Project URL과 anon key 확인
4. `.env` 파일에 정보 입력

## 참고 자료

- [Next.js 16 문서](https://nextjs.org/docs)
- [Tailwind CSS v4 문서](https://tailwindcss.com/docs)
- [Prisma 문서](https://www.prisma.io/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Vitest 문서](https://vitest.dev/)
- [Storybook 문서](https://storybook.js.org/)

## 라이선스

MIT
