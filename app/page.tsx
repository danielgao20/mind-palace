"use client"
import React, { useState } from 'react';
import ProjectCard from '@/app/components/ProjectCard';
import GridIcon from '/assets/logos/grid-view.png';
import ListIcon from '/assets/logos/list-view.png';
import SearchIcon from '/assets/logos/search.png';
import Image from 'next/image';

const Dashboard: React.FC = () => {
  const [gridMode, setGridMode] = useState(true);
  return (
    <div className="h-screen overflow-y-scroll font-manrope" style={{ backgroundColor: '#F7F7F7' }}>
      <div className="flex justify-between items-center gap-4 h-28 py-6 px-10 border-b border-[#CBCBD5]">
        {/* search bar */}
        <div className='inline-block relative w-full h-full'>
          <input
            type="text"
            placeholder="Search in Aro"
            className="border-2 border-gray-300 pl-12 p-1.5 rounded w-full h-full bg-transparent focus:border-aroDarkGrey outline-none text-base font-medium text-black"
          />
          <Image
            src={SearchIcon.src}
            width={18}
            height={18}
            alt='Search Icon'
            className='absolute left-5 inline top-1/2 -translate-y-1/2'
          />
        </div>
        {/* cole profile */}
        <div className="flex items-center justify-center gap-2.5 bg-aroWhite rounded-md py-2.5 px-5 border-2 border-gray-200 hover:bg-gray-200"> 
          <div className='w-10 h-10 rounded-full bg-[#414172] flex items-center justify-center'>
            <p className='text-xl font-semibold text-center'>C</p>
          </div>
          <div>
            <p className='text-black font-semibold text-sm'>Cole Gawin</p>
            <p className='text-[#939393] font-medium text-xs'>colegawin@gmail.com</p>
          </div>
        </div>
      </div>

      <div className='mt-6 p-6'>
        <div className='flex justify-between items-center mb-5'>
          <h2 className="text-xl font-bold" style={{ color: 'black' }}>All Projects</h2>
          <div className='flex items-center'>
            <div className={`w-[30px] h-[30px] rounded flex items-center justify-center ${gridMode ? 'bg-aroLightGrey' : ''}`} onClick={() => {setGridMode(!gridMode)}}>
              <Image
                src={GridIcon.src}
                width={16}
                height={16}
                alt="Grid View Icon"
                className={`aspect-square w-[16px] h-[16px] ${gridMode ? "bg-aroLightGrey" : ""}`}
              />
            </div>
            <div className={`w-[30px] h-[30px] rounded flex items-center justify-center ${!gridMode ? 'bg-aroLightGrey' : ''}`} onClick={() => {setGridMode(!gridMode)}}>
              <Image
                src={ListIcon.src}
                width={16}
                height={16}
                alt="List View Icon"
                className='aspect-square w-[16px] h-[16px]'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-wrap gap-4'>
          <ProjectCard 
            projectName="Assignment 1"
            lastUpdate="1m ago"
            gridMode={gridMode}
          />
          <ProjectCard 
            projectName="Lab 3"
            lastUpdate="40m ago"
            gridMode={gridMode}
          />
          <ProjectCard 
            projectName="Workbook Ch. 3"
            lastUpdate="2 hrs ago"
            gridMode={gridMode}
          />
          <ProjectCard 
            projectName="Worksheet 2"
            lastUpdate="Apr 25, 2024"
            gridMode={gridMode}
          />
          <ProjectCard 
            projectName="Resume"
            lastUpdate="March 27, 2023"
            gridMode={gridMode}
          />
          <ProjectCard 
            projectName="Assignment 3"
            lastUpdate="Feb 20, 2023"
            gridMode={gridMode}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
