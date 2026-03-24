export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  content: string
  heroEmoji: string
  heroColor: string // tailwind gradient from color
  heroColorTo: string // tailwind gradient to color
  category: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'comment-trouver-infirmiere-domicile',
    title: 'Comment trouver une infirmière à domicile ?',
    description: 'Guide complet pour trouver un(e) infirmier(e) à domicile près de chez vous. Demarches, ordonnance, remboursément et conseils pratiques.',
    date: '2026-03-20',
    heroEmoji: '🔍',
    heroColor: '#1565C0',
    heroColorTo: '#42A5F5',
    category: 'Guide pratique',
    content: `## Comment trouver une infirmière à domicile ?

Trouver un(e) infirmier(e) libéral(e) pour des soins à domicile peut sembler complique, surtout quand on en a besoin rapidement. Voici un guide complet pour vous aider.

### 1. Obtenez une ordonnance medicale

Avant tout, vous avez besoin d'une ordonnance de votre médecin traitant ou d'un specialiste. C'est cette prescription qui permettra la prise en charge de vos soins par l'Assurance Maladie. Seule exception : la vaccination antigrippale, qui ne nécessite pas d'ordonnance.

### 2. Recherchez un IDEL près de chez vous

Plusieurs options s'offrent a vous :

**Via Medicaly (recommande) :** Notre annuaire référence plus de 100 000 infirmiers libéraux en France. Recherchez par ville, département ou code postal pour trouver les IDEL les plus proches. Chaque fiche affiche les coordonnées, l'adresse du cabinet et le numéro RPPS.

**Via votre pharmacien :** Votre pharmacien connait généralement les infirmiers libéraux du quartier et peut vous orienter.

**Via votre médecin :** Votre médecin traitant peut vous recommander un IDEL avec qui il travaille regulierement.

### 3. Contactez l'infirmier(e)

Appelez directement l'IDEL pour :
- Vérifiér sa disponibilité
- Expliquer la nature des soins
- Convenir d'un rendez-vous (premier passage)
- Transmettre l'ordonnance

### 4. La prise en charge

Lors du premier passage, l'infirmier(e) :
- Evalue vos besoins
- Etablit un plan de soins
- Vous explique la fréquence des passages
- S'occupe des formalites administratives (tiers payant)

### Remboursement des soins

Les soins infirmiers à domicile sont pris en charge a **60%** par l'Assurance Maladie. Les 40% restants sont couverts par votre mutuelle. En cas d'**ALD (Affection Longue Duree)**, la prise en charge est de **100%**.

La plupart des IDEL pratiquent le **tiers payant** : vous n'avez rien a avancer, l'Assurance Maladie et votre mutuelle sont facturees directement.

### Tarifs indicatifs

| Soin | Tarif conventionnel |
|------|-------------------|
| Injection (IM, SC) | 3,15 EUR |
| Pansement simple | 6,30 EUR |
| Pansement complexe | 12,60 EUR |
| Prise de sang | 4,73 EUR |
| Perfusion (pose) | 10,00 EUR |
| Toilette/nursing | 13,70 EUR (BSI) |

Ces tarifs peuvent varier selon la complexite des soins et les majorations (dimanche, jours feries, nuit).`,
  },
  {
    slug: 'tarifs-soins-infirmiers-domicile-2026',
    title: 'Tarifs des soins infirmiers à domicile en 2026',
    description: 'Grille complète des tarifs IDEL 2026 : injections, pansements, perfusions, BSI. Remboursement Assurance Maladie et reste a charge.',
    date: '2026-03-18',
    heroEmoji: '💰',
    heroColor: '#2E7D32',
    heroColorTo: '#66BB6A',
    category: 'Tarifs et remboursément',
    content: `## Tarifs des soins infirmiers à domicile en 2026

Les tarifs des infirmiers libéraux (IDEL) sont fixes par la convention nationale entre les syndicats infirmiers et l'Assurance Maladie. Voici la grille complète pour 2026.

### Actes courants

**Injections et vaccinations :**
- Injection intramusculaire ou sous-cutanee : 3,15 EUR
- Injection intraveineuse : 4,73 EUR
- Vaccination : 6,30 EUR (acte + injection)

**Pansements :**
- Pansement simple (plaie propre) : 6,30 EUR
- Pansement complexe (escarre, brulure) : 12,60 EUR
- Ablation de fils ou agrafes : 6,30 EUR

**Prelevements :**
- Prise de sang (prelevement veineux) : 4,73 EUR
- Glycemie capillaire : 1,89 EUR

**Perfusions :**
- Pose de perfusion : 10,00 EUR
- Surveillance de perfusion : 4,73 EUR/passage

### BSI (Bilan de Soins Infirmiers)

Le BSI remplace depuis 2020 la DSI (Demarche de Soins Infirmiers) pour les patients dependants. Les forfaits journaliers sont :
- BSI Leger : 13,00 EUR/jour
- BSI Intermédiaire : 18,20 EUR/jour
- BSI Lourd : 28,70 EUR/jour

### Majorations

Des majorations s'appliquent dans certaines situations :
- **Dimanche et jours feries** : +8,50 EUR par passage
- **Nuit (20h-8h)** : +9,15 EUR par passage
- **Deplacement** (IFD) : 2,50 EUR par passage
- **Indemnité kilométrique** (IK) : 0,35 EUR/km (au-dela de 2 km)

### Remboursement

L'Assurance Maladie remboursé **60%** du tarif conventionnel. Votre mutuelle prend en charge les 40% restants. En cas d'ALD, le remboursément est de **100%**.

### Le tiers payant

La grande majorite des IDEL pratiquent le tiers payant : vous n'avancez rien, l'Assurance Maladie et votre mutuelle sont facturees directement. C'est la norme pour les soins à domicile.`,
  },
  {
    slug: 'difference-infirmier-liberal-salarie',
    title: 'Infirmier libéral vs salarie : quelles differences ?',
    description: 'Comprendre les differences entre un infirmier libéral (IDEL) et un infirmier salarie. Statut, exercice, avantages pour le patient.',
    date: '2026-03-15',
    heroEmoji: '⚖️',
    heroColor: '#5E35B1',
    heroColorTo: '#9575CD',
    category: 'Comprendre',
    content: `## Infirmier libéral vs salarie : quelles differences ?

En France, les infirmiers diplomes d'Etat (IDE) peuvent exercer de deux manieres tres differentes : en tant que salarie ou en libéral. Voici ce qui les distingue.

### L'infirmier salarie

L'infirmier salarie travaille pour un employeur : hôpital, clinique, EHPAD, centre de soins, entreprise, éducation nationale... Il est lie par un contrat de travail et percoit un salaire fixe.

**Caracteristiques :**
- Travaille dans une structure de soins
- Salaire fixe (grille hospitaliere ou convention collective)
- Horaires definis par l'employeur
- Pas de gestion administrative
- Soins realises dans la structure

### L'infirmier libéral (IDEL)

L'infirmier libéral est un professionnel independant. Il exerce a son compte, souvent à domicile ou dans un cabinet. Il gere son planning, ses patients et sa comptabilite.

**Caracteristiques :**
- Travaille a son compte (profession libérale)
- Revenus variables selon l'activite
- Liberte d'organisation du planning
- Gestion administrative et comptable
- Soins à domicile principalement

### Pour le patient, que choisir ?

**Vous avez besoin de soins à domicile ?** C'est l'IDEL qu'il vous faut. C'est le seul professionnel qui se deplace chez vous pour realiser vos soins infirmiers.

**Avantages de l'IDEL pour le patient :**
- Se deplace a votre domicile
- Horaires souples (matin, soir, week-end)
- Relation de confiance durable
- Connaissance de votre environnement
- Coordination avec votre médecin traitant

### Les chiffres en France

La France compte environ **130 000 infirmiers libéraux** (IDEL) et **600 000 infirmiers salaries**. Les IDEL representent donc environ 18% de la profession, mais assurent la quasi-totalite des soins à domicile.

Medicaly référence plus de **100 000 IDEL** exercant en France, soit la couverture la plus complète disponible en ligne.`,
  },
  {
    slug: 'soins-infirmiers-domicile-guide-complet',
    title: 'Soins infirmiers à domicile : le guide complet',
    description: 'Tout savoir sur les soins infirmiers à domicile : types de soins, demarches, remboursément, BSI, ALD. Guide complet pour les patients.',
    date: '2026-03-10',
    heroEmoji: '📖',
    heroColor: '#E65100',
    heroColorTo: '#FF9800',
    category: 'Guide complet',
    content: `## Soins infirmiers à domicile : le guide complet

Les soins infirmiers à domicile permettent aux patients de recevoir des soins de qualite sans se deplacer. Voici tout ce que vous devez savoir.

### Quels soins un IDEL peut-il realiser à domicile ?

Les infirmiers libéraux sont habilites a realiser une grande variete de soins :

**Soins techniques :**
- Injections (intramusculaires, sous-cutanees, intraveineuses)
- Vaccinations
- Pansements simples et complexes
- Prises de sang et prelevements
- Pose et surveillance de perfusions
- Sondages urinaires
- Stomies (soins et appareillage)

**Soins de nursing :**
- Aide a la toilette et a l'hygiene
- Prevention des escarres
- Aide a l'alimentation
- Mobilisation et installation du patient

**Surveillance et éducation :**
- Surveillance de la glycemie (diabete)
- Education thérapeutique du patient
- Surveillance des constantes (tension, temperature)
- Suivi post-operatoire
- Administration et surveillance des traitements

### Le BSI (Bilan de Soins Infirmiers)

Depuis 2020, le BSI remplace la DSI pour les patients dependants. Il permet a l'infirmier d'évaluer les besoins du patient et de definir un plan de soins personnalise.

**Les 3 niveaux du BSI :**
1. **BSI Leger** : soins ponctuels, patient relativement autonome
2. **BSI Intermédiaire** : soins quotidiens, dépendance partielle
3. **BSI Lourd** : soins pluriquotidiens, dépendance importante

Le BSI est reevalue regulierement pour s'adapter a l'evolution de l'etat du patient.

### Demarches pour obtenir des soins à domicile

1. **Consultez votre médecin** : il redige une ordonnance
2. **Trouvez un IDEL** : via Medicaly, votre pharmacien ou votre médecin
3. **Premier contact** : l'IDEL evalue vos besoins
4. **Debut des soins** : selon le plan de soins etabli

### ALD et prise en charge a 100%

Si vous souffrez d'une **Affection Longue Duree** (diabete, cancer, insuffisance cardiaque...), vos soins infirmiers sont pris en charge a **100%** par l'Assurance Maladie. C'est votre médecin traitant qui etablit la demande d'ALD.

### Trouver un IDEL sur Medicaly

Medicaly référence plus de 100 000 infirmiers libéraux en France. Recherchez par ville, département ou nom pour trouver un IDEL près de chez vous et le contacter directement.`,
  },
  {
    slug: 'soins-infirmiers-apres-avc',
    title: 'Soins infirmiers apres un AVC : le role cle de l\'IDEL',
    description: 'Apres un AVC, l\'infirmier à domicile joue un role essentiel dans la reéducation et la prévention. Soins, surveillance, accompagnement du patient et de sa famille.',
    date: '2026-03-08',
    heroEmoji: '🧠',
    heroColor: '#C62828',
    heroColorTo: '#EF5350',
    category: 'Pathologie',
    content: `## Soins infirmiers apres un AVC : le role cle de l'IDEL

L'Accident Vasculaire Cerebral (AVC) est une urgence medicale qui nécessite une prise en charge rapide. Apres l'hospitalisation, le retour à domicile implique souvent un suivi infirmier regulier. Voici le role de l'IDEL dans cette phase cruciale.

### Les premiers jours apres le retour à domicile

La sortie d'hospitalisation apres un AVC marque le debut d'une longue phase de recuperation. L'infirmier libéral intervient des les premiers jours pour :

**Surveiller les signes vitaux :**
- Prise de la tension arterielle (controle strict pour eviter une recidive)
- Surveillance de la glycemie
- Temperature corporelle
- Frequence cardiaque et respiratoire

**Administrer les traitements :**
- Anticoagulants (fluidifiants sanguins) par voie orale ou injectable
- Antiagregants plaquettaires
- Traitements de la tension arterielle
- Education thérapeutique sur les medicaments

### Les soins infirmiers specifiques post-AVC

L'IDEL realise plusieurs types de soins adaptes aux sequelles de l'AVC :

**Soins d'hygiene et de nursing :**
- Toilette au lit si le patient est alite
- Prevention des escarres (changements de position, massages)
- Soins de bouche
- Aide a l'alimentation si troubles de la deglutition

**Reéducation et mobilisation :**
- Exercices de mobilisation passive ou active
- Prevention des raideurs articulaires
- Aide au lever et aux transferts (lit-fauteuil)
- Coordination avec le kinesithérapeutique

**Soins techniques :**
- Pose et surveillance de sonde urinaire si incontinence
- Pansements si alitement prolonge
- Perfusions si deshydratation ou alimentation enterale

### La surveillance neurologique

L'IDEL est forme pour detecter les signes d'une eventuelle complication ou recidive :

**Signes d'alerte a surveiller :**
- Troubles de la parole ou de la comprehension
- Faiblesse ou paralysie soudaine d'un cote
- Troubles visuels
- Maux de tete violents
- Troubles de l'equilibre

En cas de signe suspect, l'IDEL contacte immediatement le médecin traitant ou le SAMU (15).

### L'éducation thérapeutique du patient et de sa famille

L'infirmier accompagne le patient et son entourage dans la comprehension de la maladie :

**Formation du patient :**
- Reconnaissance des signes de recidive
- Importance de l'observance des traitements
- Regles hygienico-dietetiques (alimentation, arret du tabac)
- Gestion du stress

**Soutien aux aidants :**
- Apprentissage des gestes de nursing
- Techniques de mobilisation securisees
- Organisation du quotidien
- Prevention de l'epuisement de l'aidant

### La coordination avec les autres professionnels

L'IDEL travaille en etroite collaboration avec l'equipe soignante :
- Medecin traitant (consultation reguliere)
- Kinesithérapeutique (reéducation motrice)
- Orthophoniste (troubles du langage)
- Ergothérapeutique (adaptation du domicile)
- Neurologue (suivi specialise)

L'infirmier fait le lien entre tous ces intervenants et transmet les informations essentielles au médecin traitant.

### La prise en charge financiere

Les soins infirmiers apres un AVC sont pris en charge a **100%** par l'Assurance Maladie dans le cadre de l'ALD (Affection Longue Duree). Le médecin etablit la demande d'ALD qui couvre tous les soins lies a l'AVC.

Le BSI (Bilan de Soins Infirmiers) peut etre mis en place si le patient nécessite des soins quotidiens. Il permet une prise en charge adaptee et personnalisee.

### La duree du suivi

Le suivi infirmier apres un AVC varie selon la gravite des sequelles :
- **Cas legers** : quelques semaines a quelques mois
- **Cas moderes** : plusieurs mois a un an
- **Sequelles importantes** : suivi au long cours (plusieurs annees)

L'objectif est de recuperer un maximum d'autonomie et de prévenir une recidive.`,
  },
  {
    slug: 'diabete-type-2-role-idel',
    title: 'Diabete de type 2 : le role essentiel de l\'infirmier à domicile',
    description: 'L\'IDEL accompagne les patients diabetiques : surveillance glycemie, éducation thérapeutique, prévention des complications. Guide complet du suivi infirmier.',
    date: '2026-03-05',
    heroEmoji: '💉',
    heroColor: '#00695C',
    heroColorTo: '#26A69A',
    category: 'Pathologie',
    content: `## Diabete de type 2 : le role essentiel de l'infirmier à domicile

Le diabete de type 2 touche près de 4 millions de Francais. L'infirmier libéral joue un role central dans le suivi et l'accompagnement des patients diabetiques à domicile.

### La surveillance de la glycemie

C'est le premier role de l'IDEL dans le suivi du diabete :

**Mesure de la glycemie capillaire :**
- Prelevement d'une goutte de sang au bout du doigt
- Lecture avec un lecteur glycemique
- Interpretation des résultats
- Adaptation des doses d'insuline si protocole etabli

**Frequence de surveillance :**
- Diabete equilibre : 1 a 2 fois par semaine
- Diabete desequilibre ou sous insuline : quotidienne voire pluriquotidienne
- Adaptation selon les prescriptions medicales

**Transmission au médecin :**
L'IDEL tient un carnet de glycemie et transmet regulierement les résultats au médecin traitant ou au diabetologue. En cas de valeurs anormales (hypo ou hyperglycemie), l'infirmier contacte le médecin pour ajuster le traitement.

### L'administration des traitements

De nombreux patients diabetiques nécessitent des injections d'insuline. L'IDEL intervient pour :

**Injections d'insuline :**
- Sous-cutanee (abdomen, cuisse, bras)
- Respect des zones de rotation pour eviter les lipodystrophies
- Adaptation des doses selon le protocole medical

**Education a l'auto-injection :**
L'objectif est de rendre le patient autonome. L'infirmier enseigne :
- Le choix du site d'injection
- La technique d'injection
- Le stockage de l'insuline
- Le renouvellement du materiel (aiguilles, stylos)

**Autres traitements :**
- Comprimes antidiabetiques oraux (verification de la prise)
- Traitements des complications (insuffisance renale, troubles cardiaques)

### L'éducation thérapeutique du patient (ETP)

C'est un pilier du suivi infirmier du diabete :

**Education nutritionnelle :**
- Principes de l'alimentation equilibree
- Choix des glucides (index glycemique)
- Repartition des repas dans la journee
- Gestion des ecarts et des situations exceptionnelles

**Activite physique :**
- Importance de l'exercice regulier
- Adaptation selon l'age et les capacites
- Precautions (mesure glycemique avant et apres)

**Gestion des hypoglycemies :**
- Reconnaitre les symptomes (sueurs, tremblements, faim)
- Resucrage immediat (15 g de glucides rapides)
- Prevention (ne jamais sauter un repas)

### La prévention des complications

Le diabete peut entrainer des complications graves. L'IDEL surveille :

**Examen des pieds (pied diabetique) :**
- Inspection quotidienne ou hebdomadaire
- Detection de plaies, crevasses, mycoses
- Education aux soins des pieds
- Prevention des ulceres et amputations

**Surveillance cardiovasculaire :**
- Prise de la tension arterielle
- Surveillance du poids
- Depistage de l'insuffisance cardiaque

**Surveillance renale :**
- Depistage de l'insuffisance renale (bilan sanguin)
- Surveillance de la proteinurie (bandelette urinaire)

**Surveillance ophtalmologique :**
L'IDEL encourage le suivi regulier chez l'ophtalmologue pour depister la retinopathie diabetique.

### Le BSI pour les patients diabetiques

Les patients diabetiques avec des complications ou une perte d'autonomie peuvent beneficier du **BSI (Bilan de Soins Infirmiers)**. Ce forfait quotidien couvre :
- La surveillance glycemique
- Les injections d'insuline
- Les soins de nursing si besoin
- L'éducation thérapeutique

Le BSI est prescrit par le médecin et pris en charge a 100% en ALD.

### La coordination avec le médecin et le diabetologue

L'IDEL fait le lien entre le patient et les médecins :
- Transmission des glycemies et des observations
- Signalement des anomalies (hypo/hyperglycemies repetees)
- Participation aux consultations medicales si besoin
- Suivi du carnet de diabete

### La prise en charge financiere

Le diabete de type 2 est une **ALD (Affection Longue Duree)**. Tous les soins infirmiers lies au diabete sont pris en charge a **100%** par l'Assurance Maladie, sans reste a charge pour le patient.

### Trouver un IDEL specialise diabete

Sur Medicaly, vous pouvez rechercher un infirmier libéral près de chez vous. De nombreux IDEL sont specialises dans le suivi des patients diabetiques et formes a l'éducation thérapeutique.`,
  },
  {
    slug: 'cancer-soins-domicile',
    title: 'Cancer : les soins infirmiers à domicile',
    description: 'Accompagnement infirmier des patients atteints de cancer à domicile. Chimiotherapie, soins de support, gestion de la douleur, HAD.',
    date: '2026-03-01',
    heroEmoji: '🎗️',
    heroColor: '#AD1457',
    heroColorTo: '#EC407A',
    category: 'Pathologie',
    content: `## Cancer : les soins infirmiers à domicile

Le cancer est une epreuve difficile. L'infirmier libéral apporte un soutien essentiel aux patients traites à domicile, permettant de concilier qualite des soins et confort de vie.

### Les soins infirmiers en oncologie à domicile

L'IDEL intervient a differentes etapes du parcours de soins :

**Pendant les traitements (chimiotherapie, radiotherapie) :**
- Surveillance des effets secondaires
- Soins des voies veineuses peripheriques (VVP) ou centrales (PICC line, chambre implantable)
- Administration de certaines chimiotherapies orales ou sous-cutanees
- Hydratation par perfusion si besoin

**En phase de surveillance :**
- Soins de confort
- Prevention des infections
- Surveillance de l'etat general
- Detection des signes de recidive

**En soins palliatifs :**
- Gestion de la douleur
- Soins d'hygiene et de confort
- Accompagnement du patient et de sa famille
- Coordination avec l'equipe de soins palliatifs

### La chimiotherapie à domicile

Certains protocoles de chimiotherapie peuvent etre administres à domicile :

**Conditions :**
- Protocole valide par l'oncologue
- Patient stable, sans complications
- Dispositif d'acces veineux (chambre implantable, PICC line)
- Formation de l'IDEL a la manipulation des cytotoxiques

**Deroulement :**
- Pose de la perfusion selon le protocole
- Surveillance des constantes (tension, temperature, pouls)
- Detection des effets secondaires immediats
- Depose de la perfusion a la fin du protocole
- Rinçage et heparinisation du dispositif

**Avantages pour le patient :**
- Evite les déplacements a l'hôpital
- Confort du domicile
- Moins de fatigue
- Proximite avec les proches

### Les soins de support

L'IDEL realise de nombreux soins de support essentiels :

**Gestion des nausees et vomissements :**
- Administration d'antiemetiques
- Conseils nutritionnels
- Fractionnement des repas

**Prevention et traitement de la douleur :**
- Administration d'antalgiques (morphine, fentanyl)
- Surveillance de l'efficacite et des effets secondaires
- Pose de patch antalgique

**Soins de bouche :**
- Mucites post-chimiotherapie
- Prevention des infections buccales
- Soins d'hygiene adaptes

**Soins de la peau :**
- Hydratation (secheresse liee a la chimio ou radiotherapie)
- Pansements sur zones irradiees
- Prevention des escarres si alitement

### L'HAD (Hospitalisation a Domicile)

Pour les patients atteints de cancer, l'HAD peut etre mise en place :

**Qu'est-ce que l'HAD ?**
C'est une alternative a l'hospitalisation classique. Le patient reste à domicile et beneficie de soins equivalents a ceux dispenses a l'hôpital.

**Indications en oncologie :**
- Chimiotherapie à domicile
- Soins palliatifs
- Surveillance post-operatoire
- Gestion des complications (infections, deshydratation)

**Role de l'IDEL en HAD :**
- Coordination avec l'equipe HAD
- Soins techniques quotidiens
- Surveillance rapprochee
- Lien avec le médecin coordonnateur

### La gestion de la douleur

La douleur est un symptome fréquent dans le cancer. L'IDEL y joue un role majeur :

**Evaluation de la douleur :**
- Echelle visuelle analogique (EVA)
- Caracterisation (aigue, chronique, neuropathique)
- Retentissement sur la vie quotidienne

**Administration des antalgiques :**
- Palier 1 (paracetamol)
- Palier 2 (codeine, tramadol)
- Palier 3 (morphine, fentanyl, oxycodone)

**Titration morphinique :**
Adaptation progressive des doses de morphine jusqu'a obtenir un soulagement efficace, sous protocole medical.

**Voies d'administration :**
- Orale (comprimes, gellules)
- Sous-cutanee (injections, pompe)
- Transdermique (patch)
- Intraveineuse (perfusion continue)

### L'accompagnement psychologique

Le cancer bouleverse la vie du patient et de ses proches. L'IDEL apporte :

**Ecoute et soutien :**
- Disponibilite pour parler
- Reassurance dans les moments difficiles
- Respect du vecu et des emotions

**Information :**
- Explication des traitements
- Reponses aux questions
- Orientation vers des ressources (psychologue, association)

**Soutien aux aidants :**
- Enseignement des gestes de soins
- Prevention de l'epuisement
- Orientation vers des aides (aide à domicile, repit)

### La prise en charge financiere

Le cancer est une **ALD 30** (Affection Longue Duree exonerante). Tous les soins lies au cancer sont pris en charge a **100%** par l'Assurance Maladie :
- Consultations
- Soins infirmiers
- Traitements (chimiotherapie, radiotherapie)
- Hospitalisations

L'IDEL pratique le tiers payant integral : aucun frais a avancer.

### Trouver un IDEL forme en oncologie

Sur Medicaly, recherchez un infirmier libéral près de chez vous. De nombreux IDEL sont formes a l'oncologie et aux soins palliatifs. N'hesitez pas a leur demander leur experience lors du premier contact.`,
  },
  {
    slug: 'personne-agee-maintien-domicile',
    title: 'Maintien à domicile des personnes agees : le role de l\'IDEL',
    description: 'L\'infirmier à domicile facilite le maintien à domicile des personnes agees. BSI, soins d\'hygiene, prévention, coordination avec les aidants.',
    date: '2026-02-25',
    heroEmoji: '👴',
    heroColor: '#4E342E',
    heroColorTo: '#8D6E63',
    category: 'Accompagnement',
    content: `## Maintien à domicile des personnes agees : le role de l'IDEL

Vieillir chez soi est le souhait de la majorite des Francais. L'infirmier libéral est un acteur cle du maintien à domicile des personnes agees.

### Les soins courants chez la personne agee

L'IDEL intervient quotidiennement pour :

**Soins d'hygiene et de confort :**
- Toilette au lit ou au lavabo
- Soins de bouche (hygiene dentaire, proteses)
- Soins des ongles (prévention des ongles incarnes)
- Habillage et deshabillage

**Prevention des escarres :**
- Massages des zones de pression
- Changements de position reguliers
- Surveillance de l'etat cutane
- Pansements si escarres constitues

**Aide a l'alimentation :**
- Installation pour les repas
- Surveillance de la prise alimentaire
- Prevention de la denutrition
- Hydratation (boissons, perfusions si besoin)

### Le BSI (Bilan de Soins Infirmiers)

Le BSI est le dispositif central du maintien à domicile des personnes agees dependantes :

**Evaluation de la dépendance :**
L'IDEL evalue le degre de dépendance selon plusieurs criteres :
- Mobilite (se deplacer, se lever, s'asseoir)
- Hygiene (se laver, s'habiller)
- Alimentation (manger, boire)
- Elimination (continence urinaire et fecale)
- Fonctions cognitives (memoire, orientation)

**Les 3 niveaux du BSI :**
- **BSI Leger** (13 EUR/jour) : patient semi-autonome, soins ponctuels
- **BSI Intermédiaire** (18,20 EUR/jour) : dépendance partielle, soins quotidiens
- **BSI Lourd** (28,70 EUR/jour) : grande dépendance, soins pluriquotidiens

Le BSI couvre tous les soins infirmiers quotidiens (toilette, prévention, surveillance, traitements).

### La surveillance de l'etat de sante

L'IDEL assure un suivi rapproche :

**Surveillance des constantes :**
- Tension arterielle (depistage hypertension)
- Poids (prévention denutrition ou surcharge)
- Temperature (detection infections)
- Glycemie si diabete

**Detection des pathologies :**
- Troubles cognitifs (debut de demence)
- Troubles de l'equilibre (risque de chute)
- Infections urinaires ou respiratoires
- Deshydratation

**Gestion des traitements :**
- Preparation du pilulier (semainier)
- Surveillance de la prise des medicaments
- Detection des interactions ou effets indesirables
- Education du patient et de l'entourage

### La prévention des chutes

Les chutes sont la première cause de mortalite accidentelle chez les plus de 65 ans. L'IDEL agit en prévention :

**Evaluation du risque :**
- Troubles de l'equilibre et de la marche
- Faiblesse musculaire
- Troubles visuels
- Medicaments sedatifs
- Environnement inadapte (tapis, eclairage)

**Conseils d'amenagement :**
- Suppression des tapis glissants
- Installation de barres d'appui
- Eclairage nocturne
- Chaussures adaptees

**Reéducation a la marche :**
- Coordination avec le kinesithérapeutique
- Exercices d'equilibre
- Utilisation d'aides techniques (canne, deambulateur)

### La coordination avec les autres intervenants

Le maintien à domicile implique souvent plusieurs acteurs. L'IDEL coordonne :

**Professionnels de sante :**
- Medecin traitant (consultations, prescriptions)
- Kinesithérapeutique (reéducation, mobilisation)
- Ergothérapeutique (amenagement du domicile)
- Orthophoniste (troubles de la deglutition)

**Aides à domicile :**
- Auxiliaire de vie (aide aux repas, menage)
- Portage de repas
- Teleassistance

**Aidants familiaux :**
- Formation aux gestes de soins
- Relais de l'IDEL
- Prevention de l'epuisement

### L'accompagnement de fin de vie

Lorsque le maintien à domicile concerne une fin de vie, l'IDEL joue un role essentiel :

**Soins de confort :**
- Gestion de la douleur (morphine, anxiolytiques)
- Soins de bouche
- Prevention des escarres
- Hydratation

**Soutien psychologique :**
- Ecoute du patient
- Accompagnement de la famille
- Coordination avec les soins palliatifs à domicile

**Astreinte 24h/24 :**
De nombreux IDEL proposent une astreinte pour rassurer la famille et intervenir en urgence si besoin.

### La prise en charge financiere

Le BSI est pris en charge a **60%** par l'Assurance Maladie, les 40% restants par la mutuelle. En cas d'ALD, la prise en charge est de **100%**.

**Aides complementaires :**
- APA (Allocation Personnalisee d'Autonomie)
- Credit d'impot pour l'emploi à domicile
- Aides des caisses de retraite

### Trouver un IDEL pour le maintien à domicile

Sur Medicaly, recherchez un infirmier libéral près de chez vous. Privilegiez un IDEL habitue au suivi des personnes agees et disponible pour des passages quotidiens (matin et/ou soir).`,
  },
  {
    slug: 'soins-post-operatoires-guide',
    title: 'Soins post-operatoires à domicile : le guide complet',
    description: 'Retour à domicile apres une operation : pansements, ablation fils, drains, surveillance. Le role de l\'IDEL dans la convalescence.',
    date: '2026-02-20',
    heroEmoji: '🏥',
    heroColor: '#1565C0',
    heroColorTo: '#42A5F5',
    category: 'Guide pratique',
    content: `## Soins post-operatoires à domicile : le guide complet

Apres une intervention chirurgicale, le retour à domicile s'accompagne souvent d'un suivi infirmier. Voici tout ce qu'il faut savoir sur les soins post-operatoires.

### Les premiers jours apres la sortie

La sortie d'hospitalisation apres une operation peut etre source d'angoisse. L'IDEL est la pour rassurer et prendre en charge les soins :

**Premier passage :**
- Evaluation de l'etat general du patient
- Verification de l'ordonnance de sortie
- Explication du plan de soins
- Installation du materiel si besoin (poche de drainage, materiel de pansement)

**Frequence des passages :**
- Variable selon le type d'operation
- Quotidienne en debut de convalescence
- Puis tous les 2-3 jours jusqu'a cicatrisation
- Adaptation selon l'evolution

### Les soins de plaie operatoire

C'est le soin le plus fréquent apres une chirurgie :

**Types de pansements :**
- **Pansement simple** : plaie propre, suturee, en voie de cicatrisation
- **Pansement complexe** : plaie infectee, necrose, retard de cicatrisation
- **Pansement avec drain** : evacuation des liquides (sang, lymphe)

**Deroulement du soin :**
1. Lavage des mains et preparation du materiel sterile
2. Retrait de l'ancien pansement
3. Nettoyage de la plaie (serum physiologique ou antiseptique)
4. Evaluation de la cicatrisation
5. Application d'un nouveau pansement
6. Elimination des dechets de soins

**Signes de complication a surveiller :**
- Rougeur, chaleur, douleur (infection)
- Ecoulement purulent ou malodorant
- Fievre
- Desunion de la plaie (ouverture des points)

En cas de signe suspect, l'IDEL contacte le chirurgien ou le médecin traitant.

### L'ablation de fils et d'agrafes

C'est un acte courant realise par l'IDEL :

**Delai d'ablation :**
- Visage : 5 a 7 jours
- Thorax, abdomen : 10 a 15 jours
- Membres : 12 a 21 jours

Le chirurgien precise la date d'ablation sur l'ordonnance de sortie.

**Deroulement :**
- Nettoyage de la plaie
- Retrait des fils ou agrafes avec du materiel sterile
- Desinfection
- Pansement si necessaire
- Conseils pour les jours suivants

**Apres l'ablation :**
- Eviter les bains (douche autorisee)
- Protection solaire (cicatrice)
- Massage de la cicatrice (apres 3 semaines)

### Les drains operatoires

Certaines interventions nécessitent la pose de drains (redons, drains de Kehr, drains thoraciques) :

**Role du drain :**
Evacuer les liquides (sang, lymphe, bile) pour eviter leur accumulation et favoriser la cicatrisation.

**Soins infirmiers :**
- Surveillance de la quantite et de l'aspect du liquide draine
- Vidange du sac collecteur
- Pansement autour du drain
- Prevention de l'infection

**Ablation du drain :**
Realisee par l'IDEL sur prescription medicale, généralement apres quelques jours quand le drainage devient minime.

### La surveillance post-operatoire

L'IDEL surveille l'etat general du patient :

**Constantes vitales :**
- Temperature (detection de fievre, signe d'infection)
- Tension arterielle
- Pouls, fréquence respiratoire
- Saturation en oxygene si chirurgie thoracique ou cardiaque

**Surveillance de la douleur :**
- Evaluation de l'intensite (echelle EVA)
- Administration d'antalgiques (morphine si besoin)
- Ajustement des doses avec le médecin

**Surveillance des complications :**
- Infection de la plaie
- Thrombose veineuse (phleb

ite)
- Embolie pulmonaire
- Retention urinaire
- Nausees et vomissements

### Les injections preventives

Apres certaines chirurgies, des injections quotidiennes sont prescrites :

**Anticoagulants :**
Pour prévenir les phleb ites et embolies pulmonaires. Injections sous-cutanees quotidiennes pendant 1 a 6 semaines selon le type de chirurgie.

**Antibiotiques :**
Si risque infectieux eleve (chirurgie viscerale, orthopedique).

### La reéducation post-operatoire

L'IDEL coordonne avec le kinesithérapeutique :

**Chirurgie orthopedique :**
- Mobilisation precoce
- Reéducation de la marche
- Prevention des raideurs

**Chirurgie abdominale :**
- Reéducation respiratoire
- Reprise du transit (mobilisation, alimentation)

**Chirurgie cardiaque :**
- Reéducation cardiaque progressive
- Surveillance de l'essoufflement

### Les conseils pour une bonne convalescence

L'IDEL prodigue des conseils pour optimiser la guerison :

**Hygiene de vie :**
- Alimentation equilibree, riche en proteines
- Hydratation suffisante
- Repos mais mobilisation progressive
- Arret du tabac (cicatrisation plus rapide)

**Gestes a eviter :**
- Port de charges lourdes
- Efforts physiques intenses
- Bains (piscine, mer) avant cicatrisation complète

**Surveillance à domicile :**
- Prendre sa temperature quotidiennement
- Surveiller l'aspect de la cicatrice
- Respecter les rendez-vous de suivi avec le chirurgien

### La prise en charge financiere

Les soins infirmiers post-operatoires sont pris en charge a **60%** par l'Assurance Maladie, les 40% restants par la mutuelle. En cas de chirurgie liee a une ALD, la prise en charge est de **100%**.

L'IDEL pratique généralement le tiers payant : aucun frais a avancer.

### Trouver un IDEL pour vos soins post-operatoires

Sur Medicaly, recherchez un infirmier libéral disponible près de chez vous. Contactez-le avant votre sortie d'hospitalisation pour organiser le premier passage des votre retour à domicile.`,
  },
  {
    slug: 'bsi-bilan-soins-infirmiers',
    title: 'BSI : tout comprendre sur le Bilan de Soins Infirmiers',
    description: 'Le BSI remplace la DSI depuis 2020. Evaluation de la dépendance, 3 forfaits, demarches, prise en charge. Guide complet pour les patients et aidants.',
    date: '2026-02-15',
    heroEmoji: '📋',
    heroColor: '#37474F',
    heroColorTo: '#78909C',
    category: 'Comprendre',
    content: `## BSI : tout comprendre sur le Bilan de Soins Infirmiers

Depuis 2020, le BSI (Bilan de Soins Infirmiers) a remplace la DSI (Demarche de Soins Infirmiers). Ce nouveau dispositif structure le suivi infirmier des patients dependants à domicile.

### Qu'est-ce que le BSI ?

Le BSI est un forfait quotidien qui rémunère l'ensemble des soins infirmiers realises chez un patient dependant :

**Objectifs du BSI :**
- Evaluer le degre de dépendance du patient
- Definir un plan de soins personnalise
- Assurer un suivi regulier et coordonne
- Adapter les soins a l'evolution de l'etat du patient

**Qui est concerne ?**
- Personnes agees dependantes
- Patients atteints de maladies chroniques invalidantes
- Convalescence apres hospitalisation
- Patients en soins palliatifs

### Les 3 niveaux du BSI

Le BSI se decline en 3 forfaits selon le degre de dépendance :

**BSI Leger (13,00 EUR/jour) :**
- Patient relativement autonome
- Soins ponctuels (injections, pansements, surveillance)
- 1 passage par jour en moyenne

**BSI Intermédiaire (18,20 EUR/jour) :**
- Dependance partielle
- Soins quotidiens (toilette, traitements, prévention)
- 1 a 2 passages par jour

**BSI Lourd (28,70 EUR/jour) :**
- Grande dépendance
- Soins pluriquotidiens (nursing complet, traitements multiples)
- 2 a 3 passages par jour voire plus

### L'evaluation de la dépendance

L'IDEL evalue la dépendance selon plusieurs criteres :

**Fonctions physiques :**
- Mobilite (se lever, se deplacer, s'asseoir)
- Hygiene (se laver, s'habiller)
- Alimentation (manger, boire)
- Elimination (continence urinaire et fecale)

**Fonctions cognitives :**
- Memoire, orientation temporelle et spatiale
- Comprehension
- Communication

**Environnement :**
- Presence ou absence d'un aidant
- Amenagement du domicile
- Acces aux soins

**Pathologies :**
- Nombre et severite des maladies
- Traitements en cours
- Risque de complications

### Les soins couverts par le BSI

Le forfait BSI couvre l'ensemble des soins infirmiers quotidiens :

**Soins d'hygiene :**
- Toilette au lit ou au lavabo
- Soins de bouche, des ongles
- Habillage et deshabillage

**Soins techniques :**
- Injections (sous-cutanees, intramusculaires, intraveineuses)
- Pansements
- Pose et surveillance de sonde urinaire
- Surveillance de perfusion

**Surveillance :**
- Prise des constantes (tension, poids, temperature)
- Surveillance de la glycemie
- Detection des complications

**Administration des traitements :**
- Preparation du pilulier
- Surveillance de la prise des medicaments
- Education thérapeutique

**Prevention :**
- Prevention des escarres (massages, changements de position)
- Prevention des chutes
- Prevention de la denutrition

### La mise en place du BSI

**Prescription medicale :**
Le BSI est prescrit par le médecin traitant sur une ordonnance specifique. La duree est généralement de 3 a 6 mois, renouvelable.

**Evaluation initiale par l'IDEL :**
L'infirmier realise une evaluation complète du patient (environ 1 heure) et remplit un document (formulaire Cerfa) qui precise :
- Le degre de dépendance
- Les soins necessaires
- Le niveau de BSI retenu (leger, intermédiaire, lourd)

**Transmission a la CPAM :**
L'IDEL transmet le BSI a la Caisse Primaire d'Assurance Maladie pour validation. La prise en charge debute immediatement.

**Reevaluation reguliere :**
Le BSI est reevalue tous les 3 a 6 mois ou en cas de changement de l'etat du patient (amelioration ou aggravation).

### La prise en charge financiere

Le BSI est pris en charge par l'Assurance Maladie :
- **60%** par la Sécurité sociale
- **40%** par la mutuelle

**En cas d'ALD (Affection Longue Duree), la prise en charge est de 100%.**

**Tiers payant :**
La quasi-totalite des IDEL pratiquent le tiers payant : vous n'avez aucun frais a avancer. La Sécurité sociale et la mutuelle sont facturees directement.

### BSI et autres intervenants

Le BSI couvre uniquement les soins infirmiers. D'autres professionnels peuvent intervenir en complement :

**Aide à domicile (auxiliaire de vie) :**
- Aide aux repas, courses, menage
- Aide a la toilette (en complement de l'IDEL)
- Financee par l'APA (Allocation Personnalisee d'Autonomie)

**Kinesithérapeutique :**
- Reéducation motrice
- Prevention des raideurs
- Pris en charge par l'Assurance Maladie

**Ergothérapeutique, orthophoniste :**
- Selon les besoins du patient
- Pris en charge par l'Assurance Maladie

### Avantages du BSI

**Pour le patient et sa famille :**
- Soins personnalises et adaptes aux besoins
- Suivi regulier par le meme infirmier (continuite)
- Pas de facturation a l'acte (simplicite)
- Reevaluation reguliere

**Pour l'IDEL :**
- Remuneration forfaitaire stable
- Temps pour realiser les soins de qualite
- Relation de confiance avec le patient

### BSI et fin de vie

Le BSI peut etre mis en place en fin de vie, en complement ou en alternative a l'HAD (Hospitalisation a Domicile) :

**Soins palliatifs à domicile :**
- Gestion de la douleur
- Soins de confort
- Accompagnement du patient et de la famille
- Astreinte 24h/24 si besoin

Le BSI Lourd est généralement retenu en fin de vie.

### Trouver un IDEL pour un BSI

Sur Medicaly, recherchez un infirmier libéral disponible près de chez vous. Lors du premier contact, precis ez que vous avez besoin d'un BSI et decrivez brievement la situation (degre de dépendance, soins necessaires). L'IDEL vous dira s'il peut prendre en charge le patient.`,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}
