import React, { useState } from 'react';
import { Sliders, DollarSign, Leaf, TreePine, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export const SavingsEstimator: React.FC = () => {
  const [acTemp, setAcTemp] = useState(24);
  const [dailyHours, setDailyHours] = useState(6);
  const [killStandby, setKillStandby] = useState(true);

  // Baseline at 18°C is ~1450W. Every degree increase in AC setpoint saves ~6% energy!
  // At 24°C: saves (24 - 18) * 6% = 36% of AC load!
  const degreesAbove18 = Math.max(0, acTemp - 18);
  const acSavingsPercent = degreesAbove18 * 0.06;

  const baselineAcWatts = 1450;
  const optimizedAcWatts = baselineAcWatts * (1 - acSavingsPercent);
  const savedAcWatts = baselineAcWatts - optimizedAcWatts;

  // Semester = 120 days
  const semesterDays = 120;
  const acKwhSavedSemester = (savedAcWatts * dailyHours * semesterDays) / 1000;

  // Standby savings: ~25W 24h/day
  const standbyKwhSavedSemester = killStandby ? (25 * 24 * semesterDays) / 1000 : 0;

  const totalKwhSaved = acKwhSavedSemester + standbyKwhSavedSemester;
  const totalCostSavedRupees = totalKwhSaved * 7.5; // ₹7.5 per kWh unit
  const carbonAvoidedKg = totalKwhSaved * 0.82; // 0.82 kg CO2 per kWh
  const treesEquivalent = carbonAvoidedKg / 22; // ~22 kg CO2 per mature tree/yr

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Hostel Room Energy & Savings Estimator
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Simulate behavioral adjustments to see projected semester electricity credits & carbon offsets
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
          {/* Slider 1: AC Setpoint */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Target AC Thermostat Temperature
              </label>
              <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                {acTemp}°C
              </span>
            </div>
            <input
              type="range"
              min={18}
              max={28}
              step={1}
              value={acTemp}
              onChange={(e) => setAcTemp(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>18°C (Max Chilling)</span>
              <span className="text-emerald-600 font-semibold">24°C (BEE Recommended)</span>
              <span>28°C (Eco)</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Setting AC to {acTemp}°C delivers a <strong>{(acSavingsPercent * 100).toFixed(0)}%</strong> reduction in compressor load compared to 18°C.
            </p>
          </div>

          {/* Slider 2: Daily AC Run Hours */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Daily AC Run Duration
              </label>
              <span className="font-mono text-sm font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {dailyHours} Hours / Day
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={16}
              step={1}
              value={dailyHours}
              onChange={(e) => setDailyHours(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>2 hrs (Evening only)</span>
              <span>8 hrs (Overnight)</span>
              <span>16 hrs (Intense study)</span>
            </div>
          </div>

          {/* Checkbox: Standby relay */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={killStandby}
                onChange={(e) => setKillStandby(e.target.checked)}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                  Automated Smart Relay Standby Cutoff
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Cuts power to laptop bricks and kettles automatically when room is unoccupied.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Output Impact Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl shadow-emerald-700/20">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
                <Leaf className="w-5 h-5 text-emerald-100" />
              </span>
              <div>
                <span className="text-xs font-medium text-emerald-100 uppercase tracking-wider block">
                  Projected 1-Semester Impact
                </span>
                <h3 className="text-lg font-bold">120-Day Campus Savings</h3>
              </div>
            </div>

            <div className="space-y-4 my-6">
              {/* Financial Savings */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-xs text-emerald-100 block">
                  Estimated Electricity Bill Saved
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-mono font-extrabold tracking-tight">
                    ₹{Math.round(totalCostSavedRupees).toLocaleString()}
                  </span>
                  <span className="text-xs text-emerald-200">
                    (@ ₹7.5 / unit)
                  </span>
                </div>
              </div>

              {/* Energy & Carbon */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-[10px] uppercase font-semibold text-emerald-200 block">
                    Energy Saved
                  </span>
                  <span className="font-mono text-xl font-bold mt-0.5 block">
                    {Math.round(totalKwhSaved)} kWh
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-[10px] uppercase font-semibold text-emerald-200 block">
                    CO2 Averted
                  </span>
                  <span className="font-mono text-xl font-bold mt-0.5 block">
                    {Math.round(carbonAvoidedKg)} kg
                  </span>
                </div>
              </div>

              {/* Trees equivalent */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <TreePine className="w-6 h-6 text-emerald-200 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white block">
                    Equivalent to ~{treesEquivalent.toFixed(1)} Trees
                  </span>
                  <span className="text-emerald-100 text-[11px]">
                    Annual carbon sequestration equivalent
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-emerald-100/80 border-t border-white/20 pt-3">
            TIET Sustainability Office Energy Credit Scheme Eligible
          </p>
        </div>
      </div>
    </div>
  );
};
