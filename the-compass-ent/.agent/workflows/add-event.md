---
description: 웹사이트에 새로운 이벤트를 추가하는 방법
---

# 새로운 이벤트 추가 방법

웹사이트에 새로운 이벤트를 추가하려면 `src/lib/data.ts` 파일을 수정해야 합니다.

## 단계

1. `src/lib/data.ts` 파일을 엽니다.
2. `events` 배열을 찾습니다 (`export const events` 검색).
3. 배열에 새로운 이벤트 객체를 추가합니다.

## 이벤트 데이터 구조

```typescript
{
    id: "unique-id",          // 고유 ID (예: "event-2025-03-01")
    date: "YYYY-MM-DD",       // 날짜 (YYYY-MM-DD 형식 필수)
    venue: "Venue Name",      // 장소 이름 (예: "FAUST")
    city: "City, Country",    // 도시, 국가 (예: "Seoul, Korea")
    artist: "Artist Name",    // (선택) 아티스트 이름
    poster: "/path/to/img.jpg", // (선택) 포스터 이미지 경로
    slug: "event-slug",       // (선택) 상세 페이지 연결용
}
```

## 예시

```typescript
    {
        id: "upcoming-new",
        date: "2025-04-15",
        venue: "Club Octagon",
        city: "Seoul",
        artist: "SoUL",
        poster: "/images/events/new-poster.jpg",
    },
```

## 참고 사항
- **Upcoming vs Past**: 시스템이 `date`를 기준으로 자동으로 이벤트를 분류합니다.
- **이미지**: 포스터 이미지는 `public/images/events/` 폴더에 저장하세요.
