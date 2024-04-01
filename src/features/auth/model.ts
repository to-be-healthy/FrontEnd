interface LoginForm {
  userId: string;
  password: string;
  trainer: string;
}

interface signUpForm {
  userId: string;
  name: string;
  password: string;
  passwordConfirm: string;
  email: string;
  emailVerifiedCode: string;
  signUp: string;
}

export type { LoginForm, signUpForm };
