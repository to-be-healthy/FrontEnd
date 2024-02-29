import testHandlers from './test';
import userHandlers from './user';

export const handlers = [...testHandlers, ...userHandlers];
