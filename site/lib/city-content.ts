/**
 * Generates unique, varied content for each city page based on real data.
 * Avoids duplicate content penalties by using data-driven text variations.
 */

import { Nurse } from './data'
import { DEPT_POPULATIONS } from './populations'

// --- Data-driven content generators ---

interface CityContentData {
  cityName: string
  nursesCount: number
  withPhone: number
  withCabinet: number
  deptName: string
  deptCode: string
  postalCode: string
  isMetro: boolean
  nurses: Nurse[]
}

// Generate unique intro paragraph based on actual data
export function generateIntro(d: CityContentData): string[] {
  const genderStats = d.nurses.reduce(
    (acc, n) => { if (n.gender === 'F') acc.f++; else acc.m++; return acc },
    { f: 0, m: 0 }
  )
  const femalePercent = Math.round((genderStats.f / d.nurses.length) * 100)

  // Count distinct cabinets
  const cabinets = new Set(d.nurses.filter(n => n.cabinet).map(n => n.cabinet.toLowerCase()))
  const cabinetCount = cabinets.size

  // Calculate ratio if population known
  const pop = DEPT_POPULATIONS[d.deptCode]
  const deptRatio = pop ? Math.round((d.nursesCount / pop) * 100000) : null

  // Pick variation based on hash of city name (deterministic)
  const hash = d.cityName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const variant = hash % 5

  const paragraphs: string[] = []

  // Paragraph 1 : unique intro
  switch (variant) {
    case 0:
      paragraphs.push(
        `${d.cityName} compte <strong>${d.nursesCount} infirmiers libéraux</strong> référencés sur Medicaly, `
        + `dont <strong>${d.withPhone} joignables par téléphone</strong>. `
        + (d.isMetro
          ? `L'agglomération de ${d.cityName} bénéficie d'un maillage dense de professionnels de santé à domicile.`
          : `Dans le département ${d.deptName}, ${d.cityName} dispose d'une offre de soins infirmiers à domicile `
            + (d.nursesCount > 50 ? 'particulièrement bien développée.' : 'en développement.'))
      )
      break
    case 1:
      paragraphs.push(
        `Besoin d'une infirmière à domicile à ${d.cityName} ? `
        + `Vous avez le choix parmi <strong>${d.nursesCount} IDEL</strong> (infirmiers diplômés d'État libéraux) `
        + `exerçant dans le ${d.postalCode} et ses environs. `
        + `${femalePercent}% sont des infirmières et ${100 - femalePercent}% des infirmiers.`
      )
      break
    case 2:
      paragraphs.push(
        `À ${d.cityName}, <strong>${d.nursesCount} infirmiers libéraux</strong> exercent en libéral `
        + `et se déplacent à votre domicile pour réaliser vos soins. `
        + (cabinetCount > 1
          ? `Ils sont répartis dans ${cabinetCount} cabinets différents à travers la ville.`
          : `La plupart exercent en cabinet individuel ou à domicile exclusivement.`)
      )
      break
    case 3:
      paragraphs.push(
        `Le département ${d.deptName} (${d.deptCode}) `
        + (deptRatio
          ? `affiche un ratio de ${deptRatio} IDEL pour 100 000 habitants`
          : `est couvert par un réseau d'infirmiers libéraux`)
        + `, et ${d.cityName} y contribue avec <strong>${d.nursesCount} professionnels référencés</strong>. `
        + `Tous sont conventionnés secteur 1 par l'Assurance Maladie.`
      )
      break
    default:
      paragraphs.push(
        `Avec <strong>${d.nursesCount} infirmiers libéraux</strong> référencés, ${d.cityName} `
        + `offre une couverture en soins infirmiers à domicile `
        + (d.nursesCount > 100 ? 'dense et variée' : d.nursesCount > 30 ? 'solide' : 'accessible')
        + `. ${d.withPhone > 0 ? `${d.withPhone} d'entre eux sont joignables directement par téléphone.` : ''}`
      )
  }

  // Paragraph 2 : soins - varied list order based on hash
  const soinsLists = [
    'pansements simples et complexes, injections sous-cutanées et intramusculaires, prises de sang à domicile, perfusions, '
    + 'surveillance glycémique pour les patients diabétiques, nursing et aide à la toilette',
    'prises de sang et bilans sanguins, injections (anticoagulants, insuline, vaccins), pansements post-opératoires, '
    + 'perfusions à domicile, soins de nursing, accompagnement des patients en ALD',
    'soins post-opératoires (pansements, ablation de fils), injections et vaccination à domicile, '
    + 'prises de sang, perfusions intraveineuses, aide à la toilette et nursing, suivi du diabète',
    'nursing et soins d\'hygiène, injections quotidiennes (Lovenox, insuline), pansements de plaies chroniques, '
    + 'prélèvements sanguins, perfusions, surveillance des constantes vitales',
    'bilans de soins infirmiers (BSI) pour les personnes âgées, injections et perfusions, pansements, '
    + 'prises de sang à domicile, soins palliatifs, accompagnement des patients chroniques',
  ]
  paragraphs.push(
    `Les infirmiers libéraux de ${d.cityName} réalisent l'ensemble des soins à domicile sur prescription médicale : `
    + soinsLists[variant] + '.'
  )

  // Paragraph 3 : remboursement - varied phrasing
  const remboursements = [
    `Les soins sont pris en charge à 60% par l'Assurance Maladie sur la base des tarifs conventionnels (NGAP). `
    + `En cas d'affection longue durée (ALD), le remboursement est de 100%. `
    + `La majorité des IDEL de ${d.cityName} pratiquent le tiers payant.`,

    `Coté remboursement, les soins infirmiers à domicile à ${d.cityName} sont couverts à 60% par la Sécurité sociale `
    + `(100% pour les patients en ALD). Les ${d.nursesCount} IDEL référencés sont tous conventionnés : `
    + `vous n'avancez généralement aucun frais grâce au tiers payant.`,

    `Bonne nouvelle : les soins infirmiers à domicile sont remboursés par la Sécurité sociale. `
    + `À ${d.cityName}, les IDEL appliquent les tarifs conventionnels et pratiquent le tiers payant. `
    + `Comptez un reste à charge de 40% du tarif (0% si vous êtes en ALD).`,

    `Tous les infirmiers libéraux de ${d.cityName} sont conventionnés par l'Assurance Maladie. `
    + `Les soins sont remboursés à hauteur de 60% (100% en ALD, CMU ou maternité). `
    + `Le tiers payant est pratiqué par la quasi-totalité des IDEL du ${d.postalCode}.`,

    `La prise en charge financière est simple : munissez-vous de votre ordonnance et de votre carte Vitale. `
    + `Les infirmiers de ${d.cityName} pratiquent le tiers payant, vous n'avez donc rien à avancer. `
    + `Le remboursement est de 60% en règle générale, 100% pour les patients en ALD.`,
  ]
  paragraphs.push(remboursements[variant])

  return paragraphs
}

