"use client";

import React, { useState, useRef } from "react";

export default function Dashboard() {
  const [project, setProject] = useState({
    projectName: "",
    projectAddress: "",
    clientName: "",
    clientAddress: "",
    projectId: "",
    deadline: ""
  });
  const [saveStatus, setSaveStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("projectInfo", JSON.stringify(project));
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
      });
      if (res.ok) {
        setSaveStatus("Successfully saved and sent to API");
        formRef.current?.reset();
        setProject({
          projectName: "",
          projectAddress: "",
          clientName: "",
          clientAddress: "",
          projectId: "",
          deadline: ""
        });
      } else {
        setSaveStatus("Failed to send to API");
      }
    } catch {
      setSaveStatus("Failed to save");
    }
  };

  return (
    <div className="flex flex-col items-center w-full mb-8">
      <h2 className="text-xl font-bold mb-2">Enter Project Information</h2>
      <form ref={formRef} className="flex flex-col gap-2 w-full max-w-md p-4 border rounded bg-white shadow" onSubmit={handleSave}>
        <input name="projectName" placeholder="Project Name" className="border p-2 rounded" value={project.projectName} onChange={handleChange} required />
        <input name="projectAddress" placeholder="Project Address" className="border p-2 rounded" value={project.projectAddress} onChange={handleChange} required />
        <input name="clientName" placeholder="Client Name" className="border p-2 rounded" value={project.clientName} onChange={handleChange} required />
        <input name="clientAddress" placeholder="Client Address" className="border p-2 rounded" value={project.clientAddress} onChange={handleChange} required />
        <input name="projectId" placeholder="Project ID" className="border p-2 rounded" value={project.projectId} onChange={handleChange} required />
        <input name="deadline" type="date" className="border p-2 rounded" value={project.deadline} onChange={handleChange} required />
        <button type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">SAVE and SEND to API</button>
        {saveStatus && <div className="text-green-600 mt-2">{saveStatus}</div>}
      </form>
    </div>
  );
}