import React from 'react';
import MainLayout from './Layout/MainLayout';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import LearnEarn from './pages/LearnEarn';
import TimeDrop from './pages/TimeDrop';
import Referral from './pages/Referral';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <MainLayout >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/learn-earn" element={<ProtectedRoute><LearnEarn /></ProtectedRoute>} />
        <Route path="/timedrop" element={<ProtectedRoute><TimeDrop /></ProtectedRoute>} />
        <Route path="/referral" element={<ProtectedRoute><Referral /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
      </Routes>
    </MainLayout>
  );
}

export default App;