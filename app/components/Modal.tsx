import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, category: string, content: string) => void; // Add title to onSave
  initialTitle?: string;
  initialCategory?: string;
  initialContent?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, initialTitle = "Untitled", initialCategory = "Fact", initialContent = "" }) => {
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(initialCategory);
  const [content, setContent] = useState(initialContent);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Add or Edit Thought</h2>

        {/* Title input */}
        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 mb-4 rounded-md"
        />

        {/* Category input */}
        <label className="block mb-2 font-semibold">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border w-full p-2 mb-4 rounded-md"
        >
          <option value="Fact">Fact</option>
          <option value="Quote">Quote</option>
          <option value="Date">Date</option>
        </select>

        {/* Content textarea */}
        <label className="block mb-2 font-semibold">Your Thoughts</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border w-full p-2 h-32 rounded-md"
        />

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 p-2 bg-gray-300 rounded-md">Cancel</button>
          <button onClick={() => onSave(title, category, content)} className="p-2 bg-blue-500 text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
