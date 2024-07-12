export const generateUUID = (): string => {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  } else {
    // UUID v4를 Math.random을 사용하여 생성
    const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return template.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
};
