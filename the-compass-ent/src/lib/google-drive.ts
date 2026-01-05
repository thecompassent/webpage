// Google Drive 이미지 URL 유틸리티

/**
 * Google Drive 파일 ID를 직접 이미지 URL로 변환
 * 참고: uc?export=view는 더 이상 작동하지 않아 thumbnail 엔드포인트 사용
 * @param fileId - Google Drive 파일 ID
 * @returns 직접 접근 가능한 이미지 URL
 */
export function getGoogleDriveImageUrl(fileId: string): string {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
}

/**
 * Google Drive 공유 링크에서 파일 ID 추출
 * @param shareUrl - Google Drive 공유 링크
 * @returns 파일 ID 또는 null
 * 
 * 지원하는 URL 형식:
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 */
export function extractFileIdFromUrl(shareUrl: string): string | null {
    // /file/d/FILE_ID/ 패턴
    const fileIdMatch = shareUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
        return fileIdMatch[1];
    }

    // id=FILE_ID 패턴
    const idParamMatch = shareUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idParamMatch) {
        return idParamMatch[1];
    }

    return null;
}

/**
 * Google Drive 공유 링크를 직접 이미지 URL로 변환
 * @param shareUrl - Google Drive 공유 링크
 * @returns 직접 접근 가능한 이미지 URL 또는 원본 URL
 */
export function convertGoogleDriveUrl(shareUrl: string): string {
    // 이미 직접 URL 형식인 경우 그대로 반환
    if (shareUrl.includes('uc?export=view')) {
        return shareUrl;
    }

    const fileId = extractFileIdFromUrl(shareUrl);
    if (fileId) {
        return getGoogleDriveImageUrl(fileId);
    }

    // 변환 실패 시 원본 반환
    return shareUrl;
}

/**
 * Google Drive 이미지 매핑 타입
 * 로컬 경로를 Google Drive 파일 ID에 매핑
 */
export interface GoogleDriveImageMap {
    [localPath: string]: string; // localPath -> Google Drive File ID
}

/**
 * Google Drive 폴더 ID 참조
 * 
 * Root (Webpage): 1TsL-kkaBroKGksQZ74HPekDXFfqVpThr
 * ├── images: 1v9JQ5jAELfFs6KUDkrBn_5tfkB9dh0Dw
 * │   ├── artists: 1EcKYIAO_WJCUOwoJYW91fCqudNpj2fpl
 * │   ├── company: 1qwT1gCkUxDSLljj8RQkeva28BIOOGYaI
 * │   ├── events: 14FCun1hHXKJ8eV-_b236R9i3ZfNhJ1Ni
 * │   └── logo.jpg: 1DTJKulbUeaD_IEzPcdgB6H87sTeZ7zI8
 */

/**
 * 이미지 매핑 저장소
 * 여기에 로컬 경로와 Google Drive 파일 ID를 매핑합니다
 */
