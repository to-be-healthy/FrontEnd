import Link from 'next/link';

export const TrainerNavigationBar = () => {
  return (
    <ul>
      <li>
        <Link href='/'>홈</Link>
      </li>
      <li>
        <Link href='/manage'>회원관리</Link>
      </li>
      <li>
        <Link href='/schedule'>스케쥴관리</Link>
      </li>
      <li>
        <Link href='/mypage'>내정보</Link>
      </li>
    </ul>
  );
};
