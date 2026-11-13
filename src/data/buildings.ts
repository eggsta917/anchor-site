export type Building = {
  slug: string;
  name: string;
  address: string;
  area: string;
  units: number;
  completed: number;
  status: 'leasing' | 'waitlist';
  statusLabel: string;
  statusLabelJa: string;
  blurb: string;
  blurbJa: string;
  mix?: string;
  parking?: string;
};

export const buildings: Building[] = [
  {
    slug: 'makiki-banyan',
    name: 'Makiki Banyan',
    address: '1568 Pensacola St, Honolulu, HI 96822',
    area: 'Makiki',
    units: 90,
    completed: 2026,
    status: 'leasing',
    statusLabel: 'Leasing January 2027',
    statusLabelJa: '2027年1月入居開始',
    blurb:
      'Our largest building to date: 80 one-bedroom and 10 two-bedroom apartments a short walk from Makiki District Park, with 32 parking stalls.',
    blurbJa: '1ベッド80戸・2ベッド10戸の当社最大の物件。マキキ・ディストリクト・パーク至近、駐車場32台。',
    mix: '80 × 1 bd (350 sq ft) · 10 × 2 bd (695 sq ft)',
    parking: '32 stalls',
  },
  {
    slug: '902-university',
    name: '902 University Ave',
    address: '902 University Ave, Honolulu, HI 96826',
    area: 'Moʻiliʻili',
    units: 35,
    completed: 2025,
    status: 'waitlist',
    statusLabel: 'Fully leased · waitlist open',
    statusLabelJa: '満室・ウェイトリスト受付中',
    blurb: 'Steps from UH Mānoa and the bus lines on University Avenue.',
    blurbJa: 'ハワイ大学マノア校とユニバーシティ・アベニューのバス路線至近。',
  },
  {
    slug: '1427-ernest',
    name: '1427 Ernest St',
    address: '1427 Ernest St, Honolulu, HI 96822',
    area: 'Makiki',
    units: 26,
    completed: 2022,
    status: 'waitlist',
    statusLabel: 'Fully leased · waitlist open',
    statusLabelJa: '満室・ウェイトリスト受付中',
    blurb: 'The first building completed under Honolulu’s Bill 7 program, and the one that proved the model.',
    blurbJa: 'ホノルル市Bill 7プログラムで最初に完成した物件。',
  },
  {
    slug: '1226-kinau',
    name: '1226 Kinau St',
    address: '1226 Kinau St, Honolulu, HI 96814',
    area: 'Makiki',
    units: 25,
    completed: 2024,
    status: 'waitlist',
    statusLabel: 'Fully leased · waitlist open',
    statusLabelJa: '満室・ウェイトリスト受付中',
    blurb: 'A refined version of the Ernest Street design, close to Ala Moana and downtown.',
    blurbJa: 'アーネスト・ストリートの設計を改良。アラモアナとダウンタウンに近い立地。',
  },
  {
    slug: '1751-algaroba',
    name: '1751 Algaroba St',
    address: '1751 Algaroba St, Honolulu, HI 96826',
    area: 'Kaimukī',
    units: 25,
    completed: 2025,
    status: 'waitlist',
    statusLabel: 'Fully leased · waitlist open',
    statusLabelJa: '満室・ウェイトリスト受付中',
    blurb: 'Quiet residential street between Kapahulu and Kaimukī, minutes from the beach.',
    blurbJa: 'カパフルとカイムキの間の静かな住宅街。ビーチまで数分。',
  },
];

export const totalUnits = buildings.reduce((n, b) => n + b.units, 0);