export const googleDriveImageMap: GoogleDriveImageMap = {
    // ===== ROOT =====
    '/images/logo.jpg': '1DTJKulbUeaD_IEzPcdgB6H87sTeZ7zI8',

    // ===== COMPANY =====
    '/images/company/clients.jpg': '1j_Xmxpkg_uHbP9L7cfG3H8BjNEbmmTf9',
    '/images/company/company_info.jpg': '1zB-8-ALz5egQ9ncJOkkOpMog7bKb4MpM',
    '/images/company/dj_system.jpg': '1PENrLtTrLmT_ItamuuWpllgZU60-GGcw',
    '/images/company/gig_history.jpg': '1fFxz08mLlHAVnU5fxrFHrttflBCshECM',
    '/images/company/tour_map.jpg': '1RSEkgm26qYnwPyOydfGTCeIDgd20xm5P',

    // ===== ARTISTS =====
    // angcherry
    '/images/artists/angcherry/001.jpg': '14HA3X6Wi8XolS9eHmPPVRow5o9FCRmnu',
    '/images/artists/angcherry/002.png': '1g2kcDsg_YU5H-QD2ikGsPAg6RgKGwk-e',
    '/images/artists/angcherry/003.png': '1Abj_ZIEGsiwTmfxjKOS5zqrCUI8-YI68',
    '/images/artists/angcherry/004.jpg': '1N3aRa9OEvq9yHx2SpmYIB8W7S2Kho79p',
    '/images/artists/angcherry/005.jpg': '1xVAe_wxqOtfAKDaf65Sy9Nghc0EFsvkf',
    '/images/artists/angcherry/006.jpg': '1OmyhoaNbVnV7FB2vJ4DcnWUcQ8LzdMDG',
    '/images/artists/angcherry/main.jpg': '14z4rOKzjNkjLbdpn5Dw1rhwruGZiuc89',

    // bliss
    '/images/artists/bliss/001.jpg': '1Tq4lnxKPqrKXX-kHd0_isuT9pFhrsTP1',
    '/images/artists/bliss/002.jpg': '1l3sdYy0xKny2JiB1c0MVeeCB96GKoWP7',
    '/images/artists/bliss/003.jpg': '1JnDy0IUDdED6BUmr0QbWZzoI7DGBDRp4',
    '/images/artists/bliss/004.jpg': '1C2SWfRW_n6Vedg3ED18MDS4ei1DK0lV-',
    '/images/artists/bliss/005.jpg': '1CH8SG73GR3Vm7Aj_5h0JNneIQgBwE5Mc',
    '/images/artists/bliss/main.jpg': '1WX3kOpqwmQu7SA5GT5Vm2TROA0EoVnAl',

    // don
    '/images/artists/don/001.jpg': '16uBgIdx4vcyiwTsBjly4B-Qk7uKnpD_z',
    '/images/artists/don/002.jpg': '1q918Lqk45q0m-j-JftdHU-8hzZqWnH-8',
    '/images/artists/don/003.jpg': '1JI1tqo49fic_-CJyz7q_4JPAtHw8ax2g',
    '/images/artists/don/main.jpg': '1hwnc6c9_q2RbMv3Xg_RqLzVrEEmgiWO8',

    // erry
    '/images/artists/erry/001.jpg': '1IgrMk62Dp9UzPyuYAtxZOSGYatxzbdmX',
    '/images/artists/erry/002.jpg': '1YvAORpaVyDEXN3Q-3mB_oW4M0Kerp4F6',
    '/images/artists/erry/main.jpg': '1mzWUzDooEwCKzHupl5oaTla8SgyfloRZ',

    // eunwoo
    '/images/artists/eunwoo/main.jpg': '1lvz4mTmjiyRJuOlRJGzFEJ3UHA5ENjP1',

    // heejae
    '/images/artists/heejae/001.jpg': '1s4YtnMfiw4GgQcH7CUAsQAmrg6loi-EH',
    '/images/artists/heejae/002.jpg': '1wdVkvB7bkBOI8GoTyso2whHcl0D1T2v9',
    '/images/artists/heejae/003.jpg': '1EKBsTmYZBcrqD_J1hwEo_NvTn8V5zP6O',
    '/images/artists/heejae/004.jpg': '1lULVe4UJpLAkAQvV4pb4bGGT0cdbzymX',
    '/images/artists/heejae/005.jpg': '1l4V1e6ilnpWimAEco7aJLhDt9Taowadn',
    '/images/artists/heejae/main.jpeg': '1GNlBj3lFd6sQ_SDx649hpqJlFG0-kZBS',

    // kara
    '/images/artists/kara/001.jpg': '18Rxi9G6gzHFtV4AYl5toMVPAPeD4xReb',
    '/images/artists/kara/002.jpg': '1kYPIkX5UkzO_Wg48Mxi7Hj2BPq-a2x7k',
    '/images/artists/kara/003.jpg': '1DnTKLjbNHtECDKAW847wuUCwwIyUyc5O',
    '/images/artists/kara/004.jpg': '1lMFusOzly8qfR-TWwYvhrcZOn9QMpXlL',
    '/images/artists/kara/005.jpg': '1HoyprCT5WUickcbbU4-1FEaH5OvO2JAt',
    '/images/artists/kara/006.jpg': '15D62FtTAL7o-myMf1TgzXyJp7Y18YPeU',
    '/images/artists/kara/007.jpg': '1COJuL51BM8KVmUBXNZipQLx0ZCGyxPsO',
    '/images/artists/kara/main.jpg': '1e_sYGlM9qz-hb-YrhUynZ3A9wWzUeGc3',

    // kissy
    '/images/artists/kissy/001.JPG': '11vhQYMCYrt0DNNco8acy7MxlQhGBzAO-',
    '/images/artists/kissy/002.JPG': '1GCaYLMB6Rbd1baJU14N0jVEVTLI9iyuc',
    '/images/artists/kissy/003.JPG': '1l05rDtwt6e1Td7PVJ7Oa_AIbNgmSpgUJ',
    '/images/artists/kissy/main.JPG': '1CbneYEBXAa_YE8ZK-kUThmZwrWk8O2A_',

    // kyuria
    '/images/artists/kyuria/001.jpg': '1bWAbg6YScGvupxnK0TNM8ohn0EqAx4kE',
    '/images/artists/kyuria/002.jpg': '1NvrECcuKr10Gg2o3HOrUwNAhvzhtU25B',
    '/images/artists/kyuria/main.jpg': '1WouBYxIRMVWDv2VLE9y212ZVoY03Ptu8',

    // lant
    '/images/artists/lant/001.JPG': '1kuWFHnsk_yC_F5JneChv1NRaPO047-Ny',
    '/images/artists/lant/002.jpg': '1eD8gkLSMsx2XmefJQEFXtt0yYzR90V-p',
    '/images/artists/lant/003.jpg': '1RIHDyiB_YVr8dm8dBraiXgBfnDawrIiP',
    '/images/artists/lant/main.JPG': '1wmjYpH98m2CCtjNolMtxtC0VfJtwV8FK',

    // liha
    '/images/artists/liha/001.jpg': '1LV_ZzPvvNse40GNFRzC5ka9cHFeNwofd',
    '/images/artists/liha/002.jpg': '1SOfKJF4C3MhU-aE6mr95AO5K9YNFXHFl',
    '/images/artists/liha/003.jpg': '1vw_4V4nzPUX0sMZScNWgcvnbhKH8yuvr',
    '/images/artists/liha/004.jpg': '1xkLY22kNsOxnJexRn1W32N5Go4cUvkg6',
    '/images/artists/liha/005.jpg': '1oYcwamYLWPQ7UCLCIPfVw9N81QbiGlvz',
    '/images/artists/liha/006.jpg': '1M8Vbx0YqUhsaBwR5KzDNxFgwGqWaN5B3',
    '/images/artists/liha/007.jpg': '1qyt4i794ZHWAqxo1EPM8mQYdZqaJ7hfz',
    '/images/artists/liha/008.jpeg': '1fY1H8yJKZXnaCeWh1vt88ahTwiIeJROG',
    '/images/artists/liha/main.jpg': '1WskdY6GJd4DkHkO7Q77QFVCVwEwwJ_RB',

    // lua
    '/images/artists/lua/lua_01.jpg': '1crPIZCf-X-4iXgqmBXRBc3USuBfiOQWF',
    '/images/artists/lua/lua_002.jpg': '1TW7Fqb7o3qHrppSCESE5KQWSWW89t2Ma',
    '/images/artists/lua/lua_20251203_lua.jpg': '1oxdmdyvbVaOphwvWPWOoJmE2w_EKiwdY',

    // nicole
    '/images/artists/nicole/001.jpg': '1Mzth-5sjxuqzn2nYUdkwhsjzTzwXa_mI',
    '/images/artists/nicole/002.jpg': '1acgsR7EPktJwueiduMPOUXc3NKRL7WgM',
    '/images/artists/nicole/main.jpg': '1mMKlyTJu_cLyQNkCYsFEdBSNRILWIBpj',

    // riya
    '/images/artists/riya/001.jpg': '1-hA4rb1xZPxl_opqwHuFap9ubDJrzg98',
    '/images/artists/riya/002.jpg': '1nme1BMCWlidOpZFwCVAdrv3guS2pU_Vb',
    '/images/artists/riya/main.jpg': '1hHT4aUd0iI77OD6m-j6HSSQfpUpXV04A',

    // roha
    '/images/artists/roha/001.jpg': '1pROXil6BPA2QHesq220SnG-_BUpCG-9z',
    '/images/artists/roha/roha_20251203.jpg': '1JHEqEwyLOeRCB3kP9a3cSmQXPxcH3Ywr',

    // rumi
    '/images/artists/rumi/001.jpg': '1YFmuekaEatOi24i6Ea4jezpSDoSYhAx2',
    '/images/artists/rumi/main.jpg': '1yKaAvM6XhSBqZKpX6Cc3qx6vOOsryIWX',

    // sarah
    '/images/artists/sarah/001.jpg': '1dU1cBRuma4hzBQpjkzq-e3S3lKdEShgK',
    '/images/artists/sarah/main.jpg': '1zjPXEBmlT0Dl6u8eDHFCRJRDi7gmpFID',

    // siro
    '/images/artists/siro/001.jpg': '17jeJ7-_o4B_1n6X81TL_AWq6aLYSIS5-',
    '/images/artists/siro/main.jpg': '1qEtxnvSj8g6ybKcmfmdT6acBbALj_kxM',

    // soul
    '/images/artists/soul/001.jpg': '1zoTjZUuzLLbgnVvSHZqH9iWgLi269NT-',
    '/images/artists/soul/main.jpg': '1_J6h82Hy9L6mPhhZ1Q6Pis7UXS8PhD6B',

    // toxicb
    '/images/artists/toxicb/main.jpg': '1xx6erQ5Kj88SqI2F_QvU7cMHMjFcOWCT',

    // una
    '/images/artists/una/001.png': '1z0ikGA838thLVaYtBeRHnAzkTEDisUC4',
    '/images/artists/una/main.jpg': '1_3MXBnM_WT0R6jf3VwepJ5M8wnW_IlVG',

    // vinova
    '/images/artists/vinova/main.jpg': '1gHfkaII1V1vBauo5cZiOJq99Iw-o6H8n',

    // wenzi
    '/images/artists/wenzi/main.jpg': '1o3ief-2j-xeRIGH0bnkqWzwfacKty0Fy',

    // windy
    '/images/artists/windy/001.jpg': '1wqPgXWpEiaN9GiWz31xUyb5AdQBCpyvc',
    '/images/artists/windy/main.jpg': '1D6o2N8ayegb9FKtUhS612HLyJbzQ1JIN',

    // ===== EVENTS =====
    // 이벤트 이미지는 필요 시 추가하세요
};

/**
 * 로컬 이미지 경로를 Google Drive URL로 변환
 * @param localPath - 로컬 이미지 경로 (예: /images/artists/soul/main.jpg)
 * @returns Google Drive URL 또는 원본 경로
 */
export function getGoogleDriveUrl(localPath: string): string {
    // 이미 http URL인 경우 그대로 반환
    if (localPath.startsWith('http')) {
        return localPath;
    }

    // 매핑된 파일 ID가 있는지 확인
    const fileId = googleDriveImageMap[localPath];
    if (fileId) {
        return getGoogleDriveImageUrl(fileId);
    }

    // 매핑이 없으면 basePath prefix 추가 (GitHub Pages용)
    // 로컬 개발 환경에서는 Next.js가 자동으로 처리하지만,
    // static export에서는 수동으로 prefix 필요
    const basePath = process.env.NODE_ENV === 'production' ? '/webpage' : '';
    return `${basePath}${localPath}`;
}

/**
 * 이미지 경로 배열을 Google Drive URL 배열로 변환
 */
export function getGoogleDriveUrls(localPaths: string[]): string[] {
    return localPaths.map(getGoogleDriveUrl);
}
