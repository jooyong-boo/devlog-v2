# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Jooyong DevLog — Next.js 16 (App Router), React 19, TypeScript, Supabase/PostgreSQL 기반 풀스택 블로그 애플리케이션. Feature-Sliced Design (FSD) 아키텍처 적용.

## 주요 명령어

```bash
pnpm dev              # 개발 서버 (Turbopack)
pnpm build            # 프로덕션 빌드
pnpm lint             # ESLint 검사
pnpm format           # Prettier 포맷팅 (적용)
pnpm format:check     # Prettier 포맷팅 (검사만)
pnpm test             # Vitest (watch 모드)
pnpm test -- --run    # Vitest (단일 실행)
pnpm test -- --run src/shared/lib/__tests__/utils.test.ts  # 특정 테스트 파일 실행
pnpm storybook        # Storybook (포트 6006)
pnpm prisma:generate  # Prisma 클라이언트 생성
pnpm prisma:migrate   # DB 마이그레이션 실행
pnpm prisma:studio    # Prisma 시각적 편집기
```

## 아키텍처 (Feature-Sliced Design)

모든 애플리케이션 코드는 `src/` 하위에 FSD 레이어로 구성. 임포트 방향은 반드시 아래로만 흘러야 함: `app → widgets → features → entities → shared`.

- **`src/shared/`** — 재사용 UI 컴포넌트(`ui/`), 유틸리티(`lib/`), 사이트 설정(`config/`), 타입 정의(`types/`). 상위 레이어에 의존하지 않음.
- **`src/entities/`** — 도메인 모델: `post`, `comment`, `portfolio`, `resume`. 각각 `model/types.ts`, `api/queries.ts`, `ui/` 컴포넌트 보유. `index.ts` 배럴 익스포트 사용.
- **`src/features/`** — 유스케이스별 비즈니스 로직: `post/create`, `post/filter`, `comment/create`, `view-tracking`, `resume/edit`, `portfolio/edit`. 각 피처는 `ui/`, `model/`(Zod 스키마), `api/`(서버 액션) 구조.
- **`src/widgets/`** — 레이아웃 조합 컴포넌트: `header`, `footer`, `sidebar`, `admin-sidebar`, `post-list`.
- **`app/`** — Next.js App Router 페이지. 라우트 그룹: `(public)/` 공개 페이지, `(admin)/` 관리자 페이지, `auth/` 로그인, `api/` API 라우트.

## 기술 상세

- **경로 별칭**: `@/*` → `./src/*`
- **패키지 매니저**: pnpm
- **스타일링**: Tailwind CSS v4 (CSS-first 설정, `app/globals.css`에서 관리. `tailwind.config.js` 없음)
- **DB**: Prisma ORM + Supabase PostgreSQL. 스키마: `prisma/schema.prisma`. 모든 엔티티에 감사 필드 포함 (`createdAt`, `createUser`, `updatedAt`, `updateUser`, `deletedAt`, `deleteUser`).
- **인증**: NextAuth.js v5 beta, Google/GitHub OAuth. 설정: `auth.ts`, `auth.config.ts`. JWT 세션 + Prisma 어댑터. 역할 기반 접근 제어 (admin/user).
- **미들웨어**: `middleware.ts`에서 `/admin/*` 라우트 보호.
- **폼**: react-hook-form + Zod 유효성 검증. 스키마 위치: `features/*/model/schema.ts`.
- **에디터**: Tiptap 리치 텍스트 에디터 + lowlight 코드 구문 강조.
- **상태 관리**: Zustand (클라이언트 상태), nuqs (URL 검색 파라미터).
- **테스트**: Vitest + React Testing Library. 소스 옆 `__tests__/` 폴더에 공존 배치.
- **Git hooks**: Husky pre-commit에서 eslint --fix + prettier 실행; pre-push에서 lint 실행.
- **UI 언어**: 한국어.
