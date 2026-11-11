import { SmartAppliance, RoomTelemetry, WingLeaderboardItem } from '../types';

export const INITIAL_APPLIANCES: SmartAppliance[] = [
  {
    id: 'app-ac-1',
    name: '1.5 Ton Dual Inverter AC',
    plugId: 'PLUG-J204-AC',
    category: 'Cooling',
    ratedWatts: 1450,
    currentWatts: 820,
    status: 'On',
    isPhantomStandby: false,
    phantomWatts: 0,
    dailyKwh: 3.4,
    acTempC: 24
  },
  {
    id: 'app-kettle-1',
    name: 'Electric Boiler Kettle',
    plugId: 'PLUG-J204-KTL',
    category: 'Heating',
    ratedWatts: 1500,
    currentWatts: 18.5,
    status: 'Standby',
    isPhantomStandby: true,
    phantomWatts: 18.5, // vampire drain
    dailyKwh: 0.9
  },
  {
    id: 'app-laptop-1',
    name: 'Gaming Rig & 240W Power Brick',
    plugId: 'PLUG-J204-LAP',
    category: 'Computing',
    ratedWatts: 240,
    currentWatts: 145,
    status: 'On',
    isPhantomStandby: false,
    phantomWatts: 0,
    dailyKwh: 1.6
  },
  {
    id: 'app-lights-1',
    name: 'LED Batten & High-Speed Fan',
    plugId: 'PLUG-J204-LGT',
    category: 'Lighting',
    ratedWatts: 120,
    currentWatts: 68,
    status: 'On',
    isPhantomStandby: false,
    phantomWatts: 0,
    dailyKwh: 0.7
  },
  {
    id: 'app-fridge-1',
    name: 'Compact 50L Direct Cool Fridge',
    plugId: 'PLUG-J204-FRG',
    category: 'Refrigeration',
    ratedWatts: 90,
    currentWatts: 54,
    status: 'On',
    isPhantomStandby: false,
    phantomWatts: 0,
    dailyKwh: 0.8
  },
  {
    id: 'app-charger-1',
    name: '65W GaN Fast Charger (Idle)',
    plugId: 'PLUG-J204-CHG',
    category: 'Computing',
    ratedWatts: 65,
    currentWatts: 6.2,
    status: 'Standby',
    isPhantomStandby: true,
    phantomWatts: 6.2, // vampire drain
    dailyKwh: 0.15
  }
];

export const INITIAL_TELEMETRY: RoomTelemetry = {
  roomNumber: 'J-204',
  hostel: 'Hostel J',
  voltageV: 230.8,
  currentAmps: 4.85,
  powerFactor: 0.94,
  totalCurrentWatts: 1111.7,
  dailyUsedKwh: 7.55,
  dailyQuotaKwh: 15.0,
  carbonKgCO2: 6.19 // ~0.82 kg CO2 per kWh in northern grid
};

export const WING_LEADERBOARD: WingLeaderboardItem[] = [
  {
    rank: 1,
    wingName: 'Wing C (Floors 3-4)',
    hostel: 'Hostel PG',
    avgKwhPerResident: 5.1,
    efficiencyScore: 96,
    totalResidents: 64,
    badge: 'Eco-Warrior Gold',
    trend: 'up'
  },
  {
    rank: 2,
    wingName: 'Block 2 Wing A',
    hostel: 'Hostel Q',
    avgKwhPerResident: 5.8,
    efficiencyScore: 92,
    totalResidents: 72,
    badge: 'Silver Saver',
    trend: 'up'
  },
  {
    rank: 3,
    wingName: 'Wing B (Floors 1-2)',
    hostel: 'Hostel M',
    avgKwhPerResident: 6.4,
    efficiencyScore: 88,
    totalResidents: 80,
    badge: 'Bronze Conserver',
    trend: 'same'
  },
  {
    rank: 4,
    wingName: 'Wing A (Your Wing)',
    hostel: 'Hostel J',
    avgKwhPerResident: 7.2,
    efficiencyScore: 84,
    totalResidents: 84,
    badge: 'Bronze Conserver',
    trend: 'up'
  },
  {
    rank: 5,
    wingName: 'Wing 1 (Rooms 101-140)',
    hostel: 'Hostel N',
    avgKwhPerResident: 9.6,
    efficiencyScore: 71,
    totalResidents: 60,
    badge: 'Needs Optimization',
    trend: 'down'
  }
];
