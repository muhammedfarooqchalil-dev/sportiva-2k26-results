import React from 'react';
import { Trophy, LogIn, LogOut, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  isAdmin: boolean;
  onLogout: () => void;
  onNavigate: (view: 'home' | 'admin' | 'login') => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ isAdmin, onLogout, onNavigate, currentView }) => {
  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="bg-yellow-500 p-2 rounded-full">
              <Trophy className="h-6 w-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Sportiva 2K26</h1>
              <p className="text-xs text-slate-400">Jamia Islamiya Arts & Science College</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'home' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Results
            </button>
            
            {isAdmin ? (
              <>
                 <button 
                  onClick={() => onNavigate('admin')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'admin' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white'}`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Admin</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-slate-800 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-yellow-500 hover:bg-slate-800 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Admin Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};