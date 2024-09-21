import React, { useState } from 'react';
import VoiceRecorder from "./VoiceRecorder";
const Cerebras = require('@cerebras/cerebras_cloud_sdk');

const client = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'],
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: string, content: string) => void;
  onDelete: () => void;
  initialCategory?: string;
  initialContent?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, onDelete, initialCategory = "Fact", initialContent = "" }) => {
  const [category, setCategory] = useState(initialCategory);
  const [content, setContent] = useState(initialContent);
  const [audioInput, setAudioInput] = useState<{
    data: string;
    type: "audio_input";
  } | null>(null);

  if (!isOpen) return null;

  async function getSummarizedDescription(description: string) {
    try {
        const response = await fetch('http://localhost:8000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
        });
        const data = await response.json();
        return data.summarizedDescription;
    } catch (error) {
        console.error('Error getting summary:', error);
        return null;
    }
}

  const handleSave = async () => {  
    if (audioInput) {
      setContent(await getSummarizedDescription(audioInput.data));
    }
    onSave(category, content);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96 relative">
        <button
            onClick={onClose}
            className="absolute top-2 right-5 text-gray-500 hover:text-gray-700 text-4xl"
          >
          &times;
        </button>

        {/* Content textarea */}
        <label className="block mb-2 text-black font-semibold">Your Thoughts</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border w-full text-black p-2 h-32 rounded-md"
        />

        {/* Voice input */}
        <VoiceRecorder onRecordingComplete={setAudioInput} />
    
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
          <button onClick={onDelete} className="mr-2 p-2 bg-red-500 rounded-md">Delete</button>  
          <button onClick={handleSave} className="p-2 bg-blue-500 text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
