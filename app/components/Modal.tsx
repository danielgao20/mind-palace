import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: string, content: string) => void;
  initialCategory?: string;
  initialContent?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, initialCategory = "Fact", initialContent = "" }) => {
  const [category, setCategory] = useState(initialCategory);
  const [content, setContent] = useState(initialContent);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">

        {/* Content textarea */}
        <label className="block mb-2 text-black font-semibold">Your Thoughts</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border w-full text-black p-2 h-32 rounded-md"
        />

        {/* Category input */}
        <label className="block mb-2 text-black font-semibold">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border w-full text-black p-2 mb-4 rounded-md"
        >
          <option value="Fact">Fact</option>
          <option value="Quote">Quote</option>
          <option value="Date">Date</option>
        </select>

        <div className="flex justify-end mt-4">
          {/* TODO: Add delete functionality and exit button */}
          <button onClick={onClose} className="mr-2 p-2 bg-red-500 rounded-md">Delete</button>  
          <button onClick={() => onSave(category, content)} className="p-2 bg-blue-500 text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
