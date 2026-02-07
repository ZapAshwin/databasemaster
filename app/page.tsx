"use client";
import React, { useState } from 'react';
import { UserPlus, Database, Share2, ShieldCheck } from 'lucide-react';

interface Employee {
  E_Code: string; E_Name: string; Department: string; Designation: string; Salary: number;
}

export default function DatabaseMaster() {
  const [employees, setEmployees] = useState<Employee[]>([
    { E_Code: 'E_101', E_Name: 'Akash Sharma', Department: 'Technology', Designation: 'Manager', Salary: 55000 },
    { E_Code: 'E_102', E_Name: 'Khushi Mahajan', Department: 'Operations', Designation: 'Executive', Salary: 23450 },
    { E_Code: 'E_103', E_Name: 'Bhavesh Patel', Department: 'Human Resources', Designation: 'Manager', Salary: 45790 },
    { E_Code: 'E_104', E_Name: 'Preeti', Department: 'Human Resources', Designation: 'Executive', Salary: 34980 },
    { E_Code: 'E_105', E_Name: 'Rajesh Mittal', Department: 'Finance', Designation: 'Manager', Salary: 42890 },
  ]);
  const [loading, setLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState("");

  const saveToIPFS = async () => {
    setLoading(true);
    const res = await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify(employees),
    });
    const result = await res.json();
    setIpfsHash(result.hash);
    setLoading(false);
    alert("🚀 Data Locked into the Interplanetary File System!");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      {/* Header with Ashwin B Signature */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DATABASE MASTER
          </h1>
          <p className="text-slate-500 font-medium">Crafted with power by ~ Ashwin B</p>
        </div>
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 shadow-lg border-4 border-white flex items-center justify-center text-white font-bold text-xl">
          AB
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Control Panel */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 h-fit">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="text-green-500" /> Admin Controls
          </h2>
          <button 
            onClick={saveToIPFS}
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mb-4"
          >
            {loading ? "Syncing..." : <><Share2 size={18} /> Push to IPFS</>}
          </button>
          {ipfsHash && (
            <div className="p-3 bg-blue-50 rounded-xl text-xs break-all font-mono text-blue-700 border border-blue-100">
              IPFS Hash: {ipfsHash}
            </div>
          )}
        </div>

        {/* Data Display */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900 text-white text-sm uppercase tracking-wider">
                <tr>
                  <th className="p-4">Code</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Dept</th>
                  <th className="p-4 text-right">Salary</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-blue-600">{emp.E_Code}</td>
                    <td className="p-4 font-semibold">{emp.E_Name}</td>
                    <td className="p-4 text-slate-500">{emp.Department}</td>
                    <td className="p-4 text-right font-mono font-bold">${emp.Salary.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-slate-400 text-sm italic">
            Your data is stored under decentralized ipfs crypto storage.
          </p>
        </div>
      </main>
    </div>
  );
}
