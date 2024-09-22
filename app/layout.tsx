"use client";

import SideNav from './components/SideNav';
import "./globals.css";
import 'typeface-manrope';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-manrope">
        <div className="antialiased font-manrope flex h-screen bg-gray-100">
          <SideNav/>

          {/* Main content */}
          <div className="flex-1 overflow-y-scroll">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
