interface Props {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: Props) => {
  return (
    <div
      className={
        // TODO) 모바일뷰 개발 편의성 임시 레이아웃 설정
        'w-dvh flex h-dvh items-center justify-center bg-[#383838]'
      }>
      <div className='flex h-full w-[390px] flex-col bg-white'>{children}</div>
    </div>
  );
};

export default HomeLayout;