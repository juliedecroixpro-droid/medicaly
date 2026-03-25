export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function departmentSlug(code: string, name: string): string {
  return `${code}-${slugify(name)}`
}

export function citySlug(city: string, postalCode: string): string {
  return `${slugify(city)}-${postalCode}`
}

export function parseCitySlug(slug: string): { citySlug: string; postalCode: string; isGrandeVille?: boolean } | null {
  // Import lazily to avoid circular deps
  // Check if it's a clean "grande ville" slug (no postal code)
  const GRANDES_VILLES_SLUGS: Record<string, string> = {
    paris: '75001', marseille: '13001', lyon: '69001', toulouse: '31000',
    nice: '06000', nantes: '44000', montpellier: '34000', strasbourg: '67000',
    bordeaux: '33000', lille: '59000', rennes: '35000', reims: '51100',
    toulon: '83000', grenoble: '38000', dijon: '21000', angers: '49000',
    nimes: '30000', villeurbanne: '69100', 'le-mans': '72000',
    'aix-en-provence': '13100', 'clermont-ferrand': '63000', brest: '29200',
    tours: '37000', amiens: '80000', limoges: '87000', perpignan: '66000',
    metz: '57000', besancon: '25000', orleans: '45000', rouen: '76000',
    caen: '14000', nancy: '54000', avignon: '84000',
  }
  if (GRANDES_VILLES_SLUGS[slug]) {
    return { citySlug: slug, postalCode: GRANDES_VILLES_SLUGS[slug], isGrandeVille: true }
  }
  // Standard format: city-postalCode
  const match = slug.match(/^(.+)-(\d{5})$/)
  if (!match) return null
  return { citySlug: match[1], postalCode: match[2] }
}

export function parseDeptSlug(slug: string): { code: string; nameSlug: string } | null {
  // Handles: 01-ain, 2A-corse-du-sud, 971-guadeloupe
  const match = slug.match(/^([0-9]{1,3}[A-Z]{0,2})-(.+)$/)
  if (!match) return null
  return { code: match[1], nameSlug: match[2] }
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return digits.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
  }
  return phone
}

export function genderLabel(gender: string): string {
  return gender === 'M' ? 'Infirmier' : 'Infirmiere'
}

export function genderLabelFull(gender: string): string {
  return gender === 'M' ? 'Infirmier libéral' : 'Infirmiere libérale'
}
