import React from 'react';
import { SmartAppliance } from '../types';
import {
  Power,
  Zap,
  Wind,
  Coffee,
  Laptop,
  Lightbulb,
  Snowflake,
  Smartphone,
  Sliders,
  AlertCircle,
  BarChart3
} from 'lucide-react';

interface RoomAppliancesProps {
  appliances: SmartAppliance[];
  onToggleStatus: (applianceId: string) => void;
  onUpdateAcTemp: (applianceId: string, tempC: number) => void;
}

export const RoomAppliances: React.FC<RoomAppliancesProps> = ({
  appliances,
  onToggleStatus,
  onUpdateAcTemp
}) => {
  const getApplianceIcon = (category: SmartAppliance['category']) => {
    switch (category) {
      case 'Cooling':
        return <Wind className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Heating':
        return <Coffee className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Computing':
        return <Laptop className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Lighting':
        return <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'Refrigeration':
        return <Snowflake className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const categories = ['Cooling', 'Heating', 'Computing', 'Lighting', 'Refrigeration'] as const;
  const totalActiveWatts = appliances.reduce((sum, a) => sum + (a.status === 'Off' ? 0 : a.currentWatts), 0);

  const categoryBreakdown = categories.map((cat) => {
    const catApps = appliances.filter((a) => a.category === cat);
    const catWatts = catApps.reduce((sum, a) => sum + (a.status === 'Off' ? 0 : a.currentWatts), 0);
    const catKwh = catApps.reduce((sum, a) => sum + a.dailyKwh, 0);
    const percent = totalActiveWatts > 0 ? Math.round((catWatts / totalActiveWatts) * 100) : 0;
    return {
      category: cat,
      count: catApps.length,
      activeCount: catApps.filter((a) => a.status === 'On').length,
      watts: Math.round(catWatts),
      dailyKwh: catKwh,
      percent
    };
  });

  return (
    <div className="space-y-6">
      {/* Real-Time Appliance Category Breakdown */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Appliance Energy Breakdown by Category
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Load distribution across cooling, heating, compute, and lighting circuits
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Total Active Load: {Math.round(totalActiveWatts)} W
          </span>
        </div>

        {/* Visual Multi-Segment Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
          <div style={{ width: `${categoryBreakdown.find(c => c.category === 'Cooling')?.percent || 0}%` }} className="bg-cyan-500 transition-all duration-500" title="Cooling" />
          <div style={{ width: `${categoryBreakdown.find(c => c.category === 'Heating')?.percent || 0}%` }} className="bg-amber-500 transition-all duration-500" title="Heating" />
          <div style={{ width: `${categoryBreakdown.find(c => c.category === 'Computing')?.percent || 0}%` }} className="bg-indigo-500 transition-all duration-500" title="Computing" />
          <div style={{ width: `${categoryBreakdown.find(c => c.category === 'Lighting')?.percent || 0}%` }} className="bg-yellow-400 transition-all duration-500" title="Lighting" />
          <div style={{ width: `${categoryBreakdown.find(c => c.category === 'Refrigeration')?.percent || 0}%` }} className="bg-blue-500 transition-all duration-500" title="Refrigeration" />
        </div>

        {/* Category Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          {categoryBreakdown.map((cat) => (
            <div
              key={cat.category}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  {cat.category}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {cat.percent}%
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-base font-bold text-slate-900 dark:text-white">
                  {cat.watts} W
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {cat.activeCount}/{cat.count} ON
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Smart Plug Energy Nodes
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time wattage, status switching & AC inverter thermostat controller
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400">
          6 Nodes Online
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appliances.map((app) => (
          <div
            key={app.id}
            className={`flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
              app.status === 'On'
                ? 'border-slate-200/80 dark:border-slate-800/80 shadow-sm'
                : 'border-slate-200/50 dark:border-slate-800/50 opacity-80'
            }`}
          >
            <div>
              {/* Card top */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {getApplianceIcon(app.category)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {app.name}
                    </h3>
                    <span className="font-mono text-[11px] text-slate-400">
                      {app.plugId}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onToggleStatus(app.id)}
                  className={`p-2 rounded-xl transition-all ${
                    app.status === 'On'
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : app.status === 'Standby'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                  title={`Turn ${app.status === 'On' ? 'Off' : 'On'}`}
                >
                  <Power className="w-4 h-4" />
                </button>
              </div>

              {/* Power readout */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 my-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Active Consumption
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                      {Math.round(app.currentWatts)}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      / {app.ratedWatts} W
                    </span>
                  </div>
                </div>

                {app.isPhantomStandby && (
                  <div className="mt-2 flex items-center justify-between text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-1 rounded-lg">
                    <span>Phantom Vampire Leak</span>
                    <span className="font-mono font-bold">+{app.phantomWatts} W</span>
                  </div>
                )}
              </div>

              {/* AC Thermostat control if AC */}
              {app.acTempC !== undefined && app.status === 'On' && (
                <div className="mt-3 p-3 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-cyan-900 dark:text-cyan-300 flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5" />
                      AC Thermostat Setpoint
                    </span>
                    <span className="font-mono font-bold text-cyan-700 dark:text-cyan-300 text-sm">
                      {app.acTempC}°C
                    </span>
                  </div>
                  <input
                    type="range"
                    min={18}
                    max={28}
                    step={1}
                    value={app.acTempC}
                    onChange={(e) => onUpdateAcTemp(app.id, parseInt(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>18°C (Max Load)</span>
                    <span className="text-emerald-600 font-semibold">24°C (Eco Rec)</span>
                    <span>28°C (Min)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Daily Burn Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span>Today's Total:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {app.dailyKwh.toFixed(2)} kWh
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
