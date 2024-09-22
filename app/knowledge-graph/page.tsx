"use client";
import React, { useEffect, useState } from 'react';
import RootLayout from '@/app/layout';
import Graph from 'react-graph-vis';

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  },
  physics: {
    stabilization: false
  },
  interaction: {
    hover: true
  }
};

const KnowledgeGraphPage = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
        try {
            const response = await fetch('/api/items');
            const data = await response.json();

            const fetchedNodes = data.items.map(item => ({
                id: item._id,
                label: item.description,
                group: item.tag,
            }));

            const fetchedEdges = data.edges.map(edge => ({
                from: edge.from,
                to: edge.to,
                label: edge.label,
            }));

            setNodes(fetchedNodes);
            setEdges(fetchedEdges);
        } catch (error) {
            console.error('Error fetching items and edges:', error);
        }
    };

    fetchItems();
  }, []);


  const events = {
    select: ({ nodes, edges }) => {
      console.log("Selected nodes:", nodes);
      console.log("Selected edges:", edges);

      if (nodes.length > 0) {
        const selectedNode = nodes[0]; 
        alert(`Selected node ID: ${selectedNode}`);
      }
    }
  };

  return (
    <RootLayout>
      <div className="h-screen overflow-y-scroll font-manrope" style={{ backgroundColor: '#F7F7F7' }}>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-slate-600">Knowledge Graph</h1>
          <div style={{ height: "calc(100vh - 120px)", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
            <Graph
              graph={{ nodes, edges }}
              options={options}
              events={events}
            />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default KnowledgeGraphPage;
