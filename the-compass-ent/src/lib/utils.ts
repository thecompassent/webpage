
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function getImagePath(src: string) {
  const isProd = process.env.NODE_ENV === "production";
  const basePath = isProd ? "/webpage" : "";

  // 이미 http(s)로 시작하거나 base64 데이터 URI인 경우 그대로 반환
  if (src.startsWith("http") || src.startsWith("data:")) {
    return src;
  }

  // 이미 basePath로 시작하는 경우 중복 방지 (혹시 모를 상황 대비)
  if (isProd && src.startsWith(basePath)) {
    return src;
  }

  // 슬래시로 시작하는 경우 basePath 붙이기
  if (src.startsWith("/")) {
    return `${basePath}${src}`;
  }

  return src;
}
