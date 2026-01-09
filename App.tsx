import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Leaderboard } from './components/Leaderboard';
import { ResultList } from './components/ResultList';
import { AdminPanel } from './components/AdminPanel';
import { Login } from './components/Login';
import { Result } from './types';
import { subscribeToResults, subscribeToAuth, logoutAdmin, listenForLocalUpdates } from './services/dataService';
import { isFirebaseConfigured } from './firebaseConfig';
import { AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'admin' | 'login'>('home');
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to results
    const unsubscribeResults = subscribeToResults((data) => {
      setResults(data);
      setLoading(false);
    });

    // Subscribe to local updates (for demo mode)
    const unsubscribeLocal = listenForLocalUpdates((data) => {
       setResults(data);
    });

    // Subscribe to auth state
    const unsubscribeAuth = subscribeToAuth((u) => {
      setUser(u ? { email: u.email || '' } : null);
    });

    return () => {
      if (typeof unsubscribeResults === 'function') unsubscribeResults();
      if (typeof unsubscribeLocal === 'function') unsubscribeLocal();
      if (typeof unsubscribeAuth === 'function') unsubscribeAuth();
    };
  }, []);

  const handleNavigate = (newView: 'home' | 'admin' | 'login') => {
    if (newView === 'admin' && !user) {
      setView('login');
    } else {
      setView(newView);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setView('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <Navbar 
        isAdmin={!!user} 
        onLogout={handleLogout} 
        onNavigate={handleNavigate}
        currentView={view}
      />

      {/* Config Warning for Demo Mode */}
      {!isFirebaseConfigured() && (
        <div className="bg-amber-100 border-b border-amber-200 text-amber-800 px-4 py-2 text-sm flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <span>Demo Mode: Data is saved locally. Configure Firebase in 'firebaseConfig.ts' to go live.</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {view === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Leaderboard</h2>
              <p className="text-slate-500 font-medium">Live updates from the track and field</p>
            </div>
            
            <Leaderboard results={results} />
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                Detailed Results
                <span className="ml-3 px-3 py-1 bg-slate-200 text-slate-600 text-xs rounded-full font-medium">
                  {results.length} records
                </span>
              </h3>
              <ResultList results={results} />
            </div>
          </div>
        )}

        {view === 'login' && (
          <div className="flex justify-center pt-12 animate-fade-in">
            <Login onLoginSuccess={() => setView('admin')} />
          </div>
        )}

        {view === 'admin' && user && (
          <div className="animate-fade-in">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Admin Dashboard</h2>
                <p className="text-slate-500">Welcome back, {user.email}</p>
              </div>
              {!isFirebaseConfigured() && (
                 <div className="mt-4 md:mt-0 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">
                    <strong>Tip:</strong> In Demo Mode, use any email/pass to test login. <br/>
                    (e.g. admin@college.com / admin123)
                 </div>
              )}
            </div>
            <AdminPanel results={results} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;