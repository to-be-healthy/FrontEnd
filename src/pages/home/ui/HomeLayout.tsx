interface Props {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: Props) => {
  return (
    <div
      className={
        // TODO) 모바일뷰 개발 편의성 임시 레이아웃 설정 - 추후 w-screen 제거
        'flex h-screen w-screen items-center justify-center bg-[#383838]'
      }>
      <div className='flex h-full w-[390px] flex-col bg-gray-100'>{children}</div>
    </div>
  );
};

export default HomeLayout;
