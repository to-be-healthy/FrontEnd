interface Props {
  children: React.ReactNode;
}

export const RollingBanner = ({ children }: Props) => {
  return (
    <div className='relative w-full overflow-hidden'>
      <div className='absolute flex w-fit animate-rolling flex-nowrap'>{children}</div>
      <div className='flex h-full w-fit animate-rolling_clone flex-nowrap'>
        {children}
      </div>
    </div>
  );
};
