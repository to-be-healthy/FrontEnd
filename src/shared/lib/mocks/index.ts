/* eslint-disable @typescript-eslint/no-floating-promises */
async function initMocks() {
  if (typeof window === 'undefined') {
    const { worker } = await import('./brower');
    worker.start();
  }
}

initMocks();

export {};
