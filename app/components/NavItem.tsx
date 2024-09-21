/* eslint-disable @next/next/no-img-element */
import React from "react";
import { StaticImageData } from 'next/image';

interface NavItemProps {
  label: string;
  iconSrc: StaticImageData;
  isSelected: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, iconSrc, isSelected, onClick }) => (
  <li
    className={`flex h-10 items-center px-10 py-2 rounded cursor-pointer ${
      isSelected ? 'bg-[#C1C1D08C]' : 'hover:bg-[#C1C1D08C]'
    }`}
    onClick={onClick}
    style={{ height: '40px', minWidth: '200px' }}
  >
    <div className="mr-3">
      <img 
        src={iconSrc.src} 
        alt={label} 
        height={20} 
        className={`h-5`} 
        style={{ filter: isSelected ? 'invert(21%) sepia(37%) saturate(100%) hue-rotate(239deg) brightness(88%) contrast(106%)' : 'invert(34%) sepia(6%) saturate(0%) hue-rotate(176deg) brightness(95%) contrast(92%)' }}
      />
    </div>
    <span className={`${isSelected ? 'text-[#34347B]' : 'text-[#505064]'} font-semibold text-sm`}>
      {label}
    </span>
  </li>
);

export default NavItem;
