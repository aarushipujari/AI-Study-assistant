export type Class10Subject = 
  | 'Science (Chemistry)'
  | 'Science (Biology)'
  | 'Science (Physics)'
  | 'Mathematics'
  | 'Social Science';

export interface NCERTChapter {
  id: string;
  name: string;
  chapterNumber: number;
  subject: Class10Subject;
  unitName: string;
  ncertCode: string;
  officialPdfUrl: string;
  highYieldWeightage: string;
  coreConceptsSummary: string;
  importantNCERTFigures: string[];
  repeatedBoardTopics: string[];
  pyqCount: number;
}

export const CLASS10_CHAPTERS: NCERTChapter[] = [
  // ==========================================
  // SCIENCE - CHEMISTRY
  // ==========================================
  {
    id: 'chem-ch1',
    chapterNumber: 1,
    name: 'Chemical Reactions and Equations',
    subject: 'Science (Chemistry)',
    unitName: 'Unit I: Chemical Substances (25 Marks)',
    ncertCode: 'jesc101',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc101.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Balancing chemical equations, Combination, Decomposition (Thermal, Electrolytic, Photolytic), Displacement, Double Displacement (Precipitation), Redox (Oxidation & Reduction), Corrosion & Rancidity.',
    importantNCERTFigures: [
      'NCERT Fig 1.1: Burning of magnesium ribbon in air',
      'NCERT Fig 1.6: Electrolysis of water (2:1 volume ratio H2 to O2)',
      'NCERT Fig 1.7: Photolytic decomposition of silver chloride'
    ],
    repeatedBoardTopics: [
      'Why is respiration an exothermic reaction?',
      'Identify substance oxidized, reduced, oxidizing agent, and reducing agent in redox reactions',
      'Thermal decomposition of Pb(NO3)2 (brown fumes of NO2 + yellow residue of PbO)'
    ],
    pyqCount: 32,
  },
  {
    id: 'chem-ch2',
    chapterNumber: 2,
    name: 'Acids, Bases and Salts',
    subject: 'Science (Chemistry)',
    unitName: 'Unit I: Chemical Substances (25 Marks)',
    ncertCode: 'jesc102',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc102.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Reaction of acids with metals/carbonates, pH scale (0-14), Chlor-alkali process (NaOH, Cl2, H2), Bleaching Powder (CaOCl2), Baking Soda (NaHCO3), Washing Soda (Na2CO3·10H2O), Plaster of Paris (CaSO4·1/2H2O & Gypsum).',
    importantNCERTFigures: [
      'NCERT Fig 2.1: Reaction of zinc granules with dilute H2SO4 (pop sound test)',
      'NCERT Fig 2.2: Passing CO2 through calcium hydroxide (lime water turning milky)'
    ],
    repeatedBoardTopics: [
      'Chlor-alkali process: Name products at anode (Cl2) and cathode (H2) with uses',
      'Why does dry HCl gas not turn dry blue litmus paper red?',
      'Plaster of Paris preparation from Gypsum at 373K'
    ],
    pyqCount: 36,
  },
  {
    id: 'chem-ch3',
    chapterNumber: 3,
    name: 'Metals and Non-metals',
    subject: 'Science (Chemistry)',
    unitName: 'Unit I: Chemical Substances (25 Marks)',
    ncertCode: 'jesc103',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc103.pdf',
    highYieldWeightage: '7-9 Marks',
    coreConceptsSummary: 'Reactivity series, Ionic bonding and electron dot structures of NaCl, MgCl2, Metallurgy (Roasting vs Calcination, Thermit reaction), Corrosion prevention and Alloys (Brass, Bronze, Solder).',
    importantNCERTFigures: [
      'NCERT Fig 3.3: Action of steam on a metal',
      'NCERT Fig 3.12: Electrolytic refining of copper'
    ],
    repeatedBoardTopics: [
      'Draw electron dot transfer structure for MgCl2 and Na2O',
      'Differentiate between Roasting and Calcination with chemical reactions',
      'Why do ionic compounds have high melting points?'
    ],
    pyqCount: 38,
  },
  {
    id: 'chem-ch4',
    chapterNumber: 4,
    name: 'Carbon and its Compounds',
    subject: 'Science (Chemistry)',
    unitName: 'Unit I: Chemical Substances (25 Marks)',
    ncertCode: 'jesc104',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc104.pdf',
    highYieldWeightage: '8-10 Marks',
    coreConceptsSummary: 'Covalent bonding, Catenation and Tetravalency, Saturated vs Unsaturated hydrocarbons, Homologous series, Functional groups, Combustion, Oxidation, Addition (Hydrogenation of oils), Substitution, Ethanol & Ethanoic acid properties (Esterification & Saponification), Soap Micelles.',
    importantNCERTFigures: [
      'NCERT Fig 4.1 to 4.5: Electron dot structures of CH4, C2H4, C2H2, CO2, H2O, NH3',
      'NCERT Fig 4.12: Soap micelle structure and cleansing action'
    ],
    repeatedBoardTopics: [
      'Cleansing action of soap with micelle diagram',
      'Esterification and Saponification reactions with balanced equations',
      'Hydrogenation of vegetable oils using Nickel catalyst'
    ],
    pyqCount: 45,
  },

  // ==========================================
  // SCIENCE - BIOLOGY
  // ==========================================
  {
    id: 'bio-ch5',
    chapterNumber: 5,
    name: 'Life Processes',
    subject: 'Science (Biology)',
    unitName: 'Unit II: World of Living (25 Marks)',
    ncertCode: 'jesc105',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc105.pdf',
    highYieldWeightage: '9-11 Marks',
    coreConceptsSummary: 'Autotrophic nutrition (Photosynthesis & Stomata), Human Digestive System, 3 pathways of glucose breakdown (Aerobic, Anaerobic, Muscle cells), Human Heart & Double Circulation, Xylem vs Phloem, Human Excretory System & Nephron structure.',
    importantNCERTFigures: [
      'NCERT Fig 6.3: Stomata open and closed with guard cells',
      'NCERT Fig 6.4: Human Alimentary Canal',
      'NCERT Fig 6.7: Human Heart Sectional View and Blood Flow',
      'NCERT Fig 6.14: Structure of a Nephron'
    ],
    repeatedBoardTopics: [
      'Draw 3 pathways of breakdown of glucose in different organisms',
      'Draw human heart and explain why double circulation is necessary',
      'Nephron structure and steps of urine formation'
    ],
    pyqCount: 50,
  },
  {
    id: 'bio-ch6',
    chapterNumber: 6,
    name: 'Control and Coordination',
    subject: 'Science (Biology)',
    unitName: 'Unit II: World of Living (25 Marks)',
    ncertCode: 'jesc106',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc106.pdf',
    highYieldWeightage: '5-7 Marks',
    coreConceptsSummary: 'Structure of Neuron, Synapse, Reflex Arc, Human Brain (Cerebrum, Cerebellum, Medulla, Pons), Plant Tropisms (Phototropism, Geotropism) and Plant Hormones (Auxin, Gibberellin, Cytokinin, ABA), Endocrine Glands (Pituitary, Thyroid, Pancreas, Adrenal).',
    importantNCERTFigures: [
      'NCERT Fig 7.1: Structure of Neuron',
      'NCERT Fig 7.2: Reflex Arc pathway',
      'NCERT Fig 7.3: Human Brain'
    ],
    repeatedBoardTopics: [
      'Draw reflex arc and trace sequence of events when touching hot object',
      'Draw neuron and state functions of Dendrite, Axon, and Synapse',
      'Functions of Cerebellum and Medulla in human brain'
    ],
    pyqCount: 30,
  },
  {
    id: 'bio-ch7',
    chapterNumber: 7,
    name: 'How do Organisms Reproduce?',
    subject: 'Science (Biology)',
    unitName: 'Unit II: World of Living (25 Marks)',
    ncertCode: 'jesc107',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc107.pdf',
    highYieldWeightage: '7-9 Marks',
    coreConceptsSummary: 'Asexual modes (Fission, Budding, Regeneration, Spore formation, Vegetative propagation), Sexual reproduction in flowering plants (LS of flower, Pollination, Pollen tube germination, Post-fertilization ovule->seed, ovary->fruit), Male & Female Human Reproductive Systems, Placenta, Contraceptive methods.',
    importantNCERTFigures: [
      'NCERT Fig 8.7: LS of Flower',
      'NCERT Fig 8.8: Pollen germination on stigma',
      'NCERT Fig 8.10: Male Reproductive System',
      'NCERT Fig 8.11: Female Reproductive System'
    ],
    repeatedBoardTopics: [
      'Draw LS of flower and label reproductive parts',
      'Structure and function of Placenta during pregnancy',
      'Why are testes located outside abdominal cavity in scrotum?'
    ],
    pyqCount: 42,
  },
  {
    id: 'bio-ch8',
    chapterNumber: 8,
    name: 'Heredity and Evolution',
    subject: 'Science (Biology)',
    unitName: 'Unit II: World of Living (25 Marks)',
    ncertCode: 'jesc108',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc108.pdf',
    highYieldWeightage: '4-6 Marks',
    coreConceptsSummary: 'Mendel\'s experiments on pea plants: Monohybrid cross (3:1 phenotypic, 1:2:1 genotypic ratio), Dihybrid cross (9:3:3:1 ratio), Dominant vs Recessive alleles, Sex determination in humans (XX female, XY male, 50% probability).',
    importantNCERTFigures: [
      'NCERT Fig 9.3: Monohybrid cross TT x tt',
      'NCERT Fig 9.6: Sex determination in humans'
    ],
    repeatedBoardTopics: [
      'Punnett square for Monohybrid cross for F1 and F2 generations',
      'Flowchart for sex determination in humans. Why is father responsible?'
    ],
    pyqCount: 26,
  },
  {
    id: 'bio-ch13',
    chapterNumber: 13,
    name: 'Our Environment',
    subject: 'Science (Biology)',
    unitName: 'Unit V: Natural Resources (5 Marks)',
    ncertCode: 'jesc113',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc113.pdf',
    highYieldWeightage: '5 Marks',
    coreConceptsSummary: 'Ecosystem, Food chain and food web, 10% law of energy transfer, Biological magnification of pesticides, Ozone layer depletion by CFCs, Biodegradable vs Non-biodegradable waste.',
    importantNCERTFigures: [
      'NCERT Fig 13.1: Food chains in nature',
      'NCERT Fig 13.4: Trophic level energy pyramid'
    ],
    repeatedBoardTopics: [
      'Numerical calculation using 10% law of energy transfer',
      'What is Biological Magnification? Why top consumers accumulate highest toxins?',
      'Ozone layer formation and Montreal Protocol treaty'
    ],
    pyqCount: 28,
  },

  // ==========================================
  // SCIENCE - PHYSICS
  // ==========================================
  {
    id: 'phy-ch9',
    chapterNumber: 9,
    name: 'Light – Reflection and Refraction',
    subject: 'Science (Physics)',
    unitName: 'Unit III: Natural Phenomena (12 Marks)',
    ncertCode: 'jesc109',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc109.pdf',
    highYieldWeightage: '9-11 Marks',
    coreConceptsSummary: 'Spherical mirrors (Concave & Convex 6 ray diagram cases), Mirror Formula: 1/f = 1/v + 1/u, Magnification m = -v/u, Snell\'s Law & Refractive index, Refraction in glass slab with lateral displacement, Lens Formula: 1/f = 1/v - 1/u, Power of Lens P = 1/f(in m) in Dioptres.',
    importantNCERTFigures: [
      'NCERT Fig 9.3 & 9.4: Concave mirror 6 ray diagrams (Object between P and F)',
      'NCERT Fig 9.6 & 9.7: Convex lens ray diagrams',
      'NCERT Fig 9.10: Refraction through glass slab'
    ],
    repeatedBoardTopics: [
      'Draw ray diagram for concave mirror with object between P and F',
      'Numerical on mirror formula with sign conventions',
      'Lens power calculation with P = 1/f'
    ],
    pyqCount: 52,
  },
  {
    id: 'phy-ch10',
    chapterNumber: 10,
    name: 'The Human Eye and Colourful World',
    subject: 'Science (Physics)',
    unitName: 'Unit III: Natural Phenomena (12 Marks)',
    ncertCode: 'jesc110',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc110.pdf',
    highYieldWeightage: '5-7 Marks',
    coreConceptsSummary: 'Human Eye structure, Power of accommodation (Near point 25 cm), Myopia (Near-sightedness) & Hypermetropia (Far-sightedness) with corrective lens ray diagrams, Prism refraction & Angle of deviation, Dispersion (VIBGYOR) & Rainbow, Atmospheric refraction (Twinkling of stars), Scattering (Blue sky & Red danger signal).',
    importantNCERTFigures: [
      'NCERT Fig 10.1: Human Eye structure',
      'NCERT Fig 10.2: Myopia and correction using Concave lens',
      'NCERT Fig 10.3: Hypermetropia and correction using Convex lens',
      'NCERT Fig 10.4 & 10.5: Prism dispersion VIBGYOR'
    ],
    repeatedBoardTopics: [
      'Ray diagrams for myopic eye and correction with concave lens',
      'Why do stars twinkle but planets do not?',
      'Why is clear sky blue and danger signal lights red?'
    ],
    pyqCount: 36,
  },
  {
    id: 'phy-ch11',
    chapterNumber: 11,
    name: 'Electricity',
    subject: 'Science (Physics)',
    unitName: 'Unit IV: Effects of Current (13 Marks)',
    ncertCode: 'jesc111',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc111.pdf',
    highYieldWeightage: '8-10 Marks',
    coreConceptsSummary: 'Electric current I=Q/t, Potential difference V=W/Q, Ohm\'s Law V=IR, Resistivity R = ρL/A, Resistors in Series (Rs = R1+R2+R3) vs Parallel (1/Rp = 1/R1+1/R2+1/R3), Joule\'s Heating Law H = I^2 R t, Electric Power P = VI = I^2 R = V^2/R, 1 kWh = 3.6 x 10^6 J.',
    importantNCERTFigures: [
      'NCERT Fig 11.2: Ohm\'s law verification circuit',
      'NCERT Fig 11.6 & 11.7: Resistors in series and parallel circuits'
    ],
    repeatedBoardTopics: [
      'Derive equivalent resistance for three resistors in parallel',
      'Wire cut into 5 equal parts and connected in parallel (R/R\' = 25)',
      'Calculating power and energy cost of household electrical appliances'
    ],
    pyqCount: 55,
  },
  {
    id: 'phy-ch12',
    chapterNumber: 12,
    name: 'Magnetic Effects of Electric Current',
    subject: 'Science (Physics)',
    unitName: 'Unit IV: Effects of Current (13 Marks)',
    ncertCode: 'jesc112',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc112.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Magnetic field lines and properties, Right-Hand Thumb Rule, Magnetic field of a straight wire and Solenoid (uniform parallel lines inside), Force on conductor in magnetic field (Fleming\'s Left-Hand Rule), Domestic circuits (Earth wire, Live, Neutral, Electric Fuse).',
    importantNCERTFigures: [
      'NCERT Fig 12.6: Straight current-carrying conductor field pattern',
      'NCERT Fig 12.10: Solenoid magnetic field lines',
      'NCERT Fig 12.13: Fleming\'s Left-Hand Rule'
    ],
    repeatedBoardTopics: [
      'State Fleming\'s Left-Hand Rule and apply to moving charge/conductor',
      'Draw magnetic field lines of Solenoid. Why is it similar to a bar magnet?',
      'Why is earth wire necessary for appliances with metallic bodies?'
    ],
    pyqCount: 40,
  },

  // ==========================================
  // MATHEMATICS (CODE 041)
  // ==========================================
  {
    id: 'math-ch1',
    chapterNumber: 1,
    name: 'Real Numbers',
    subject: 'Mathematics',
    unitName: 'Unit I: Number Systems (6 Marks)',
    ncertCode: 'jemh101',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jemh101.pdf',
    highYieldWeightage: '6 Marks',
    coreConceptsSummary: 'Fundamental Theorem of Arithmetic (Every composite number expressed as unique product of primes: HCF x LCM = a x b), Proof of irrationality of √2, √3, √5, 3+2√5 by contradiction method.',
    importantNCERTFigures: [],
    repeatedBoardTopics: [
      'Prove that √5 (or √3) is an irrational number by contradiction (Compulsory 3M question in every set!)',
      'Find HCF and LCM of 96 and 404 using prime factorisation and verify HCF x LCM = Product of numbers'
    ],
    pyqCount: 25,
  },
  {
    id: 'math-ch2',
    chapterNumber: 2,
    name: 'Polynomials',
    subject: 'Mathematics',
    unitName: 'Unit II: Algebra (20 Marks)',
    ncertCode: 'jemh102',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jemh102.pdf',
    highYieldWeightage: '4-5 Marks',
    coreConceptsSummary: 'Geometrical meaning of zeroes (points where graph cuts X-axis), Relationship between zeroes and coefficients of quadratic polynomial ax^2 + bx + c: Sum of zeroes α + β = -b/a, Product of zeroes αβ = c/a, Forming quadratic polynomial: k[x^2 - (α+β)x + αβ].',
    importantNCERTFigures: [],
    repeatedBoardTopics: [
      'If α and β are zeroes of polynomial 2x^2 - 5x + 7, find value of 1/α + 1/β and α^2 + β^2',
      'Find zeroes of quadratic polynomial 6x^2 - 3 - 7x and verify relationship with coefficients'
    ],
    pyqCount: 22,
  },
  {
    id: 'math-ch4',
    chapterNumber: 4,
    name: 'Quadratic Equations',
    subject: 'Mathematics',
    unitName: 'Unit II: Algebra (20 Marks)',
    ncertCode: 'jemh104',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jemh104.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Standard form ax^2 + bx + c = 0 (a ≠ 0), Solution by factorisation and Quadratic Formula: x = (-b ± √(b^2 - 4ac)) / (2a), Nature of roots via Discriminant D = b^2 - 4ac (D > 0: two distinct real roots, D = 0: two equal real roots, D < 0: no real roots), Word problems on speed/distance, age, work, and numbers.',
    importantNCERTFigures: [],
    repeatedBoardTopics: [
      'Find value of k for which equation kx(x - 2) + 6 = 0 has two equal roots (D = 0)',
      'Speed-time word problem: A train travels 360 km at uniform speed. If speed had been 5 km/h more, it would take 1 hour less. Find speed'
    ],
    pyqCount: 35,
  },
  {
    id: 'math-ch5',
    chapterNumber: 5,
    name: 'Arithmetic Progressions (AP)',
    subject: 'Mathematics',
    unitName: 'Unit II: Algebra (20 Marks)',
    ncertCode: 'jemh105',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jemh105.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Standard form: a, a+d, a+2d..., nth term of an AP: a_n = a + (n-1)d, nth term from end: l - (n-1)d, Sum of first n terms: S_n = n/2 [2a + (n-1)d] = n/2 [a + l], nth term from sum: a_n = S_n - S_{n-1}.',
    importantNCERTFigures: [],
    repeatedBoardTopics: [
      'Which term of the AP: 21, 18, 15... is -81? Also find if any term is 0',
      'The sum of the 4th and 8th terms of an AP is 24 and sum of 6th and 10th terms is 44. Find first three terms'
    ],
    pyqCount: 32,
  },
  {
    id: 'math-ch8',
    chapterNumber: 8,
    name: 'Introduction to Trigonometry',
    subject: 'Mathematics',
    unitName: 'Unit V: Trigonometry (12 Marks)',
    ncertCode: 'jemh108',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jemh108.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Trigonometric ratios (sin, cos, tan, cosec, sec, cot), Specific angle values at 0°, 30°, 45°, 60°, 90°, Trigonometric Identities: sin^2 θ + cos^2 θ = 1, 1 + tan^2 θ = sec^2 θ, 1 + cot^2 θ = cosec^2 θ.',
    importantNCERTFigures: [],
    repeatedBoardTopics: [
      'Prove identity: (sin θ - 2 sin^3 θ) / (2 cos^3 θ - cos θ) = tan θ (Repeated in almost every board exam!)',
      'Prove: (cos A / (1 + sin A)) + ((1 + sin A) / cos A) = 2 sec A',
      'If tan (A + B) = √3 and tan (A - B) = 1/√3, find angles A and B'
    ],
    pyqCount: 40,
  },
  {
    id: 'math-ch9',
    chapterNumber: 9,
    name: 'Some Applications of Trigonometry (Heights & Distances)',
    subject: 'Mathematics',
    unitName: 'Unit V: Trigonometry (12 Marks)',
    ncertCode: 'jemh109',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jemh109.pdf',
    highYieldWeightage: '4-5 Marks (Mandatory Case-Study / Section D)',
    coreConceptsSummary: 'Line of sight, Angle of elevation (looking up from horizontal), Angle of depression (looking down from horizontal), Word problems with single and double right-angled triangles using tan 30°=1/√3, tan 45°=1, tan 60°=√3.',
    importantNCERTFigures: [],
    repeatedBoardTopics: [
      'From a point on a bridge across a river, angles of depression of banks on opposite sides are 30° and 45°. If bridge is at height of 3 m, find width of river',
      'A 1.2 m tall girl spots a balloon moving with wind at height of 88.2 m. Angle of elevation reduces from 60° to 30°. Find distance traveled by balloon'
    ],
    pyqCount: 28,
  },
  {
    id: 'math-ch10',
    chapterNumber: 10,
    name: 'Circles',
    subject: 'Mathematics',
    unitName: 'Unit IV: Geometry (15 Marks)',
    ncertCode: 'jemh110',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jemh110.pdf',
    highYieldWeightage: '5-6 Marks',
    coreConceptsSummary: 'Tangent to a circle is perpendicular to radius at point of contact (Theorem 10.1), Lengths of tangents drawn from an external point to a circle are equal (Theorem 10.2: AP = BP).',
    importantNCERTFigures: [],
    repeatedBoardTopics: [
      'Prove Theorem 10.2: The lengths of tangents drawn from an external point to a circle are equal (Compulsory 3M/4M theorem proof!)',
      'Prove that the parallelogram circumscribing a circle is a rhombus'
    ],
    pyqCount: 26,
  },

  // ==========================================
  // SOCIAL SCIENCE (SST)
  // ==========================================
  {
    id: 'sst-his-ch1',
    chapterNumber: 1,
    name: 'The Rise of Nationalism in Europe',
    subject: 'Social Science',
    unitName: 'History: India and the Contemporary World-II',
    ncertCode: 'jess301',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jess301.pdf',
    highYieldWeightage: '5-6 Marks',
    coreConceptsSummary: 'French Revolution ideas of nation, Napoleonic Civil Code of 1804, Romanticism and national feelings, Unification of Germany (Otto von Bismarck) and Unification of Italy (Mazzini, Cavour, Garibaldi), Allegories of nations (Marianne & Germania), Balkan nationalist crisis leading to WWI.',
    importantNCERTFigures: [],
    repeatedBoardTopics: [
      'Explain any five provisions of the Napoleonic Civil Code of 1804',
      'Describe the process of Unification of Germany under leadership of Otto von Bismarck',
      'How did Romanticism develop a particular form of nationalist sentiment in Europe?'
    ],
    pyqCount: 25,
  },
  {
    id: 'sst-his-ch2',
    chapterNumber: 2,
    name: 'Nationalism in India',
    subject: 'Social Science',
    unitName: 'History: India and the Contemporary World-II',
    ncertCode: 'jess302',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jess302.pdf',
    highYieldWeightage: '6-8 Marks (Including Map Work)',
    coreConceptsSummary: 'First World War impact, Satyagraha concept (Champaran, Kheda, Ahmedabad), Rowlatt Act & Jallianwala Bagh Massacre (13 April 1919 by General Dyer), Khilafat & Non-Cooperation Movement (1920-1922 Chauri Chaura withdrawal), Salt March & Civil Disobedience Movement (1930 Dandi March), Gandhi-Irwin Pact, Limits of Civil Disobedience (Dalits & Muslims), Sense of Collective Belonging (Bharat Mata painting by Abanindranath Tagore, Vande Mataram, folklore, tricolour flag).',
    importantNCERTFigures: [],
    repeatedBoardTopics: [
      'Why did Mahatma Gandhi decide to call off the Non-Cooperation Movement? (Chauri Chaura incident 1922)',
      'Describe the significance of the Salt March (Dandi March) in the Indian National Movement',
      'Map pointing: Jallianwala Bagh (Amritsar), Dandi (Gujarat), Champaran (Bihar), Chauri Chaura (UP)'
    ],
    pyqCount: 35,
  },
  {
    id: 'sst-pol-ch1',
    chapterNumber: 1,
    name: 'Power Sharing & Federalism',
    subject: 'Social Science',
    unitName: 'Democratic Politics-II (Civics)',
    ncertCode: 'jess401',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jess401.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Case studies of Belgium (Accommodation model: equal Dutch and French ministers) vs Sri Lanka (Majoritarianism favoring Sinhala leading to civil war), Why power sharing is desirable (Prudential vs Moral reasons), Forms of power sharing: Horizontal (Legislature, Executive, Judiciary), Vertical (Central, State, Local Panchayat), Social groups, Political parties and Pressure groups. Federalism: Key features of Indian Federalism (Union, State, Concurrent Lists), Decentralization amendment of 1992 (Panchayati Raj and Municipalities).',
    importantNCERTFigures: [],
    repeatedBoardTopics: [
      'Compare the ways in which Belgium and Sri Lanka dealt with cultural diversity',
      'Differentiate between Horizontal and Vertical division of powers with examples',
      'Explain any five features of the Indian Federal system'
    ],
    pyqCount: 28,
  }
];
