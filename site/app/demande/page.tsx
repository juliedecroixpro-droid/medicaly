'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ChevronRight, CheckCircle, Phone, MapPin, FileText, User,
  Clock, AlertCircle, Calendar, ArrowLeft, Stethoscope,
  Heart, Shield
} from 'lucide-react'

// --- Types ---
interface MatchedNurse {
  rpps: string
  slug: string
  gender: string
  firstName: string
  lastName: string
  address: string
  postalCode: string
  city: string
  phone: string
  cabinet: string | null
  distance: number | null
}

// --- Care types (langage patient) ---
const SOINS_ITEMS = [
  { id: 'pansement', label: 'Pansement', desc: 'Simple ou complexe, post-opératoire', icon: '🩹' },
  { id: 'injection', label: 'Piqûre / Injection', desc: 'Anticoagulant, insuline, vaccin...', icon: '💉' },
  { id: 'prise-de-sang', label: 'Prise de sang', desc: 'Bilan sanguin à domicile', icon: '🩸' },
  { id: 'ablation', label: 'Retrait de fils / agrafes', desc: 'Après une opération', icon: '✂️' },
  { id: 'perfusion', label: 'Perfusion', desc: 'Perfusion intraveineuse à domicile', icon: '💧' },
  { id: 'nursing', label: 'Aide à la toilette', desc: 'Nursing, hygiène quotidienne', icon: '🛁' },
  { id: 'medicaments', label: 'Médicaments / Pilulier', desc: 'Préparation et distribution', icon: '💊' },
  { id: 'diabete', label: 'Diabète / Glycémie', desc: 'Surveillance, injection insuline', icon: '📊' },
  { id: 'constantes', label: 'Prise de tension / Constantes', desc: 'Tension, pouls, température', icon: '❤️‍🩹' },
  { id: 'post-op', label: 'Soins post-opératoires', desc: 'Surveillance après chirurgie', icon: '🏥' },
  { id: 'chimio', label: 'Chimiothérapie', desc: 'Traitement anticancéreux à domicile', icon: '⚕️' },
  { id: 'sonde-stomie', label: 'Sonde / Stomie', desc: 'Soins urinaires ou digestifs', icon: '🔧' },
  { id: 'palliatif', label: 'Soins palliatifs', desc: 'Accompagnement fin de vie', icon: '🤝' },
  { id: 'autre', label: 'Autre soin', desc: 'Je ne sais pas / autre besoin', icon: '❓' },
]

const URGENCY_OPTIONS = [
  { id: 'urgent', label: "C'est urgent", desc: 'Dans les prochaines 24 heures', icon: '🔴', color: 'red' },
  { id: 'soon', label: 'Dans les prochains jours', desc: 'Pas immédiat mais assez vite', icon: '🟠', color: 'orange' },
  { id: 'planned', label: 'Soins planifiés', desc: 'Récurrents ou programmés', icon: '🔵', color: 'blue' },
]

const TIME_SLOTS = [
  { id: 'morning', label: 'Matin', desc: '7h - 12h', icon: '🌅' },
  { id: 'afternoon', label: 'Après-midi', desc: '12h - 18h', icon: '☀️' },
  { id: 'evening', label: 'Soir', desc: '18h - 20h', icon: '🌆' },
  { id: 'flexible', label: 'Peu importe', desc: 'Je suis flexible', icon: '🔄' },
]

function formatPhone(phone: string): string {
  const clean = phone.replace(/\D/g, '')
  if (clean.length === 10) return clean.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
  return phone
}

function genderTitle(gender: string): string {
  return gender === 'F' ? 'Mme' : 'M.'
}

// Total steps (excluding results)
const TOTAL_STEPS = 6

