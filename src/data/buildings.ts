export type Building = {
  slug: string;
  name: string;
  address: string;
  area: string;
  /** null until confirmed */
  units: number | null;
  completed: number;
  status: 'leasing' | 'soon' | 'waitlist';
  statusLabel: string;
  statusLabelJa: string;
  blurb: string;
  blurbJa: string;
  mix?: string;
  parking?: string;
  /** true = a limited number of units are open to households above the 80% AMI limit */
  openIncome?: boolean;
  /** images under /public/images, with captions */
  plans?: { src: string; caption: string }[];
  /** YouTube video id for a walkthrough */
  videoId?: string;
};

// Launch portfolio. Earlier Bill 7 buildings (Ernest, Kinau, Algaroba, University)
// are managed separately and are not listed on the Anchor site for now.
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
      'Our largest building: 80 one-bedroom and 10 two-bedroom apartments a short walk from Makiki District Park, with 32 parking stalls.',
    blurbJa: '1ベッド80戸・2ベッド10戸の最大規模の物件。マキキ・ディストリクト・パーク至近、駐車場32台。',
    mix: '80 × 1 bd (350 sq ft) · 10 × 2 bd (695 sq ft)',
    parking: '32 stalls',
    openIncome: true,
    plans: [{ src: '/images/makiki-banyan-floorplan.jpg', caption: 'Typical floor, floors 2–6: 16 one-bedroom and 2 two-bedroom apartments around a central corridor. Individual unit plans coming soon.' }],
  },
  {
    slug: 'alapai-vista',
    name: 'Alapai Vista',
    address: '1617 Alapai St, Honolulu, HI 96822',
    area: 'Makiki',
    units: 53,
    completed: 2026,
    status: 'soon',
    statusLabel: 'Leasing soon',
    statusLabelJa: '近日入居者募集開始',
    blurb:
      'Fifty-three new apartments on Alapai Street, between Makiki and downtown, a short walk to Queen’s Medical Center and the bus lines on Beretania.',
    blurbJa: 'アラパイ・ストリートの新築53戸。マキキとダウンタウンの間、クイーンズ・メディカル・センターやベレタニア通りのバス路線へ徒歩圏。',
    openIncome: true,
  },
  {
    slug: 'piikoi-flats',
    name: 'Piikoi Flats',
    address: '1525 Piikoi St, Honolulu, HI 96822',
    area: 'Makiki',
    units: null,
    completed: 2027,
    status: 'soon',
    statusLabel: 'Coming 2027',
    statusLabelJa: '2027年予定',
    blurb:
      'New apartments on Piikoi Street, minutes from Ala Moana Center and the beach, on one of the best bus corridors in town.',
    blurbJa: 'ピイコイ・ストリートの新築物件。アラモアナセンターとビーチへ数分、主要バス路線沿い。',
  },
  {
    slug: '2958-varsity',
    name: '2958 Varsity',
    address: '2958 Varsity Pl, Honolulu, HI 96826',
    area: 'Moʻiliʻili',
    units: null,
    completed: 2027,
    status: 'soon',
    statusLabel: 'Coming 2027',
    statusLabelJa: '2027年予定',
    blurb: 'New apartments steps from UH Mānoa and the shops along University Avenue.',
    blurbJa: 'ハワイ大学マノア校とユニバーシティ・アベニューの商店街至近の新築物件。',
  },
];

export const knownUnits = buildings.reduce((n, b) => n + (b.units ?? 0), 0);
export const allUnitsKnown = buildings.every((b) => b.units !== null);
