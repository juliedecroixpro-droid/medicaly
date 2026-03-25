// Approximate department populations (2024 estimates, rounded)
export const DEPT_POPULATIONS: Record<string, number> = {
  '01': 660000, '02': 530000, '03': 330000, '04': 165000, '05': 142000,
  '06': 1090000, '07': 330000, '08': 270000, '09': 153000, '10': 310000,
  '11': 380000, '12': 280000, '13': 2050000, '14': 695000, '15': 144000,
  '16': 350000, '17': 660000, '18': 302000, '19': 239000, '21': 535000,
  '22': 615000, '23': 116000, '24': 415000, '25': 596000, '26': 525000,
  '27': 610000, '28': 433000, '29': 910000, '2A': 160000, '2B': 182000,
  '30': 760000, '31': 1415000, '32': 191000, '33': 1640000, '34': 1210000,
  '35': 1100000, '36': 218000, '37': 615000, '38': 1275000, '39': 258000,
  '40': 420000, '41': 332000, '42': 770000, '43': 228000, '44': 1440000,
  '45': 680000, '46': 174000, '47': 334000, '48': 76000, '49': 820000,
  '50': 496000, '51': 567000, '52': 172000, '53': 307000, '54': 732000,
  '55': 180000, '56': 762000, '57': 1043000, '58': 203000, '59': 2604000,
  '60': 830000, '61': 279000, '62': 1470000, '63': 665000, '64': 682000,
  '65': 229000, '66': 483000, '67': 1150000, '68': 767000, '69': 1880000,
  '70': 235000, '71': 552000, '72': 569000, '73': 440000, '74': 830000,
  '75': 2145000, '76': 1255000, '77': 1427000, '78': 1448000, '79': 374000,
  '80': 571000, '81': 390000, '82': 261000, '83': 1088000, '84': 561000,
  '85': 680000, '86': 440000, '87': 373000, '88': 364000, '89': 334000,
  '90': 139000, '91': 1339000, '92': 1634000, '93': 1647000, '94': 1403000,
  '95': 1251000, '971': 376000, '972': 361000, '973': 290000, '974': 860000,
  '976': 280000,
}

// Top 50 cities populations (approximate 2024)
export const CITY_POPULATIONS: Record<string, number> = {
  paris: 2145000,
  marseille: 870000,
  lyon: 520000,
  toulouse: 480000,
  nice: 340000,
  nantes: 315000,
  montpellier: 295000,
  strasbourg: 285000,
  bordeaux: 257000,
  lille: 235000,
  rennes: 220000,
  reims: 182000,
  toulon: 176000,
  'le-havre': 170000,
  grenoble: 158000,
  dijon: 157000,
  angers: 155000,
  nimes: 152000,
  villeurbanne: 150000,
  'le-mans': 143000,
  'aix-en-provence': 145000,
  'clermont-ferrand': 147000,
  brest: 140000,
  tours: 136000,
  amiens: 133000,
  limoges: 132000,
  annecy: 128000,
  perpignan: 121000,
  'boulogne-billancourt': 120000,
  metz: 116000,
  besancon: 116000,
  orleans: 116000,
  'saint-denis': 113000,
  'argenteuil': 110000,
  rouen: 111000,
  montreuil: 108000,
  mulhouse: 108000,
  caen: 105000,
  nancy: 104000,
  'saint-paul': 104000,
  roubaix: 98000,
  tourcoing: 97000,
  nanterre: 96000,
  avignon: 91000,
  vitry: 95000,
  creteil: 91000,
  dunkerque: 87000,
  poitiers: 90000,
  'asnieres-sur-seine': 87000,
  versailles: 85000,
}

export function getDepartmentPopulation(deptCode: string): number | null {
  return DEPT_POPULATIONS[deptCode] || null
}

export function getCityPopulation(citySlug: string): number | null {
  return CITY_POPULATIONS[citySlug] || null
}

// Calculate IDEL per 100K inhabitants
export function calculateRatio(idelCount: number, population: number): number {
  return Math.round((idelCount / population) * 100000)
}
