import Link from 'next/link';

export const MemberNavigationBar = () => {
  return (
    <ul>
      <li>
        <Link href='/'>홈</Link>
      </li>
      <li>
        <Link href='/diet'>식단기록</Link>
      </li>
      <li>
        <Link href='/exercise'>운동기록</Link>
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
