import testHandlers from './apiTest';
import userHandlers from './user';

export const handlers = [...testHandlers, ...userHandlers];