export default function DemandePage() {
  const [step, setStep] = useState(1)
  const [selectedSoins, setSelectedSoins] = useState<string[]>([])
  const [urgency, setUrgency] = useState('')
  const [ordonnance, setOrdonnance] = useState('')
  const [cp, setCp] = useState('')
  const [ville, setVille] = useState('')
  const [adresse, setAdresse] = useState('')
  const [startDate, setStartDate] = useState('')
  const [timeSlots, setTimeSlots] = useState<string[]>([])
  const [pourQui, setPourQui] = useState('moi')
  const [form, setForm] = useState({ prenom: '', nom: '', tel: '', email: '', message: '' })
  const [proches, setProches] = useState({ prenom: '', nom: '', lien: '' })
  const [submitted, setSubmitted] = useState(false)
  const [matchedNurses, setMatchedNurses] = useState<MatchedNurse[]>([])
  const [totalNurses, setTotalNurses] = useState(0)
  const [loading, setLoading] = useState(false)
  const [geoLoading, setGeoLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('cp')) setCp(params.get('cp')!)
    if (params.get('ville')) setVille(params.get('ville')!)
  }, [])

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const toggleSoin = (id: string) => {
    setSelectedSoins(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const toggleTime = (id: string) => {
    setTimeSlots(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const [geoError, setGeoError] = useState('')

  const handleGeolocate = async () => {
    if (!navigator.geolocation) {
      setGeoError('La géolocalisation n\'est pas disponible sur votre appareil.')
      return
    }
    setGeoLoading(true)
    setGeoError('')
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        let found = false

        // Try BAN API first (France only)
        try {
          const res = await fetch(
            `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}&limit=1`
          )
          const data = await res.json()
          if (data.features?.length > 0) {
            const props = data.features[0].properties
            if (props.postcode) { setCp(props.postcode); found = true }
            if (props.city) setVille(props.city)
            if (props.name) setAdresse(props.name)
          }
        } catch { /* try fallback */ }

        // Fallback: Nominatim
        if (!found) {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
              { headers: { 'Accept-Language': 'fr' } }
            )
            const data = await res.json()
            if (data.address) {
              if (data.address.postcode) { setCp(data.address.postcode); found = true }
              const city = data.address.city || data.address.town || data.address.village || ''
              if (city) setVille(city)
              const road = data.address.road || ''
              const houseNumber = data.address.house_number || ''
              if (road) setAdresse(houseNumber ? `${houseNumber} ${road}` : road)
            }
          } catch { /* silent */ }
        }

        if (!found) {
          setGeoError('Impossible de déterminer votre adresse. Saisissez-la manuellement.')
        }
        setGeoLoading(false)
      },
      (err) => {
        setGeoLoading(false)
        if (err.code === 1) {
          setGeoError('Vous avez refusé la géolocalisation. Autorisez-la dans les réglages de votre navigateur.')
        } else if (err.code === 2) {
          setGeoError('Position indisponible. Vérifiez que le GPS est activé.')
        } else {
          setGeoError('La géolocalisation a pris trop de temps. Saisissez votre adresse manuellement.')
        }
      },
      { timeout: 15000, enableHighAccuracy: true }
    )
  }

  const fetchMatches = async () => {
    if (!cp || cp.length < 5) return
    setLoading(true)
    try {
      const params = new URLSearchParams({ cp })
      if (adresse) params.set('address', adresse)
      const res = await fetch(`/api/match?${params.toString()}`)
      const data = await res.json()
      setMatchedNurses(data.nurses || [])
      setTotalNurses(data.total || 0)
    } catch { /* silent */ }
    setLoading(false)
  }

  const handleSubmit = async () => {
    setSubmitted(true)
    await fetchMatches()
  }

  // Validation per step
  const canNext: Record<number, boolean> = {
    1: selectedSoins.length > 0,
    2: urgency !== '',
    3: ordonnance !== '',
    4: cp.length >= 5,
    5: timeSlots.length > 0,
    6: form.prenom !== '' && form.nom !== '' && form.tel !== '',
  }

  const progress = ((step - 1) / TOTAL_STEPS) * 100

  const nextStep = () => {
    if (canNext[step] && step < TOTAL_STEPS) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  // Step titles for mobile context
  const stepTitles: Record<number, string> = {
    1: 'Type de soins',
    2: 'Urgence',
    3: 'Ordonnance',
    4: 'Localisation',
    5: 'Disponibilités',
    6: 'Vos coordonnées',
  }

  // --- Results page ---
  if (submitted) {
    const soinsLabels = SOINS_ITEMS
      .filter(i => selectedSoins.includes(i.id))
      .map(i => i.label)

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Full progress bar */}
        <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full mb-8">
          <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: '100%' }} />
        </div>

        {/* Success banner */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-900 mb-1">Demande enregistrée !</h1>
              <p className="text-green-700 text-sm">
                Votre demande de {soinsLabels[0]?.toLowerCase() || 'soins'} à {ville || cp} a bien été prise en compte.
                {matchedNurses.length > 0
                  ? ` ${totalNurses} infirmier${totalNurses > 1 ? 's' : ''} trouvé${totalNurses > 1 ? 's' : ''} dans votre secteur.`
                  : ' Nous recherchons un infirmier disponible.'}
              </p>
            </div>
          </div>
        </div>

        {/* Recap */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1A202C] mb-4">Récapitulatif</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-[#718096] mb-1">Soins</div>
              <div className="text-[#1A202C] font-medium">{soinsLabels.join(', ')}</div>
            </div>
            <div>
              <div className="text-[#718096] mb-1">Urgence</div>
              <div className="text-[#1A202C] font-medium">
                {urgency === 'urgent' ? '🔴 Urgent' : urgency === 'soon' ? '🟠 Prochains jours' : '🔵 Planifié'}
              </div>
            </div>
            <div>
              <div className="text-[#718096] mb-1">Lieu</div>
              <div className="text-[#1A202C] font-medium">{ville ? `${ville} (${cp})` : cp}</div>
            </div>
            <div>
              <div className="text-[#718096] mb-1">Patient</div>
              <div className="text-[#1A202C] font-medium">
                {form.prenom} {form.nom}
                {pourQui === 'proche' && proches.prenom && ` (pour ${proches.prenom})`}
              </div>
            </div>
          </div>
        </div>

        {/* Matched nurses */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-[#1E88E5] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-[#718096]">Recherche d&apos;infirmiers disponibles...</p>
          </div>
        ) : matchedNurses.length > 0 ? (
          <div>
            <h2 className="text-lg font-bold text-[#1A202C] mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-500" />
              {matchedNurses.length} infirmier{matchedNurses.length > 1 ? 's' : ''} les plus proches
            </h2>
            <p className="text-sm text-[#718096] mb-6">
              Appelez directement pour organiser votre prise en charge.
            </p>

            <div className="space-y-3 mb-8">
              {matchedNurses.map(nurse => (
                <div key={nurse.rpps} className="bg-white rounded-2xl border border-[#E2E8F0] p-4 hover:border-[#1E88E5] hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <Link href={`/infirmier/${nurse.slug || nurse.rpps}`} className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-[#1E88E5]" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#1A202C] text-sm">
                          {genderTitle(nurse.gender)} {nurse.firstName} {nurse.lastName}
                        </div>
                        <div className="text-xs text-[#718096] truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{nurse.postalCode} {nurse.city}</span>
                          {nurse.distance != null && (
                            <span className="text-[#1E88E5] font-semibold whitespace-nowrap">
                              · {nurse.distance < 1 ? `${Math.round(nurse.distance * 1000)}m` : `${nurse.distance} km`}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                    <a
                      href={`tel:${nurse.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors flex-shrink-0 ml-3"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="hidden sm:inline">{formatPhone(nurse.phone)}</span>
                      <span className="sm:hidden">Appeler</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#92400E] mb-1">Aucun infirmier trouvé</div>
                <p className="text-sm text-[#A16207]">
                  Essayez avec un code postal voisin.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#1E88E5] font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    )
  }

  // --- Wizard: 1 section per screen ---
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-900">
      {/* Sticky top bar with progress */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-[#E2E8F0] dark:border-gray-700">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="text-[#718096] hover:text-[#1A202C] disabled:opacity-0 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-[#4A5568] dark:text-gray-300">
              {stepTitles[step]}
            </span>
            <span className="text-xs text-[#A0AEC0]">
              {step}/{TOTAL_STEPS}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-[#E2E8F0] dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1E88E5] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* ============ STEP 1: Type de soins ============ */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#E3F2FD] flex items-center justify-center mx-auto mb-3">
                <Stethoscope className="w-7 h-7 text-[#1E88E5]" />
              </div>
              <h1 className="text-xl font-bold text-[#1A202C] dark:text-gray-100">
                De quel soin avez-vous besoin ?
              </h1>
              <p className="text-sm text-[#718096] dark:text-gray-400 mt-1">
                Sélectionnez un ou plusieurs soins
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SOINS_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleSoin(item.id)}
                  className={`text-left px-4 py-3.5 rounded-2xl border transition-all ${
                    selectedSoins.includes(item.id)
                      ? 'border-[#1E88E5] bg-[#E3F2FD] dark:bg-blue-900/30 ring-1 ring-[#1E88E5]'
                      : 'border-[#E2E8F0] dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-[#90CAF9]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${selectedSoins.includes(item.id) ? 'text-[#1565C0] dark:text-blue-300' : 'text-[#1A202C] dark:text-gray-100'}`}>
                        {item.label}
                      </div>
                      <div className="text-xs text-[#718096] dark:text-gray-400 truncate">{item.desc}</div>
                    </div>
                    {selectedSoins.includes(item.id) && (
                      <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={nextStep}
                disabled={!canNext[1]}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all ${
                  canNext[1]
                    ? 'bg-[#1E88E5] hover:bg-[#1565C0] text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30'
                    : 'bg-[#E2E8F0] dark:bg-gray-700 text-[#A0AEC0] cursor-not-allowed'
                }`}
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 2: Urgence ============ */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#E3F2FD] flex items-center justify-center mx-auto mb-3">
                <Clock className="w-7 h-7 text-[#1E88E5]" />
              </div>
              <h1 className="text-xl font-bold text-[#1A202C] dark:text-gray-100">
                C&apos;est urgent ?
              </h1>
              <p className="text-sm text-[#718096] dark:text-gray-400 mt-1">
                Cela nous aide à prioriser votre demande
              </p>
            </div>

            <div className="space-y-3">
              {URGENCY_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setUrgency(opt.id); setTimeout(() => setStep(3), 300) }}
                  className={`w-full text-left px-5 py-4 rounded-2xl border transition-all ${
                    urgency === opt.id
                      ? opt.color === 'red'
                        ? 'border-red-400 bg-red-50 dark:bg-red-900/20 ring-1 ring-red-400'
                        : opt.color === 'orange'
                          ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20 ring-1 ring-orange-400'
                          : 'border-[#1E88E5] bg-[#E3F2FD] dark:bg-blue-900/20 ring-1 ring-[#1E88E5]'
                      : 'border-[#E2E8F0] dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-[#90CAF9]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <div className={`font-semibold ${urgency === opt.id ? 'text-[#1A202C] dark:text-gray-100' : 'text-[#1A202C] dark:text-gray-100'}`}>
                        {opt.label}
                      </div>
                      <div className="text-xs text-[#718096] dark:text-gray-400">{opt.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {urgency && (
              <div className="pt-4">
                <button
                  onClick={nextStep}
                  className="w-full py-4 rounded-2xl font-semibold text-base bg-[#1E88E5] hover:bg-[#1565C0] text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all"
                >
                  Continuer
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============ STEP 3: Ordonnance ============ */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#E3F2FD] flex items-center justify-center mx-auto mb-3">
                <FileText className="w-7 h-7 text-[#1E88E5]" />
              </div>
              <h1 className="text-xl font-bold text-[#1A202C] dark:text-gray-100">
                Avez-vous une ordonnance ?
              </h1>
              <p className="text-sm text-[#718096] dark:text-gray-400 mt-1">
                L&apos;infirmier(e) pourra vous guider si besoin
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'oui', label: 'Oui, j\'ai une ordonnance', icon: '✅', desc: 'Prescrite par mon médecin' },
                { id: 'en-cours', label: 'C\'est en cours', icon: '⏳', desc: 'J\'attends de la recevoir' },
                { id: 'non', label: 'Pas encore', icon: '📋', desc: 'Je n\'en ai pas pour le moment' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setOrdonnance(opt.id); setTimeout(() => setStep(4), 300) }}
                  className={`w-full text-left px-5 py-4 rounded-2xl border transition-all ${
                    ordonnance === opt.id
                      ? 'border-[#1E88E5] bg-[#E3F2FD] dark:bg-blue-900/20 ring-1 ring-[#1E88E5]'
                      : 'border-[#E2E8F0] dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-[#90CAF9]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <div className="font-semibold text-[#1A202C] dark:text-gray-100">{opt.label}</div>
                      <div className="text-xs text-[#718096] dark:text-gray-400">{opt.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {ordonnance === 'non' && (
              <p className="text-xs text-[#92400E] dark:text-yellow-300 bg-[#FFFBEB] dark:bg-yellow-900/20 border border-[#FCD34D] dark:border-yellow-700 rounded-xl p-3">
                Pas de souci ! L&apos;infirmier(e) pourra vous guider pour obtenir une ordonnance.
              </p>
            )}

            {ordonnance && (
              <div className="pt-4">
                <button
                  onClick={nextStep}
                  className="w-full py-4 rounded-2xl font-semibold text-base bg-[#1E88E5] hover:bg-[#1565C0] text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all"
                >
                  Continuer
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============ STEP 4: Localisation ============ */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#E3F2FD] flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-7 h-7 text-[#1E88E5]" />
              </div>
              <h1 className="text-xl font-bold text-[#1A202C] dark:text-gray-100">
                Où souhaitez-vous les soins ?
              </h1>
            </div>

            {/* Géolocalisation */}
            <button
              onClick={handleGeolocate}
              disabled={geoLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl border-2 border-dashed border-[#1E88E5] bg-[#E3F2FD] dark:bg-blue-900/20 text-[#1565C0] dark:text-blue-300 text-sm font-medium hover:bg-[#BBDEFB] transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {geoLoading ? 'Localisation en cours...' : '📍 Me géolocaliser automatiquement'}
            </button>

            {geoError && (
              <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                {geoError}
              </p>
            )}

            <div className="text-xs text-[#A0AEC0] text-center">ou saisissez manuellement</div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-[#718096] dark:text-gray-400 mb-1.5 block">Adresse du patient</label>
                <input
                  type="text"
                  value={adresse}
                  onChange={e => setAdresse(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border border-[#E2E8F0] dark:border-gray-600 text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="12 rue de la Paix"
                />
                <p className="text-xs text-[#A0AEC0] mt-1">Pour trouver les infirmiers les plus proches</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-medium text-[#718096] dark:text-gray-400 mb-1.5 block">Ville</label>
                  <input
                    type="text"
                    value={ville}
                    onChange={e => setVille(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-[#E2E8F0] dark:border-gray-600 text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 dark:bg-gray-800 dark:text-gray-100"
                    placeholder="Paris"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#718096] dark:text-gray-400 mb-1.5 block">Code postal *</label>
                  <input
                    type="text"
                    value={cp}
                    onChange={e => setCp(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    className="w-full px-4 py-3.5 rounded-2xl border border-[#E2E8F0] dark:border-gray-600 text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 dark:bg-gray-800 dark:text-gray-100"
                    placeholder="75009"
                    maxLength={5}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={nextStep}
                disabled={!canNext[4]}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all ${
                  canNext[4]
                    ? 'bg-[#1E88E5] hover:bg-[#1565C0] text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30'
                    : 'bg-[#E2E8F0] dark:bg-gray-700 text-[#A0AEC0] cursor-not-allowed'
                }`}
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 5: Date et créneaux ============ */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#E3F2FD] flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-7 h-7 text-[#1E88E5]" />
              </div>
              <h1 className="text-xl font-bold text-[#1A202C] dark:text-gray-100">
                Quand êtes-vous disponible ?
              </h1>
              <p className="text-sm text-[#718096] dark:text-gray-400 mt-1">
                Choisissez vos créneaux préférés
              </p>
            </div>

            {/* Date */}
            <div>
              <label className="text-xs font-medium text-[#718096] dark:text-gray-400 mb-1.5 block">Date de début souhaitée</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3.5 rounded-2xl border border-[#E2E8F0] dark:border-gray-600 text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            {/* Time slots */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#718096] dark:text-gray-400 mb-1.5 block">Créneaux préférés *</label>
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => toggleTime(slot.id)}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl border transition-all ${
                    timeSlots.includes(slot.id)
                      ? 'border-[#1E88E5] bg-[#E3F2FD] dark:bg-blue-900/20 ring-1 ring-[#1E88E5]'
                      : 'border-[#E2E8F0] dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-[#90CAF9]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{slot.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-[#1A202C] dark:text-gray-100">{slot.label}</div>
                        <div className="text-xs text-[#718096] dark:text-gray-400">{slot.desc}</div>
                      </div>
                    </div>
                    {timeSlots.includes(slot.id) && <CheckCircle className="w-5 h-5 text-[#1E88E5]" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={nextStep}
                disabled={!canNext[5]}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all ${
                  canNext[5]
                    ? 'bg-[#1E88E5] hover:bg-[#1565C0] text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30'
                    : 'bg-[#E2E8F0] dark:bg-gray-700 text-[#A0AEC0] cursor-not-allowed'
                }`}
              >
                Dernière étape
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 6: Coordonnées ============ */}
        {step === 6 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#E3F2FD] flex items-center justify-center mx-auto mb-3">
                <User className="w-7 h-7 text-[#1E88E5]" />
              </div>
              <h1 className="text-xl font-bold text-[#1A202C] dark:text-gray-100">
                Dernière étape !
              </h1>
              <p className="text-sm text-[#718096] dark:text-gray-400 mt-1">
                Pour que l&apos;infirmier(e) puisse vous contacter
              </p>
            </div>

            {/* Pour qui */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'moi', label: '👤 Pour moi' },
                { id: 'proche', label: '👥 Pour un proche' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setPourQui(opt.id)}
                  className={`text-center px-4 py-3 rounded-2xl border text-sm transition-all ${
                    pourQui === opt.id
                      ? 'border-[#1E88E5] bg-[#E3F2FD] dark:bg-blue-900/20 text-[#1565C0] font-medium ring-1 ring-[#1E88E5]'
                      : 'border-[#E2E8F0] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#4A5568] dark:text-gray-300 hover:border-[#90CAF9]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Coordonnées */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#718096] dark:text-gray-400 mb-1.5 block">Prénom *</label>
                  <input type="text" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl border border-[#E2E8F0] dark:border-gray-600 text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 dark:bg-gray-800 dark:text-gray-100"
                    placeholder="Jean" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#718096] dark:text-gray-400 mb-1.5 block">Nom *</label>
                  <input type="text" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl border border-[#E2E8F0] dark:border-gray-600 text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 dark:bg-gray-800 dark:text-gray-100"
                    placeholder="Dupont" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[#718096] dark:text-gray-400 mb-1.5 block flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Téléphone *
                </label>
                <input type="tel" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl border border-[#E2E8F0] dark:border-gray-600 text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="06 12 34 56 78" />
              </div>
            </div>

            {/* Proche info */}
            {pourQui === 'proche' && (
              <div className="space-y-3 bg-[#F7FAFC] dark:bg-gray-800/50 rounded-2xl p-4 border border-[#E2E8F0] dark:border-gray-700">
                <div className="text-xs font-semibold text-[#718096] dark:text-gray-400 uppercase tracking-wide">Patient</div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={proches.prenom} onChange={e => setProches({ ...proches, prenom: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-gray-600 text-sm focus:outline-none focus:border-[#1E88E5] dark:bg-gray-800 dark:text-gray-100"
                    placeholder="Prénom du patient" />
                  <input type="text" value={proches.nom} onChange={e => setProches({ ...proches, nom: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-gray-600 text-sm focus:outline-none focus:border-[#1E88E5] dark:bg-gray-800 dark:text-gray-100"
                    placeholder="Nom du patient" />
                </div>
              </div>
            )}

            {/* Message optionnel */}
            <div>
              <label className="text-xs font-medium text-[#718096] dark:text-gray-400 mb-1.5 block">Précisions (optionnel)</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-[#E2E8F0] dark:border-gray-600 text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 h-20 resize-none dark:bg-gray-800 dark:text-gray-100"
                placeholder="Étage, digicode, contraintes horaires..." />
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 text-xs text-[#718096] dark:text-gray-400">
              <div className="flex items-center gap-1"><Shield className="w-3 h-3 text-green-500" /> Sécurisé</div>
              <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Gratuit</div>
              <div className="flex items-center gap-1"><Phone className="w-3 h-3 text-green-500" /> Sans engagement</div>
            </div>

            <button
              onClick={() => canNext[6] && handleSubmit()}
              disabled={!canNext[6]}
              className={`w-full py-4 rounded-2xl font-semibold text-base transition-all ${
                canNext[6]
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-200 dark:shadow-green-900/30'
                  : 'bg-[#E2E8F0] dark:bg-gray-700 text-[#A0AEC0] cursor-not-allowed'
              }`}
            >
              🔍 Trouver un infirmier disponible
            </button>

            <p className="text-xs text-[#A0AEC0] text-center">
              En continuant, vous acceptez d&apos;être contacté par un professionnel de santé.{' '}
              <Link href="/confidentialite" className="underline">Confidentialité</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
