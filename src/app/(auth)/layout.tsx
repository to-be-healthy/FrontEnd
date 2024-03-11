'use client';

interface ComponentProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: ComponentProps) => {
  return <div>{children}</div>;
};

export default AuthLayout;
