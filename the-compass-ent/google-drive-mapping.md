# Google Drive 이미지 매핑 가이드

## 🚀 빠른 시작

### 1단계: Google Drive에 폴더 구조 만들기

Google Drive에 다음과 같은 폴더 구조를 만드세요:

```
compass-images/
├── artists/
│   ├── angcherry/
│   ├── bliss/
│   ├── don/
│   ├── erry/
│   ├── eunwoo/
│   ├── heejae/
│   ├── kara/
│   ├── kissy/
│   ├── kyuria/
│   ├── lant/
│   ├── liha/
│   ├── lostboys/
│   ├── soul/
│   ├── toxicb/
│   └── wenzi/
├── company/
└── events/
```

### 2단계: 이미지 업로드

`public/images` 폴더의 내용을 그대로 Google Drive에 업로드하세요.

### 3단계: 폴더 공유 설정

1. `compass-images` 폴더 우클릭 → **공유**
2. **일반 액세스** → **"링크가 있는 모든 사용자"** 선택
3. **저장**

### 4단계: 파일 ID 수집

각 이미지의 파일 ID를 수집해서 아래 매핑 테이블을 완성하세요.

**파일 ID 찾는 방법:**
- 이미지 우클릭 → 공유 → 링크 복사
- URL에서 `/file/d/` 다음 부분이 파일 ID입니다

예: `https://drive.google.com/file/d/1xYzABC123.../view`
→ 파일 ID: `1xYzABC123...`

---

## 📋 매핑 테이블 (src/lib/google-drive.ts에 복사)

아래 템플릿의 `'PASTE_FILE_ID_HERE'` 부분을 실제 파일 ID로 교체하세요:

```typescript
export const googleDriveImageMap: GoogleDriveImageMap = {
    // ===== ARTISTS =====
    
    // angcherry
    '/images/artists/angcherry/main.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/angcherry/001.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/angcherry/002.png': 'PASTE_FILE_ID_HERE',
    '/images/artists/angcherry/003.png': 'PASTE_FILE_ID_HERE',
    '/images/artists/angcherry/004.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/angcherry/005.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/angcherry/006.jpg': 'PASTE_FILE_ID_HERE',
    
    // bliss
    '/images/artists/bliss/main.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/bliss/001.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/bliss/002.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/bliss/003.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/bliss/004.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/bliss/005.jpg': 'PASTE_FILE_ID_HERE',
    
    // don
    '/images/artists/don/main.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/don/001.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/don/002.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/don/003.jpg': 'PASTE_FILE_ID_HERE',
    
    // erry
    '/images/artists/erry/main.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/erry/001.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/erry/002.jpg': 'PASTE_FILE_ID_HERE',
    
    // eunwoo
    '/images/artists/eunwoo/main.jpg': 'PASTE_FILE_ID_HERE',
    
    // heejae
    '/images/artists/heejae/main.jpeg': 'PASTE_FILE_ID_HERE',
    '/images/artists/heejae/001.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/heejae/002.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/heejae/003.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/heejae/004.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/heejae/005.jpg': 'PASTE_FILE_ID_HERE',
    
    // kara
    '/images/artists/kara/main.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/kara/001.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/kara/002.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/kara/003.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/kara/004.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/kara/005.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/kara/006.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/kara/007.jpg': 'PASTE_FILE_ID_HERE',
    
    // kissy
    '/images/artists/kissy/main.JPG': 'PASTE_FILE_ID_HERE',
    '/images/artists/kissy/001.JPG': 'PASTE_FILE_ID_HERE',
    '/images/artists/kissy/002.JPG': 'PASTE_FILE_ID_HERE',
    '/images/artists/kissy/003.JPG': 'PASTE_FILE_ID_HERE',
    
    // kyuria
    '/images/artists/kyuria/main.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/kyuria/001.jpg': 'PASTE_FILE_ID_HERE',
    '/images/artists/kyuria/002.jpg': 'PASTE_FILE_ID_HERE',
    
    // lant
    '/images/artists/lant/main.jpg': 'PASTE_FILE_ID_HERE',
    
    // soul
    '/images/artists/soul/main.jpg': 'PASTE_FILE_ID_HERE',
    
    // ===== COMPANY =====
    '/images/company/logo.jpg': 'PASTE_FILE_ID_HERE',
    
    // ===== LOGO =====
    '/images/logo.jpg': 'PASTE_FILE_ID_HERE',
};
```

---

## 🔧 자동화 옵션

153개의 이미지를 수동으로 매핑하기 어려우시면, 다음 방법을 고려해보세요:

### 옵션 1: Google Apps Script 사용
Google Drive 폴더의 모든 파일 ID를 자동으로 추출하는 스크립트

### 옵션 2: 폴더 ID 기반 접근
각 이미지를 개별 매핑하는 대신, 폴더 구조를 활용

### 옵션 3: Cloudinary로 돌아가기 (권장)
이미 설정된 Cloudinary를 사용하면 더 쉽고 안정적입니다

---

어떤 방법으로 진행하시겠어요?
