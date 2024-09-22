"use client";
import React, { useState } from 'react';
import Graph from 'react-graph-vis';

const options = {
  layout: {
    randomSeed: 42,
    improvedLayout: true,
  },
  nodes: {
    shape: 'dot',
    size: 16,
    font: {
      size: 14,
      color: '#FFFFFF',
    },
    borderWidth: 2,
    shadow: true,
  },
  edges: {
    width: 1,
    color: { color: '#000000', opacity: 0.6 },
    smooth: {
      type: 'continuous',
    },
  },
  physics: {
    forceAtlas2Based: {
      gravitationalConstant: -26,
      centralGravity: 0.005,
      springLength: 230,
      springConstant: 0.18,
    },
    maxVelocity: 146,
    solver: 'forceAtlas2Based',
    timestep: 0.35,
    stabilization: { iterations: 150 },
  },
  interaction: {
    hover: true,
    tooltipDelay: 300,
    zoomView: true,
  },
};

// Update edge colors to black
const sampleData = {
  nodes: [
    { id: 1, label: "Grocery List", group: "personal_note", color: { background: '#6B8E23', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Milk, eggs, bread, apples, chicken" },
    { id: 2, label: "Workout Routine", group: "daily_activity", color: { background: '#4682B4', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "30 min jog, 3 sets of squats, 3 sets of push-ups" },
    { id: 3, label: "Einstein Quote", group: "famous_quote", color: { background: '#B8860B', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Imagination is more important than knowledge." },
    { id: 4, label: "Coffee with Sarah", group: "daily_activity", color: { background: '#4682B4', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Met Sarah for coffee at Starbucks on Main St. Discussed summer vacation plans." },
    { id: 5, label: "Python List Comprehension", group: "learning_note", color: { background: '#20B2AA', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "new_list = [expression for item in iterable if condition]" },
    { id: 6, label: "Birthday Gift Idea", group: "personal_note", color: { background: '#6B8E23', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Mom mentioned liking that pottery set at the craft fair." },
    { id: 7, label: "Eiffel Tower Fact", group: "interesting_fact", color: { background: '#CD5C5C', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion." },
    { id: 8, label: "Friend's Advice", group: "friend_quote", color: { background: '#9932CC', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Alex said: 'Always negotiate your salary, you're worth more than you think.'" },
    { id: 9, label: "Movie to Watch", group: "personal_note", color: { background: '#6B8E23', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "'The Shawshank Redemption' - highly recommended by coworkers" },
    { id: 10, label: "Dentist Appointment", group: "daily_activity", color: { background: '#4682B4', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Dentist appointment on May 15th at 2 PM" },
    { id: 11, label: "Recipe Idea", group: "personal_note", color: { background: '#6B8E23', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Try adding rosemary to roasted potatoes for extra flavor" },
    { id: 12, label: "Shakespeare Quote", group: "famous_quote", color: { background: '#B8860B', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "All the world's a stage, and all the men and women merely players." },
    { id: 13, label: "Phone Battery Tip", group: "interesting_fact", color: { background: '#CD5C5C', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Keeping your phone battery between 20% and 80% can prolong its lifespan" },
    { id: 14, label: "Book Recommendation", group: "friend_quote", color: { background: '#9932CC', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Emma said: 'You must read \"Sapiens\" by Yuval Noah Harari, it's mind-blowing!'" },
    { id: 15, label: "Project Deadline", group: "daily_activity", color: { background: '#4682B4', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Submit final project report by Friday, 5 PM" },
    { id: 16, label: "Mindfulness Technique", group: "learning_note", color: { background: '#20B2AA', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "5-4-3-2-1 grounding technique: Acknowledge 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste" },
    { id: 17, label: "Travel Idea", group: "personal_note", color: { background: '#6B8E23', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Consider visiting Japan during cherry blossom season (late March to early April)" },
    { id: 18, label: "Coding Tip", group: "learning_note", color: { background: '#20B2AA', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Use meaningful variable names to make your code more readable and maintainable" },
    { id: 19, label: "Motivation Quote", group: "famous_quote", color: { background: '#B8860B', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Maya Angelou: 'I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.'" },
    { id: 20, label: "Gym Schedule", group: "daily_activity", color: { background: '#4682B4', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Gym closes early on Sundays at 8 PM" },
    { id: 21, label: "Random Fact", group: "interesting_fact", color: { background: '#CD5C5C', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "A group of flamingos is called a 'flamboyance'" },
    { id: 22, label: "Meeting Notes", group: "daily_activity", color: { background: '#4682B4', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Team meeting: Discussed Q3 goals, new product launch timeline, and budget allocation" },
    { id: 23, label: "Productivity Hack", group: "learning_note", color: { background: '#20B2AA', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Try the Pomodoro Technique: 25 minutes of focused work followed by a 5-minute break" },
    { id: 24, label: "Dad's Wisdom", group: "friend_quote", color: { background: '#9932CC', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Dad always says: 'The best time to plant a tree was 20 years ago. The second best time is now.'" },
    { id: 25, label: "Weekend Plan", group: "personal_note", color: { background: '#6B8E23', border: '#FFFFFF' }, font: { color: '#FFFFFF' }, content: "Saturday: Farmers market in the morning, evening movie with friends" }
  ],
  edges: [
    { from: 1, to: 11, label: "RELATED_TO", color: { color: '#000000', opacity: 0.6 } },
    { from: 2, to: 20, label: "PART_OF", color: { color: '#000000', opacity: 0.6 } },
    { from: 3, to: 19, label: "SIMILAR_TO", color: { color: '#000000', opacity: 0.6 } },
    { from: 4, to: 25, label: "INSPIRES", color: { color: '#000000', opacity: 0.6 } },
    { from: 5, to: 18, label: "RELATED_TO", color: { color: '#000000', opacity: 0.6 } },
    { from: 6, to: 10, label: "PRECEDES", color: { color: '#000000', opacity: 0.6 } },
    { from: 7, to: 21, label: "CATEGORY", color: { color: '#000000', opacity: 0.6 } },
    { from: 8, to: 15, label: "APPLIES_TO", color: { color: '#000000', opacity: 0.6 } },
    { from: 9, to: 25, label: "PART_OF", color: { color: '#000000', opacity: 0.6 } },
    { from: 12, to: 19, label: "CATEGORY", color: { color: '#000000', opacity: 0.6 } },
    { from: 13, to: 20, label: "UNRELATED", color: { color: '#000000', opacity: 0.6 } },
    { from: 14, to: 9, label: "SIMILAR_TO", color: { color: '#000000', opacity: 0.6 } },
    { from: 16, to: 23, label: "COMPLEMENTS", color: { color: '#000000', opacity: 0.6 } },
    { from: 17, to: 25, label: "CONTRASTS_WITH", color: { color: '#000000', opacity: 0.6 } },
    { from: 22, to: 15, label: "RELATED_TO", color: { color: '#000000', opacity: 0.6 } },
    { from: 24, to: 17, label: "INSPIRES", color: { color: '#000000', opacity: 0.6 } },
    { from: 1, to: 4, label: "PRECEDES", color: { color: '#000000', opacity: 0.6 } },
    { from: 3, to: 5, label: "APPLIES_TO", color: { color: '#000000', opacity: 0.6 } },
    { from: 10, to: 13, label: "UNRELATED", color: { color: '#000000', opacity: 0.6 } },
    { from: 23, to: 2, label: "APPLIES_TO", color: { color: '#000000', opacity: 0.6 } }
  ]
};

const KnowledgeGraphPage = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const events = {
    select: ({ nodes, edges }) => {
      if (nodes.length > 0) {
        const node = sampleData.nodes.find(n => n.id === nodes[0]);
        setSelectedNode(node);
      } else {
        setSelectedNode(null);
      }
    },
  };

  return (
    <div className="h-screen overflow-hidden font-manrope bg-white text-slate-500">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">Knowledge Graph</h1>
        <div className="flex h-[calc(100vh-120px)]">
          <div className="w-3/4 pr-4">
            <div className="h-full border border-gray-300 rounded-lg overflow-hidden">
              <Graph
                graph={sampleData}
                options={options}
                events={events}
              />
            </div>
          </div>
          <div className="w-1/4 bg-gray-100 p-4 rounded-lg overflow-y-auto">
            {selectedNode ? (
              <>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{selectedNode.label}</h2>
                <p className="text-sm text-gray-600 mb-2">Type: {selectedNode.group}</p>
                <p className="text-sm text-gray-700">{selectedNode.content}</p>
              </>
            ) : (
              <p className="text-gray-500">Select a node to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraphPage;