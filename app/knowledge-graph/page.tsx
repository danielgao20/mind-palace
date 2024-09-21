"use client";
import React from 'react';
import RootLayout from '@/app/layout'; // Import your RootLayout component
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

const sampleData = {
  nodes: [
    { id: 1, label: "John Doe", group: "employee" },
    { id: 2, label: "Jane Smith", group: "employee" },
    { id: 3, label: "Mike Johnson", group: "employee" },
    { id: 4, label: "Sarah Williams", group: "employee" },
    { id: 5, label: "Engineering", group: "department" },
    { id: 6, label: "Product", group: "department" },
    { id: 7, label: "Design", group: "department" },
    { id: 8, label: "Website Redesign", group: "project" },
    { id: 9, label: "Mobile App Development", group: "project" }
  ],
  edges: [
    { from: 1, to: 5, label: "WORKS_IN" },
    { from: 2, to: 6, label: "WORKS_IN" },
    { from: 3, to: 7, label: "WORKS_IN" },
    { from: 4, to: 5, label: "WORKS_IN" },
    { from: 1, to: 8, label: "WORKS_ON" },
    { from: 2, to: 8, label: "MANAGES" },
    { from: 3, to: 8, label: "WORKS_ON" },
    { from: 1, to: 9, label: "WORKS_ON" },
    { from: 4, to: 9, label: "WORKS_ON" },
    { from: 2, to: 1, label: "MANAGES" },
    { from: 2, to: 3, label: "MANAGES" },
    { from: 2, to: 4, label: "MANAGES" }
  ]
};

const KnowledgeGraphPage = () => {
  const events = {
    select: ({ nodes, edges }) => {
      console.log("Selected nodes:", nodes);
      console.log("Selected edges:", edges);
      if (nodes.length > 0) {
        const node = sampleData.nodes.find(n => n.id === nodes[0]);
        alert(`Selected: ${node.label} (${node.group})`);
      }
    }
  };

  return (
    <RootLayout>
      <div className="h-screen overflow-y-scroll font-manrope" style={{ backgroundColor: '#F7F7F7' }}>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Knowledge Graph</h1>
          <div style={{ height: "calc(100vh - 120px)", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
            <Graph
              graph={sampleData}
              options={{
                ...options,
                nodes: {
                  color: {
                    background: (node) => {
                      switch(node.group) {
                        case 'employee': return '#41e0c9';
                        case 'department': return '#e09c41';
                        case 'project': return '#7be041';
                        default: return '#e04141';
                      }
                    }


// "use client";
// import React, { useEffect, useState } from 'react';
// import RootLayout from '@/app/layout';
// import Graph from 'react-graph-vis';

// const options = {
//   layout: {
//     hierarchical: false
//   },
//   edges: {
//     color: "#000000"
//   },
//   physics: {
//     stabilization: false
//   },
//   interaction: {
//     hover: true
//   }
// };

// const KnowledgeGraphPage = () => {
//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);

//   useEffect(() => {
//     // Fetch the items from the backend API
//     const fetchItems = async () => {
//       try {
//         const response = await fetch('/api/items');
//         const data = await response.json();

//         // Map the items to graph nodes
//         const fetchedNodes = data.map(item => ({
//           id: item._id,
//           label: item.description,
//           group: item.tags.length > 0 ? item.tags[0] : 'default',
//         }));

//         // Optionally: Define edges if there's a relationship between items
//         const fetchedEdges = []; // Add logic to create edges if needed

//         setNodes(fetchedNodes);
//         setEdges(fetchedEdges);
//       } catch (error) {
//         console.error('Error fetching items:', error);
//       }
//     };

//     fetchItems();
//   }, []);

//   const events = {
//     select: ({ nodes, edges }) => {
//       console.log("Selected nodes:", nodes);
//       console.log("Selected edges:", edges);
//       if (nodes.length > 0) {
//         const node = nodes.find(n => n.id === nodes[0]);
//         alert(`Selected: ${node.label} (${node.group})`);
//       }
//     }
//   };

//   return (
//     <RootLayout>
//       <div className="h-screen overflow-y-scroll font-manrope" style={{ backgroundColor: '#F7F7F7' }}>
//         <div className="p-6">
//           <h1 className="text-2xl font-bold mb-4">Knowledge Graph</h1>
//           <div style={{ height: "calc(100vh - 120px)", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
//             <Graph
//               graph={{ nodes, edges }}
//               options={options}
//               events={events}
//             />
//           </div>
//         </div>
//       </div>
//     </RootLayout>
//   );
// };

// export default KnowledgeGraphPage;
                  }
                }
              }}
              events={events}
            />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default KnowledgeGraphPage;