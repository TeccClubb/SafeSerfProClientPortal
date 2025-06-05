'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/navBar/Navbar";
import Navbar_Below from "@/components/navBar/NavBar2";
import SessionWrapper from "@/components/SessionWrapper";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/components/ReduxProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password" || pathname === "/reset-password";

  return (
    <ReduxProvider>
      <SessionWrapper>
        {!isAuthPage && <Navbar />}
        {!isAuthPage && (
          <div className="p-4 lg:px-20 py-3 bg-slate-50 lg:text-sm text-gray-700 space-y-8">
            <Navbar_Below />
          </div>
        )}
        {children}
        <ToastContainer />
      </SessionWrapper>
    </ReduxProvider>
  );
}
