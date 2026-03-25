'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ChevronRight, CheckCircle, Phone, MapPin, FileText, User,
  Clock, AlertCircle, Calendar, ArrowLeft, Search, Stethoscope,
  Heart, Syringe, Shield
} from 'lucide-react'

// --- Types ---
interface MatchedNurse {
  rpps: string
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

// --- Care types ---
const SOINS_CATEGORIES = [
  {
    category: 'Soins courants',
    icon: '💉',
    items: [
      { id: 'pansement', label: 'Pansement (simple ou complexe)' },
      { id: 'injection', label: 'Injection (anticoagulant, insuline, vaccin...)' },
      { id: 'prise-de-sang', label: 'Prise de sang / Bilan sanguin' },
      { id: 'ablation', label: 'Ablation fils de suture / agrafes' },
    ],
  },
  {
    category: 'Soins spécialisés',
    icon: '🏥',
    items: [
      { id: 'perfusion', label: 'Perfusion à domicile' },
      { id: 'chimio', label: 'Chimiothérapie à domicile' },
      { id: 'sonde-stomie', label: 'Soins de sonde / stomie' },
      { id: 'oxygenotherapie', label: 'Oxygénothérapie' },
      { id: 'palliatif', label: 'Soins palliatifs' },
    ],
  },
  {
    category: 'Soins quotidiens',
    icon: '🏠',
    items: [
      { id: 'nursing', label: 'Aide à la toilette / Nursing' },
      { id: 'medicaments', label: 'Distribution de médicaments / Pilulier' },
      { id: 'diabete', label: 'Surveillance glycémie / Diabète' },
      { id: 'constantes', label: 'Surveillance constantes (tension, pouls...)' },
      { id: 'post-op', label: 'Soins post-opératoires' },
    ],
  },
]

const URGENCY_OPTIONS = [
  { id: 'urgent', label: "C'est urgent (dans les 24h)", color: 'red' },
  { id: 'soon', label: 'Dans les prochains jours', color: 'orange' },
  { id: 'planned', label: 'Soins planifiés / récurrents', color: 'blue' },
]

const TIME_SLOTS = [
  { id: 'morning', label: 'Matin (7h-12h)', icon: '🌅' },
  { id: 'afternoon', label: 'Après-midi (12h-18h)', icon: '☀️' },
  { id: 'evening', label: 'Soir (18h-20h)', icon: '🌆' },
  { id: 'flexible', label: 'Flexible / Peu importe', icon: '🔄' },
]

function formatPhone(phone: string): string {
  const clean = phone.replace(/\D/g, '')
  if (clean.length === 10) {
    return clean.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
  }
  return phone
}

function genderTitle(gender: string): string {
  return gender === 'F' ? 'Mme' : 'M.'
}

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
  const [lieu, setLieu] = useState('domicile')
  const [pourQui, setPourQui] = useState('moi')
  const [form, setForm] = useState({ prenom: '', nom: '', tel: '', email: '', message: '' })
  const [proches, setProches] = useState({ prenom: '', nom: '', lien: '' })
  const [submitted, setSubmitted] = useState(false)
  const [matchedNurses, setMatchedNurses] = useState<MatchedNurse[]>([])
  const [totalNurses, setTotalNurses] = useState(0)
  const [loading, setLoading] = useState(false)
  const [geoLoading, setGeoLoading] = useState(false)

