# 이벤트 메인 포스터 수동 추가 및 적용 가이드

이벤트의 메인 포스터를 수동으로 추가하고 적용하는 방법입니다.

## 1. 이미지 파일 준비 및 위치

1.  **이미지 파일 이름**: 메인 포스터로 사용할 이미지의 이름을 **`000.jpg`**로 변경합니다. (확장자는 jpg, jpeg, png 등 가능하지만 코드와 일치해야 합니다.)
2.  **폴더 위치**: `public/images/events/` 경로 아래에 해당 이벤트의 폴더를 찾거나 새로 만듭니다.
    *   예: `public/images/events/20240914lucifer/`
3.  **파일 이동**: 준비한 `000.jpg` 파일을 해당 폴더 안에 넣습니다.

## 2. 코드 수정 (`src/lib/data.ts`)

`src/lib/data.ts` 파일에서 두 군데(`events` 배열, `companyEvents` 배열)를 수정해야 합니다.

### A. Events 페이지용 (`events` 배열)

`export const events: Event[] = [` 내부의 해당 이벤트 객체에 **`poster`** 속성을 추가합니다.

```typescript
{
    id: "past-2024-0914-lucifer",
    date: "2024-09-14",
    venue: "Lucifer",
    city: "Pattaya, Thailand",
    artist: "SoUL",
    // 아래 줄을 추가합니다.
    poster: "/images/events/20240914lucifer/000.jpg", 
},
```

### B. Company 페이지용 (`companyEvents` 배열)

`export const companyEvents: CompanyEvent[] = [` 내부의 해당 이벤트 객체에 **`src`** 속성을 설정합니다. (이미 설정되어 있다면 경로만 확인)

```typescript
{
    id: "event-20240914-lucifer",
    title: "SoUL @ Lucifer",
    date: "2024.09.14 - Thailand, Pattaya",
    type: "image",
    // 아래 줄이 메인 이미지 경로입니다.
    src: "/images/events/20240914lucifer/000.jpg", 
},
```

## 요약

1.  **폴더**: `public/images/events/[이벤트폴더명]/`
2.  **파일**: `000.jpg` (권장)
3.  **코드**:
    *   `events` 배열 -> `poster: "/images/events/[이벤트폴더명]/000.jpg"`
    *   `companyEvents` 배열 -> `src: "/images/events/[이벤트폴더명]/000.jpg"`
