import React, { useState } from "react";
import Image from 'next/image';
import NavItem from './NavItem'; // Adjust the path as necessary
import Logo from '/assets/logos/mp-logo.png';
import { useRouter } from 'next/navigation'; // Import useRouter

import AllProjectIcon from '/assets/logos/home-icon.svg';
import YourProject from '/assets/logos/your-projects-icon.svg';
import SharedWithYou from '/assets/logos/shared-icon.svg';
import Archived from '/assets/logos/archived-icon.svg';
import Trash from '/assets/logos/trash-icon.svg';

const navItems = [
  { label: 'Home', iconSrc: AllProjectIcon, route: '/' },
  { label: 'Your Projects', iconSrc: YourProject, route: '/your-projects' },
  { label: 'Shared with you', iconSrc: SharedWithYou, route: '/shared-with-you' },
  { label: 'Archived', iconSrc: Archived, route: '/archived' },
  { label: 'Trash', iconSrc: Trash, route: '/trash' }
];

const SideNav: React.FC = ({}) => {
  const [selectedItem, setSelectedItem] = useState<string>('Home');
  const router = useRouter();

  const handleNavigation = (route: string) => {
    setSelectedItem(route);
    router.push(route);
  };

  const handleGitHubLink = () => {
    window.open('https://github.com/danielgao20/mind-palace', '_blank');
  };

  return (
    <div className="w-70 bg-[#EDEDED] p-4 shadow-lg flex flex-col justify-between border-r border-gray-300 h-full">
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
              onClick={() => handleNavigation(item.route)}
            />
          ))}
        </ul>
      </div>

      {/* GitHub button */}
      <button 
        className="bg-aroPurple text-white w-full py-2 h-10 text-base rounded-lg mb-5 font-bold"
        onClick={handleGitHubLink} // Open GitHub link in a new tab
      >
        GitHub
      </button>
    </div>
  );
};

export default SideNav;
