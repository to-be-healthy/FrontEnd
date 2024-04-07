import { create } from 'zustand';

interface SignUpState {
  name: string;
  setName: (name: string) => void;
}

export const signUpStore = create<SignUpState>((set) => ({
  name: '',
  setName: (name: string) => set({ name }),
}));
