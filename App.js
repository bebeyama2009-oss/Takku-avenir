import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import OrientationTest from './pages/OrientationTest';
import TestResults from './pages/TestResults';
import CareersGuide from './pages/CareersGuide';
import CareerDetail from './pages/CareerDetail';
import Universities from './pages/Universities';
import Profile from './pages/Profile';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/careers" element={<CareersGuide />} />
            <Route path="/careers/:slug" element={<CareerDetail />} />
            <Route path="/universities" element={<Universities />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/test" element={
              <ProtectedRoute>
                <OrientationTest />
              </ProtectedRoute>
            } />
            <Route path="/results" element={
              <ProtectedRoute>
                <TestResults />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
