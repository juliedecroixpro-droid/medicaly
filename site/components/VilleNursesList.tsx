'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Phone, MapPin, Building2, ChevronLeft, ChevronRight } from 'lucide-react'
import Avatar from './Avatar'

interface Nurse {
  rpps: string
  gender: string
  last_name: string
  first_name: string
  address: string
  postal_code: string
  city: string
  phone?: string
  phone2?: string
  cabinet?: string
}

interface Props {
  nurses: Nurse[]
  cityName: string
  totalCount: number
}

const ITEMS_PER_PAGE = 20

export default function VilleNursesList({ nurses, cityName, totalCount }: Props) {
  const [page, setPage] = useState(1)
  const [genderFilter, setGenderFilter] = useState<string>('all')
  const [cabinetFilter, setCabinetFilter] = useState<string>('all')
  const [phoneFilter, setPhoneFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')

  const filteredAndSorted = useMemo(() => {
    let result = [...nurses]

    // Filters
    if (genderFilter !== 'all') {
      result = result.filter(n => n.gender === genderFilter)
    }
    if (cabinetFilter === 'yes') {
      result = result.filter(n => n.cabinet)
    } else if (cabinetFilter === 'no') {
      result = result.filter(n => !n.cabinet)
    }
    if (phoneFilter === 'yes') {
      result = result.filter(n => n.phone || n.phone2)
    } else if (phoneFilter === 'no') {
      result = result.filter(n => !n.phone && !n.phone2)
    }

    // Sort
    if (sortBy === 'name') {
      result.sort((a, b) => a.last_name.localeCompare(b.last_name))
    } else if (sortBy === 'cabinet') {
      result.sort((a, b) => {
        if (a.cabinet && !b.cabinet) return -1
        if (!a.cabinet && b.cabinet) return 1
        return a.last_name.localeCompare(b.last_name)
      })
    }

    return result
  }, [nurses, genderFilter, cabinetFilter, phoneFilter, sortBy])

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE)
  const paginatedNurses = filteredAndSorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const resetToPage1 = () => setPage(1)

  return (
    <div>
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#E2E8F0] dark:border-gray-700 p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#4A5568] dark:text-gray-400 mb-1">Genre</label>
            <select
              value={genderFilter}
              onChange={(e) => { setGenderFilter(e.target.value); resetToPage1() }}
              className="w-full px-3 py-2 text-sm border border-[#E2E8F0] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="all">Tous</option>
              <option value="F">Femmes</option>
              <option value="M">Hommes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#4A5568] dark:text-gray-400 mb-1">Cabinet</label>
            <select
              value={cabinetFilter}
              onChange={(e) => { setCabinetFilter(e.target.value); resetToPage1() }}
              className="w-full px-3 py-2 text-sm border border-[#E2E8F0] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="all">Tous</option>
              <option value="yes">Avec cabinet</option>
              <option value="no">Sans cabinet</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#4A5568] dark:text-gray-400 mb-1">Telephone</label>
            <select
              value={phoneFilter}
              onChange={(e) => { setPhoneFilter(e.target.value); resetToPage1() }}
              className="w-full px-3 py-2 text-sm border border-[#E2E8F0] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="all">Tous</option>
              <option value="yes">Avec telephone</option>
              <option value="no">Sans telephone</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#4A5568] dark:text-gray-400 mb-1">Trier par</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#E2E8F0] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="name">Nom (A-Z)</option>
              <option value="cabinet">Cabinet en premier</option>
            </select>
          </div>
        </div>

        <div className="mt-3 text-xs text-[#718096] dark:text-gray-400">
          {filteredAndSorted.length} résultat{filteredAndSorted.length > 1 ? 's' : ''} sur {totalCount}
        </div>
      </div>

      {/* Nurses grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {paginatedNurses.map((nurse) => {
          const fullName = `${nurse.first_name} ${nurse.last_name}`
          const phone = nurse.phone || nurse.phone2
          
          return (
            <div
              key={nurse.rpps}
              className="bg-white dark:bg-gray-800 border border-[#E2E8F0] dark:border-gray-700 rounded-xl p-4 hover:border-[#1E88E5] hover:shadow-md transition-all"
            >
              <Link href={`/infirmier/${nurse.rpps}`} className="block">
                <div className="flex items-start gap-3">
                  <Avatar name={fullName} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-[#1A202C] dark:text-gray-100 truncate">
                        {fullName}
                      </h3>
                      {nurse.cabinet && (
                        <span className="text-[10px] font-medium bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Cabinet</span>
                      )}
                      {phone && (
                        <span className="text-[10px] font-medium bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Tel.</span>
                      )}
                    </div>
                    <div className="space-y-1 mt-2 text-xs text-[#718096] dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{nurse.address}, {nurse.postal_code} {nurse.city}</span>
                      </div>
                      {nurse.cabinet && (
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{nurse.cabinet}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  onClick={e => e.stopPropagation()}
                  className="mt-3 flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors md:hidden"
                >
                  <Phone className="w-4 h-4" />
                  Appeler
                </a>
              )}
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg border border-[#E2E8F0] dark:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F7FAFC] dark:hover:bg-gray-700 transition-colors"
            aria-label="Page precedente"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (page <= 3) {
                pageNum = i + 1
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = page - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    page === pageNum
                      ? 'bg-[#1E88E5] text-white'
                      : 'border border-[#E2E8F0] dark:border-gray-600 text-[#4A5568] dark:text-gray-300 hover:bg-[#F7FAFC] dark:hover:bg-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg border border-[#E2E8F0] dark:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F7FAFC] dark:hover:bg-gray-700 transition-colors"
            aria-label="Page suivante"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
