import React, { useState, useEffect } from "react";
import Image from 'next/image';
import NavItem from './NavItem'; // Adjust the path as necessary
import Logo from '/assets/logos/mp-logo.png';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname
import AllProjectIcon from '/assets/logos/home-icon.svg';
import KnowledgeGraph from "/assets/logos/knowledge-graph.svg";
import Learn from '/assets/logos/learn.svg'
import Archived from '/assets/logos/archived-icon.svg';
import Trash from '/assets/logos/trash-icon.svg';

const navItems = [
  { label: 'Home', iconSrc: AllProjectIcon, route: '/' },
  { label: 'Visualize', iconSrc: KnowledgeGraph, route: '/knowledge-graph' },
  { label: 'Learn', iconSrc: Learn, route: '/learn' },
  { label: 'Archived', iconSrc: Archived, route: '/archived' },
  { label: 'Trash', iconSrc: Trash, route: '/trash' }
];

const SideNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<string>('Home');

  useEffect(() => {
    const currentItem = navItems.find(item => item.route === pathname);
    if (currentItem) {
      setSelectedItem(currentItem.label);
    }
  }, [pathname]);

  const handleNavigation = (route: string, label: string) => {
    setSelectedItem(label);
    if (route === '/' || route === '/knowledge-graph') {
      router.push(route);
    } else {
      // For incomplete pages, show an alert instead of navigating
      alert("Coming soon!");
    }
  };

  const handleGitHubLink = () => {
    window.open('https://github.com/danielgao20/mind-palace', '_blank');
  };

  return (
    <div className="w-70 bg-[#EDEDED] p-4 shadow-lg flex flex-col justify-between border-r border-gray-300 h-full">
      <div>
        {/* ARO logo */}
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
              onClick={() => handleNavigation(item.route, item.label)}
            />
          ))}
        </ul>
      </div>
      {/* GitHub button */}
      <button 
        className="bg-aroPurple text-white w-full py-2 h-10 text-sm rounded-lg mb-5 font-bold"
        onClick={handleGitHubLink}
      >
        Learn More
      </button>
    </div>
  );
};

export default SideNav;
