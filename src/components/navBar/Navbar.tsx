'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200  py-4">
      <div className="flex items-center justify-end md:px-30 space-x-4  mx-auto max-w-screen-xl">
        {/* Mobile toggle button only visible on small screens */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
          <Link href="/overview" className="hover:text-black">Overview</Link>
          <Link href="/subscriptions" className="hover:text-black">Subscriptions</Link>
          <Link href="/products" className="hover:text-black">Products</Link>
          <Link href="/knowledge-base" className="hover:text-black">Knowledge Base</Link>
          <Link href="/refer" className="hover:text-black">Refer a friend</Link>
          <Link
            href="/support"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md font-medium"
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
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 ml-6  text-sm text-gray-600">
          <Link href="/overview" className="hover:text-black">Overview</Link>
          <Link href="/subscriptions" className="hover:text-black">Subscriptions</Link>
          <Link href="/products" className="hover:text-black">Products</Link>
          <Link href="/knowledge-base" className="hover:text-black">Knowledge Base</Link>
          <Link href="/refer" className="hover:text-black">Refer a friend</Link>
          <Link
            href="/support"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md font-medium w-fit"
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
