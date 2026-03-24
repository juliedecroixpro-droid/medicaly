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

export function parseCitySlug(slug: string): { citySlug: string; postalCode: string } | null {
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