// Generate unique FAQ based on data
export function generateFAQ(d: CityContentData): { question: string; answer: string }[] {
  const hash = d.cityName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const variant = hash % 3

  const genderStats = d.nurses.reduce(
    (acc, n) => { if (n.gender === 'F') acc.f++; else acc.m++; return acc },
    { f: 0, m: 0 }
  )
  const femalePercent = Math.round((genderStats.f / d.nurses.length) * 100)

  const baseFAQs = [
    {
      question: `Comment trouver une infirmière à domicile à ${d.cityName} ?`,
      answer: variant === 0
        ? `Medicaly référence ${d.nursesCount} IDEL à ${d.cityName}. Parcourez les profils, consultez les coordonnées et appelez directement le professionnel de votre choix. ${d.withPhone} infirmiers sont joignables par téléphone.`
        : variant === 1
          ? `Sur Medicaly, tapez "${d.cityName}" ou le code postal ${d.postalCode} dans la barre de recherche. Vous accédez instantanément aux ${d.nursesCount} infirmiers libéraux du secteur avec leurs numéros de téléphone.`
          : `Deux options : utilisez notre annuaire (${d.nursesCount} IDEL référencés à ${d.cityName}) ou faites une demande de prise en charge. Un infirmier disponible vous recontactera rapidement.`,
    },
    {
      question: `Combien coûte une infirmière à domicile à ${d.cityName} ?`,
      answer: variant === 0
        ? `Les tarifs sont réglementés par la convention nationale (NGAP). Un acte médical infirmier (AMI) est facturé 3,15 EUR, une injection (AMI 1) environ 3,15 EUR, un pansement lourd (AMI 4) environ 12,60 EUR. À ${d.cityName}, tous les IDEL sont conventionnés.`
        : variant === 1
          ? `Les soins infirmiers à ${d.cityName} suivent la grille tarifaire NGAP. Exemples : prise de sang 4,73 EUR, injection 3,15 EUR, pansement complexe 6,30 EUR à 12,60 EUR. Avec le tiers payant, vous ne réglez que le ticket modérateur (40%).`
          : `À ${d.cityName}, les ${d.nursesCount} IDEL appliquent les tarifs conventionnés. Une séance de soins infirmiers coûte entre 3 EUR et 15 EUR selon l'acte. La Sécurité sociale rembourse 60% (100% en ALD).`,
    },
    {
      question: `Faut-il une ordonnance pour des soins infirmiers à domicile à ${d.cityName} ?`,
      answer: variant === 0
        ? `Oui, une prescription médicale est obligatoire pour la prise en charge des soins infirmiers à domicile, sauf pour la vaccination antigrippale. Votre médecin traitant à ${d.cityName} peut vous prescrire les soins nécessaires.`
        : variant === 1
          ? `Une ordonnance est nécessaire pour être remboursé. Elle doit préciser la nature des soins, leur fréquence et leur durée. Les IDEL de ${d.cityName} peuvent vous orienter sur les démarches si vous avez des questions.`
          : `Oui, sauf exceptions (vaccination grippe). Demandez à votre médecin une ordonnance détaillant les soins. Les ${d.nursesCount} infirmiers de ${d.cityName} sont habitués à accompagner les patients dans ces démarches administratives.`,
    },
    {
      question: `Les soins à domicile à ${d.cityName} sont-ils remboursés ?`,
      answer: `Les soins infirmiers réalisés à domicile à ${d.cityName} sont pris en charge à 60% par l'Assurance Maladie (100% en ALD). Les ${d.nursesCount} IDEL du secteur sont conventionnés et la plupart pratiquent le tiers payant : vous n'avez pas à avancer les frais.`,
    },
    {
      question: `Quels soins peut réaliser un infirmier à domicile à ${d.cityName} ?`,
      answer: variant === 0
        ? `Les ${d.nursesCount} IDEL de ${d.cityName} (${femalePercent}% d'infirmières) réalisent tous les soins prescrits : pansements, injections, prélèvements sanguins, perfusions, nursing, surveillance du diabète, soins post-opératoires et BSI pour les personnes âgées.`
        : `À ${d.cityName}, les infirmiers libéraux assurent un large éventail de soins : de la simple injection quotidienne à la perfusion à domicile, en passant par les pansements, prises de sang, soins de nursing, suivi des maladies chroniques et accompagnement en soins palliatifs.`,
    },
  ]

  return baseFAQs
}

// Generate unique H2 title for the intro section
export function generateIntroTitle(cityName: string): string {
  const hash = cityName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const titles = [
    `Trouvez votre infirmier(e) à domicile à ${cityName}`,
    `Soins infirmiers à domicile à ${cityName}`,
    `Infirmière à domicile à ${cityName} : l'annuaire complet`,
    `Votre infirmier(e) libéral(e) à ${cityName}`,
    `Les infirmiers à domicile de ${cityName}`,
  ]
  return titles[hash % titles.length]
}
