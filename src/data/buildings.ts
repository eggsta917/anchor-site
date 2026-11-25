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
  /** photo gallery under /public/images/<slug>/, in display order */
  gallery?: { file: string; alt: string }[];
  /** what every home includes, shown as a short list */
  features?: string[];
  /** unit-number endings (the last two digits) whose windows face the inner courtyard */
  courtyardStacks?: number[];
  /** YouTube video id for a walkthrough */
  videoId?: string;
  lat: number;
  lng: number;
};

// Launch portfolio. Earlier Bill 7 buildings (Ernest, Kinau, Algaroba, University)
// are managed separately and are not listed on the Anchor site for now.
export const buildings: Building[] = [
  {
    slug: '2958-varsity',
    name: '2958 Varsity',
    address: '2958 Varsity Pl, Honolulu, HI 96826',
    area: 'Moʻiliʻili',
    lat: 21.29269, lng: -157.81877,
    units: 25,
    completed: 2027,
    status: 'leasing',
    statusLabel: 'Leasing January 2027',
    statusLabelJa: '2027年1月入居開始',
    blurb: 'Twenty-five new apartments steps from UH Mānoa and the shops along University Avenue.',
    blurbJa: 'ハワイ大学マノア校とユニバーシティ・アベニューの商店街至近の新築25戸。',
  },
  {
    slug: 'piikoi-flats',
    name: 'Piikoi Flats',
    address: '1525 Piikoi St, Honolulu, HI 96822',
    area: 'Makiki',
    lat: 21.30475, lng: -157.84087,
    units: 34,
    completed: 2027,
    status: 'leasing',
    statusLabel: 'Leasing January 2027',
    statusLabelJa: '2027年1月入居開始',
    blurb:
      'Thirty-four new apartments on Piikoi Street, minutes from Ala Moana Center and the beach, on one of the best bus corridors in town.',
    blurbJa: 'ピイコイ・ストリートの新築34戸。アラモアナセンターとビーチへ数分、主要バス路線沿い。',
  },
  {
    slug: 'makiki-banyan',
    name: 'Makiki Banyan',
    address: '1568 Pensacola St, Honolulu, HI 96822',
    area: 'Makiki',
    lat: 21.30708, lng: -157.84176,
    units: 90,
    completed: 2026,
    status: 'leasing',
    statusLabel: 'Now leasing · available December 1, 2026',
    statusLabelJa: '入居者募集中・2026年12月1日入居可',
    blurb:
      'Our largest building: 80 one-bedroom and 10 two-bedroom apartments a short walk from Makiki District Park, each with its own washer and dryer.',
    blurbJa: '1ベッド80戸・2ベッド10戸の最大規模の物件。マキキ・ディストリクト・パーク至近、全戸に洗濯機・乾燥機付き。',
    mix: '80 × 1 bd (344–349 sq ft) · 10 × 2 bd (697 sq ft)',
    parking: 'Waitlisted',
    gallery: [
      { file: '01-living-room.jpg', alt: 'Living room' },
      { file: '02-living-room-2.jpg', alt: 'Living room and kitchen pass-through' },
      { file: '03-kitchen.jpg', alt: 'Kitchen' },
      { file: '04-kitchen-2.jpg', alt: 'Kitchen with stainless range and microwave' },
      { file: '05-washer-dryer.jpg', alt: 'In-unit washer and dryer' },
      { file: '06-bedroom.jpg', alt: 'Bedroom' },
      { file: '07-bedroom-2.jpg', alt: 'Bedroom with closet' },
      { file: '08-bathroom.jpg', alt: 'Bathroom' },
      { file: '09-bathroom-2.jpg', alt: 'Bathroom with tub and shower' },
      { file: '10-elevator-lobby.jpg', alt: 'Ground-floor elevator lobby and mailboxes' },
      { file: '11-elevator-hall.jpg', alt: 'Elevator hall' },
      { file: '12-hallway.jpg', alt: 'Hallway' },
      { file: '13-trash-chute.jpg', alt: 'Trash chute on each floor' },
      { file: '14-exterior.jpg', alt: 'Makiki Banyan from Pensacola Street' },
    ],
    features: [
      'Washer and dryer in every home',
      'Air conditioning in the living room and bedroom',
      'Kitchen with stainless range, microwave and refrigerator',
      'Two elevators',
      'Parking is waitlisted',
      'No pets; assistance animals are welcome',
    ],
    courtyardStacks: [2, 4, 6, 8, 11, 13, 15, 17],
    openIncome: true,
    plans: [
      { src: '/images/makiki-banyan-1br.jpg', caption: 'One-bedroom, 350 sq ft interior (20′4″ × 19′0″ overall). Separate bedroom (12′2″ × 9′3″), living/dining (12′2″ × 9′5″), full kitchen with breakfast bar, in-unit washer/dryer closet, through-wall A/C.' },
      { src: '/images/makiki-banyan-2br.jpg', caption: 'Two-bedroom, 695 sq ft interior (40′0″ × 20′4″ overall). Two bedrooms (12′0″ × 9′7″ and 12′0″ × 9′6″), open living/dining, kitchen 8′6″ × 11′4″, washer/dryer closet. Two per floor, corner units.' },
      { src: '/images/makiki-banyan-floorplan.jpg', caption: 'Typical floor, floors 2–6: 16 one-bedroom and 2 two-bedroom apartments around a central corridor.' },
    ],
  },
  {
    slug: 'alapai-vista',
    name: 'Alapai Vista',
    address: '1617 Alapai St, Honolulu, HI 96813',
    area: 'Punchbowl',
    lat: 21.30917, lng: -157.84869,
    units: 53,
    completed: 2026,
    status: 'soon',
    statusLabel: 'Leasing April 2027',
    statusLabelJa: '2027年4月入居開始',
    blurb:
      'Fifty-three new apartments on Alapai Street in Punchbowl, between Makiki and downtown, a short walk to Queen’s Medical Center and the bus lines on Beretania.',
    blurbJa: 'パンチボウル地区アラパイ・ストリートの新築53戸。マキキとダウンタウンの間、クイーンズ・メディカル・センターやベレタニア通りのバス路線へ徒歩圏。',
    openIncome: true,
  },
];

export const knownUnits = buildings.reduce((n, b) => n + (b.units ?? 0), 0);
export const allUnitsKnown = buildings.every((b) => b.units !== null);

/** Floor-plan image for a listing, matched by building and bedroom count. */
export function planFor(propertyName: string, bedrooms: number): string | undefined {
  const b = buildings.find((x) => x.name === propertyName);
  if (!b?.plans) return undefined;
  const key = bedrooms >= 2 ? '2br' : '1br';
  return b.plans.find((p) => p.src.includes(`-${key}.`))?.src;
}
