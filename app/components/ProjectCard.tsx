import React from "react";

interface ProjectCardProps {
  category: string;
  content: string;
  onClick: () => void;
  gridMode: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ category, content, onClick, gridMode }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg shadow-md bg-white ${gridMode ? 'w-[300px]' : 'w-full'} cursor-pointer transition-all duration-200 hover:border hover:border-aroPurple`} // Added hover state here
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">{category}</span>
      </div>
      <p className="text-sm text-gray-700">{content}</p>
    </div>
  );
};

export default ProjectCard;
