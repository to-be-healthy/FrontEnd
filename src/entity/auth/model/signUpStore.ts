import { createWithEqualityFn } from 'zustand/traditional';

interface SignUpState {
  name: string;
  setName: (name: string) => void;
}

export const signUpStore = createWithEqualityFn<SignUpState>((set) => ({
  name: '',
  setName: (name: string) => set({ name }),
}));
