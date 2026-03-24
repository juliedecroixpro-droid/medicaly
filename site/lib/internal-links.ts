// Internal linking: auto-link keywords in blog content to relevant pages
// Each keyword is linked only ONCE per article (first occurrence)

interface InternalLink {
  keyword: string
  url: string
  title: string
}

const INTERNAL_LINKS: InternalLink[] = [
  // Soins pages
  { keyword: 'pansement', url: '/soins/pansements', title: 'Pansements à domicile' },
  { keyword: 'pansements', url: '/soins/pansements', title: 'Pansements à domicile' },
  { keyword: 'injection', url: '/soins/injections', title: 'Injections à domicile' },
  { keyword: 'injections', url: '/soins/injections', title: 'Injections à domicile' },
  { keyword: 'prise de sang', url: '/soins/prises-de-sang', title: 'Prises de sang à domicile' },
  { keyword: 'prises de sang', url: '/soins/prises-de-sang', title: 'Prises de sang à domicile' },
  { keyword: 'perfusion', url: '/soins/perfusions', title: 'Perfusions à domicile' },
  { keyword: 'perfusions', url: '/soins/perfusions', title: 'Perfusions à domicile' },
  { keyword: 'chimiotherapie', url: '/soins/chimiotherapie-domicile', title: 'Chimiotherapie à domicile' },
  { keyword: 'toilette', url: '/soins/nursing-toilette', title: 'Nursing et toilette à domicile' },
  { keyword: 'nursing', url: '/soins/nursing-toilette', title: 'Nursing et toilette à domicile' },
  { keyword: 'glycemie', url: '/soins/surveillance-diabete', title: 'Surveillance diabete à domicile' },
  { keyword: 'diabete', url: '/soins/surveillance-diabete', title: 'Surveillance diabete à domicile' },
  { keyword: 'constantes', url: '/soins/surveillance-constantes', title: 'Surveillance constantes à domicile' },
  { keyword: 'tension arterielle', url: '/soins/surveillance-constantes', title: 'Surveillance constantes à domicile' },
  { keyword: 'medicaments', url: '/soins/distribution-medicaments', title: 'Distribution medicaments à domicile' },
  { keyword: 'pilulier', url: '/soins/distribution-medicaments', title: 'Distribution medicaments à domicile' },
  { keyword: 'post-operatoire', url: '/soins/soins-post-operatoires', title: 'Soins post-operatoires à domicile' },
  { keyword: 'ablation de fils', url: '/soins/ablation-fils-agrafes', title: 'Ablation fils et agrafes' },
  { keyword: 'agrafes', url: '/soins/ablation-fils-agrafes', title: 'Ablation fils et agrafes' },
  { keyword: 'sonde', url: '/soins/sondes-stomies', title: 'Sondes et stomies à domicile' },
  { keyword: 'stomie', url: '/soins/sondes-stomies', title: 'Sondes et stomies à domicile' },
  { keyword: 'oxygenotherapie', url: '/soins/oxygenotherapie', title: 'Oxygenotherapie à domicile' },
  { keyword: 'soins palliatifs', url: '/soins/soins-palliatifs', title: 'Soins palliatifs à domicile' },
  { keyword: 'vaccination', url: '/soins/vaccination-domicile', title: 'Vaccination à domicile' },
  { keyword: 'vaccin', url: '/soins/vaccination-domicile', title: 'Vaccination à domicile' },
  // Key pages
  { keyword: 'tarifs', url: '/tarifs', title: 'Tarifs soins infirmiers 2026' },
  { keyword: 'tarif conventionnel', url: '/tarifs', title: 'Tarifs soins infirmiers 2026' },
  { keyword: 'BSI', url: '/blog/bsi-bilan-soins-infirmiers', title: 'BSI : guide complet' },
  { keyword: 'Bilan de Soins Infirmiers', url: '/blog/bsi-bilan-soins-infirmiers', title: 'BSI : guide complet' },
  // Cities
  { keyword: 'Paris', url: '/ville/paris-75001', title: 'Infirmiers a Paris' },
  { keyword: 'Marseille', url: '/ville/marseille-13001', title: 'Infirmiers a Marseille' },
  { keyword: 'Lyon', url: '/ville/lyon-69001', title: 'Infirmiers a Lyon' },
]

export function addInternalLinks(html: string): string {
  const usedUrls = new Set<string>()
  let result = html

  for (const link of INTERNAL_LINKS) {
    if (usedUrls.has(link.url)) continue

    // Only match text NOT already inside an HTML tag or link
    const regex = new RegExp(
      `(?<![<\\/a-zA-Z"=])\\b(${escapeRegex(link.keyword)})\\b(?![^<]*>)(?![^<]*<\\/a>)`,
      'i'
    )

    if (regex.test(result)) {
      result = result.replace(
        regex,
        `<a href="${link.url}" title="${link.title}" class="text-[#1E88E5] hover:underline font-medium">$1</a>`
      )
      usedUrls.add(link.url)
    }
  }

  return result
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Calculate reading time (avg 200 words/min in French)
export function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}
