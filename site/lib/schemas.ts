// Reusable JSON-LD schema generators

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function localBusinessSchema(opts: {
  name: string
  city: string
  postalCode: string
  department: string
  nurseCount: number
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: `Infirmiers libéraux a ${opts.city}`,
    description: `${opts.nurseCount} infirmiers libéraux a ${opts.city} (${opts.postalCode}), ${opts.department}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: opts.city,
      postalCode: opts.postalCode,
      addressCountry: 'FR',
    },
    url: opts.url,
    medicalSpecialty: 'Nursing',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: opts.nurseCount,
    },
  }
}
