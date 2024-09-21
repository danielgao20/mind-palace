import React from 'react';
import Image from 'next/image';
import ProjectIcon from '/assets/logos/project.png';

interface ProjectProps {
    projectName: string;
    lastUpdate: string;
    gridMode: boolean;
}

export default function Project({
    projectName,
    lastUpdate,
    gridMode,
}: ProjectProps) {
    return (
        <div 
            className={`h-fit p-4 rounded-lg border border-aroGrey bg-aroWhite hover:bg-gray-200 transition duration-200 ${!gridMode ? "flex !w-full gap-3 py-2" : "block md:w-[calc(33.33%-12px)] min-h-60"}`}
            style={{ minWidth: gridMode ? '150px' : '250px' }}
        >
            <div className={`rounded ${gridMode ? 'bg-aroDarkGrey' : ''} flex items-center justify-center ${!gridMode ? "w-16 h-16" : "w-full h-36"}`}>
                <Image 
                    src={ProjectIcon.src}
                    width={45}
                    height={56}
                    alt={"Project Logo"}
                />
            </div>
            <div className={`text-base text-black ${!gridMode ? "flex-1" : "mt-4"}`}>
                <p className='font-bold'>{projectName}</p>
                <p>{lastUpdate}</p>
            </div>
        </div>
    );
}
