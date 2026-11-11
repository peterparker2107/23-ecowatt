import React from 'react';
import { SmartAppliance } from '../types';
import { Ghost, ZapOff, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

interface PhantomDetectorProps {
  appliances: SmartAppliance[];
  onKillPhantomLoads: () => void;
}

export const PhantomDetector: React.FC<PhantomDetectorProps> = ({
  appliances,
  onKillPhantomLoads
}) => {
  const phantomAppliances = appliances.filter((a) => a.isPhantomStandby);
  const totalLeakingWatts = phantomAppliances.reduce((sum, a) => sum + a.phantomWatts, 0);

  // 1 watt 24/7 for 30 days = 0.72 kWh per month. At ₹7.5/unit
  const monthlyLeakedKwh = (totalLeakingWatts * 24 * 30) / 1000;
  const monthlyWastedCost = monthlyLeakedKwh * 7.5;
  const monthlyCarbonKg = monthlyLeakedKwh * 0.82;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-teal-500/10 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                <Ghost className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Vampire & Phantom Load Interceptor
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              Phantom load is electricity drawn by adapters, chargers, and appliances while switched off or on standby. EcoWatt's smart relay senses micro-currents and can sever standby drains instantly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {totalLeakingWatts > 0 ? (
              <button
                onClick={onKillPhantomLoads}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/30 transition-all hover:scale-[1.02]"
              >
                <ZapOff className="w-4 h-4" />
                Kill Vampire Loads (Relay Cutoff)
              </button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-300 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Zero Vampire Drains Active
              </div>
            )}
          </div>
        </div>

        {/* Vampire Impact Metrics */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 block">
              Continuous Leak
            </span>
            <span className="font-mono text-xl font-bold text-rose-600 dark:text-rose-400">
              {totalLeakingWatts.toFixed(1)} W
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 block">
              Monthly Waste
            </span>
            <span className="font-mono text-xl font-bold text-slate-900 dark:text-white">
              ₹{monthlyWastedCost.toFixed(0)} / mo
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 block">
              CO2 Impact
            </span>
            <span className="font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {monthlyCarbonKg.toFixed(1)} kg CO2e
            </span>
          </div>
        </div>
      </div>

      {/* Leaking Devices Breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Detected Leaking Smart Plugs ({phantomAppliances.length})
        </h3>

        {phantomAppliances.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              All Smart Plugs Isolated
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your room is running with optimal power factor and zero phantom leakage.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {phantomAppliances.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/60 dark:border-rose-900/40 shadow-sm flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {app.name}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      ({app.plugId})
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Mode: <strong className="text-amber-600">Standby / Unplugged Device</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-base font-bold text-rose-600 dark:text-rose-400 block">
                    +{app.phantomWatts} W
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Vampire drain
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
