import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SubjectForm from './SubjectForm';
import PracticalForm from './PracticalForm';
import SolutionForm from './SolutionForm';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-full lg:w-1/4">
        {/* Sidebar content */}
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          {/* Navigation links */}
          <nav className="mt-6">
            <ul>
              <li className="mb-2">
                <Link to="/admin/subjects" className="block text-gray-300 hover:text-white">
                  Manage Subjects
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/admin/practicals" className="block text-gray-300 hover:text-white">
                  Manage Practical
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/admin/solutions" className="block text-gray-300 hover:text-white">
                  Manage Solutions
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="w-full lg:w-3/4 p-6 bg-gray-200">
        {/* Content goes here */}
        <h2 className="text-2xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
        {/* Use React Router to define routes for each form */}
        <Routes>
          <Route path="/admin/subjects" element={<SubjectForm />} />
          <Route path="/admin/practicals" element={<PracticalForm />} />
          <Route path="/admin/solutions" element={<SolutionForm />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
