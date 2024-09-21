"use client";

import React, { useState } from "react";
import SideNav from './components/SideNav';
import "./globals.css";
import 'typeface-manrope';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projects, setProjects] = useState<{ projectName: string, category: string, content: string }[]>([]);

  // Global handleNewProject function
  const handleNewProject = () => {
    const newProject = { projectName: "Untitled", category: "Fact", content: "" };
    setProjects([...projects, newProject]);  // Add the new project
  };

  return (
    <html lang="en">
      <body className="antialiased font-manrope">
        <div className="flex h-screen bg-gray-100">
          {/* Side Navigation */}
          <SideNav onNewProject={handleNewProject} /> {/* Passing handleNewProject to SideNav */}

          {/* Main content */}
          <div className="flex-1 overflow-y-scroll">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}