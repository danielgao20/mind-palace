"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectCard from '@/app/components/ProjectCard';
import Modal from '@/app/components/Modal';
import GridIcon from '/assets/logos/grid-view.png';
import ListIcon from '/assets/logos/list-view.png';
import SearchIcon from '/assets/logos/search.png';
import Image from 'next/image';

const Dashboard: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter(); // Correct router hook
  const [gridMode, setGridMode] = useState(true);
  const [projects, setProjects] = useState<{ _id: string, category: string, content: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedProjects = data.map((item: any) => ({
          _id: item._id,
          category: item.tag , 
          content: item.description,
        }));
        setProjects(formattedProjects);
        console.log(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  // Function to open modal for a new project card
  const handleNewProject = () => {
    setSelectedProjectIndex(null); // No project selected, creating a new one
    setIsModalOpen(true); // Open the modal
  };

//   const handleGraph = () => {
//     router.push('/knowledge-graph'); // Navigate to the knowledge graph page
//   };

  // Function to save or update project card content
  const handleSave = async (category: string, content: string) => {
    try {
      const payload = {
        description: content,
        tag: category,
      };
  
      // Make the backend API call
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
  
      // Get the saved item from the server response
      const savedItem = await response.json();
      console.log('Item saved successfully:', savedItem);
  
      // Update the local projects array
      if (selectedProjectIndex === null) {
        // If no project was selected, add a new project with the saved item
        const newProject = { projectName: "Untitled", ...savedItem };
        setProjects([...projects, newProject]);
      } else {
        // If a project was selected, update the existing project
        const updatedProjects = [...projects];
        updatedProjects[selectedProjectIndex] = {
          ...updatedProjects[selectedProjectIndex],
          ...savedItem,
        };
        setProjects(updatedProjects);
      }
  
      // Close the modal after saving
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };  

  // Function to delete item
  const handleDelete = async () => {
    if (selectedProjectIndex !== null) {
      const itemId = projects[selectedProjectIndex]._id;
      try {
        const response = await fetch(`http://localhost:8000/delete/item/${itemId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete item');
        }

        setProjects(projects.filter((_, index) => index !== selectedProjectIndex));
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  // Function to vector search thoughts
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to search items');
      }
    
      const searchResults = await response.json();
      console.log(searchResults);
      setProjects(searchResults);
    } catch (error) {
        console.error('Error searching items:', error);
      } finally {
        setLoading(false);
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
        <div className='inline-block relative w-full h-full flex items-center'>
          <input
            type="text"
            placeholder="Search in Mind Palace"
            className="border-2 border-gray-300 pl-12 py-2 rounded w-full bg-transparent focus:border-aroDarkGrey outline-none text-base font-medium text-black mr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <button
            onClick={handleSearch}
            className="bg-aroPurple text-white p-2 rounded"
            disabled={loading} 
          >
            Search
          </button>
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
            <p className='text-xl font-semibold text-center'>H</p>
          </div>
          <div>
            <p className='text-black font-semibold text-sm'>Helena Zhou</p>
            <p className='text-[#939393] font-medium text-xs'>helenazhou@gmail.com</p>
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
        {loading ? (
          <div className="flex justify-center items-center">
            <svg className="w-16 h-16 animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0"/><path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6"/><path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6"/><circle cx="12" cy="12" r="10"/></svg>
          </div>
        ) : (
          <div className='flex flex-wrap gap-4'>
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id || index}
                category={project.category}
                content={project.content}
                gridMode={gridMode}
                onClick={() => handleClickProject(index)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      {/* <button onClick={handleGraph}>Go to Knowledge Graph</button> */}

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          className="bg-aroPurple text-white w-32 py-3 text-base rounded-full font-bold shadow-lg"
          onClick={handleNewProject}
        >
          + New
        </button>
      </div>
    </div>
  );
};

export default Dashboard;