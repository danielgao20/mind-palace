"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import from 'next/navigation'
import ProjectCard from '@/app/components/ProjectCard';
import Modal from '@/app/components/Modal';
import GridIcon from '/assets/logos/grid-view.png';
import ListIcon from '/assets/logos/list-view.png';
import SearchIcon from '/assets/logos/search.png';
import Image from 'next/image';

const Dashboard: React.FC = () => {
  const router = useRouter(); // Correct router hook
  const [gridMode, setGridMode] = useState(true);
  const [projects, setProjects] = useState<{ _id: string, category: string, content: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
    console.log(projects);
  }, []);

  // Function to open modal for a new project card
  const handleNewProject = () => {
    setSelectedProjectIndex(null);
    setIsModalOpen(true);
  };

  const handleGraph = () => {
    router.push('/knowledge-graph'); // Navigate to the knowledge graph page
  };

  // Function to save or update project card content
  const handleSave = async (category: string, content: string) => {
    try {
      const payload = {
        description: content,
        tag: category,
      };

      const response = await fetch('http://localhost:8000/add/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save item');
      }

      const savedItem = await response.json();
      console.log('Item saved successfully:', savedItem);

      if (selectedProjectIndex === null) {
        setProjects([...projects, savedItem]);
      } else {
        const updatedProjects = [...projects];
        updatedProjects[selectedProjectIndex] = savedItem;
        setProjects(updatedProjects);
      }

      setIsModalOpen(false);
      console.log('Item saved successfully:', savedItem);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  // Function to open modal for editing an existing project card
  const handleClickProject = (index: number) => {
    setSelectedProjectIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="h-screen overflow-y-scroll font-manrope" style={{ backgroundColor: '#F7F7F7' }}>
      <div className="flex justify-between items-center gap-4 h-28 py-6 px-10 border-b border-[#CBCBD5]">
        {/* search bar */}
        <div className='inline-block relative w-full h-full'>
          <input
            type="text"
            placeholder="Search in Mind Palace"
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
            <p className='text-xl font-semibold text-center'>S</p>
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
      <button onClick={handleGraph}>Go to Knowledge Graph</button> {/* Button to navigate */}
    </div>
  );
};

export default Dashboard;
