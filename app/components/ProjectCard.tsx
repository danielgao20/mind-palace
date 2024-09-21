import React from "react";

interface ProjectCardProps {
  projectName: string;
  category: string;
  content: string;
  onClick: () => void;
  gridMode: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projectName, category, content, onClick, gridMode }) => {
  const truncatedContent = content.length > 100 ? content.slice(0, 100) + '...' : content;

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg shadow-md bg-white ${gridMode ? 'w-[300px]' : 'w-full'} cursor-pointer`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{projectName}</h3>
        <span className="text-sm text-gray-500">{category}</span>
      </div>
      <p className="text-sm text-gray-700">{truncatedContent}</p>
    </div>
  );
};

export default ProjectCard;
