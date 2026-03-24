export interface Soin {
  slug: string
  name: string
  shortName: string
  description: string
  icon: string // lucide icon name
  details: string
}

export const SOINS: Soin[] = [
  {
    slug: 'pansements',
    name: 'Pansements à domicile',
    shortName: 'Pansements',
    icon: 'Heart',
    description: 'Soins de pansements simples et complexes à domicile : plaies post-operatoires, escarres, brulures, ulceres.',
    details: `Les pansements à domicile sont l'un des soins les plus courants realises par les infirmiers libéraux. Ils concernent les plaies post-operatoires, les escarres, les brulures, les ulceres veineux ou arteriels, les plaies diabetiques et les plaies chroniques.

L'infirmier(e) se deplace a votre domicile pour realiser le pansement selon la prescription medicale. La fréquence varie selon le type de plaie : quotidien pour les plaies post-operatoires fraiches, tous les 2-3 jours pour les plaies en cours de cicatrisation.

**Tarifs indicatifs :**
- Pansement simple : 6,30 EUR
- Pansement complexe : 12,60 EUR
- Pansement lourd et complexe (escarre, brulure etendue) : jusqu'a 18,90 EUR`,
  },
  {
    slug: 'injections',
    name: 'Injections et vaccinations à domicile',
    shortName: 'Injections',
    icon: 'Syringe',
    description: 'Injections intramusculaires, sous-cutanees et intraveineuses. Vaccinations à domicile par un IDEL.',
    details: `Les injections à domicile sont realisees par des infirmiers libéraux diplomes d'Etat. Elles comprennent les injections intramusculaires (IM), sous-cutanees (SC) et intraveineuses (IV).

Les vaccinations peuvent egalement etre realisees à domicile par un IDEL, y compris la vaccination antigrippale (sans ordonnance pour les personnes de plus de 65 ans).

**Types d'injections :**
- Injections IM (antibiotiques, anti-inflammatoires, vitamines)
- Injections SC (anticoagulants type Lovenox, insuline)
- Injections IV (certains traitements specifiques)
- Vaccinations (grippe, Covid, rappels)

**Tarifs indicatifs :**
- Injection IM ou SC : 3,15 EUR
- Injection IV : 4,73 EUR
- Vaccination : 6,30 EUR`,
  },
  {
    slug: 'prises-de-sang',
    name: 'Prises de sang à domicile',
    shortName: 'Prises de sang',
    icon: 'FileText',
    description: 'Prelevements sanguins à domicile par un infirmier libéral. Resultats envoyes au laboratoire.',
    details: `La prise de sang à domicile est un service propose par les infirmiers libéraux. L'IDEL se deplace chez vous, realise le prelevement et le transporte au laboratoire d'analyse.

C'est particulierement utile pour les personnes agees, a mobilite reduite, ou simplement pour les patients qui preferent eviter le déplacement.

**Deroulement :**
1. L'IDEL se presente a votre domicile (généralement le matin a jeun)
2. Prelevement veineux selon l'ordonnance
3. Transport des tubes au laboratoire
4. Resultats disponibles au laboratoire ou en ligne

**Tarif indicatif :** 4,73 EUR (prelevement veineux)`,
  },
  {
    slug: 'perfusions',
    name: 'Perfusions à domicile',
    shortName: 'Perfusions',
    icon: 'Stethoscope',
    description: 'Pose, surveillance et depose de perfusions à domicile. Antibiotherapie, chimiotherapie, nutrition parenterale.',
    details: `Les perfusions à domicile permettent aux patients de recevoir leur traitement intraveineux sans hospitalisation. L'infirmier libéral assure la pose, la surveillance et la depose de la perfusion.

**Types de perfusions :**
- Antibiotherapie IV (infections severes)
- Chimiotherapie à domicile
- Nutrition parenterale
- Hydratation IV
- Traitements immunologiques

**Deroulement :**
1. Pose de la perfusion et branchement
2. Surveillance des constantes et du debit
3. Depose en fin de traitement
4. Heparinisation ou retrait du dispositif

**Tarifs indicatifs :**
- Pose de perfusion : 10,00 EUR
- Surveillance par passage : 4,73 EUR`,
  },
  {
    slug: 'nursing-toilette',
    name: 'Nursing et aide a la toilette à domicile',
    shortName: 'Nursing / Toilette',
    icon: 'User',
    description: 'Aide a la toilette, soins d\'hygiene et nursing pour personnes dependantes. BSI (Bilan de Soins Infirmiers).',
    details: `Le nursing à domicile comprend l'ensemble des soins d'hygiene et de confort destines aux personnes dependantes. C'est l'un des actes les plus fréquents des IDEL.

**Soins inclus :**
- Aide a la toilette complète ou partielle
- Soins d'hygiene (bouche, pieds, ongles)
- Prevention des escarres (changements de position, massages)
- Aide a l'habillage et au deshabillage
- Aide au lever et au coucher

**Le BSI (Bilan de Soins Infirmiers) :**
Depuis 2020, le BSI remplace la DSI. Il permet d'évaluer les besoins du patient et de definir un forfait journalier :
- BSI Leger : 13,00 EUR/jour
- BSI Intermédiaire : 18,20 EUR/jour
- BSI Lourd : 28,70 EUR/jour`,
  },
  {
    slug: 'surveillance-diabete',
    name: 'Surveillance glycemique et diabete à domicile',
    shortName: 'Diabete',
    icon: 'Clock',
    description: 'Surveillance glycemique, injections d\'insuline et éducation thérapeutique pour patients diabetiques.',
    details: `La surveillance du diabete à domicile est un soin quotidien pour de nombreux patients. L'infirmier libéral assure le controle glycemique, les injections d'insuline et l'éducation thérapeutique.

**Soins realises :**
- Mesure de la glycemie capillaire
- Injection d'insuline (si le patient ne peut pas le faire seul)
- Education thérapeutique (auto-surveillance, alimentation)
- Surveillance des pieds (prévention des complications)
- Adaptation des doses en lien avec le médecin

**Tarifs indicatifs :**
- Glycemie capillaire : 1,89 EUR
- Injection d'insuline : 3,15 EUR
- Seance d'éducation thérapeutique : forfait BSI`,
  },
  {
    slug: 'soins-post-operatoires',
    name: 'Soins post-operatoires à domicile',
    shortName: 'Post-operatoire',
    icon: 'Shield',
    description: 'Suivi post-operatoire à domicile : pansements, surveillance, ablation fils/agrafes, prévention complications.',
    details: `Apres une intervention chirurgicale, les soins post-operatoires à domicile permettent un retour precoce chez soi tout en beneficiant d'un suivi professionnel.

**Soins post-operatoires :**
- Pansements de la plaie operatoire
- Surveillance des signes d'infection
- Ablation des fils de suture ou agrafes
- Injections d'anticoagulants (prévention thrombose)
- Surveillance des drains
- Prise des constantes (tension, temperature, pouls)

La duree des soins post-operatoires varie de quelques jours a plusieurs semaines selon l'intervention.

**Tarifs indicatifs :**
- Pansement post-operatoire : 6,30 a 12,60 EUR
- Ablation fils/agrafes : 6,30 EUR
- Injection anticoagulant : 3,15 EUR`,
  },
  {
    slug: 'soins-palliatifs',
    name: 'Soins palliatifs à domicile',
    shortName: 'Soins palliatifs',
    icon: 'Heart',
    description: 'Accompagnement et soins palliatifs à domicile. Gestion de la douleur, confort, soutien au patient et aux proches.',
    details: `Les soins palliatifs à domicile permettent aux patients en fin de vie de rester dans leur environnement familier. L'IDEL travaille en coordination avec le médecin traitant, l'HAD et les reseaux de soins palliatifs.

**Role de l'IDEL en soins palliatifs :**
- Gestion de la douleur (administration d'antalgiques, PCA)
- Soins de confort et d'hygiene
- Prevention et traitement des escarres
- Administration des traitements (perfusions, injections)
- Soutien psychologique au patient et aux proches
- Coordination avec l'equipe soignante

Les soins palliatifs à domicile sont pris en charge a 100% par l'Assurance Maladie.`,
  },
  {
    slug: 'ablation-fils-agrafes',
    name: 'Ablation de fils et agrafes à domicile',
    shortName: 'Ablation fils/agrafes',
    icon: 'Shield',
    description: 'Retrait de fils de suture et agrafes chirurgicales à domicile par un infirmier libéral.',
    details: `L'ablation de fils de suture ou d'agrafes chirurgicales est un geste courant apres une intervention. L'infirmier libéral se deplace a votre domicile pour retirer les fils ou agrafes selon les indications de votre chirurgien.

**Deroulement :**
- Verification de la cicatrisation
- Retrait des fils ou agrafes avec du materiel sterile
- Nettoyage et desinfection de la plaie
- Mise en place d'un pansement si necessaire
- Conseils pour la suite de la cicatrisation

L'ablation se fait généralement entre 7 et 15 jours apres l'intervention, selon la localisation et le type de plaie.

**Tarif indicatif :** 6,30 EUR (acte de pansement)`,
  },
  {
    slug: 'chimiotherapie-domicile',
    name: 'Chimiotherapie à domicile',
    shortName: 'Chimiotherapie',
    icon: 'Stethoscope',
    description: 'Administration et surveillance de chimiotherapie à domicile. Alternative a l\'hospitalisation pour certains protocoles.',
    details: `La chimiotherapie à domicile permet aux patients atteints de cancer de recevoir leur traitement chez eux, dans un environnement familier. L'infirmier libéral assure la pose, la surveillance et la depose de la perfusion.

**Conditions :**
- Protocole compatible avec le domicile (valide par l'oncologue)
- Patient stable, sans effets secondaires severes
- Environnement adapte (hygiene, acces veineux)

**Role de l'IDEL :**
- Pose du dispositif de perfusion (PAC, PICC line)
- Administration du traitement selon le protocole
- Surveillance des effets secondaires
- Prise des constantes (tension, temperature, pouls)
- Rinçage et heparinisation du dispositif
- Transmission au médecin en cas de probleme

La chimiotherapie à domicile est prise en charge a 100% par l'Assurance Maladie dans le cadre de l'ALD.`,
  },
  {
    slug: 'sondes-stomies',
    name: 'Soins de sondes et stomies à domicile',
    shortName: 'Sondes / Stomies',
    icon: 'FileText',
    description: 'Entretien et surveillance des sondes urinaires, gastriques et stomies (colostomie, ileostomie, urostomie).',
    details: `Les soins de sondes et stomies à domicile sont realises par des infirmiers libéraux formes a ces techniques specifiques.

**Types de soins :**

**Sondes urinaires :**
- Pose et changement de sonde vesicale
- Surveillance et entretien de la sonde
- Education du patient a l'auto-sondage
- Prevention des infections urinaires

**Stomies :**
- Soins de colostomie, ileostomie, urostomie
- Changement de poche et d'appareillage
- Surveillance de la peau peristomiale
- Education du patient a l'autonomie
- Irrigation colique

**Sondes gastriques :**
- Entretien de la sonde nasogastrique ou de gastrostomie
- Administration de l'alimentation enterale
- Verification du positionnement

**Tarifs indicatifs :**
- Soins de stomie : 6,30 a 12,60 EUR
- Sondage vesical : 6,30 EUR`,
  },
  {
    slug: 'surveillance-constantes',
    name: 'Surveillance des constantes à domicile',
    shortName: 'Constantes vitales',
    icon: 'Stethoscope',
    description: 'Mesure et surveillance de la tension arterielle, pouls, temperature, saturation en oxygene à domicile.',
    details: `La surveillance des constantes vitales à domicile est essentielle pour le suivi des patients chroniques ou en convalescence.

**Constantes surveillees :**
- Tension arterielle (systolique et diastolique)
- Frequence cardiaque (pouls)
- Temperature corporelle
- Saturation en oxygene (SpO2)
- Frequence respiratoire
- Glycemie capillaire
- Poids et diurese

**Indications :**
- Insuffisance cardiaque
- Hypertension arterielle
- Post-hospitalisation
- Grossesse a risque
- Pathologies respiratoires (BPCO, asthme severe)

L'IDEL transmet les résultats au médecin traitant et alerte en cas d'anomalie.

**Tarif indicatif :** 3,15 a 4,73 EUR par passage`,
  },
  {
    slug: 'distribution-medicaments',
    name: 'Distribution et surveillance de medicaments à domicile',
    shortName: 'Medicaments',
    icon: 'Clock',
    description: 'Preparation, distribution et surveillance de la prise de medicaments à domicile. Pilulier, observance thérapeutique.',
    details: `La distribution de medicaments à domicile s'adresse aux patients qui ne peuvent pas gerer seuls leur traitement : personnes agees, patients polymediques, troubles cognitifs.

**Role de l'IDEL :**
- Preparation du pilulier (semainier)
- Distribution des medicaments aux heures prescrites
- Surveillance de la prise effective
- Verification des interactions medicamenteuses
- Surveillance des effets secondaires
- Education thérapeutique du patient et de l'entourage

**Indications fréquentes :**
- Personnes agees polymediquees
- Patients atteints de troubles cognitifs (Alzheimer)
- Traitements complexes (anticoagulants, immunosuppresseurs)
- Sortie d'hospitalisation

**Tarif :** Inclus dans le forfait BSI (Bilan de Soins Infirmiers)`,
  },
  {
    slug: 'vaccination-domicile',
    name: 'Vaccination à domicile',
    shortName: 'Vaccination',
    icon: 'Syringe',
    description: 'Vaccination à domicile : grippe, Covid-19, rappels DTP, pneumocoque. Avec ou sans ordonnance selon les cas.',
    details: `Les infirmiers libéraux sont habilites a pratiquer les vaccinations à domicile, sur prescription medicale ou, dans certains cas, sans ordonnance.

**Vaccins realisables à domicile :**
- Grippe saisonniere (sans ordonnance pour les +65 ans et personnes a risque)
- Covid-19 (rappels)
- DTP (diphterie, tetanos, poliomyelite)
- Pneumocoque
- Zona
- Hepatite B
- Autres vaccins sur prescription

**Sans ordonnance :**
Depuis 2022, les IDEL peuvent prescrire et administrer certains vaccins du calendrier vaccinal sans ordonnance prealable (grippe, Covid, DTP, etc.).

**Deroulement :**
1. Verification des antecedents et contre-indications
2. Injection du vaccin
3. Surveillance post-injection (15 minutes)
4. Mise a jour du carnet de vaccination

**Tarif indicatif :** 6,30 EUR (acte d'injection + vaccination)`,
  },
  {
    slug: 'oxygenotherapie',
    name: 'Oxygenotherapie à domicile',
    shortName: 'Oxygenotherapie',
    icon: 'Stethoscope',
    description: 'Mise en place et surveillance d\'oxygenotherapie à domicile. Concentrateur, bouteille, VNI.',
    details: `L'oxygenotherapie à domicile permet aux patients souffrant d'insuffisance respiratoire de recevoir un apport en oxygene chez eux.

**Types d'oxygenotherapie :**
- Concentrateur d'oxygene (fixe ou portable)
- Bouteilles d'oxygene gazeux
- Oxygene liquide
- Ventilation non invasive (VNI)
- PPC (Pression Positive Continue) pour l'apnee du sommeil

**Role de l'IDEL :**
- Mise en route de l'appareillage
- Education du patient a l'utilisation
- Surveillance de la saturation (SpO2)
- Entretien des interfaces (masque, lunettes)
- Coordination avec le prestataire et le pneumologue

**Indications :**
- BPCO severe
- Insuffisance respiratoire chronique
- Fibrose pulmonaire
- Mucoviscidose
- Apnee du sommeil

L'oxygenotherapie longue duree est prise en charge a 100% par l'Assurance Maladie.`,
  },
]

export function getSoin(slug: string): Soin | undefined {
  return SOINS.find(s => s.slug === slug)
}
