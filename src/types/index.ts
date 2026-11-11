export type ApplianceCategory = 'Cooling' | 'Heating' | 'Computing' | 'Lighting' | 'Refrigeration';

export interface SmartAppliance {
  id: string;
  name: string;
  plugId: string; // e.g. PLUG-J204-AC
  category: ApplianceCategory;
  ratedWatts: number;
  currentWatts: number;
  status: 'On' | 'Standby' | 'Off';
  isPhantomStandby: boolean;
  phantomWatts: number;
  dailyKwh: number;
  acTempC?: number; // for AC
}

export interface RoomTelemetry {
  roomNumber: string;
  hostel: string;
  voltageV: number;
  currentAmps: number;
  powerFactor: number;
  totalCurrentWatts: number;
  dailyUsedKwh: number;
  dailyQuotaKwh: number;
  carbonKgCO2: number;
}

export interface WingLeaderboardItem {
  rank: number;
  wingName: string;
  hostel: string;
  avgKwhPerResident: number;
  efficiencyScore: number;
  totalResidents: number;
  badge: 'Eco-Warrior Gold' | 'Silver Saver' | 'Bronze Conserver' | 'Needs Optimization';
  trend: 'up' | 'down' | 'same';
}
