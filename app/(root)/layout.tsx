import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
// import Menu from "@/components/shared/header/menu";
// import MainNav from "./main-nav";

import Header from "@/components/header";
import MobileNav from "@/components/mobile-nav";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Enhanced Header */}
        <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo and Brand Section */}
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  <div className="relative">
                    <Image
                      src="/logo.png"
                      height={56}
                      width={56}
                      alt={APP_NAME}
                      className="rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                      {APP_NAME}
                    </h1>
                    <p className="text-sm text-blue-600 font-medium">
                      إدارة الموظفين
                    </p>
                  </div>
                </Link>
              </div>

              {/* Navigation Links */}
              {/* <nav className="hidden md:flex items-center space-x-8">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  الرئيسية
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
                <Link 
                  href="/employees" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  الموظفين
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
                <Link 
                  href="/employees/create" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
                >
                  إضافة موظف
                </Link>
              </nav> */}

              {/* Header Component for Auth + Mobile Nav */}
              <div className="flex items-center space-x-3">
                <MobileNav />
                <Header />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="container mx-auto px-4">
            <div className="text-center text-gray-600 text-sm">
              © 2025 {APP_NAME}. جميع الحقوق محفوظة.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}