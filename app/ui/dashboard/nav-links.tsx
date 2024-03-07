'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

// a 태그 -> 브라우저에 로딩 표시가 뜸
// Link 태그 -> 브라우저에 로딩 표시가 안뜸...!

/*
이제 전체 새로고침을 보지 않고도 페이지 사이를 탐색할 수 있습니다. 애플리케이션의 일부가 서버에서 렌더링되지만 전체 페이지 새로 고침이 없으므로 웹 앱처럼 느껴집니다. 왜 그런 겁니까?

네비게이션 경험을 향상시키기 위해 Next.js는 route 세그먼트별로 애플리케이션을 자동으로 코드 분할합니다. 기존 React SPA 와는 다릅니다., 브라우저는 초기 로드 시 모든 애플리케이션 코드를 로드합니다.
route 별로 코드를 분할한다는 것은 페이지가 격리된다는 의미입니다. 특정 페이지에서 오류가 발생하더라도 애플리케이션의 나머지 부분은 계속 작동합니다.
또한 프로덕션 환경에서 <Link>구성 요소가 브라우저의 뷰포트에 나타날 때마다 Next.js는 백그라운드에서 연결된 경로에 대한 코드를 자동으로 미리 가져옵니다.
사용자가 링크를 클릭하면 대상 페이지의 코드가 이미 백그라운드에 로드되어 페이지 전환이 거의 즉각적으로 이루어집니다!
네비게이션 작동 방식 에 대해 자세히 알아보세요 .
*/
