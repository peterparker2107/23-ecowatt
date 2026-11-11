import React from 'react';
import { WingLeaderboardItem } from '../types';
import { Trophy, Medal, TrendingUp, TrendingDown, Minus, Award, Users, Sparkles } from 'lucide-react';

interface WingLeaderboardProps {
  wings: WingLeaderboardItem[];
}

export const WingLeaderboard: React.FC<WingLeaderboardProps> = ({ wings }) => {
  const getBadgeStyle = (badge: WingLeaderboardItem['badge']) => {
    switch (badge) {
      case 'Eco-Warrior Gold':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-700';
      case 'Silver Saver':
        return 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700';
      case 'Bronze Conserver':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-300 dark:border-orange-700';
      default:
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-700';
    }
  };

  const getRankMedal = (rank: number) => {
    if (rank === 1) return <span className="text-xl">🥇</span>;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="font-mono font-bold text-sm text-slate-400">#{rank}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Hostel Wing Green Leaderboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time inter-hostel energy efficiency standings across TIET campus
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-amber-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Top Wing Wins 15% Green Mess Subsidy</span>
        </div>
      </div>

      <div className="space-y-3">
        {wings.map((item) => (
          <div
            key={item.wingName}
            className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
              item.wingName.includes('Your Wing')
                ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                : 'border-slate-200/80 dark:border-slate-800/80 shadow-sm'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 text-center shrink-0">
                  {getRankMedal(item.rank)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.hostel} — {item.wingName}
                    </h3>
                    {item.wingName.includes('Your Wing') && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white uppercase tracking-wider">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {item.totalResidents} Residents
                    </span>
                    <span>•</span>
                    <span>
                      Avg Burn: <strong>{item.avgKwhPerResident} kWh</strong> / res / day
                    </span>
                  </div>
                </div>
              </div>

              {/* Score & Badge */}
              <div className="flex items-center gap-4 self-end md:self-center">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                    Efficiency Score
                  </span>
                  <span className="font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    {item.efficiencyScore} / 100
                  </span>
                </div>

                <div
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${getBadgeStyle(
                    item.badge
                  )}`}
                >
                  {item.badge}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
