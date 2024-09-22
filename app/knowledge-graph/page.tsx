"use client";
import React from 'react';
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

// Assign color directly to nodes
const sampleData = {
  nodes: [
    { id: 1, label: "John Doe", group: "employee", color: { background: '#41e0c9' } },
    { id: 2, label: "Jane Smith", group: "employee", color: { background: '#41e0c9' } },
    { id: 3, label: "Mike Johnson", group: "employee", color: { background: '#41e0c9' } },
    { id: 4, label: "Sarah Williams", group: "employee", color: { background: '#41e0c9' } },
    { id: 5, label: "Engineering", group: "department", color: { background: '#e09c41' } },
    { id: 6, label: "Product", group: "department", color: { background: '#e09c41' } },
    { id: 7, label: "Design", group: "department", color: { background: '#e09c41' } },
    { id: 8, label: "Website Redesign", group: "project", color: { background: '#7be041' } },
    { id: 9, label: "Mobile App Development", group: "project", color: { background: '#7be041' } }
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
    <div className="h-screen overflow-y-scroll font-manrope" style={{ backgroundColor: '#F7F7F7' }}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-aroPurple">Knowledge Graph</h1>
        <div style={{ height: "calc(100vh - 120px)", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
          <Graph
            graph={sampleData}
            options={options}
            events={events}
          />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraphPage;


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
//     const fetchItems = async () => {
//         try {
//             const response = await fetch('/api/items');
//             const data = await response.json();

//             const fetchedNodes = data.items.map(item => ({
//                 id: item._id,
//                 label: item.description,
//                 group: item.tag,
//             }));

//             const fetchedEdges = data.edges.map(edge => ({
//                 from: edge.from,
//                 to: edge.to,
//                 label: edge.label,
//             }));

//             setNodes(fetchedNodes);
//             setEdges(fetchedEdges);
//         } catch (error) {
//             console.error('Error fetching items and edges:', error);
//         }
//     };

//     fetchItems();
//   }, []);


//   const events = {
//     select: ({ nodes, edges }) => {
//       console.log("Selected nodes:", nodes);
//       console.log("Selected edges:", edges);

//       if (nodes.length > 0) {
//         const selectedNode = nodes[0]; 
//         alert(`Selected node ID: ${selectedNode}`);
//       }
//     }
//   };

//   return (
//     <RootLayout>
//       <div className="h-screen overflow-y-scroll font-manrope" style={{ backgroundColor: '#F7F7F7' }}>
//         <div className="p-6">
//           <h1 className="text-2xl font-bold mb-4 text-slate-600">Knowledge Graph</h1>
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