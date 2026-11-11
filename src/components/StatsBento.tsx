import React from 'react';
import { Zap, Leaf, Ghost, Trophy, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { RoomTelemetry, SmartAppliance } from '../types';

interface StatsBentoProps {
  telemetry: RoomTelemetry;
  appliances: SmartAppliance[];
}

export const StatsBento: React.FC<StatsBentoProps> = ({ telemetry, appliances }) => {
  const quotaPercent = Math.round((telemetry.dailyUsedKwh / telemetry.dailyQuotaKwh) * 100);
  const totalPhantomWatts = appliances
    .filter((a) => a.isPhantomStandby)
    .reduce((sum, a) => sum + a.phantomWatts, 0);

  const phantomCount = appliances.filter((a) => a.isPhantomStandby).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
      {/* Tile 1: Instantaneous Load */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Instantaneous Load</span>
          <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Zap className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-slate-900 dark:text-white">
            {Math.round(telemetry.totalCurrentWatts)} W
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {telemetry.currentAmps.toFixed(2)} A
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono text-[11px]">
          {telemetry.voltageV.toFixed(1)}V • PF {telemetry.powerFactor}
        </p>
      </div>

      {/* Tile 2: Daily Quota Tracker */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Daily Quota Tracker</span>
          <span className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
            <Leaf className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-slate-900 dark:text-white">
            {telemetry.dailyUsedKwh.toFixed(1)}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            / {telemetry.dailyQuotaKwh.toFixed(1)} kWh
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              quotaPercent > 80 ? 'bg-rose-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, quotaPercent)}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>{quotaPercent}% Quota Burned</span>
          <span>{telemetry.carbonKgCO2.toFixed(1)} kg CO2e</span>
        </p>
      </div>

      {/* Tile 3: Phantom Vampire Load */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Phantom Vampire Drain</span>
          <span className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
            <Ghost className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-rose-600 dark:text-rose-400">
            {totalPhantomWatts.toFixed(1)} W
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            ({phantomCount} leaking)
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Standby charger & kettle vampire leaks
        </p>
      </div>

      {/* Tile 4: Campus Green Rank */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Hostel Standing</span>
          <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Trophy className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
            #4
          </span>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Bronze Saver
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Hostel J - Wing A (84 Efficiency Score)
        </p>
      </div>
    </div>
  );
};
