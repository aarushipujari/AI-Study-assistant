export interface NCERTChapter {
  id: string;
  name: string;
  subject: 'Science (Physics)' | 'Science (Chemistry)' | 'Science (Biology)' | 'Mathematics';
  ncertCode: string;
  officialPdfUrl: string;
  highYieldWeightage: string;
  coreConceptsSummary: string;
  pyqCount: number;
}

export interface BoardPYQ {
  id: string;
  year: string;
  marks: 1 | 2 | 3 | 4 | 5;
  questionType: 'MCQ / Assertion-Reason' | 'Short Answer (2M)' | 'Standard (3M)' | 'Long Answer / Derivation (5M)' | 'Case-Based Integrated (4M)';
  question: string;
  cbseModelAnswer: string;
  markingSchemePoints: string[];
  commonMistakes: string;
}

export const CLASS10_CHAPTERS: NCERTChapter[] = [
  // Chemistry
  {
    id: 'chem-reactions',
    name: 'Chemical Reactions and Equations',
    subject: 'Science (Chemistry)',
    ncertCode: 'jesc101',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc101.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Balancing chemical equations, Combination, Decomposition (Thermal, Electrolytic, Photolytic), Displacement, Double Displacement (Precipitation), Oxidation & Reduction (Redox), Corrosion & Rancidity.',
    pyqCount: 28,
  },
  {
    id: 'acids-bases-salts',
    name: 'Acids, Bases and Salts',
    subject: 'Science (Chemistry)',
    ncertCode: 'jesc102',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc102.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Indicators (Olfactory, Synthetic), Reaction with metals/carbonates, pH scale & everyday importance, Chlor-alkali process (NaOH, Cl2, H2), Bleaching Powder, Baking Soda, Washing Soda, Plaster of Paris & Water of Crystallisation.',
    pyqCount: 32,
  },
  {
    id: 'metals-nonmetals',
    name: 'Metals and Non-metals',
    subject: 'Science (Chemistry)',
    ncertCode: 'jesc103',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc103.pdf',
    highYieldWeightage: '7-9 Marks',
    coreConceptsSummary: 'Physical/Chemical properties, Reactivity series, Ionic compounds & electron dot structures, Metallurgy (Roasting, Calcination, Refining), Corrosion prevention & Alloys (Bronze, Brass, Solder, Amalgam).',
    pyqCount: 35,
  },
  {
    id: 'carbon-compounds',
    name: 'Carbon and its Compounds',
    subject: 'Science (Chemistry)',
    ncertCode: 'jesc104',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc104.pdf',
    highYieldWeightage: '8-10 Marks',
    coreConceptsSummary: 'Covalent bonding, Versatile nature of carbon (Catenation, Tetravalency), Homologous series, IUPAC Nomenclature, Combustion, Oxidation, Addition & Substitution reactions, Ethanol & Ethanoic acid properties, Soaps & Detergents (Micelles).',
    pyqCount: 42,
  },

  // Biology
  {
    id: 'life-processes',
    name: 'Life Processes',
    subject: 'Science (Biology)',
    ncertCode: 'jesc105',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc105.pdf',
    highYieldWeightage: '9-11 Marks',
    coreConceptsSummary: 'Autotrophic vs Heterotrophic nutrition, Stomata opening/closing, Human Digestive System & enzymes, Aerobic vs Anaerobic respiration (ATP yield), Human Circulatory System & Double Circulation, Excretion in Humans (Nephron structure & urine formation).',
    pyqCount: 45,
  },
  {
    id: 'control-coordination',
    name: 'Control and Coordination',
    subject: 'Science (Biology)',
    ncertCode: 'jesc106',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc106.pdf',
    highYieldWeightage: '5-7 Marks',
    coreConceptsSummary: 'Neuron structure & Synapse transmission, Reflex Arc, Human Brain (Forebrain, Midbrain, Hindbrain), Plant hormones (Auxin, Gibberellin, Cytokinin, Abscisic acid), Tropic movements (Phototropism, Geotropism), Endocrine glands & hormones.',
    pyqCount: 26,
  },
  {
    id: 'reproduction',
    name: 'How do Organisms Reproduce?',
    subject: 'Science (Biology)',
    ncertCode: 'jesc107',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc107.pdf',
    highYieldWeightage: '7-9 Marks',
    coreConceptsSummary: 'Asexual reproduction modes (Binary/Multiple fission, Fragmentation, Regeneration, Budding, Vegetative Propagation, Spore formation), Sexual reproduction in flowering plants, Male & Female Human Reproductive Systems, Menstruation, Contraceptive methods.',
    pyqCount: 38,
  },
  {
    id: 'heredity',
    name: 'Heredity and Evolution',
    subject: 'Science (Biology)',
    ncertCode: 'jesc108',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc108.pdf',
    highYieldWeightage: '4-6 Marks',
    coreConceptsSummary: 'Mendel’s Experiments (Monohybrid cross 3:1, Dihybrid cross 9:3:3:1), Dominant vs Recessive traits, Sex determination in human beings (XX and XY chromosomes).',
    pyqCount: 24,
  },

  // Physics
  {
    id: 'light-reflection-refraction',
    name: 'Light – Reflection and Refraction',
    subject: 'Science (Physics)',
    ncertCode: 'jesc109',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc109.pdf',
    highYieldWeightage: '9-11 Marks',
    coreConceptsSummary: 'Laws of reflection, Spherical mirrors (Concave & Convex ray diagrams, Mirror formula 1/f = 1/v + 1/u, Magnification m = -v/u), Refraction & Snell\'s Law, Refractive index, Spherical lenses (Lens formula 1/f = 1/v - 1/u, Power of lens P = 1/f in meters).',
    pyqCount: 48,
  },
  {
    id: 'human-eye',
    name: 'The Human Eye and the Colourful World',
    subject: 'Science (Physics)',
    ncertCode: 'jesc110',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc110.pdf',
    highYieldWeightage: '5-7 Marks',
    coreConceptsSummary: 'Structure of Human eye, Power of Accommodation, Defects of vision (Myopia, Hypermetropia, Presbyopia with corrective ray diagrams), Refraction through a glass prism, Dispersion & Rainbow formation, Atmospheric refraction (Twinkling of stars), Tyndall effect & Scattering of light.',
    pyqCount: 30,
  },
  {
    id: 'electricity',
    name: 'Electricity',
    subject: 'Science (Physics)',
    ncertCode: 'jesc111',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc111.pdf',
    highYieldWeightage: '8-10 Marks',
    coreConceptsSummary: 'Electric current I=Q/t, Electric potential V=W/Q, Ohm\'s Law V=IR, Factors affecting resistance (Resistivity R = ρL/A), Series and Parallel combinations of resistors, Heating effect of electric current (Joule\'s Law H=I²Rt), Electric power P=VI=I²R=V²/R & Commercial units (1 kWh = 3.6 × 10⁶ J).',
    pyqCount: 50,
  },
  {
    id: 'magnetic-effects',
    name: 'Magnetic Effects of Electric Current',
    subject: 'Science (Physics)',
    ncertCode: 'jesc112',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc112.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Magnetic field lines & properties, Right-Hand Thumb Rule, Magnetic field due to a current-carrying circular loop & Solenoid, Force on a current-carrying conductor (Fleming\'s Left-Hand Rule), Domestic electric circuits (Earth wire, Fuse, Short circuiting & Overloading).',
    pyqCount: 36,
  },

  // Mathematics
  {
    id: 'math-real-numbers',
    name: 'Real Numbers & Polynomials',
    subject: 'Mathematics',
    ncertCode: 'jemh101',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jemh101.pdf',
    highYieldWeightage: '6 Marks',
    coreConceptsSummary: 'Fundamental Theorem of Arithmetic, Proofs of irrationality (√2, √3, √5), Relationship between zeroes and coefficients of quadratic polynomials.',
    pyqCount: 22,
  },
  {
    id: 'math-quadratic-equations',
    name: 'Quadratic Equations & AP',
    subject: 'Mathematics',
    ncertCode: 'jemh104',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jemh104.pdf',
    highYieldWeightage: '10 Marks',
    coreConceptsSummary: 'Standard form ax²+bx+c=0, Factorisation & Quadratic formula x = (-b ± √(b²-4ac))/2a, Nature of roots (Discriminant D), Arithmetic Progressions (nth term an = a + (n-1)d, Sum Sn = n/2(2a + (n-1)d)).',
    pyqCount: 34,
  },
  {
    id: 'math-trigonometry',
    name: 'Introduction to Trigonometry & Applications',
    subject: 'Mathematics',
    ncertCode: 'jemh108',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jemh108.pdf',
    highYieldWeightage: '12 Marks',
    coreConceptsSummary: 'Trigonometric ratios (sin, cos, tan, cosec, sec, cot), Values at 0°, 30°, 45°, 60°, 90°, Trigonometric identities (sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ), Heights and Distances (Angle of elevation & depression word problems).',
    pyqCount: 40,
  }
];
