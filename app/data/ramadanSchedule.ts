/**
 * Ramadan 2026 (1447H) - Republic of Kosovo
 * Source: Kryesia e Bashkësisë Islame të Republikës së Kosovës
 * Base times (reference location)
 * City adjustments: Ferizaj -1, Gjilan -1, Presheva -2, Prishtina -1, Podujeva -1, Sharri +2, Vushtrria -1 (minutes)
 */

export type CityAdjustment = {
  id: string;
  name: string;
  offsetMinutes: number; // minutes from base
};

export const cityAdjustments: CityAdjustment[] = [
  { id: 'base', name: 'Baza (Referencë)', offsetMinutes: 0 },
  { id: 'prishtina', name: 'Prishtina', offsetMinutes: -1 },
  { id: 'ferizaj', name: 'Ferizaj', offsetMinutes: -1 },
  { id: 'gjilan', name: 'Gjilani', offsetMinutes: -1 },
  { id: 'presheva', name: 'Presheva', offsetMinutes: -2 },
  { id: 'podujeva', name: 'Podujeva', offsetMinutes: -1 },
  { id: 'sharri', name: 'Sharri', offsetMinutes: 2 },
  { id: 'vushtrria', name: 'Vushtrria', offsetMinutes: -1 },
];

export type RamadanDay = {
  date: string;
  day: string;
  imsak: string;
  sabah: string;
  lindjaDiellit: string;
  dreka: string;
  ikindia: string;
  aksham: string;
  jacia: string;
  gjatesiaDites?: string;
  notes: string;
  ramadanDay: number;
  dateObj: Date; // For date matching
};

export const ramadanStartDate = new Date(2026, 1, 19); // Feb 19, 2026
export const ramadanEndDate = new Date(2026, 2, 19); // Mar 19, 2026
export const eidDate = new Date(2026, 2, 20); // Mar 20, 2026
export const eidPrayerTime = '06:18';

