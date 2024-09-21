"use client";

import React, { useState } from "react";
import Image from 'next/image';
import "./globals.css";
import NavItem from './components/NavItem';
import Logo from '/assets/logos/aro-logo.png';

import 'typeface-manrope';

import AllProjectIcon from '/assets/logos/home-icon.svg';
import YourProject from '/assets/logos/your-projects-icon.svg';
import SharedWithYou from '/assets/logos/shared-icon.svg';
import Archived from '/assets/logos/archived-icon.svg';
import Trash from '/assets/logos/trash-icon.svg';

const navItems = [
  { label: 'Home', iconSrc: AllProjectIcon },
  { label: 'Your Projects', iconSrc: YourProject },
  { label: 'Shared with you', iconSrc: SharedWithYou },
  { label: 'Archived', iconSrc: Archived },
  { label: 'Trash', iconSrc: Trash }
];

export default function RootLayout({
  children,
  onNewProject
}: {
  children: React.ReactNode;
  onNewProject: () => void;
}) {
  const [selectedItem, setSelectedItem] = useState<string>('All projects');

  return (
    <html lang="en">
      <body className="antialiased font-manrope">
        <div className="flex h-screen bg-gray-100">
          <div className="w-70 bg-[#EDEDED] p-4 shadow-lg flex flex-col justify-between border-r border-gray-300">
            <div>
              {/* aro logo */}
              <div className="flex justify-center mb-8 mt-8">
                <Image src={Logo} alt="ARO Logo" width={126} height={42} />
              </div>

              {/* navigation items */}
              <ul className="space-y-2">
                {navItems.map(item => (
                  <NavItem
                    key={item.label}
                    label={item.label}
                    iconSrc={item.iconSrc}
                    isSelected={selectedItem === item.label}
                    onClick={() => setSelectedItem(item.label)}
                  />
                ))}
              </ul>
            </div>

            {/* new */}
            <button 
              className="bg-aroPurple text-white w-full py-2 h-10 text-base rounded-lg mb-5 font-bold"
              onClick={onNewProject}
            >
              + New
            </button>
          </div>

          {/* page.tsx */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