  // Read URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('cp')) setCp(params.get('cp')!)
    if (params.get('ville')) setVille(params.get('ville')!)
  }, [])

  const toggleSoin = (id: string) => {
    setSelectedSoins(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const toggleTime = (id: string) => {
    setTimeSlots(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const handleGeolocate = async () => {
    if (!navigator.geolocation) return
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&addressdetails=1`,
            { headers: { 'Accept-Language': 'fr' } }
          )
          const data = await res.json()
          if (data.address?.postcode) setCp(data.address.postcode)
          if (data.address?.city || data.address?.town || data.address?.village) {
            setVille(data.address.city || data.address.town || data.address.village)
          }
        } catch { /* silent */ }
        setGeoLoading(false)
      },
      () => setGeoLoading(false),
      { timeout: 10000 }
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

  // Validation
  const canStep1 = selectedSoins.length > 0 && urgency !== '' && ordonnance !== ''
  const canStep2 = cp.length >= 5 && timeSlots.length > 0
  const canStep3 = form.prenom && form.nom && form.tel

  // Step labels for the stepper
  const steps = [
    { num: 1, label: 'Soins', icon: Stethoscope },
    { num: 2, label: 'Lieu et date', icon: MapPin },
    { num: 3, label: 'Patient', icon: User },
    { num: 4, label: 'Résultats', icon: Heart },
  ]

  // --- Step 4: Results ---
  if (submitted) {
    const soinsLabels = SOINS_CATEGORIES.flatMap(c => c.items)
      .filter(i => selectedSoins.includes(i.id))
      .map(i => i.label)

    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A202C] font-medium">Résultats de votre demande</span>
        </nav>

        {/* Success banner */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-900 mb-1">Demande enregistrée !</h1>
              <p className="text-green-700 text-sm">
                Votre demande de {soinsLabels[0]?.toLowerCase() || 'soins'} à {ville || cp} a bien été prise en compte.
                {matchedNurses.length > 0
                  ? ` Nous avons trouvé ${totalNurses} infirmier${totalNurses > 1 ? 's' : ''} dans votre secteur.`
                  : ' Nous recherchons un infirmier disponible.'}
              </p>
            </div>
          </div>
        </div>

        {/* Recap card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1A202C] mb-4">Récapitulatif de votre demande</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-[#718096] mb-1">Soins demandés</div>
              <div className="text-[#1A202C] font-medium">{soinsLabels.join(', ')}</div>
            </div>
            <div>
              <div className="text-[#718096] mb-1">Urgence</div>
              <div className="text-[#1A202C] font-medium">
                {urgency === 'urgent' ? '🔴 Urgent (24h)' : urgency === 'soon' ? '🟠 Prochains jours' : '🔵 Planifié'}
              </div>
            </div>
            <div>
              <div className="text-[#718096] mb-1">Localisation</div>
              <div className="text-[#1A202C] font-medium">{ville ? `${ville} (${cp})` : cp}</div>
            </div>
            <div>
              <div className="text-[#718096] mb-1">Ordonnance</div>
              <div className="text-[#1A202C] font-medium">
                {ordonnance === 'oui' ? '✅ Oui' : ordonnance === 'en-cours' ? '⏳ En cours' : '❌ Non'}
              </div>
            </div>
            <div>
              <div className="text-[#718096] mb-1">Patient</div>
              <div className="text-[#1A202C] font-medium">
                {form.prenom} {form.nom}
                {pourQui === 'proche' && proches.prenom && ` (pour ${proches.prenom} ${proches.nom})`}
              </div>
            </div>
            <div>
              <div className="text-[#718096] mb-1">Téléphone</div>
              <div className="text-[#1A202C] font-medium">{formatPhone(form.tel)}</div>
            </div>
          </div>
        </div>

        {/* Matched nurses */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-[#1E88E5] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-[#718096]">Recherche d'infirmiers disponibles...</p>
          </div>
        ) : matchedNurses.length > 0 ? (
          <div>
            <h2 className="text-lg font-bold text-[#1A202C] mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-500" />
              {matchedNurses.length} infirmier{matchedNurses.length > 1 ? 's' : ''} les plus proches de chez vous
            </h2>
            <p className="text-sm text-[#718096] mb-6">
              Contactez-les directement par téléphone pour organiser votre prise en charge.
              {totalNurses > matchedNurses.length && ` (${totalNurses} IDEL au total dans le secteur)`}
            </p>

            <div className="space-y-3 mb-8">
              {matchedNurses.map(nurse => (
                <div key={nurse.rpps} className="bg-white rounded-xl border border-[#E2E8F0] p-4 hover:border-[#1E88E5] hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <Link href={`/infirmier/${nurse.rpps}`} className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-[#1E88E5]" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#1A202C] text-sm hover:text-[#1E88E5] transition-colors">
                          {genderTitle(nurse.gender)} {nurse.firstName} {nurse.lastName}
                        </div>
                        <div className="text-xs text-[#718096] truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          {nurse.address}, {nurse.postalCode} {nurse.city}
                          {nurse.distance != null && (
                            <span className="ml-1 text-[#1E88E5] font-semibold whitespace-nowrap">
                              ({nurse.distance < 1 ? `${Math.round(nurse.distance * 1000)}m` : `${nurse.distance} km`})
                            </span>
                          )}
                        </div>
                        {nurse.cabinet && (
                          <div className="text-xs text-[#718096] truncate">{nurse.cabinet}</div>
                        )}
                      </div>
                    </Link>
                    <a
                      href={`tel:${nurse.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex-shrink-0 ml-3"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="hidden sm:inline">{formatPhone(nurse.phone)}</span>
                      <span className="sm:hidden">Appeler</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {totalNurses > matchedNurses.length && (
              <div className="text-center mb-8">
                <Link
                  href={`/ville/${cp.toLowerCase()}`}
                  className="inline-flex items-center gap-2 text-[#1E88E5] font-medium hover:underline"
                >
                  Voir les {totalNurses} infirmiers du secteur <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#92400E] mb-1">Aucun infirmier trouvé dans votre secteur</div>
                <p className="text-sm text-[#A16207]">
                  Nous n'avons pas trouvé d'IDEL avec numéro de téléphone dans le {cp}.
                  Essayez avec un code postal voisin ou consultez l'annuaire par département.
                </p>
                <Link href="/departement" className="text-sm text-[#1E88E5] hover:underline mt-2 inline-block">
                  Voir les départements
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Next steps info */}
        <div className="bg-[#E3F2FD] rounded-xl p-6 mb-8">
          <h3 className="font-bold text-[#1A202C] mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#1E88E5]" />
            Prochaines étapes
          </h3>
          <ol className="space-y-2 text-sm text-[#4A5568]">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1E88E5] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Appelez l'un des infirmiers ci-dessus pour convenir d'un rendez-vous</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1E88E5] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Préparez votre ordonnance et votre carte Vitale</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1E88E5] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>L'infirmier(e) se déplace à votre domicile pour réaliser les soins</span>
            </li>
          </ol>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1E88E5] font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  // --- Wizard steps 1-3 ---
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A202C] font-medium">Demande de soins à domicile</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#1A202C] mb-1">Demande de soins à domicile</h1>
      <p className="text-[#718096] text-sm mb-8">
        Gratuit, sans engagement. Trouvez un infirmier disponible en quelques minutes.
      </p>

      {/* Visual stepper */}
      <div className="flex items-center mb-10">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > s.num
                    ? 'bg-green-500 text-white'
                    : step === s.num
                      ? 'bg-[#1E88E5] text-white shadow-lg shadow-blue-200'
                      : 'bg-[#E2E8F0] text-[#A0AEC0]'
                }`}
              >
                {step > s.num ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
              </div>
              <span className={`text-xs mt-1.5 hidden sm:block ${step >= s.num ? 'text-[#1A202C] font-medium' : 'text-[#A0AEC0]'}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${step > s.num ? 'bg-green-500' : 'bg-[#E2E8F0]'}`} />
            )}
          </div>
        ))}
      </div>

      {/* STEP 1: Soins + Urgence + Ordonnance */}
      {step === 1 && (
        <div className="space-y-8">
          {/* Care type selection */}
          <div>
            <h2 className="text-lg font-bold text-[#1A202C] mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-[#1E88E5]" /> De quel(s) soin(s) avez-vous besoin ?
            </h2>
            {SOINS_CATEGORIES.map(cat => (
              <div key={cat.category} className="mb-4">
                <div className="text-sm font-semibold text-[#718096] mb-2 flex items-center gap-2">
                  <span>{cat.icon}</span> {cat.category}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cat.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleSoin(item.id)}
                      className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                        selectedSoins.includes(item.id)
                          ? 'border-[#1E88E5] bg-[#E3F2FD] text-[#1565C0] font-medium'
                          : 'border-[#E2E8F0] bg-white text-[#4A5568] hover:border-[#90CAF9]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {selectedSoins.includes(item.id) && <CheckCircle className="w-4 h-4 text-[#1E88E5] flex-shrink-0 ml-2" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Urgency */}
          <div>
            <h2 className="text-lg font-bold text-[#1A202C] mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1E88E5]" /> Quel est le niveau d'urgence ?
            </h2>
            <div className="space-y-2">
              {URGENCY_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setUrgency(opt.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    urgency === opt.id
                      ? opt.color === 'red'
                        ? 'border-red-400 bg-red-50 text-red-700 font-medium'
                        : opt.color === 'orange'
                          ? 'border-orange-400 bg-orange-50 text-orange-700 font-medium'
                          : 'border-[#1E88E5] bg-[#E3F2FD] text-[#1565C0] font-medium'
                      : 'border-[#E2E8F0] bg-white text-[#4A5568] hover:border-[#90CAF9]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ordonnance */}
          <div>
            <h2 className="text-lg font-bold text-[#1A202C] mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1E88E5]" /> Avez-vous une ordonnance ?
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'oui', label: 'Oui', icon: '✅' },
                { id: 'en-cours', label: 'En cours', icon: '⏳' },
                { id: 'non', label: 'Pas encore', icon: '❌' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setOrdonnance(opt.id)}
                  className={`text-center px-4 py-3 rounded-xl border text-sm transition-all ${
                    ordonnance === opt.id
                      ? 'border-[#1E88E5] bg-[#E3F2FD] text-[#1565C0] font-medium'
                      : 'border-[#E2E8F0] bg-white text-[#4A5568] hover:border-[#90CAF9]'
                  }`}
                >
                  <div className="text-lg mb-1">{opt.icon}</div>
                  {opt.label}
                </button>
              ))}
            </div>
            {ordonnance === 'non' && (
              <p className="text-xs text-[#92400E] mt-2 bg-[#FFFBEB] border border-[#FCD34D] rounded-lg p-3">
                Pas de souci ! L'infirmier(e) pourra vous guider pour obtenir une ordonnance auprès de votre médecin.
              </p>
            )}
          </div>

          <button
            onClick={() => canStep1 && setStep(2)}
            disabled={!canStep1}
            className={`w-full py-3.5 rounded-xl font-semibold text-base transition-colors ${
              canStep1 ? 'bg-[#1E88E5] hover:bg-[#1565C0] text-white' : 'bg-[#E2E8F0] text-[#A0AEC0] cursor-not-allowed'
            }`}
          >
            Continuer
          </button>
        </div>
      )}

      {/* STEP 2: Location + Date + Time */}
      {step === 2 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold text-[#1A202C] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1E88E5]" /> Où souhaitez-vous recevoir les soins ?
            </h2>

            {/* Geoloc button */}
            <button
              onClick={handleGeolocate}
              disabled={geoLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-[#1E88E5] bg-[#E3F2FD] text-[#1565C0] text-sm font-medium hover:bg-[#BBDEFB] transition-colors mb-4"
            >
              <MapPin className="w-4 h-4" />
              {geoLoading ? 'Localisation en cours...' : 'Me géolocaliser automatiquement'}
            </button>

            <div className="text-xs text-[#A0AEC0] text-center mb-4">ou saisissez manuellement</div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#718096] mb-1 block">Adresse du patient</label>
                <input
                  type="text"
                  value={adresse}
                  onChange={e => setAdresse(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100"
                  placeholder="12 rue de la Paix"
                />
                <p className="text-xs text-[#A0AEC0] mt-1">Permet de trier les infirmiers par proximité</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-xs text-[#718096] mb-1 block">Ville</label>
                  <input
                    type="text"
                    value={ville}
                    onChange={e => setVille(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100"
                    placeholder="Paris, Lyon, Marseille..."
                  />
                </div>
                <div>
                  <label className="text-xs text-[#718096] mb-1 block">Code postal *</label>
                  <input
                    type="text"
                    value={cp}
                    onChange={e => setCp(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100"
                    placeholder="75015"
                    maxLength={5}
                  />
                </div>
              </div>
            </div>

            {/* Lieu */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[
                { id: 'domicile', label: '🏠 À domicile' },
                { id: 'cabinet', label: '🏥 Au cabinet' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setLieu(opt.id)}
                  className={`text-center px-4 py-3 rounded-xl border text-sm transition-all ${
                    lieu === opt.id
                      ? 'border-[#1E88E5] bg-[#E3F2FD] text-[#1565C0] font-medium'
                      : 'border-[#E2E8F0] bg-white text-[#4A5568] hover:border-[#90CAF9]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <h2 className="text-lg font-bold text-[#1A202C] mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#1E88E5]" /> Quand souhaitez-vous commencer ?
            </h2>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Time slots */}
          <div>
            <h2 className="text-lg font-bold text-[#1A202C] mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1E88E5]" /> Créneaux préférés
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => toggleTime(slot.id)}
                  className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    timeSlots.includes(slot.id)
                      ? 'border-[#1E88E5] bg-[#E3F2FD] text-[#1565C0] font-medium'
                      : 'border-[#E2E8F0] bg-white text-[#4A5568] hover:border-[#90CAF9]'
                  }`}
                >
                  <span className="mr-2">{slot.icon}</span> {slot.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-6 py-3.5 rounded-xl font-semibold border border-[#E2E8F0] text-[#4A5568] hover:bg-[#F7FAFC] transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => canStep2 && setStep(3)}
              disabled={!canStep2}
              className={`flex-1 py-3.5 rounded-xl font-semibold text-base transition-colors ${
                canStep2 ? 'bg-[#1E88E5] hover:bg-[#1565C0] text-white' : 'bg-[#E2E8F0] text-[#A0AEC0] cursor-not-allowed'
              }`}
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Patient info */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#1A202C] mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#1E88E5]" /> Pour qui est la demande ?
            </h2>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { id: 'moi', label: '👤 Pour moi' },
                { id: 'proche', label: '👥 Pour un proche' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setPourQui(opt.id)}
                  className={`text-center px-4 py-3 rounded-xl border text-sm transition-all ${
                    pourQui === opt.id
                      ? 'border-[#1E88E5] bg-[#E3F2FD] text-[#1565C0] font-medium'
                      : 'border-[#E2E8F0] bg-white text-[#4A5568] hover:border-[#90CAF9]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h2 className="text-sm font-semibold text-[#718096] mb-3 uppercase tracking-wide">
              {pourQui === 'proche' ? 'Vos coordonnées (demandeur)' : 'Vos coordonnées'}
            </h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#718096] mb-1 block">Prénom *</label>
                  <input type="text" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100"
                    placeholder="Jean" />
                </div>
                <div>
                  <label className="text-xs text-[#718096] mb-1 block">Nom *</label>
                  <input type="text" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100"
                    placeholder="Dupont" />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#718096] mb-1 block flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Téléphone *
                </label>
                <input type="tel" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100"
                  placeholder="06 12 34 56 78" />
              </div>
              <div>
                <label className="text-xs text-[#718096] mb-1 block">Email (optionnel)</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100"
                  placeholder="jean@exemple.fr" />
              </div>
            </div>
          </div>

          {/* Proche info */}
          {pourQui === 'proche' && (
            <div>
              <h2 className="text-sm font-semibold text-[#718096] mb-3 uppercase tracking-wide">Informations du patient</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">Prénom du patient</label>
                    <input type="text" value={proches.prenom} onChange={e => setProches({ ...proches, prenom: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100"
                      placeholder="Marie" />
                  </div>
                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">Nom du patient</label>
                    <input type="text" value={proches.nom} onChange={e => setProches({ ...proches, nom: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100"
                      placeholder="Dupont" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#718096] mb-1 block">Lien avec le patient</label>
                  <select value={proches.lien} onChange={e => setProches({ ...proches, lien: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 bg-white">
                    <option value="">Sélectionnez</option>
                    <option value="enfant">Enfant</option>
                    <option value="parent">Parent</option>
                    <option value="conjoint">Conjoint(e)</option>
                    <option value="ami">Ami(e)</option>
                    <option value="aidant">Aidant professionnel</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="text-xs text-[#718096] mb-1 block">Informations complémentaires (optionnel)</label>
            <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 h-20 resize-none"
              placeholder="Précisions sur les soins, contraintes d'accès, étage, digicode..." />
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 text-xs text-[#718096]">
            <div className="flex items-center gap-1"><Shield className="w-3 h-3 text-green-500" /> Données sécurisées</div>
            <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> 100% gratuit</div>
            <div className="flex items-center gap-1"><Phone className="w-3 h-3 text-green-500" /> Sans engagement</div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="px-6 py-3.5 rounded-xl font-semibold border border-[#E2E8F0] text-[#4A5568] hover:bg-[#F7FAFC] transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => canStep3 && handleSubmit()}
              disabled={!canStep3}
              className={`flex-1 py-3.5 rounded-xl font-semibold text-base transition-colors ${
                canStep3 ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-[#E2E8F0] text-[#A0AEC0] cursor-not-allowed'
              }`}
            >
              Trouver un infirmier disponible
            </button>
          </div>

          <p className="text-xs text-[#A0AEC0] text-center">
            En soumettant ce formulaire, vous acceptez d'être recontacté par un professionnel de santé.
            Vos données sont traitées conformément à notre <Link href="/confidentialite" className="underline">politique de confidentialité</Link>.
          </p>
        </div>
      )}
    </div>
  )
}
