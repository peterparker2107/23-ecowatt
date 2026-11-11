import React from 'react';
import { Leaf, Zap, Moon, Sun, ShieldAlert, Sliders, Trophy, Ghost, Home } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeTab: 'monitor' | 'phantom' | 'estimator' | 'leaderboard';
  setActiveTab: (tab: 'monitor' | 'phantom' | 'estimator' | 'leaderboard') => void;
  roomNumber: string;
  isOverQuota: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  activeTab,
  setActiveTab,
  roomNumber,
  isOverQuota
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Live Status */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">EcoWatt</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/40">
                  <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Smart Meter Synced
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                TIET Hostel Energy & Carbon Quota Tracker • Room {roomNumber}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setActiveTab('monitor')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'monitor'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Smart Plugs
            </button>
            <button
              onClick={() => setActiveTab('phantom')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'phantom'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Ghost className="w-3.5 h-3.5" />
              Phantom Load
            </button>
            <button
              onClick={() => setActiveTab('estimator')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'estimator'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Savings Calculator
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Wing Leaderboard
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {isOverQuota && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                Quota Alert
              </span>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-200/60 dark:border-slate-800/60 px-4 py-2 gap-2 custom-scroll">
        <button
          onClick={() => setActiveTab('monitor')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'monitor' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Smart Plugs
        </button>
        <button
          onClick={() => setActiveTab('phantom')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'phantom' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Phantom Load
        </button>
        <button
          onClick={() => setActiveTab('estimator')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'estimator' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Savings
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'leaderboard' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Leaderboard
        </button>
      </div>
    </header>
  );
};
