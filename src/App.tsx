import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsBento } from './components/StatsBento';
import { RoomAppliances } from './components/RoomAppliances';
import { PhantomDetector } from './components/PhantomDetector';
import { SavingsEstimator } from './components/SavingsEstimator';
import { WingLeaderboard } from './components/WingLeaderboard';
import { INITIAL_APPLIANCES, INITIAL_TELEMETRY, WING_LEADERBOARD } from './data/mockEnergyData';
import { SmartAppliance, RoomTelemetry } from './types';
import { Sparkles, Activity, Zap, Radio, Gauge } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'monitor' | 'phantom' | 'estimator' | 'leaderboard'>('monitor');
  const [appliances, setAppliances] = useState<SmartAppliance[]>(INITIAL_APPLIANCES);
  const [telemetry, setTelemetry] = useState<RoomTelemetry>(INITIAL_TELEMETRY);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Recalculate room telemetry whenever appliances change or on periodic smart meter tick
  useEffect(() => {
    const totalWatts = appliances.reduce((sum, a) => sum + (a.status === 'Off' ? 0 : a.currentWatts), 0);
    const voltage = 230 + (Math.random() - 0.5) * 1.5;
    const pf = 0.94;
    const amps = totalWatts / (voltage * pf);

    setTelemetry((prev) => ({
      ...prev,
      totalCurrentWatts: totalWatts,
      voltageV: Math.round(voltage * 10) / 10,
      currentAmps: Math.round(amps * 100) / 100,
      carbonKgCO2: Math.round(prev.dailyUsedKwh * 0.82 * 10) / 10
    }));
  }, [appliances]);

  // Periodic subtle smart meter tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry((prev) => {
        const extraKwh = (prev.totalCurrentWatts / 1000) * (2.5 / 3600); // 2.5 sec slice
        const newDaily = prev.dailyUsedKwh + extraKwh;
        return {
          ...prev,
          dailyUsedKwh: Math.round(newDaily * 1000) / 1000,
          carbonKgCO2: Math.round(newDaily * 0.82 * 10) / 10
        };
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  // Toggle appliance status
  const handleToggleStatus = (applianceId: string) => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.id !== applianceId) return app;
        if (app.status === 'On') {
          return {
            ...app,
            status: app.isPhantomStandby ? 'Standby' : 'Off',
            currentWatts: app.isPhantomStandby ? app.phantomWatts : 0
          };
        } else if (app.status === 'Standby') {
          return { ...app, status: 'Off', currentWatts: 0 };
        } else {
          return { ...app, status: 'On', currentWatts: app.ratedWatts * 0.75 };
        }
      })
    );
  };

  // Adjust AC setpoint temperature
  const handleUpdateAcTemp = (applianceId: string, tempC: number) => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.id !== applianceId) return app;
        // 6% savings per degree above 18°C
        const savingsFactor = Math.max(0, (tempC - 18) * 0.06);
        const dynamicWatts = Math.round(app.ratedWatts * (1 - savingsFactor));
        return {
          ...app,
          acTempC: tempC,
          currentWatts: app.status === 'On' ? dynamicWatts : app.currentWatts
        };
      })
    );
  };

  // Kill vampire loads
  const handleKillPhantomLoads = () => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.isPhantomStandby) {
          return {
            ...app,
            isPhantomStandby: false,
            phantomWatts: 0,
            status: 'Off',
            currentWatts: 0
          };
        }
        return app;
      })
    );
    showToast('Smart Relay Cutoff Activated: Vampire loads severed to 0 Watts.');
  };

  const isOverQuota = telemetry.dailyUsedKwh >= telemetry.dailyQuotaKwh * 0.8;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        roomNumber={telemetry.roomNumber}
        isOverQuota={isOverQuota}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl border border-slate-700 animate-slide-up text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Real-Time Consumption Ticker */}
        <div className="mb-6 p-3 sm:p-3.5 rounded-2xl bg-slate-900 text-white dark:bg-slate-900/90 border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="flex items-center gap-2 font-mono">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Radio className="w-3.5 h-3.5" />
                Live Consumption Ticker
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300">Room {telemetry.roomNumber}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Load:</span>
              <span className="font-bold text-white text-sm">{Math.round(telemetry.totalCurrentWatts)} W</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">Grid:</span>
              <span className="text-cyan-300 font-semibold">{telemetry.voltageV.toFixed(1)}V @ 50.02 Hz</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-400">Current:</span>
              <span className="text-indigo-300 font-semibold">{telemetry.currentAmps.toFixed(2)} A</span>
            </div>
            <div className="flex items-center gap-1.5 hidden md:flex">
              <span className="text-slate-400">Today:</span>
              <span className="text-emerald-400 font-bold">{telemetry.dailyUsedKwh.toFixed(3)} kWh</span>
            </div>
          </div>
        </div>

        {/* Bento Stats */}
        <StatsBento telemetry={telemetry} appliances={appliances} />

        {/* Tab views */}
        {activeTab === 'monitor' && (
          <RoomAppliances
            appliances={appliances}
            onToggleStatus={handleToggleStatus}
            onUpdateAcTemp={handleUpdateAcTemp}
          />
        )}

        {activeTab === 'phantom' && (
          <PhantomDetector
            appliances={appliances}
            onKillPhantomLoads={handleKillPhantomLoads}
          />
        )}

        {activeTab === 'estimator' && <SavingsEstimator />}

        {activeTab === 'leaderboard' && <WingLeaderboard wings={WING_LEADERBOARD} />}
      </main>
    </div>
  );
}
