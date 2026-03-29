const DEFAULT_PUBLIC_WEB_URI =
  process.env.NEXT_PUBLIC_WEB_URI ?? 'https://geonganghaejim.site';

const FILES_PATH_PREFIX = '/files/';

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const publicWebUri = trimTrailingSlash(DEFAULT_PUBLIC_WEB_URI);

const isPassthroughUrl = (value: string) =>
  value.startsWith('data:') || value.startsWith('blob:');

const extractFilePath = (value: string) => {
  const filePathIndex = value.indexOf(FILES_PATH_PREFIX);

  if (filePathIndex === -1) {
    return null;
  }

  return value.slice(filePathIndex + FILES_PATH_PREFIX.length);
};

const normalizeDisplayFileUrl = (value?: string | null) => {
  if (!value) {
    return '';
  }

  const trimmedValue = value.trim();

  if (!trimmedValue || isPassthroughUrl(trimmedValue)) {
    return trimmedValue;
  }

  if (trimmedValue.startsWith('/')) {
    return trimmedValue.startsWith(FILES_PATH_PREFIX)
      ? `${publicWebUri}${trimmedValue}`
      : trimmedValue;
  }

  const filePath = extractFilePath(trimmedValue);

  if (!filePath) {
    return trimmedValue;
  }

  return `${publicWebUri}${FILES_PATH_PREFIX}${filePath}`;
};

const buildDisplayImageUrl = (
  value?: string | null,
  params?: Record<string, string | number | undefined>
) => {
  const normalizedUrl = normalizeDisplayFileUrl(value);

  if (
    !normalizedUrl ||
    isPassthroughUrl(normalizedUrl) ||
    normalizedUrl.startsWith('/')
  ) {
    return normalizedUrl;
  }

  const url = new URL(normalizedUrl);

  Object.entries(params ?? {}).forEach(([key, paramValue]) => {
    if (paramValue === undefined) {
      return;
    }

    url.searchParams.set(key, String(paramValue));
  });

  return url.toString();
};

export { buildDisplayImageUrl, normalizeDisplayFileUrl };
