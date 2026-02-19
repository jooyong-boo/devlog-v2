# Spec: 댓글 삭제 기능

## 개요

현재 댓글 작성(`features/comment/create`)만 구현되어 있고 삭제 기능이 없음.
본인이 작성한 댓글을 삭제할 수 있도록 기능 추가.

---

## 요구사항

### 기능 요구사항

| #   | 요구사항                                                           | 우선순위 |
| --- | ------------------------------------------------------------------ | -------- |
| 1   | 로그인한 유저는 본인 댓글만 삭제 가능                              | 필수     |
| 2   | admin은 모든 댓글 삭제 가능                                        | 필수     |
| 3   | soft delete 방식 (`deletedAt`, `deleteUser` 필드 사용)             | 필수     |
| 4   | 삭제 후 댓글 목록 즉시 갱신 (revalidation)                         | 필수     |
| 5   | 대댓글이 있는 댓글은 내용만 "삭제된 댓글입니다."로 교체, 구조 유지 | 필수     |
| 6   | 대댓글이 없는 댓글은 완전 숨김 처리 (UI에서 미표시)                | 필수     |
| 7   | 삭제 전 confirm 다이얼로그 표시                                    | 필수     |

### 비기능 요구사항

- 본인 댓글 여부는 서버 액션 내부에서 세션으로 재검증 (클라이언트 판단 신뢰 금지)
- 에러 발생 시 토스트 메시지로 사용자에게 알림

---

## 구현 범위 (FSD 기준)

### 1. `features/comment/delete/` — 신규 생성

```
features/comment/delete/
├── api/
│   └── actions.ts       # deleteComment 서버 액션
├── model/
│   └── schema.ts        # Zod 스키마 (commentId: number)
└── ui/
    └── DeleteCommentButton.tsx  # 삭제 버튼 + confirm 다이얼로그
```

### 2. `entities/comment/ui/` — 기존 수정

- `CommentItem.tsx`: 삭제 버튼 조건부 렌더링 추가
  - 조건: `session.user.id === comment.userId` OR `session.user.role === 'admin'`
- 삭제된 댓글(`deletedAt !== null`) 표시 방식:
  - 대댓글 있음 → `"삭제된 댓글입니다."` 회색 텍스트, 작성자/시간 숨김
  - 대댓글 없음 → 렌더링 자체 생략

### 3. DB — 변경 없음

기존 `Comment` 모델의 `deletedAt`, `deleteUser` 필드 활용. 마이그레이션 불필요.

---

## 서버 액션 상세

**파일:** `features/comment/delete/api/actions.ts`

```typescript
// 시그니처
async function deleteComment(commentId: number): Promise<ActionResult>;

// 처리 순서
// 1. 세션 확인 → 미로그인 시 에러 반환
// 2. DB에서 댓글 조회 → 없으면 에러
// 3. 권한 확인: comment.userId === session.user.id OR role === 'admin'
// 4. soft delete: deletedAt = now(), deleteUser = session.user.id
// 5. revalidateTag('comments')
// 6. 성공/실패 결과 반환

// 반환 타입
type ActionResult = { success: true } | { success: false; error: string };
```

**참고:** `features/post/create/api/actions.ts` 패턴 동일하게 적용.

---

## UI 상세

**DeleteCommentButton 동작:**

1. 버튼 클릭 → `window.confirm("댓글을 삭제하시겠습니까?")` 표시
2. 확인 → `deleteComment(commentId)` 호출, 버튼 로딩 상태 표시
3. 성공 → 목록 자동 갱신 (서버 컴포넌트 revalidation)
4. 실패 → 토스트 에러 메시지 표시

**버튼 위치:** 댓글 카드 우측 상단, 본인 댓글에만 표시

---

## 체크리스트 (구현 완료 기준)

- [ ] `deleteComment` 서버 액션 작성 및 권한 검증 포함
- [ ] Zod 스키마 작성
- [ ] `DeleteCommentButton` 컴포넌트 작성
- [ ] `CommentItem`에 삭제 버튼 조건부 렌더링
- [ ] 삭제된 댓글 표시 로직 (대댓글 유무 분기)
- [ ] revalidateTag 적용 확인
- [ ] admin 권한으로 타인 댓글 삭제 동작 확인

---

## 참고 파일

- 서버 액션 패턴: `src/features/post/create/api/actions.ts`
- 댓글 타입: `src/entities/comment/model/types.ts`
- 댓글 UI: `src/entities/comment/ui/`
- 토스트: `src/shared/ui/` (기존 사용 방식 따름)
- 세션 사용법: `src/features/comment/create/api/actions.ts`
