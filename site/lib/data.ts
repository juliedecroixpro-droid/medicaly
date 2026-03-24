import fs from 'fs'
import path from 'path'
import { slugify, departmentSlug, citySlug } from './utils'

export interface Nurse {
  rpps: string
  id_pp: string
  gender: string
  last_name: string
  first_name: string
  address: string
  postal_code: string
  city: string
  department: string
  department_name: string
  phone: string
  phone2: string
  email: string
  cabinet: string
  siret: string
  specialties: string[]
}

export interface Department {
  code: string
  name: string
  slug: string
  count: number
}

export interface City {
  name: string
  slug: string
  postalCode: string
  departmentCode: string
  departmentName: string
  count: number
}

// Module-level cache - parsed once per build process
let _nurses: Nurse[] | null = null

export function loadNurses(): Nurse[] {
  if (_nurses) return _nurses
  const filePath = path.join(process.cwd(), 'data/idel_france_clean.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  _nurses = JSON.parse(raw) as Nurse[]
  return _nurses
}

export function getAllDepartments(): Department[] {
  const nurses = loadNurses()
  const map = new Map<string, Department>()
  for (const nurse of nurses) {
    const key = nurse.department
    const existing = map.get(key)
    if (!existing) {
      map.set(key, {
        code: nurse.department,
        name: nurse.department_name,
        slug: departmentSlug(nurse.department, nurse.department_name),
        count: 1,
      })
    } else {
      existing.count++
    }
  }
  return Array.from(map.values()).sort((a, b) => a.code.localeCompare(b.code))
}

export function getDepartmentByCode(code: string): Department | undefined {
  return getAllDepartments().find(d => d.code === code)
}

function aggregateCities(nurses: Nurse[]): City[] {
  // Group by city name + department (not postal code) to merge INSEE codes
  const map = new Map<string, { name: string; dept: string; deptName: string; postalCounts: Map<string, number>; total: number }>()
  for (const nurse of nurses) {
    const key = `${nurse.city.toLowerCase()}||${nurse.department}`
    const existing = map.get(key)
    if (!existing) {
      const pc = new Map<string, number>()
      pc.set(nurse.postal_code, 1)
      map.set(key, { name: nurse.city, dept: nurse.department, deptName: nurse.department_name, postalCounts: pc, total: 1 })
    } else {
      existing.total++
      existing.postalCounts.set(nurse.postal_code, (existing.postalCounts.get(nurse.postal_code) || 0) + 1)
    }
  }
  return Array.from(map.values()).map(entry => {
    // Pick the most common postal code as the canonical one
    let bestPostal = ''
    let bestCount = 0
    for (const [pc, count] of entry.postalCounts) {
      if (count > bestCount) { bestPostal = pc; bestCount = count }
    }
    return {
      name: entry.name,
      slug: citySlug(entry.name, bestPostal),
      postalCode: bestPostal,
      departmentCode: entry.dept,
      departmentName: entry.deptName,
      count: entry.total,
    }
  })
}

export function getCitiesByDepartment(deptCode: string): City[] {
  let nurses = loadNurses().filter(n => n.department === deptCode)
  // Paris (75): only keep cities starting with "Paris" (filter out suburban cities with wrong dept in RPPS data)
  if (deptCode === '75') {
    nurses = nurses.filter(n => n.city.toLowerCase().startsWith('paris'))
  }
  return aggregateCities(nurses).sort((a, b) => a.name.localeCompare(b.name))
}

export function getAllCities(): City[] {
  return aggregateCities(loadNurses())
}

export function getNursesByCity(postalCode: string): Nurse[] {
  const byPostal = loadNurses().filter(n => n.postal_code === postalCode)
  
  // Always try to match by city name + department to merge all postal/INSEE codes
  if (byPostal.length > 0) {
    const cityName = byPostal[0].city.toLowerCase()
    const dept = byPostal[0].department
    const byCityName = loadNurses().filter(
      n => n.city.toLowerCase() === cityName && n.department === dept
    )
    if (byCityName.length > byPostal.length) return byCityName
  }
  return byPostal
}

export function getNurseByRpps(rpps: string): Nurse | undefined {
  return loadNurses().find(n => n.rpps === rpps)
}

export function getNearbyNurses(postalCode: string, excludeRpps: string, limit = 5): Nurse[] {
  const nurses = getNursesByCity(postalCode)
  return nurses
    .filter(n => n.rpps !== excludeRpps)
    .slice(0, limit)
}

export function searchNurses(query: string): Nurse[] {
  if (!query || query.trim().length < 2) return []
  const q = query.toLowerCase().trim()
  const results: Nurse[] = []
  for (const nurse of loadNurses()) {
    if (
      nurse.last_name.toLowerCase().includes(q) ||
      nurse.first_name.toLowerCase().includes(q) ||
      nurse.city.toLowerCase().includes(q) ||
      nurse.postal_code.startsWith(q) ||
      (nurse.cabinet && nurse.cabinet.toLowerCase().includes(q))
    ) {
      results.push(nurse)
      if (results.length >= 50) break
    }
  }
  return results
}

export function getStats() {
  const nurses = loadNurses()
  const departments = new Set(nurses.map(n => n.department))
  const cities = new Set(nurses.map(n => `${n.city.toLowerCase()}||${n.department}`))
  return {
    totalNurses: nurses.length,
    totalDepartments: departments.size,
    totalCities: cities.size,
  }
}
