'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, CheckCircle, Phone, MapPin, FileText, User } from 'lucide-react'

const SOINS_LIST = [
  'Pansement',
  'Injection',
  'Vaccination (grippe, Covid, DTP...)',
  'Prise de sang',
  'Perfusion',
  'Chimiotherapie à domicile',
  'Aide a la toilette / Nursing',
  'Surveillance diabete / Glycemie',
  'Surveillance constantes (tension, pouls, temperature)',
  'Distribution / surveillance medicaments',
  'Soins post-operatoires',
  'Ablation fils / agrafes',
  'Soins de sonde / stomie',
  'Oxygenotherapie',
  'Soins palliatifs',
  'Autre soin',
]

export default function DemandePage() {
  const [step, setStep] = useState(1)
  const [selectedSoins, setSelectedSoins] = useState<string[]>([])
  const [ordonnance, setOrdonnance] = useState<string>('')
  const [form, setForm] = useState({ prenom: '', nom: '', tel: '', email: '', ville: '', cp: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  // Read URL params on client
  const toggleSoin = (soin: string) => {
    setSelectedSoins(prev => prev.includes(soin) ? prev.filter(s => s !== soin) : [...prev, soin])
  }

  const canNext1 = selectedSoins.length > 0
  const canNext2 = ordonnance !== ''
  const canSubmit = form.prenom && form.nom && form.tel && form.cp

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A202C] mb-2">Demande envoyee !</h1>
          <p className="text-[#718096] mb-6">
            Votre demande de prise en charge a bien ete enregistree.
            Un infirmier de votre secteur vous recontactera dans les plus brefs delais.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            Retour a l&apos;accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="text-sm text-[#718096] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1E88E5]">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A202C] font-medium">Demande de prise en charge</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#1A202C] mb-2">Demande de prise en charge</h1>
      <p className="text-[#718096] text-sm mb-8">Gratuit, rapide et sans engagement. Un infirmier vous recontacte.</p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= i ? 'bg-[#1E88E5] text-white' : 'bg-[#E2E8F0] text-[#718096]'}`}>
              {step > i ? <CheckCircle className="w-4 h-4" /> : i}
            </div>
            <span className={`text-xs hidden sm:block ${step >= i ? 'text-[#1A202C] font-medium' : 'text-[#718096]'}`}>
              {i === 1 ? 'Soins' : i === 2 ? 'Ordonnance' : 'Coordonnées'}
            </span>
            {i < 3 && <div className={`flex-1 h-0.5 ${step > i ? 'bg-[#1E88E5]' : 'bg-[#E2E8F0]'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Soins */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-bold text-[#1A202C] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1E88E5]" /> De quel(s) soin(s) avez-vous besoin ?
          </h2>
          <div className="space-y-2 mb-6">
            {SOINS_LIST.map(soin => (
              <button
                key={soin}
                onClick={() => toggleSoin(soin)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  selectedSoins.includes(soin)
                    ? 'border-[#1E88E5] bg-[#E3F2FD] text-[#1565C0]'
                    : 'border-[#E2E8F0] bg-white text-[#4A5568] hover:border-[#90CAF9]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{soin}</span>
                  {selectedSoins.includes(soin) && <CheckCircle className="w-5 h-5 text-[#1E88E5]" />}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => canNext1 && setStep(2)}
            disabled={!canNext1}
            className={`w-full py-3 rounded-xl font-semibold transition-colors ${canNext1 ? 'bg-[#1E88E5] hover:bg-[#1565C0] text-white' : 'bg-[#E2E8F0] text-[#A0AEC0] cursor-not-allowed'}`}
          >
            Continuer
          </button>
        </div>
      )}

      {/* Step 2: Ordonnance */}
      {step === 2 && (
        <div>
          <h2 className="text-lg font-bold text-[#1A202C] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1E88E5]" /> Avez-vous une ordonnance ?
          </h2>
          <div className="space-y-2 mb-6">
            {[
              { value: 'oui-domicile', label: 'Oui, avec mention "à domicile"' },
              { value: 'oui-sans', label: 'Oui, sans mention "à domicile"' },
              { value: 'non', label: 'Non, pas encore' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setOrdonnance(opt.value)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  ordonnance === opt.value
                    ? 'border-[#1E88E5] bg-[#E3F2FD] text-[#1565C0]'
                    : 'border-[#E2E8F0] bg-white text-[#4A5568] hover:border-[#90CAF9]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {ordonnance === 'non' && (
            <p className="text-xs text-[#718096] mb-4 bg-[#FFFBEB] border border-[#FCD34D] rounded-lg p-3">
              Pas de souci ! L&apos;infirmier(e) pourra vous guider pour obtenir une ordonnance auprès de votre médecin.
            </p>
          )}
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl font-semibold border border-[#E2E8F0] text-[#4A5568] hover:bg-[#F7FAFC]">
              Retour
            </button>
            <button
              onClick={() => canNext2 && setStep(3)}
              disabled={!canNext2}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${canNext2 ? 'bg-[#1E88E5] hover:bg-[#1565C0] text-white' : 'bg-[#E2E8F0] text-[#A0AEC0] cursor-not-allowed'}`}
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Coordonnées */}
      {step === 3 && (
        <div>
          <h2 className="text-lg font-bold text-[#1A202C] mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#1E88E5]" /> Vos coordonnées
          </h2>
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#718096] mb-1 block">Prenom *</label>
                <input type="text" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5]" placeholder="Jean" />
              </div>
              <div>
                <label className="text-xs text-[#718096] mb-1 block">Nom *</label>
                <input type="text" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5]" placeholder="Dupont" />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#718096] mb-1 block flex items-center gap-1"><Phone className="w-3 h-3" /> Telephone *</label>
              <input type="tel" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5]" placeholder="06 12 34 56 78" />
            </div>
            <div>
              <label className="text-xs text-[#718096] mb-1 block">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5]" placeholder="jean@exemple.fr" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="text-xs text-[#718096] mb-1 block flex items-center gap-1"><MapPin className="w-3 h-3" /> Ville</label>
                <input type="text" value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5]" placeholder="Paris" />
              </div>
              <div>
                <label className="text-xs text-[#718096] mb-1 block">Code postal *</label>
                <input type="text" value={form.cp} onChange={e => setForm({ ...form, cp: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5]" placeholder="75001" />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#718096] mb-1 block">Informations complementaires</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#1E88E5] h-24 resize-none" placeholder="Precisions sur les soins, horaires souhaites..." />
            </div>
          </div>

          {/* Recap */}
          <div className="bg-[#F7FAFC] rounded-xl p-4 mb-6 text-sm">
            <div className="font-semibold text-[#1A202C] mb-2">Recapitulatif</div>
            <div className="text-[#4A5568] space-y-1">
              <div><span className="text-[#718096]">Soins :</span> {selectedSoins.join(', ')}</div>
              <div><span className="text-[#718096]">Ordonnance :</span> {ordonnance === 'oui-domicile' ? 'Oui (à domicile)' : ordonnance === 'oui-sans' ? 'Oui (sans mention)' : 'Non'}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl font-semibold border border-[#E2E8F0] text-[#4A5568] hover:bg-[#F7FAFC]">
              Retour
            </button>
            <button
              onClick={() => canSubmit && setSubmitted(true)}
              disabled={!canSubmit}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${canSubmit ? 'bg-[#1E88E5] hover:bg-[#1565C0] text-white' : 'bg-[#E2E8F0] text-[#A0AEC0] cursor-not-allowed'}`}
            >
              Envoyer ma demande
            </button>
          </div>

          <p className="text-xs text-[#A0AEC0] mt-4 text-center">
            En soumettant ce formulaire, vous acceptez d&apos;etre recontacte par un professionnel de sante.
            Vos données sont traitees conformement a notre <Link href="/confidentialite" className="underline">politique de confidentialité</Link>.
          </p>
        </div>
      )}
    </div>
  )
}
