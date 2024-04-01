import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { withSelector } from '@/shared/utils';

import { UserInfo } from './types';

type AuthState = UserInfo;

interface AuthAction {
  setUserInfo: (userinfo: UserInfo) => void;
  deleteUserInfo: () => void;
}

const AUTH_STATE_NAME = 'auth-storage';

const DEFAULT_AUTH_STATE = {
  userId: null,
  memberType: null,
  refreshToken: null,
  accessToken: null,
  gymId: null,
};

const authStore = () => DEFAULT_AUTH_STATE;

const useAuthStore = create(
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
  setUserInfo: (userInfo: UserInfo) => {
    useAuthStore.setState(() => ({ ...userInfo }));
  },
  deleteUserInfo: () => {
    useAuthStore.setState(authStore);
  },
});

const useAuthSelector = withSelector(useAuthStore);

const auth = () => {
  const store = localStorage.getItem(AUTH_STATE_NAME);
  if (!store) return { tokens: null, memberType: null };

  const { state } = JSON.parse(store) as {
    state: UserInfo;
  };
  const { accessToken, refreshToken, memberType, gymId } = state;
  const tokens = { accessToken, refreshToken };
  return { tokens, memberType, gymId };
};

export { auth, useAuthAction, useAuthSelector };
