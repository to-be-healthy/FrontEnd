import { buildDisplayImageUrl, normalizeDisplayFileUrl } from './file-url';

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function nextImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const normalizedSrc = normalizeDisplayFileUrl(src);

  if (
    !normalizedSrc ||
    normalizedSrc.startsWith('data:') ||
    normalizedSrc.startsWith('blob:') ||
    normalizedSrc.startsWith('/')
  ) {
    return normalizedSrc;
  }

  return buildDisplayImageUrl(normalizedSrc, {
    w: width,
    q: quality ?? 90,
  });
}
