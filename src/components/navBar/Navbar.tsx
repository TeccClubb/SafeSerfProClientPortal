'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from 'next/navigation';
import { HOME_PAGE_PATH, PLANS_PAGE_PATH } from '@/lib/pathname';
import { useSession } from 'next-auth/react';


const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
    const { data: session, status } = useSession();

  // const token = (session?.user as any)?.access_token;

  const navLinkClass = (href: string) =>
    `${pathname === href ? 'text-black font-semibold' : 'text-gray-600'} hover:text-black`;

  return (
    <nav className="w-full bg-white border-b border-gray-200 py-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between space-x-4 px-4">
        <div className="flex items-center">
      <img
            src="/logo.svg"
            alt="Logo"
            className="w-12"
          />

          <img
            src="/SafeSurf.svg"
            alt="Logo"
            className="w-24"
          />
        </div>

        {/* Mobile toggle button */}
        <button
          className="lg:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-6 text-sm">
          <Link href={HOME_PAGE_PATH} className={navLinkClass(HOME_PAGE_PATH)}>Overview</Link>
          <Link href="/subscription" className={navLinkClass("/subscription")}>Subscriptions</Link>
          <Link href={PLANS_PAGE_PATH} className={navLinkClass("/plans")}>Plans</Link>
          <Link href="/knowledge-base" className={navLinkClass("/knowledge-base")}>Knowledge Base</Link>
          <Link href="/referFriend" className={navLinkClass("/referFriend")}>Refer a friend</Link>
          <Link
            href="/support"
            className={`${pathname === '/support'
              ? 'bg-gray-300 text-black font-semibold'
              : 'bg-gray-100 text-gray-800'} hover:bg-gray-200 px-3 py-1 rounded-md font-medium`}
          >
            Support
          </Link>
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <Image
              src="/user-profile.png"
              alt="User Profile"
              width={24}
              height={24}
              className="object-cover"
            />
          </div>
          
         {/* Login / Logout */}
          {session ? (
            <button
              onClick={async () => {
                await signOut({ redirect: false });
                router.refresh();
              }}
              className="hover:text-black text-gray-600 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="hover:text-black text-gray-600 cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 ml-6 text-sm">
          <Link href={HOME_PAGE_PATH} className={navLinkClass("/")}>Overview</Link>
          <Link href="/subscription" className={navLinkClass("/subscription")}>Subscriptions</Link>
          <Link href={PLANS_PAGE_PATH} className={navLinkClass("/plans")}>Plans</Link>
          <Link href="/knowledge-base" className={navLinkClass("/knowledge-base")}>Knowledge Base</Link>
          <Link href="/referFriend" className={navLinkClass("/referFriend")}>Refer a friend</Link>
          <Link
            href="/support"
            className={`${pathname === '/support'
              ? 'bg-gray-300 text-black font-semibold'
              : 'bg-gray-100 text-gray-800'} hover:bg-gray-200 px-3 py-1 rounded-md font-medium w-fit`}
          >
            Support
          </Link>
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <Image
              src="/user-profile.png"
              alt="User Profile"
              width={24}
              height={24}
              className="object-cover"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
