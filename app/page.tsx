"use client";

import React, { useState } from 'react';
import ProjectCard from '@/app/components/ProjectCard';
import Modal from '@/app/components/Modal';
import GridIcon from '/assets/logos/grid-view.png';
import ListIcon from '/assets/logos/list-view.png';
import SearchIcon from '/assets/logos/search.png';
import Image from 'next/image';
import RootLayout from './layout'; // Import the RootLayout component

const Dashboard: React.FC = () => {
  const [gridMode, setGridMode] = useState(true);
  const [projects, setProjects] = useState<{ projectName: string, category: string, content: string }[]>([
    { projectName: "Assignment 1", category: "Fact", content: "Some fact about assignment 1." },
    { projectName: "Lab 3", category: "Quote", content: "Inspirational quote from Lab 3." },
    { projectName: "Workbook Ch. 3", category: "Date", content: "Important date related to Workbook Ch. 3." },
    { projectName: "Worksheet 2", category: "Fact", content: "Fact from worksheet 2." },
    { projectName: "Resume", category: "Fact", content: "My latest resume fact." },
    { projectName: "Assignment 3", category: "Quote", content: "A quote from assignment 3." }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  // Function to open modal for a new project card
  const handleNewProject = () => {
    setSelectedProjectIndex(null);
    setIsModalOpen(true);
  };

  // Function to save or update project card content
  const handleSave = (category: string, content: string) => {
    if (selectedProjectIndex === null) {
      const newProject = { projectName: "Untitled", category, content };
      setProjects([...projects, newProject]);
    } else {
      const updatedProjects = [...projects];
      updatedProjects[selectedProjectIndex] = { ...updatedProjects[selectedProjectIndex], category, content };
      setProjects(updatedProjects);
    }
    setIsModalOpen(false);
  };

  // Function to open modal for editing an existing project card
  const handleClickProject = (index: number) => {
    setSelectedProjectIndex(index);
    setIsModalOpen(true);
  };

  return (
    <RootLayout onNewProject={handleNewProject}> {/* Pass the handleNewProject function as a prop */}
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
          {/* profile */}
          <div className="flex items-center justify-center gap-2.5 bg-aroWhite rounded-md py-2.5 px-5 border-2 border-gray-200 hover:bg-gray-200"> 
            <div className='w-10 h-10 rounded-full bg-[#414172] flex items-center justify-center'>
              <p className='text-xl font-semibold text-center'>C</p>
            </div>
            <div>
              <p className='text-black font-semibold text-sm'>Sarah Fan</p>
              <p className='text-[#939393] font-medium text-xs'>colegawin@gmail.com</p>
            </div>
          </div>
        </div>

        <div className='mt-6 p-6'>
          <div className='flex justify-between items-center mb-5'>
            <h2 className="text-xl font-bold" style={{ color: 'black' }}>All Thoughts</h2>
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
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                projectName={project.projectName}
                category={project.category}
                content={project.content}
                gridMode={gridMode}
                onClick={() => handleClickProject(index)}
              />
            ))}
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </div>
    </RootLayout>
  );
};

export default Dashboard;
