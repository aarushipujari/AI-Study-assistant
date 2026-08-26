export interface NCERTChapter {
  id: string;
  name: string;
  unitName: string;
  subject: 'Science (Physics)' | 'Science (Chemistry)' | 'Science (Biology)' | 'Mathematics';
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
  // UNIT 1: CHEMICAL SUBSTANCES - NATURE & BEHAVIOUR (25 MARKS)
  // ==========================================
  {
    id: 'chem-reactions',
    name: 'Chemical Reactions and Equations',
    unitName: 'Unit I: Chemical Substances (25 Marks)',
    subject: 'Science (Chemistry)',
    ncertCode: 'jesc101',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc101.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Balancing chemical equations, Types of reactions: Combination (Quicklime + Water), Decomposition (Thermal: FeSO4, CaCO3, Pb(NO3)2; Electrolytic: H2O; Photolytic: AgCl, AgBr), Displacement (Fe + CuSO4), Double Displacement (Na2SO4 + BaCl2 precipitation), Oxidation & Reduction (Redox reactions like CuO + H2 -> Cu + H2O), Corrosion of metals & Rancidity of fats.',
    importantNCERTFigures: [
      'NCERT Fig 1.1: Burning of magnesium ribbon in air (White ash of MgO & dazzling flame)',
      'NCERT Fig 1.6: Electrolysis of water (H2 at cathode in 2:1 volume ratio to O2 at anode)',
      'NCERT Fig 1.7: Photolytic decomposition of silver chloride in sunlight (White turning grey)'
    ],
    repeatedBoardTopics: [
      'Why is respiration considered an exothermic reaction?',
      'Identify substance oxidized, reduced, oxidizing agent, and reducing agent in a given reaction',
      'What is observed when lead nitrate Pb(NO3)2 powder is heated in a dry boiling tube? (Brown fumes of NO2 + yellow residue of PbO)',
      'Thermal decomposition of Ferrous Sulphate FeSO4 crystals (Green crystals turn white then reddish brown with smell of burning sulphur)'
    ],
    pyqCount: 32,
  },
  {
    id: 'acids-bases-salts',
    name: 'Acids, Bases and Salts',
    unitName: 'Unit I: Chemical Substances (25 Marks)',
    subject: 'Science (Chemistry)',
    ncertCode: 'jesc102',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc102.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Reaction of acids with metals (Zn + H2SO4 -> ZnSO4 + H2 pop sound) and metal carbonates (CO2 gas turns lime water milky), pH scale (0-14) and everyday importance (Tooth decay at pH < 5.5, Acid rain at pH < 5.6, Antacids in stomach acidity), Chlor-alkali process (2NaCl + 2H2O -> 2NaOH + Cl2 + H2), Bleaching Powder (CaOCl2), Baking Soda (NaHCO3), Washing Soda (Na2CO3·10H2O), Plaster of Paris (CaSO4·1/2H2O & Gypsum CaSO4·2H2O), Water of Crystallisation (CuSO4·5H2O blue to white).',
    importantNCERTFigures: [
      'NCERT Fig 2.1: Reaction of zinc granules with dilute H2SO4 & testing H2 by burning pop sound',
      'NCERT Fig 2.2: Passing CO2 through calcium hydroxide (lime water turning milky due to CaCO3)',
      'NCERT Fig 2.3: Acid solution in water conducting electricity (Bulb glows due to H+ ions)'
    ],
    repeatedBoardTopics: [
      'Chlor-alkali process: Name products at anode (Cl2), cathode (H2), and near cathode (NaOH) with uses',
      'Why does dry HCl gas not turn dry blue litmus paper red? (Absence of H3O+ ions in dry state)',
      'Plaster of Paris preparation from Gypsum at 373K and why it must be stored in moisture-proof containers',
      'Baking powder composition (Baking soda + mild edible tartaric acid) and role in cake making'
    ],
    pyqCount: 36,
  },
  {
    id: 'metals-nonmetals',
    name: 'Metals and Non-metals',
    unitName: 'Unit I: Chemical Substances (25 Marks)',
    subject: 'Science (Chemistry)',
    ncertCode: 'jesc103',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc103.pdf',
    highYieldWeightage: '7-9 Marks',
    coreConceptsSummary: 'Physical & chemical properties of metals/non-metals, Amphoteric oxides (Al2O3 and ZnO reacting with both acids and bases), Reactivity series (K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Hg > Ag > Au), Formation & properties of Ionic compounds (Electron dot representation of NaCl, MgCl2, high melting point, conduct in molten/aqueous state), Metallurgy: Roasting (heating sulphide ores in excess air) vs Calcination (heating carbonate ores in limited air), Thermit reaction (Fe2O3 + 2Al -> 2Fe + Al2O3 for railway track welding), Corrosion prevention & Alloys (Brass, Bronze, Solder, Stainless Steel, 22-carat gold).',
    importantNCERTFigures: [
      'NCERT Fig 3.3: Action of steam on a metal (Metal + Steam -> Metal oxide + H2 gas)',
      'NCERT Fig 3.12: Electrolytic refining of copper (Anode: Impure Cu, Cathode: Pure Cu strip, Electrolyte: Acidified CuSO4, Anode mud)'
    ],
    repeatedBoardTopics: [
      'Draw electron dot transfer structure for the formation of Magnesium Chloride (MgCl2) and Sodium Oxide (Na2O)',
      'Differentiate between Roasting and Calcination with balanced chemical reactions',
      'Why are ionic compounds solid, hard and have high melting/boiling points? (Strong electrostatic attraction)',
      'What are amphoteric oxides? Give 2 examples with balanced equations showing reaction with HCl and NaOH'
    ],
    pyqCount: 38,
  },
  {
    id: 'carbon-compounds',
    name: 'Carbon and its Compounds',
    unitName: 'Unit I: Chemical Substances (25 Marks)',
    subject: 'Science (Chemistry)',
    ncertCode: 'jesc104',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc104.pdf',
    highYieldWeightage: '8-10 Marks',
    coreConceptsSummary: 'Covalent bonding (sharing of electrons), Unique nature of carbon (Catenation self-linking ability & Tetravalency 4 valence electrons), Saturated (Alkanes CnH2n+2) vs Unsaturated (Alkenes CnH2n, Alkynes CnH2n-2) hydrocarbons, Structural Isomers (Butane C4H10: n-butane and isobutane), Homologous series (differ by -CH2- unit and 14u mass), Functional groups (Alcohol -OH, Aldehyde -CHO, Ketone >C=O, Carboxylic acid -COOH), Chemical reactions of carbon: Combustion, Oxidation (Alkaline KMnO4 / Acidified K2Cr2O7), Addition reaction (Hydrogenation of vegetable oils using Ni catalyst), Substitution reaction of methane with Cl2 in sunlight, Properties of Ethanol (reaction with Na, dehydration with conc H2SO4 to ethene) and Ethanoic acid (Esterification reaction with ethanol producing sweet fruity smell ester, Saponification), Soap Micelle cleansing mechanism.',
    importantNCERTFigures: [
      'NCERT Fig 4.1 to 4.5: Electron dot structures of H2, O2, N2, CH4, CO2, H2O, NH3',
      'NCERT Fig 4.12 & 4.13: Soap micelle formation and oily dirt trapping mechanism'
    ],
    repeatedBoardTopics: [
      'Explain the cleansing action of soap with labeled diagram of micelle. Why does soap not form lather in hard water?',
      'Esterification and Saponification reactions with balanced chemical equations',
      'Hydrogenation of vegetable oils (Addition reaction of unsaturated hydrocarbons using Nickel catalyst)',
      'Give electron dot structure of (a) Ethanoic acid, (b) Ethene C2H4, (c) Propanone, (d) Methane'
    ],
    pyqCount: 45,
  },

  // ==========================================
  // UNIT 2: WORLD OF LIVING (25 MARKS)
  // ==========================================
  {
    id: 'life-processes',
    name: 'Life Processes',
    unitName: 'Unit II: World of Living (25 Marks)',
    subject: 'Science (Biology)',
    ncertCode: 'jesc105',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc105.pdf',
    highYieldWeightage: '9-11 Marks',
    coreConceptsSummary: 'Nutrition: Autotrophic (Photosynthesis equation: 6CO2 + 12H2O -> C6H12O6 + 6O2 + 6H2O, Stomata opening/closing by guard cells), Heterotrophic (Holozoic nutrition in Amoeba by pseudopodia), Human Digestive System (Salivary amylase, Pepsin & HCl in stomach, Bile from liver for emulsification of fats, Trypsin and Lipase from pancreas, Villi in small intestine for absorption). Respiration: 3 pathways of glucose breakdown (Aerobic in mitochondria -> CO2 + H2O + 38ATP, Anaerobic in yeast -> Ethanol + CO2 + 2ATP, Lack of O2 in muscles -> Lactic acid causing cramps + 2ATP), Human Respiratory system (Alveoli huge surface area). Transportation: Human Heart (4 chambers, Double Circulation: Pulmonary and Systemic loops), Blood components & Lymph, Xylem (vessels/tracheids for water transport by transpirational pull) vs Phloem (sieve tubes/companion cells for translocation of sucrose by ATP). Excretion: Human Excretory System (Kidneys, Ureters, Bladder, Urethra), Structure of Nephron (Bowman\'s capsule, Glomerulus, Convoluted tubule, Collecting duct), Steps of urine formation (Ultrafiltration, Selective reabsorption of glucose/amino acids/salts, Tubular secretion).',
    importantNCERTFigures: [
      'NCERT Fig 6.3: Open and closed stomatal pore with guard cells and chloroplasts',
      'NCERT Fig 6.4: Human Alimentary Canal / Digestive System',
      'NCERT Fig 6.7: Sectional view of the Human Heart showing double circulation flow',
      'NCERT Fig 6.13: Excretory system in human beings',
      'NCERT Fig 6.14: Structure of a Nephron'
    ],
    repeatedBoardTopics: [
      'Draw the 3 pathways of breakdown of glucose in different organisms (Aerobic, Anaerobic in Yeast, Muscle cells)',
      'Draw neat labeled diagram of human heart. Why is double circulation necessary in mammals and birds?',
      'Draw nephron structure and explain how urine is formed and its volume regulated (ADH role)',
      'What is the role of: (a) Salivary amylase, (b) Pepsin, (c) Bile juice, (d) Trypsin, (e) Villi in digestion?'
    ],
    pyqCount: 50,
  },
  {
    id: 'control-coordination',
    name: 'Control and Coordination',
    unitName: 'Unit II: World of Living (25 Marks)',
    subject: 'Science (Biology)',
    ncertCode: 'jesc106',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc106.pdf',
    highYieldWeightage: '5-7 Marks',
    coreConceptsSummary: 'Nervous system: Structure of Neuron (Dendrite, Cyton, Axon, Nerve ending), Synapse transmission via neurotransmitters, Reflex Arc (Receptor -> Sensory neuron -> Spinal Cord Relay neuron -> Motor neuron -> Effector muscle). Human Brain: Forebrain (Cerebrum: sensory, thinking, memory center), Midbrain (Reflex of neck, eyes), Hindbrain (Cerebellum: posture & balance; Pons: respiration rate; Medulla: involuntary blood pressure, salivation, vomiting). Plant Movements: Tropic movements (Phototropism - Auxin bends shoot to light, Geotropism, Hydrotropism, Chemotropism - Pollen tube growth towards ovule), Nastic non-directional movement (Mimosa pudica touch-me-not turgor pressure). Plant Hormones: Auxin (cell elongation), Gibberellin (stem growth), Cytokinin (cell division in fruits/seeds), Abscisic Acid (growth inhibitor, wilting of leaves). Endocrine System: Pituitary (Growth hormone -> Dwarfism/Gigantism), Thyroid (Thyroxin requires Iodine -> Goitre prevention), Pancreas (Insulin -> Diabetes mellitus), Adrenal (Adrenaline fight-or-flight hormone), Testes (Testosterone) & Ovaries (Estrogen).',
    importantNCERTFigures: [
      'NCERT Fig 7.1 (a): Structure of a Neuron',
      'NCERT Fig 7.2: Reflex Arc pathway and components',
      'NCERT Fig 7.3: Human Brain (Forebrain, Midbrain, Hindbrain: Cerebrum, Cerebellum, Medulla, Pons)'
    ],
    repeatedBoardTopics: [
      'Draw reflex arc and trace the pathway of nerve impulse when a hand accidentally touches a hot plate',
      'Draw a neuron and state functions of Dendrite, Axon, and Synapse',
      'Functions of Cerebellum, Medulla, and Cerebrum in human brain',
      'Why is the use of iodised salt advisable? Mention hormone secreted by thyroid gland'
    ],
    pyqCount: 30,
  },
  {
    id: 'reproduction',
    name: 'How do Organisms Reproduce?',
    unitName: 'Unit II: World of Living (25 Marks)',
    subject: 'Science (Biology)',
    ncertCode: 'jesc107',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc107.pdf',
    highYieldWeightage: '7-9 Marks',
    coreConceptsSummary: 'Asexual Reproduction: Binary fission (Amoeba, Leishmania with whip flagellum), Multiple fission (Plasmodium malarial parasite), Budding (Hydra, Yeast), Fragmentation (Spirogyra), Regeneration (Planaria), Spore formation (Rhizopus bread mould sporangia), Vegetative propagation (Bryophyllum leaf notches, Grafting/Cutting). Sexual Reproduction in Flowering Plants: LS of Flower (Sepals, Petals, Stamen: Anther producing pollen + Filament, Carpel: Stigma + Style + Ovary), Pollination (Self vs Cross) and Pollen tube germination on stigma, Fertilization: Zygote -> Embryo, Ovule becomes Seed, Ovary becomes Fruit. Human Reproduction: Male Reproductive System (Testes in scrotum outside abdominal cavity for 2-2.5°C lower temperature for sperm formation, Vas deferens, Prostate & Seminal vesicle secretions), Female Reproductive System (Ovaries release 1 egg per month, Fallopian tube/Oviduct site of fertilization, Uterus, Placenta disc structure providing glucose/O2 from mother to fetus and waste removal), Menstruation (shedding of uterine lining when egg is not fertilized), Contraceptive Methods (Barrier: Condoms, Chemical: Oral pills, Surgical: Vasectomy in males and Tubectomy in females, Copper-T IUCD).',
    importantNCERTFigures: [
      'NCERT Fig 8.7: Longitudinal section (LS) of a Flower showing all whorls',
      'NCERT Fig 8.8: Germination of pollen on stigma and pollen tube growth',
      'NCERT Fig 8.10: Human Male Reproductive System',
      'NCERT Fig 8.11: Human Female Reproductive System'
    ],
    repeatedBoardTopics: [
      'Draw LS of flower and label reproductive parts. What post-fertilization changes occur in ovary and ovule?',
      'Draw pollen germination on stigma showing pollen tube entering female gamete',
      'Structure and function of Placenta in human female pregnancy',
      'Why are testes situated outside the abdominal cavity in scrotum?',
      'Methods of contraception to prevent sexually transmitted diseases (STDs like Gonorrhoea, Syphilis, HIV-AIDS)'
    ],
    pyqCount: 42,
  },
  {
    id: 'heredity',
    name: 'Heredity and Evolution',
    unitName: 'Unit II: World of Living (25 Marks)',
    subject: 'Science (Biology)',
    ncertCode: 'jesc108',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc108.pdf',
    highYieldWeightage: '4-6 Marks',
    coreConceptsSummary: 'Accumulation of variations during reproduction, Mendel\'s Experiments on Pea Plants (Pisum sativum): Monohybrid Cross (Tall TT × Dwarf tt -> F1 all Tall Tt; F1 selfing -> F2 Phenotypic ratio 3:1 Tall:Dwarf, Genotypic ratio 1:2:1 TT:Tt:tt), Dihybrid Cross (Round Yellow RRYY × Wrinkled Green rryy -> F2 Phenotypic ratio 9:3:3:1 Round Yellow:Round Green:Wrinkled Yellow:Wrinkled Green, Law of Independent Assortment), Dominant vs Recessive traits, Sex Determination in Human Beings (Females have 22 pairs + XX chromosomes producing only X eggs; Males have 22 pairs + XY chromosomes producing 50% X and 50% Y sperms; Father determines sex of child with 50% statistical probability).',
    importantNCERTFigures: [
      'NCERT Fig 9.3: Monohybrid cross inheritance of traits for two generations (TT × tt)',
      'NCERT Fig 9.6: Sex determination in human beings (XX and XY cross chart)'
    ],
    repeatedBoardTopics: [
      'Explain with a Punnett square cross why all progeny in F1 generation are tall when pure tall pea plant is crossed with dwarf pea plant',
      'A man with blood group A marries a woman with blood group O. Can this information tell whether A or O is dominant? Why?',
      'Show with flowchart how the sex of a child is determined in human beings. Why is father responsible for sex of baby?'
    ],
    pyqCount: 26,
  },

  // ==========================================
  // UNIT 3: NATURAL PHENOMENA (12 MARKS)
  // ==========================================
  {
    id: 'light-reflection-refraction',
    name: 'Light – Reflection and Refraction',
    unitName: 'Unit III: Natural Phenomena (12 Marks)',
    subject: 'Science (Physics)',
    ncertCode: 'jesc109',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc109.pdf',
    highYieldWeightage: '9-11 Marks',
    coreConceptsSummary: 'Reflection: Laws of reflection, Spherical mirrors: Concave (Converging, 6 cases of ray diagrams) and Convex (Diverging, wide rear view field), Mirror Formula: 1/f = 1/v + 1/u (f is negative for concave, positive for convex), Magnification: m = -v/u = h\'/h (m negative = real/inverted, m positive = virtual/erect). Refraction: Laws of refraction & Snell\'s Law (sin i / sin r = constant n21), Refractive Index: n = c/v, Refraction through rectangular glass slab with Lateral Displacement. Spherical Lenses: Convex (Converging, 6 cases) and Concave (Diverging), Lens Formula: 1/f = 1/v - 1/u, Lens Magnification: m = +v/u = h\'/h, Power of a Lens: P = 1/f(in meters) in Dioptres (D) (Convex lens P > 0, Concave lens P < 0).',
    importantNCERTFigures: [
      'NCERT Fig 9.3 & 9.4: All 6 ray diagrams of Concave mirror (especially Object between P and F)',
      'NCERT Fig 9.6 & 9.7: Ray diagrams of Convex lens (especially Object between O and F1 producing virtual magnified image - Simple Microscope)',
      'NCERT Fig 9.10: Refraction through a rectangular glass slab and lateral displacement'
    ],
    repeatedBoardTopics: [
      'Draw ray diagram for an object placed between focus and pole of concave mirror. State nature, position, and magnification',
      'A concave lens of focal length 15 cm forms an image 10 cm from the lens. Calculate object distance u and draw ray diagram',
      'Why is convex mirror used as rear-view mirror in vehicles? (Always forms erect diminished image and wide field of view)',
      'Find focal length of a lens of power -2.0 D. What type of lens is this?'
    ],
    pyqCount: 52,
  },
  {
    id: 'human-eye',
    name: 'The Human Eye and the Colourful World',
    unitName: 'Unit III: Natural Phenomena (12 Marks)',
    subject: 'Science (Physics)',
    ncertCode: 'jesc110',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc110.pdf',
    highYieldWeightage: '5-7 Marks',
    coreConceptsSummary: 'Human Eye: Cornea (thin membrane light enters), Iris (controls pupil size), Pupil (regulates amount of light), Eye lens (crystalline convex), Ciliary muscles (adjust focal length), Retina (screen with rods for light intensity and cones for color), Power of Accommodation (near point = 25 cm, far point = infinity). Defects of Vision: Myopia / Near-sightedness (causes: excessive curvature of cornea or elongation of eyeball; image formed in front of retina; correction: Concave lens), Hypermetropia / Far-sightedness (causes: focal length too long or eyeball too short; image formed behind retina; correction: Convex lens), Presbyopia (old age weakening of ciliary muscles; correction: Bifocal lens). Refraction through Prism: Angle of deviation D = (i + e) - A. Dispersion: White light splits into 7 colors (VIBGYOR) because different colors travel with different speeds in glass (Red bends least with longest wavelength, Violet bends most with shortest wavelength), Newton\'s double prism recombination experiment. Rainbow formation: Refraction + Dispersion at front droplet surface, Total Internal Reflection inside, and Refraction exiting raindrop. Atmospheric Refraction: Twinkling of stars (continuous change in refractive index of air layers), Apparent flattening of sun at sunrise/sunset, Advance sunrise (2 mins early) and delayed sunset (2 mins late). Scattering of Light: Tyndall effect, Blue color of sky (fine air particles scatter shorter blue wavelengths more: Intensity ∝ 1/λ^4), Red color of danger signal lights (least scattered by smoke and fog).',
    importantNCERTFigures: [
      'NCERT Fig 10.1: The Human Eye structure and internal parts',
      'NCERT Fig 10.2: Myopia and its correction using concave lens (3 diagrams)',
      'NCERT Fig 10.3: Hypermetropia and its correction using convex lens (3 diagrams)',
      'NCERT Fig 10.4 & 10.5: Refraction of light through glass prism and dispersion of white light',
      'NCERT Fig 10.6: Recombination of spectrum of white light using inverted prism',
      'NCERT Fig 10.8: Rainbow formation in water droplet'
    ],
    repeatedBoardTopics: [
      'Draw ray diagram to show (i) Myopic eye, (ii) Correction of myopia using a suitable lens. Write 2 causes of myopia',
      'Why do stars twinkle but planets do not twinkle? Explain with atmospheric refraction',
      'Why does the clear sky appear blue? Why does sky appear dark to an astronaut in space?',
      'Explain with labeled ray diagram the dispersion of white light through a triangular glass prism'
    ],
    pyqCount: 36,
  },

  // ==========================================
  // UNIT 4: EFFECTS OF CURRENT (13 MARKS)
  // ==========================================
  {
    id: 'electricity',
    name: 'Electricity',
    unitName: 'Unit IV: Effects of Current (13 Marks)',
    subject: 'Science (Physics)',
    ncertCode: 'jesc111',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc111.pdf',
    highYieldWeightage: '8-10 Marks',
    coreConceptsSummary: 'Electric current I = Q/t in Amperes (A) measured by Ammeter connected in series (low resistance), Electric potential difference V = W/Q in Volts (V) measured by Voltmeter connected in parallel (high resistance), Ohm\'s Law: V = IR (V-I graph is straight line through origin with slope = R), Factors affecting Resistance: Length (R ∝ L), Area of cross-section (R ∝ 1/A), Nature of material (Resistivity ρ in Ω·m: R = ρL/A), Resistors in Series: Current I is constant, V = V1 + V2 + V3, Equivalent Rs = R1 + R2 + R3, Resistors in Parallel: Voltage V is constant, I = I1 + I2 + I3, Equivalent 1/Rp = 1/R1 + 1/R2 + 1/R3 (Parallel advantages in domestic wiring: independent switches, overall low resistance, same 220V across all appliances), Joule\'s Law of Heating: H = I^2 R t = V I t = (V^2/R) t in Joules (Applications: Electric heater, Tungsten filament bulb with inert N2/Ar gas, Electric Fuse wire with low melting point), Electric Power: P = VI = I^2 R = V^2 / R in Watts (W), Commercial unit of electrical energy: 1 kilowatt-hour (1 kWh) = 1 Board of Trade Unit = 3.6 × 10^6 Joules.',
    importantNCERTFigures: [
      'NCERT Fig 11.2: Circuit diagram for verifying Ohm\'s Law (Battery, Key, Ammeter, Voltmeter, Resistor, Rheostat)',
      'NCERT Fig 11.6 & 11.7: Resistors in Series and Resistors in Parallel circuits'
    ],
    repeatedBoardTopics: [
      'Derive equivalent resistance for three resistors R1, R2, R3 connected in parallel',
      'A piece of wire of resistance R is cut into 5 equal parts and connected in parallel. If new resistance is R\', find ratio R/R\' (= 25)',
      'An electric lamp of 100 Ω, a toaster of 50 Ω, and a water filter of 500 Ω are connected in parallel to a 220 V source. Find total current and equivalent resistance',
      'Why is tungsten used almost exclusively for filament of electric lamps? Why are alloy coils used in electric toasters instead of pure metals?'
    ],
    pyqCount: 55,
  },
  {
    id: 'magnetic-effects',
    name: 'Magnetic Effects of Electric Current',
    unitName: 'Unit IV: Effects of Current (13 Marks)',
    subject: 'Science (Physics)',
    ncertCode: 'jesc112',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc112.pdf',
    highYieldWeightage: '6-8 Marks',
    coreConceptsSummary: 'Magnetic field lines: Continuous closed curves emerging from North pole and merging at South pole outside magnet; field strength indicated by degree of closeness of lines; two field lines NEVER intersect (because compass needle cannot point in two directions at once). Right-Hand Thumb Rule (Thumb in current direction, curled fingers in magnetic field direction), Magnetic field due to a straight wire (concentric circles, B ∝ I, B ∝ 1/r), Magnetic field of a circular loop (concentric at edges, straight and uniform at center), Magnetic field inside a Solenoid (long coil of insulated copper wire; field inside is uniform straight parallel lines, behaves like a bar magnet, inserting soft iron core forms an Electromagnet). Force on a current-carrying conductor in a magnetic field: Maximum when conductor is perpendicular to field (F = BIl), Fleming\'s Left-Hand Rule (Thumb = Force/Motion, Forefinger = Magnetic Field B, Middle finger = Current I). Domestic Electric Circuits: Live wire (Red insulation, 220V), Neutral wire (Black, 0V), Earth wire (Green/Yellow, safety measure connected to metal body of appliances providing low resistance path to ground preventing electric shocks), Electric Fuse (Safety device based on Joule\'s heating, prevents damage during Overloading and Short-circuiting).',
    importantNCERTFigures: [
      'NCERT Fig 12.6: Magnetic field lines around a straight current-carrying conductor (Right-hand thumb rule)',
      'NCERT Fig 12.10: Magnetic field lines of a current-carrying Solenoid',
      'NCERT Fig 12.13: Fleming\'s Left-Hand Rule orientation',
      'NCERT Fig 12.14: Schematic diagram of common domestic circuit'
    ],
    repeatedBoardTopics: [
      'State Fleming\'s Left-Hand Rule. Apply it to find direction of force on a proton moving horizontally into a magnetic field',
      'What is a Solenoid? Draw its magnetic field lines. How does it behave like a bar magnet?',
      'Why is an earth wire necessary in domestic circuits with metallic body appliances (refrigerator, toaster)?',
      'Why do two magnetic field lines never intersect each other?'
    ],
    pyqCount: 40,
  },

  // ==========================================
  // UNIT 5: NATURAL RESOURCES (5 MARKS)
  // ==========================================
  {
    id: 'our-environment',
    name: 'Our Environment',
    unitName: 'Unit V: Natural Resources (5 Marks)',
    subject: 'Science (Biology)',
    ncertCode: 'jesc113',
    officialPdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc113.pdf',
    highYieldWeightage: '5 Marks (Compulsory Section E / Case Study)',
    coreConceptsSummary: 'Ecosystem components: Biotic (Producers green plants, Consumers herbivores/carnivores, Decomposers bacteria/fungi) and Abiotic (temperature, rainfall, soil). Food Chain and Food Web: Unidirectional flow of energy from Sun -> Autotrophs -> Herbivores -> Carnivores, 10% Law of Energy Transfer (Lindeman\'s Rule: Only 10% of energy is transferred to next trophic level, 90% lost as heat/metabolism; why food chains have only 3-4 trophic levels). Biological Magnification: Progressive accumulation of non-biodegradable toxic chemicals (pesticides like DDT) at each higher trophic level; highest concentration in top consumers (humans). Environmental Problems: Ozone Layer (O3 formed in stratosphere by UV radiation splitting O2 into O + O, and O + O2 -> O3; protects Earth from harmful UV causing skin cancer and cataract; Depleted by Chlorofluorocarbons CFCs used in refrigerants; Montreal Protocol 1987 froze CFC production), Managing Garbage: Biodegradable (broken down by biological enzyme action) vs Non-biodegradable waste (plastics).',
    importantNCERTFigures: [
      'NCERT Fig 13.1: Food chain in nature (Forest, Grassland, Pond)',
      'NCERT Fig 13.2: Food Web consisting of interconnected food chains',
      'NCERT Fig 13.4: Trophic levels pyramid showing 10% energy transfer'
    ],
    repeatedBoardTopics: [
      'State 10% Law. If 10,000 J of solar energy falls on green plants, how much energy is available to a snake in grass -> grasshopper -> frog -> snake chain?',
      'What is Biological Magnification? Why do humans accumulate highest concentration of harmful pesticides?',
      'How is ozone formed in the upper atmosphere? Name the chemical responsible for its depletion and international treaty signed to control it'
    ],
    pyqCount: 28,
  }
];
