interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
};

export default AuthLayout;
