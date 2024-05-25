import { devtools, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

import { withSelector } from '@/shared/utils';

import { UserInfo } from './types';

type AuthState = Partial<UserInfo>;

interface AuthAction {
  setUserInfo: (userinfo: AuthState) => void;
  deleteUserInfo: () => void;
}

const AUTH_STATE_NAME = 'auth-storage';

const DEFAULT_AUTH_STATE: AuthState = {
  userId: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  gymId: undefined,
  memberType: null,
};

const authStore = () => DEFAULT_AUTH_STATE;

const useAuthStore = createWithEqualityFn(
  persist(
    devtools<AuthState>(authStore, [
      'userId',
      'memberType',
      'refreshToken',
      'accessToken',
      'gymId',
    ]),
    { name: AUTH_STATE_NAME }
  )
);

const useAuthAction = (): AuthAction => ({
  setUserInfo: (userInfo) => {
    useAuthStore.setState(() => ({ ...userInfo }));
  },
  deleteUserInfo: () => {
    useAuthStore.setState(authStore);
  },
});

const useAuthSelector = withSelector(useAuthStore);

const auth = () => {
  const store = localStorage.getItem(AUTH_STATE_NAME);
  if (!store) {
    return { tokens: null, memberType: null, userId: null };
  }
  const { state } = JSON.parse(store) as {
    state: UserInfo;
  };
  const { accessToken, refreshToken, memberType, gymId, userId } = state;
  const tokens = { accessToken, refreshToken };
  return { tokens, memberType, gymId, userId };
};

export { auth, useAuthAction, useAuthSelector };
