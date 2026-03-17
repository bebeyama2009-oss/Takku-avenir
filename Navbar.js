import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">TAKKU</span>
            <span className="text-2xl font-light text-secondary">AVENIR</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/careers" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Métiers
            </Link>
            <Link to="/universities" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Universités
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Dashboard
                </Link>
                <Link to="/test" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Test
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                      {user?.first_name?.[0] || 'U'}
                    </div>
                    <span>{user?.first_name || 'Profil'}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Mon Profil
                    </Link>
                    <Link to="/results" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Mes Résultats
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-all font-semibold"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-primary font-medium">
                Accueil
              </Link>
              <Link to="/careers" className="text-gray-700 hover:text-primary font-medium">
                Métiers
              </Link>
              <Link to="/universities" className="text-gray-700 hover:text-primary font-medium">
                Universités
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium">
                    Dashboard
                  </Link>
                  <Link to="/test" className="text-gray-700 hover:text-primary font-medium">
                    Test d'Orientation
                  </Link>
                  <Link to="/profile" className="text-gray-700 hover:text-primary font-medium">
                    Mon Profil
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-left text-red-600 font-medium"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary font-medium">
                    Connexion
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-primary text-white px-6 py-2 rounded-full text-center hover:bg-primary/90 font-semibold"
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