export const ramadanSchedule: RamadanDay[] = [
  { date: '19 Shkurt', day: 'e enjte',  imsak: '04:49', sabah: '05:09', lindjaDiellit: '06:23', dreka: '11:54', ikindia: '14:52', aksham: '17:21', jacia: '18:52', gjatesiaDites: '10:58', notes: 'Dita e parë e Ramazanit; Hëna e re', ramadanDay: 1,  dateObj: new Date(2026, 1, 19) },
  { date: '20 Shkurt', day: 'e premte', imsak: '04:48', sabah: '05:08', lindjaDiellit: '06:22', dreka: '11:54', ikindia: '14:53', aksham: '17:22', jacia: '18:53', gjatesiaDites: '11:00', notes: 'e xhuma',                          ramadanDay: 2,  dateObj: new Date(2026, 1, 20) },
  { date: '21 Shkurt', day: 'e shtunë', imsak: '04:46', sabah: '05:06', lindjaDiellit: '06:20', dreka: '11:54', ikindia: '14:54', aksham: '17:23', jacia: '18:54', gjatesiaDites: '11:03', notes: '',                               ramadanDay: 3,  dateObj: new Date(2026, 1, 21) },
  { date: '22 Shkurt', day: 'e diel',   imsak: '04:44', sabah: '05:04', lindjaDiellit: '06:18', dreka: '11:54', ikindia: '14:55', aksham: '17:25', jacia: '18:56', gjatesiaDites: '11:07', notes: '',                               ramadanDay: 4,  dateObj: new Date(2026, 1, 22) },
  { date: '23 Shkurt', day: 'e hënë',   imsak: '04:43', sabah: '05:03', lindjaDiellit: '06:17', dreka: '11:54', ikindia: '14:56', aksham: '17:26', jacia: '18:57', gjatesiaDites: '11:09', notes: '',                               ramadanDay: 5,  dateObj: new Date(2026, 1, 23) },
  { date: '24 Shkurt', day: 'e martë',  imsak: '04:41', sabah: '05:01', lindjaDiellit: '06:15', dreka: '11:53', ikindia: '14:57', aksham: '17:27', jacia: '18:58', gjatesiaDites: '11:12', notes: '',                               ramadanDay: 6,  dateObj: new Date(2026, 1, 24) },
  { date: '25 Shkurt', day: 'e mërkurë',imsak: '04:40', sabah: '05:00', lindjaDiellit: '06:13', dreka: '11:53', ikindia: '14:57', aksham: '17:28', jacia: '18:58', gjatesiaDites: '11:15', notes: 'Xhemra II në ujë',               ramadanDay: 7,  dateObj: new Date(2026, 1, 25) },
  { date: '26 Shkurt', day: 'e enjte',  imsak: '04:39', sabah: '04:59', lindjaDiellit: '06:11', dreka: '11:52', ikindia: '14:58', aksham: '17:29', jacia: '18:59', gjatesiaDites: '11:18', notes: '',                               ramadanDay: 8,  dateObj: new Date(2026, 1, 26) },
  { date: '27 Shkurt', day: 'e premte', imsak: '04:37', sabah: '04:57', lindjaDiellit: '06:08', dreka: '11:51', ikindia: '14:58', aksham: '17:30', jacia: '19:00', gjatesiaDites: '11:22', notes: 'e xhuma',                        ramadanDay: 9,  dateObj: new Date(2026, 1, 27) },
  { date: '28 Shkurt', day: 'e shtunë', imsak: '04:36', sabah: '04:56', lindjaDiellit: '06:06', dreka: '11:51', ikindia: '14:59', aksham: '17:31', jacia: '19:01', gjatesiaDites: '11:25', notes: '',                               ramadanDay: 10, dateObj: new Date(2026, 1, 28) },

  { date: '1 Mars',  day: 'e diel',    imsak: '04:34', sabah: '04:54', lindjaDiellit: '06:04', dreka: '11:51', ikindia: '14:59', aksham: '17:33', jacia: '19:03', gjatesiaDites: '11:29', notes: '',                               ramadanDay: 11, dateObj: new Date(2026, 2, 1) },
  { date: '2 Mars',  day: 'e hënë',    imsak: '04:33', sabah: '04:53', lindjaDiellit: '06:03', dreka: '11:50', ikindia: '15:00', aksham: '17:34', jacia: '19:05', gjatesiaDites: '11:31', notes: '',                               ramadanDay: 12, dateObj: new Date(2026, 2, 2) },
  { date: '3 Mars',  day: 'e martë',   imsak: '04:31', sabah: '04:51', lindjaDiellit: '06:02', dreka: '11:50', ikindia: '15:01', aksham: '17:36', jacia: '19:07', gjatesiaDites: '11:34', notes: '',                               ramadanDay: 13, dateObj: new Date(2026, 2, 3) },
  { date: '4 Mars',  day: 'e mërkurë', imsak: '04:29', sabah: '04:49', lindjaDiellit: '06:01', dreka: '11:50', ikindia: '15:02', aksham: '17:37', jacia: '19:08', gjatesiaDites: '11:36', notes: 'Hëna e plotë',                    ramadanDay: 14, dateObj: new Date(2026, 2, 4) },
  { date: '5 Mars',  day: 'e enjte',   imsak: '04:27', sabah: '04:47', lindjaDiellit: '06:00', dreka: '11:50', ikindia: '15:02', aksham: '17:38', jacia: '19:09', gjatesiaDites: '11:38', notes: 'Xhemra III në tokë',              ramadanDay: 15, dateObj: new Date(2026, 2, 5) },
  { date: '6 Mars',  day: 'e premte',  imsak: '04:25', sabah: '04:45', lindjaDiellit: '05:58', dreka: '11:50', ikindia: '15:03', aksham: '17:39', jacia: '19:10', gjatesiaDites: '11:41', notes: 'e xhuma',                        ramadanDay: 16, dateObj: new Date(2026, 2, 6) },
  { date: '7 Mars',  day: 'e shtunë',  imsak: '04:23', sabah: '04:43', lindjaDiellit: '05:56', dreka: '11:50', ikindia: '15:03', aksham: '17:40', jacia: '19:11', gjatesiaDites: '11:44', notes: 'Dita e fitores në Bedër; Dita e mësuesit', ramadanDay: 17, dateObj: new Date(2026, 2, 7) },
  { date: '8 Mars',  day: 'e diel',    imsak: '04:21', sabah: '04:41', lindjaDiellit: '05:55', dreka: '11:50', ikindia: '15:04', aksham: '17:42', jacia: '19:13', gjatesiaDites: '11:47', notes: '',                               ramadanDay: 18, dateObj: new Date(2026, 2, 8) },
  { date: '9 Mars',  day: 'e hënë',    imsak: '04:20', sabah: '04:40', lindjaDiellit: '05:53', dreka: '11:50', ikindia: '15:05', aksham: '17:43', jacia: '19:14', gjatesiaDites: '11:50', notes: '',                               ramadanDay: 19, dateObj: new Date(2026, 2, 9) },
  { date: '10 Mars', day: 'e martë',   imsak: '04:18', sabah: '04:38', lindjaDiellit: '05:51', dreka: '11:50', ikindia: '15:06', aksham: '17:44', jacia: '19:15', gjatesiaDites: '11:53', notes: "I'tikafi - Dita e çlirimit të Mekës", ramadanDay: 20, dateObj: new Date(2026, 2, 10) },

  { date: '11 Mars', day: 'e mërkurë',imsak: '04:16', sabah: '04:36', lindjaDiellit: '05:49', dreka: '11:50', ikindia: '15:06', aksham: '17:45', jacia: '19:16', gjatesiaDites: '11:56', notes: '',                               ramadanDay: 21, dateObj: new Date(2026, 2, 11) },
  { date: '12 Mars', day: 'e enjte',  imsak: '04:15', sabah: '04:35', lindjaDiellit: '05:47', dreka: '11:49', ikindia: '15:07', aksham: '17:47', jacia: '19:18', gjatesiaDites: '12:00', notes: '',                               ramadanDay: 22, dateObj: new Date(2026, 2, 12) },
  { date: '13 Mars', day: 'e premte', imsak: '04:14', sabah: '04:34', lindjaDiellit: '05:46', dreka: '11:49', ikindia: '15:08', aksham: '17:48', jacia: '19:19', gjatesiaDites: '12:02', notes: 'e xhuma',                        ramadanDay: 23, dateObj: new Date(2026, 2, 13) },
  { date: '14 Mars', day: 'e shtunë', imsak: '04:13', sabah: '04:33', lindjaDiellit: '05:44', dreka: '11:49', ikindia: '15:08', aksham: '17:49', jacia: '19:20', gjatesiaDites: '12:05', notes: '',                               ramadanDay: 24, dateObj: new Date(2026, 2, 14) },
  { date: '15 Mars', day: 'e diel',   imsak: '04:11', sabah: '04:31', lindjaDiellit: '05:42', dreka: '11:49', ikindia: '15:08', aksham: '17:50', jacia: '19:21', gjatesiaDites: '12:08', notes: '',                               ramadanDay: 25, dateObj: new Date(2026, 2, 15) },
  { date: '16 Mars', day: 'e hënë',   imsak: '04:09', sabah: '04:29', lindjaDiellit: '05:40', dreka: '11:49', ikindia: '15:08', aksham: '17:51', jacia: '19:22', gjatesiaDites: '12:11', notes: 'Nata e Madhe e Kadrit',           ramadanDay: 26, dateObj: new Date(2026, 2, 16) },
  { date: '17 Mars', day: 'e martë',  imsak: '04:08', sabah: '04:28', lindjaDiellit: '05:38', dreka: '11:48', ikindia: '15:09', aksham: '17:52', jacia: '19:23', gjatesiaDites: '12:14', notes: '',                               ramadanDay: 27, dateObj: new Date(2026, 2, 17) },
  { date: '18 Mars', day: 'e mërkurë',imsak: '04:06', sabah: '04:26', lindjaDiellit: '05:36', dreka: '11:48', ikindia: '15:09', aksham: '17:53', jacia: '19:25', gjatesiaDites: '12:17', notes: '',                               ramadanDay: 28, dateObj: new Date(2026, 2, 18) },
  { date: '19 Mars', day: 'e enjte',  imsak: '04:04', sabah: '04:24', lindjaDiellit: '05:35', dreka: '11:48', ikindia: '15:10', aksham: '17:55', jacia: '19:26', gjatesiaDites: '12:20', notes: 'Nata e Fitër Bajramit',          ramadanDay: 29, dateObj: new Date(2026, 2, 19) },
];


// Eid al-Fitr - First day of Eid
export const eidInfo = {
  date: '20 Mars 2026',
  day: 'e premte',
  prayerTime: '06:18',
};
