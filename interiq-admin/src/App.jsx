import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import EditBlog from './pages/EditBlog';
import ManagePages from './pages/ManagePages';
import EditPageContent from './pages/EditPageContent';
import Permissions from './pages/Permissions';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/blogs" element={
          <ProtectedRoute>
            <Blogs />
          </ProtectedRoute>
        } />

        <Route path="/blogs/create" element={
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        } />

        <Route path="/blogs/edit/:id" element={
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        } />

        <Route path="/pages" element={
          <ProtectedRoute>
            <ManagePages />
          </ProtectedRoute>
        } />

        <Route path="/pages/edit/:pageId" element={
          <ProtectedRoute>
            <EditPageContent />
          </ProtectedRoute>
        } />

        <Route path="/permissions" element={
          <ProtectedRoute>
            <Permissions />
          </ProtectedRoute>
        } />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<div className="p-10 text-center font-playfair text-3xl">404 | VISION NOT FOUND</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
