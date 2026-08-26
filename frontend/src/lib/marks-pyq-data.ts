export interface MarksPYQQuestion {
  id: string;
  chapterId: string;
  chapterName: string;
  subject: string;
  topic: string;
  year: number;
  marks: number;
  section: 'Section A (1M)' | 'Section B (2M)' | 'Section C (3M)' | 'Section D (5M)' | 'Section E (4M Case Study)';
  question: string;
  options?: string[];
  correctOption?: string;
  modelAnswer: string;
  markingScheme: string[];
  commonTrap: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const MARKS_CHAPTER_TOPICS: Record<string, string[]> = {
  // BIOLOGY
  'bio-ch5': [
    'All Topics',
    'Autotrophic Nutrition & Stomata',
    'Human Digestive System & Enzymes',
    'Respiration & 3 Glucose Pathways',
    'Human Heart & Double Circulation',
    'Transportation in Plants (Xylem/Phloem)',
    'Excretory System & Nephron Function'
  ],
  'bio-ch6': [
    'All Topics',
    'Neuron Structure & Synaptic Transmission',
    'Reflex Action & Reflex Arc Pathway',
    'Human Brain (Forebrain, Midbrain, Hindbrain)',
    'Plant Hormones & Tropic Movements',
    'Endocrine Glands & Hormonal Feedback'
  ],
  'bio-ch7': [
    'All Topics',
    'Asexual Reproduction (Binary Fission, Budding, Spores)',
    'Sexual Reproduction in Flowering Plants (LS Flower)',
    'Male & Female Reproductive Systems',
    'Fertilisation & Role of Placenta',
    'Contraceptive Methods & Reproductive Health'
  ],
  'bio-ch8': [
    'All Topics',
    'Mendel\'s Monohybrid Cross (TT x tt)',
    'Mendel\'s Dihybrid Cross (9:3:3:1)',
    'Dominant vs Recessive Traits',
    'Sex Determination in Humans (XX / XY)'
  ],
  'bio-ch13': [
    'All Topics',
    'Ecosystem Components & Food Chains',
    '10% Law of Energy Transfer',
    'Biological Magnification of Toxins',
    'Ozone Layer Depletion & Waste Management'
  ],

  // PHYSICS
  'phy-ch9': [
    'All Topics',
    'Concave Mirror 6 Ray Diagram Cases',
    'Convex Mirror Ray Diagrams & Rear View Mirror',
    'Mirror Formula (1/f = 1/v + 1/u) & Numericals',
    'Refraction through Glass Slab & Snell\'s Law',
    'Convex & Concave Lens Ray Diagrams',
    'Lens Formula & Power of Lens (P = 1/f)'
  ],
  'phy-ch10': [
    'All Topics',
    'Structure of Human Eye & Accommodation (25 cm)',
    'Myopia (Near-sightedness) & Concave Lens Correction',
    'Hypermetropia & Convex Lens Correction',
    'Refraction through Prism & VIBGYOR Dispersion',
    'Atmospheric Refraction (Twinkling of Stars)',
    'Scattering of Light & Tyndall Effect'
  ],
  'phy-ch11': [
    'All Topics',
    'Electric Current (I = Q/t) & Potential Difference (V = W/Q)',
    'Ohm\'s Law (V = IR) & Resistance Factors (R = ρL/A)',
    'Resistors in Series (Rs = R1 + R2 + R3)',
    'Resistors in Parallel (1/Rp = 1/R1 + 1/R2 + 1/R3)',
    'Joule\'s Heating Effect (H = I²Rt)',
    'Electric Power (P = VI = I²R) & Commercial Energy (kWh)'
  ],
  'phy-ch12': [
    'All Topics',
    'Magnetic Field Lines & Properties',
    'Right Hand Thumb Rule & Circular Loop',
    'Magnetic Field of a Solenoid (Bar Magnet Analogy)',
    'Fleming\'s Left Hand Rule & Magnetic Force',
    'Domestic Electric Circuits (Live, Neutral, Earth Wire & Fuse)'
  ],

  // CHEMISTRY
  'chem-ch1': [
    'All Topics',
    'Balancing Chemical Equations',
    'Combination & Decomposition Reactions',
    'Displacement & Double Displacement Reactions',
    'Oxidation, Reduction & Redox Identification',
    'Corrosion & Rancidity Prevention'
  ],
  'chem-ch2': [
    'All Topics',
    'Reaction of Acids with Metals & Carbonates',
    'pH Scale & Importance in Everyday Life',
    'Chlor-Alkali Process (NaOH, Cl2, H2 at Electrodes)',
    'Bleaching Powder (CaOCl2) & Baking Soda (NaHCO3)',
    'Washing Soda & Plaster of Paris (CaSO4·1/2H2O)'
  ],
  'chem-ch3': [
    'All Topics',
    'Physical & Chemical Properties of Metals',
    'Reactivity Series & Displacement',
    'Ionic Bond Formation & Electron Dot Structures',
    'Metallurgy (Roasting vs Calcination, Thermit Process)',
    'Corrosion of Metals & Prevention (Alloying, Galvanisation)'
  ],
  'chem-ch4': [
    'All Topics',
    'Covalent Bonding & Versatile Nature (Catenation/Tetravalency)',
    'Homologous Series & Functional Groups',
    'Combustion, Oxidation & Addition (Hydrogenation)',
    'Properties of Ethanol & Ethanoic Acid (Esterification)',
    'Soap Micelle Structure & Cleansing Action'
  ],

  // MATHEMATICS
  'math-ch1': [
    'All Topics',
    'Fundamental Theorem of Arithmetic (HCF x LCM = a x b)',
    'Proof of Irrationality (Prove √2, √3, √5 is Irrational)',
    'Prime Factorisation Problems'
  ],
  'math-ch2': [
    'All Topics',
    'Geometrical Meaning of Zeroes (X-axis Intercepts)',
    'Relationship between Zeroes and Coefficients (α+β, αβ)',
    'Forming Quadratic Polynomial from Zeroes'
  ],
  'math-ch4': [
    'All Topics',
    'Solution by Factorisation Method',
    'Quadratic Formula Method & Discriminant (D = b² - 4ac)',
    'Nature of Roots (Equal Roots: D = 0)',
    'Speed-Time & Upstream-Downstream Word Problems'
  ],
  'math-ch5': [
    'All Topics',
    'nth Term of an AP (an = a + (n-1)d)',
    'Sum of First n Terms (Sn = n/2[2a + (n-1)d])',
    'Word Problems on AP (Savings, Rows of Logs, Steps)'
  ],
  'math-ch8': [
    'All Topics',
    'Trigonometric Ratios & Right Triangles',
    'Values at Specific Angles (0°, 30°, 45°, 60°, 90°)',
    'Trigonometric Identities Proofs (sin²θ + cos²θ = 1)'
  ],
  'math-ch9': [
    'All Topics',
    'Angle of Elevation Single Triangle Problems',
    'Angle of Depression Double Triangle Problems',
    'Heights & Distances Case Study Questions'
  ],
  'math-ch10': [
    'All Topics',
    'Tangent Perpendicular to Radius at Point of Contact',
    'Theorem: Lengths of Tangents from External Point are Equal',
    'Circumscribing Quadrilaterals Proofs'
  ],

  // SOCIAL SCIENCE
  'sst-his-ch1': [
    'All Topics',
    'French Revolution & Ideas of La Patrie',
    'Napoleonic Civil Code of 1804',
    'Unification of Germany & Italy',
    'Romanticism & National Identity'
  ],
  'sst-his-ch2': [
    'All Topics',
    'First World War & Satyagraha Movements',
    'Rowlatt Act & Jallianwala Bagh Massacre (1919)',
    'Non-Cooperation Movement & Chauri Chaura',
    'Dandi Salt March (1930) & Civil Disobedience',
    'Map Work: Historical Satyagraha Centers'
  ],
  'sst-pol-ch1': [
    'All Topics',
    'Belgium Accommodation Model vs Sri Lanka Majoritarianism',
    'Prudential vs Moral Reasons for Power Sharing',
    'Forms of Power Sharing (Horizontal vs Vertical)',
    'Decentralisation in India (1992 Amendment)'
  ]
};

export const MARKS_PYQ_QUESTIONS: MarksPYQQuestion[] = [
  // ==========================================
  // LIFE PROCESSES (BIOLOGY)
  // ==========================================
  {
    id: 'pyq-bio-5-1',
    chapterId: 'bio-ch5',
    chapterName: 'Life Processes',
    subject: 'Science (Biology)',
    topic: 'Human Heart & Double Circulation',
    year: 2024,
    marks: 5,
    section: 'Section D (5M)',
    question: '(a) Draw a neat sectional diagram of the human heart and label the following parts:\n(i) Aorta\n(ii) Pulmonary Artery\n(iii) Left Ventricle\n(iv) Interventricular Septum\n\n(b) Why is double circulation necessary in human beings? Explain the separation of oxygenated and deoxygenated blood.',
    modelAnswer: `**(a) Diagram of Human Heart:**\nStudents must draw the standard 4-chambered sectional view showing Right Atrium, Left Atrium, Right Ventricle, Left Ventricle with the thick muscular wall on the left side, Aorta curving upwards, Pulmonary Artery branching to lungs, and the central Interventricular Septum.\n\n**(b) Necessity of Double Circulation:**\n1. Humans are warm-blooded (endothermic) organisms and require a constant body temperature (37°C), which demands a high amount of cellular energy.\n2. Complete separation of oxygenated blood (left chambers) and deoxygenated blood (right chambers) prevents mixing.\n3. This ensures an extremely efficient supply of high-pressure oxygen to all body tissues for rapid aerobic cellular respiration.`,
    markingScheme: [
      '1.5 Marks: Accurate sectional diagram of heart with 4 chambers',
      '2.0 Marks: Correct labeling of Aorta (0.5M), Pulmonary Artery (0.5M), Left Ventricle (0.5M), Septum (0.5M)',
      '1.5 Marks: Reason for double circulation (High energy requirement + zero mixing of oxygenated/deoxygenated blood)'
    ],
    commonTrap: 'Drawing the left ventricle wall with the same thickness as the right ventricle. Left ventricle must be visibly 3x thicker because it pumps blood to the entire body at high pressure!',
    difficulty: 'Hard'
  },
  {
    id: 'pyq-bio-5-2',
    chapterId: 'bio-ch5',
    chapterName: 'Life Processes',
    subject: 'Science (Biology)',
    topic: 'Respiration & 3 Glucose Pathways',
    year: 2023,
    marks: 3,
    section: 'Section C (3M)',
    question: 'Write the 3 different pathways of breakdown of glucose in living organisms. Mention the conditions, site of occurrence, and end products with energy release for each pathway.',
    modelAnswer: `**Breakdown of Glucose (6-Carbon Molecule) in Cytoplasm $\\rightarrow$ Pyruvate (3-Carbon Molecule) + Energy**\n\n1. **Absence of Oxygen (Anaerobic / Yeast Fermentation):**\n   - *Site:* Cytoplasm of Yeast\n   - *Products:* Ethanol (2-Carbon) + $\\text{CO}_2$ + Energy (2 ATP)\n\n2. **Lack of Oxygen (Muscle Cells during heavy exercise):**\n   - *Site:* Human Skeletal Muscle Cells\n   - *Products:* Lactic Acid (3-Carbon) + Energy (Causes muscle cramps)\n\n3. **Presence of Oxygen (Aerobic Respiration):**\n   - *Site:* Mitochondria\n   - *Products:* $6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{Energy (36-38 ATP)}$`,
    markingScheme: [
      '1.0 Mark: Glycolysis in cytoplasm to Pyruvate',
      '1.0 Mark: Anaerobic pathway in yeast with Ethanol + CO2',
      '1.0 Mark: Lack of oxygen in muscles (Lactic acid) + Aerobic pathway in Mitochondria (CO2 + H2O + 38 ATP)'
    ],
    commonTrap: 'Forgetting to specify the site of occurrence (Cytoplasm vs Mitochondria).',
    difficulty: 'Medium'
  },
  {
    id: 'pyq-bio-5-3',
    chapterId: 'bio-ch5',
    chapterName: 'Life Processes',
    subject: 'Science (Biology)',
    topic: 'Excretory System & Nephron Function',
    year: 2022,
    marks: 3,
    section: 'Section C (3M)',
    question: 'Describe the structure and functioning of a Nephron. How is the amount of urine produced regulated in the body?',
    modelAnswer: `**1. Structure of Nephron:**\n- **Bowman\'s Capsule:** Cup-like structure enclosing a knot of capillaries called **Glomerulus**.\n- **Tubular Part (PCT, Loop of Henle, DCT):** Highly coiled tube wrapped with blood capillaries.\n- **Collecting Duct:** Collects concentrated urine from multiple nephrons.\n\n**2. Steps of Urine Formation:**\n- **Ultrafiltration:** Blood is filtered under high pressure in the Glomerulus. Glucose, amino acids, salts, and excess water enter Bowman\'s capsule as initial filtrate.\n- **Selective Reabsorption:** As filtrate flows through the tubule, essential substances (all glucose, amino acids, most salts & water) are reabsorbed back into the peritubular capillaries.\n- **Tubular Secretion:** Urea, uric acid, and excess ions are secreted into the collecting duct to form urine.\n\n**3. Regulation:**\nRegulated by the amount of excess water in the body and dissolved nitrogenous waste to be excreted (controlled by Anti-Diuretic Hormone - ADH).`,
    markingScheme: [
      '1.0 Mark: Nephron structural parts (Glomerulus, Bowman\'s cup, Tubule, Collecting duct)',
      '1.0 Mark: 3 stages of urine formation (Ultrafiltration, Selective reabsorption, Secretion)',
      '1.0 Mark: Regulation factor (Water intake and nitrogenous waste level)'
    ],
    commonTrap: 'Confusing filtration with selective reabsorption. Ultrafiltration occurs in Glomerulus; Selective reabsorption occurs in the tubular part.',
    difficulty: 'Hard'
  },
  {
    id: 'pyq-bio-5-4',
    chapterId: 'bio-ch5',
    chapterName: 'Life Processes',
    subject: 'Science (Biology)',
    topic: 'Autotrophic Nutrition & Stomata',
    year: 2024,
    marks: 1,
    section: 'Section A (1M)',
    question: 'Opening and closing of stomatal pore is primarily regulated by:\n(A) Oxygen concentration in guard cells\n(B) Temperature of the leaf surface\n(C) Amount of water in guard cells\n(D) Nitrogen concentration in soil',
    options: [
      '(A) Oxygen concentration in guard cells',
      '(B) Temperature of the leaf surface',
      '(C) Amount of water in guard cells',
      '(D) Nitrogen concentration in soil'
    ],
    correctOption: '(C) Amount of water in guard cells',
    modelAnswer: `**Correct Option: (C) Amount of water in guard cells**\n\n**Explanation:**\nWhen water flows into the guard cells, they become turgid and swell, causing their curved inner thick walls to pull apart and OPEN the stomatal pore. When guard cells lose water, they become flaccid and shrink, CLOSING the pore.`,
    markingScheme: [
      '1.0 Mark: Correct option (C) with scientific reason'
    ],
    commonTrap: 'Selecting temperature or sunlight. Sunlight triggers the ion pump, but the physical opening mechanism is directly caused by water turgidity in guard cells.',
    difficulty: 'Easy'
  },

  // ==========================================
  // LIGHT – REFLECTION & REFRACTION (PHYSICS)
  // ==========================================
  {
    id: 'pyq-phy-9-1',
    chapterId: 'phy-ch9',
    chapterName: 'Light – Reflection and Refraction',
    subject: 'Science (Physics)',
    topic: 'Concave Mirror 6 Ray Diagram Cases',
    year: 2024,
    marks: 5,
    section: 'Section D (5M)',
    question: '(a) An object is placed between the Pole (P) and Principal Focus (F) of a concave mirror. Draw a neat ray diagram to show the formation of image. State three characteristics of the image formed.\n\n(b) A concave mirror produces three times magnified real image of an object placed at 10 cm in front of it. Where is the image located? Find the focal length of the mirror.',
    modelAnswer: `**(a) Ray Diagram (Case 6 of Concave Mirror):**\n- Principal axis with C, F, P.\n- Object AB between P and F.\n- Ray 1 parallel to axis reflects through F.\n- Ray 2 passing through Center of Curvature C reflects back along same path.\n- The two reflected rays diverge in front of mirror, but their backward dotted extensions intersect behind the mirror at $A'B'$.\n\n**Image Characteristics:**\n1. **Position:** Behind the mirror\n2. **Nature:** Virtual and Erect\n3. **Size:** Magnified / Enlarged\n\n**(b) Numerical Calculation:**\n- Object distance $u = -10\\text{ cm}$\n- Real image magnification $m = -3$\n- We know $m = -\\frac{v}{u} \\Rightarrow -3 = -\\frac{v}{-10} \\Rightarrow v = -30\\text{ cm}$\n- **Image Location:** 30 cm in front of the concave mirror.\n\n**Focal Length Calculation:**\n$$\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u} = \\frac{1}{-30} + \\frac{1}{-10} = \\frac{-1 - 3}{30} = \\frac{-4}{30} = -\\frac{2}{15}$$\n$$f = -\\frac{15}{2} = -7.5\\text{ cm}$$\n**Focal length of mirror is 7.5 cm (Concave mirror has negative focal length).**`,
    markingScheme: [
      '2.0 Marks: Accurate ray diagram with arrows showing divergence and virtual image behind mirror',
      '1.0 Mark: 3 image characteristics (Behind mirror, Virtual & Erect, Magnified)',
      '1.0 Mark: Correct calculation of v = -30 cm with formula',
      '1.0 Mark: Correct calculation of f = -7.5 cm with negative sign'
    ],
    commonTrap: 'Forgetting arrows on light rays (leads to automatic 0.5M deduction!) or using positive magnification for real image (real image magnification must be negative: m = -3).',
    difficulty: 'Hard'
  },
  {
    id: 'pyq-phy-9-2',
    chapterId: 'phy-ch9',
    chapterName: 'Light – Reflection and Refraction',
    subject: 'Science (Physics)',
    topic: 'Lens Formula & Power of Lens (P = 1/f)',
    year: 2023,
    marks: 3,
    section: 'Section C (3M)',
    question: 'A doctor has prescribed a corrective lens of power $-2.0\\text{ D}$ to a patient.\n(i) Find the focal length of the lens.\n(ii) Is the prescribed lens diverging or converging?\n(iii) Name the vision defect the patient is suffering from and state two possible causes for this defect.',
    modelAnswer: `**(i) Focal Length Calculation:**\n$$P = \\frac{1}{f(\\text{in meters})} \\Rightarrow f = \\frac{1}{P} = \\frac{1}{-2.0\\text{ D}} = -0.5\\text{ m} = -50\\text{ cm}$$\n\n**(ii) Nature of Lens:**\nSince the focal length and power are **negative**, it is a **Concave Lens (Diverging Lens)**.\n\n**(iii) Eye Defect & Causes:**\n- **Defect:** **Myopia (Near-sightedness)**\n- **Causes:**\n  1. Excessive curvature of the eye lens (lens becomes too thick/converging).\n  2. Elongation of the eyeball (distance between lens and retina increases).`,
    markingScheme: [
      '1.0 Mark: Calculation of focal length f = -0.5 m or -50 cm with sign',
      '0.5 Mark: Identification of Concave / Diverging lens',
      '0.5 Mark: Identification of Myopia',
      '1.0 Mark: Two causes (Excessive lens curvature + Elongation of eyeball)'
    ],
    commonTrap: 'Calculating focal length in centimeters directly without converting ($1/-2 = -0.5\\text{ m}$, not $-0.5\\text{ cm}$).',
    difficulty: 'Medium'
  },

  // ==========================================
  // ELECTRICITY (PHYSICS)
  // ==========================================
  {
    id: 'pyq-phy-11-1',
    chapterId: 'phy-ch11',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    topic: 'Resistors in Parallel (1/Rp = 1/R1 + 1/R2 + 1/R3)',
    year: 2024,
    marks: 3,
    section: 'Section C (3M)',
    question: 'Derive an expression for the equivalent resistance of three resistors $R_1, R_2, R_3$ connected in parallel across a battery of potential difference $V$. State two advantages of connecting electrical appliances in parallel rather than in series in a domestic circuit.',
    modelAnswer: `**Derivation of Equivalent Resistance in Parallel:**\n1. In a parallel circuit, the potential difference $V$ across each resistor is the same.\n2. The total current $I$ divides into branches: $I = I_1 + I_2 + I_3$\n3. According to Ohm\'s law, $I_1 = \\frac{V}{R_1}$, $I_2 = \\frac{V}{R_2}$, $I_3 = \\frac{V}{R_3}$, and $I = \\frac{V}{R_p}$\n4. Substituting these into the current equation:\n   $$\\frac{V}{R_p} = \\frac{V}{R_1} + \\frac{V}{R_2} + \\frac{V}{R_3}$$\n5. Dividing both sides by $V$:\n   $$\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$$\n\n**Advantages of Parallel Domestic Circuits:**\n1. **Independent Operation:** If one appliance fails or is turned off, other appliances continue working uninterrupted.\n2. **Equal Voltage:** Each appliance receives the full rated voltage ($220\\text{ V}$ in India).\n3. **Lower Total Resistance:** Equivalent resistance decreases, allowing high-power appliances (e.g. geysers, ACs) to draw adequate current.`,
    markingScheme: [
      '2.0 Marks: Step-by-step mathematical derivation with circuit explanation',
      '1.0 Mark: Any two valid advantages of parallel domestic wiring'
    ],
    commonTrap: 'Assuming current is constant in parallel. Potential difference is constant ($V$), while current divides ($I = I_1 + I_2 + I_3$).',
    difficulty: 'Medium'
  },

  // ==========================================
  // CHEMICAL REACTIONS & EQUATIONS (CHEMISTRY)
  // ==========================================
  {
    id: 'pyq-chem-1-1',
    chapterId: 'chem-ch1',
    chapterName: 'Chemical Reactions and Equations',
    subject: 'Science (Chemistry)',
    topic: 'Combination & Decomposition Reactions',
    year: 2024,
    marks: 3,
    section: 'Section C (3M)',
    question: 'During electrolysis of acidified water:\n(a) Name the gas collected at the cathode and anode.\n(b) Why is the volume of gas collected at one electrode double that of the other?\n(c) Write the balanced chemical reaction for this process.',
    modelAnswer: `**(a) Gases Collected:**\n- **Cathode (Negative electrode):** **Hydrogen gas ($\\text{H}_2$)**\n- **Anode (Positive electrode):** **Oxygen gas ($\\text{O}_2$)**\n\n**(b) Reason for 2:1 Volume Ratio:**\nWater ($\\text{H}_2\\text{O}$) consists of 2 parts of hydrogen and 1 part of oxygen by volume. On decomposition, 2 moles of $\\text{H}_2$ gas are liberated for every 1 mole of $\\text{O}_2$ gas.\n\n**(c) Balanced Chemical Equation:**\n$$2\\text{H}_2\\text{O}(l) \\xrightarrow{\\text{Electric Current}} 2\\text{H}_2(g) \\uparrow + \\text{O}_2(g) \\uparrow$$`,
    markingScheme: [
      '1.0 Mark: Cathode = Hydrogen (0.5M), Anode = Oxygen (0.5M)',
      '1.0 Mark: Explanation of 2:1 molar stoichiometry in H2O molecule',
      '1.0 Mark: Balanced chemical equation with state symbols'
    ],
    commonTrap: 'Reversing cathode and anode. Memory tip: **Cathode attracts positive cations ($H^+$), so Hydrogen at Cathode!**',
    difficulty: 'Easy'
  },

  // ==========================================
  // CARBON & ITS COMPOUNDS (CHEMISTRY)
  // ==========================================
  {
    id: 'pyq-chem-4-1',
    chapterId: 'chem-ch4',
    chapterName: 'Carbon and its Compounds',
    subject: 'Science (Chemistry)',
    topic: 'Soap Micelle Structure & Cleansing Action',
    year: 2023,
    marks: 5,
    section: 'Section D (5M)',
    question: '(a) What are soaps chemically? Explain the mechanism of cleansing action of soap with the help of a neat labeled diagram of a micelle.\n\n(b) Why do soaps not form lather with hard water? How do synthetic detergents overcome this limitation?',
    modelAnswer: `**(a) Chemical Nature & Micelle Mechanism:**\n- **Definition:** Soaps are sodium or potassium salts of long-chain fatty acids (e.g. Sodium stearate $\\text{C}_{17}\\text{H}_{35}\\text{COO}^-\\text{Na}^+$).\n- **Structure of Soap Molecule:**\n  1. **Hydrophobic Tail (Hydrocarbon chain):** Water-repelling, dissolves in oily dirt.\n  2. **Hydrophilic Head ($-\\text{COO}^-\\text{Na}^+$):** Water-loving, interacts with water.\n\n- **Micelle Formation:**\n  When soap is dissolved in water, the hydrophobic tails cluster radially inwards attaching to the central oil dirt droplet, while the hydrophilic ionic heads point outwards into water. This spherical cluster is called a **Micelle**.\n\n- **Cleansing Action:**\n  The oily dirt is trapped inside the micelle core. On agitating with water, the micelle remains suspended as an emulsion and is rinsed away.\n\n**(b) Soaps in Hard Water:**\n- Hard water contains dissolved $\\text{Ca}^{2+}$ and $\\text{Mg}^{2+}$ ions which react with soap to form an insoluble white precipitate called **Scum**, wasting soap.\n- **Detergents** are sodium salts of sulphonic acids or ammonium salts with chlorides. Their charged ends do not form insoluble precipitates with $\\text{Ca}^{2+}/\\text{Mg}^{2+}$, hence they form rich lather even in hard water.`,
    markingScheme: [
      '1.0 Mark: Chemical definition of soap + two ends (Hydrophobic tail & Hydrophilic head)',
      '2.0 Marks: Micelle formation diagram + explanation of oil trapping',
      '1.0 Mark: Reason for scum formation in hard water with Ca2+/Mg2+',
      '1.0 Mark: Why synthetic detergents work in hard water'
    ],
    commonTrap: 'Drawing the hydrophilic ionic head inside the oil. Ionic heads are charged and MUST face outwards towards polar water molecules!',
    difficulty: 'Hard'
  },

  // ==========================================
  // MATHEMATICS (REAL NUMBERS)
  // ==========================================
  {
    id: 'pyq-math-1-1',
    chapterId: 'math-ch1',
    chapterName: 'Real Numbers',
    subject: 'Mathematics',
    topic: 'Proof of Irrationality (Prove √2, √3, √5 is Irrational)',
    year: 2024,
    marks: 3,
    section: 'Section C (3M)',
    question: 'Prove that $\\sqrt{5}$ is an irrational number using the method of contradiction.',
    modelAnswer: `**Proof by Contradiction:**\n1. Let us assume, to the contrary, that $\\sqrt{5}$ is a rational number.\n2. Therefore, $\\sqrt{5} = \\frac{a}{b}$, where $a$ and $b$ are co-prime integers ($b \\neq 0$) having no common factor other than 1.\n\n3. Squaring both sides:\n   $$5 = \\frac{a^2}{b^2} \\Rightarrow a^2 = 5b^2 \\quad \\text{--- (1)}$$\n   This means $5$ divides $a^2$. According to the theorem, if a prime number $p$ divides $a^2$, then $p$ divides $a$. Therefore, **$5$ divides $a$**.\n\n4. Let $a = 5c$ for some integer $c$. Substituting $a = 5c$ into equation (1):\n   $$(5c)^2 = 5b^2 \\Rightarrow 25c^2 = 5b^2 \\Rightarrow b^2 = 5c^2$$\n   This means $5$ divides $b^2$, which implies **$5$ divides $b$**.\n\n5. From steps 3 and 4, $5$ is a common factor of both $a$ and $b$.\n6. But this contradicts our initial assumption that $a$ and $b$ are co-prime.\n7. This contradiction has arisen because of our incorrect assumption that $\\sqrt{5}$ is rational.\n\n**Hence, $\\sqrt{5}$ is irrational. (Proved)**`,
    markingScheme: [
      '0.5 Mark: Assumption of rational form a/b where a, b are co-prime',
      '1.0 Mark: Proving 5 divides a',
      '1.0 Mark: Proving 5 divides b by substituting a = 5c',
      '0.5 Mark: Concluding contradiction and proving irrationality'
    ],
    commonTrap: 'Forgetting to explicitly mention that "a and b are co-prime". Without the word "co-prime", examiners deduct 0.5 marks.',
    difficulty: 'Medium'
  },

  // ==========================================
  // MATHEMATICS (QUADRATIC EQUATIONS)
  // ==========================================
  {
    id: 'pyq-math-4-1',
    chapterId: 'math-ch4',
    chapterName: 'Quadratic Equations',
    subject: 'Mathematics',
    topic: 'Speed-Time & Upstream-Downstream Word Problems',
    year: 2023,
    marks: 5,
    section: 'Section D (5M)',
    question: 'A motor boat whose speed is $18\\text{ km/h}$ in still water takes 1 hour more to go $24\\text{ km}$ upstream than to return downstream to the same spot. Find the speed of the stream.',
    modelAnswer: `**Solution:**\n1. Let the speed of the stream be $x\\text{ km/h}$.\n2. Given speed of boat in still water $= 18\\text{ km/h}$.\n   - Speed upstream $= (18 - x)\\text{ km/h}$\n   - Speed downstream $= (18 + x)\\text{ km/h}$\n\n3. Distance $= 24\\text{ km}$.\n   - Time taken upstream $t_1 = \\frac{24}{18 - x}$\n   - Time taken downstream $t_2 = \\frac{24}{18 + x}$\n\n4. According to the problem: $t_1 - t_2 = 1$\n   $$\\frac{24}{18 - x} - \\frac{24}{18 + x} = 1$$\n   $$24 \\left[ \\frac{(18 + x) - (18 - x)}{(18 - x)(18 + x)} \\right] = 1$$\n   $$24 \\left[ \\frac{2x}{324 - x^2} \\right] = 1$$\n   $$48x = 324 - x^2$$\n   $$x^2 + 48x - 324 = 0$$\n\n5. Solving by factorisation:\n   $$x^2 + 54x - 6x - 324 = 0$$\n   $$x(x + 54) - 6(x + 54) = 0$$\n   $$(x - 6)(x + 54) = 0$$\n   $$x = 6 \\quad \\text{or} \\quad x = -54$$\n\n6. Since speed cannot be negative, we reject $x = -54$.\n\n**Therefore, the speed of the stream is $6\\text{ km/h}$.**`,
    markingScheme: [
      '1.0 Mark: Forming speed expressions (18-x) and (18+x)',
      '1.5 Marks: Setting up fractional time equation t1 - t2 = 1',
      '1.5 Marks: Reducing to quadratic equation x^2 + 48x - 324 = 0',
      '1.0 Mark: Factoring and finding x = 6 km/h with negative root rejection'
    ],
    commonTrap: 'Writing upstream speed as (x - 18) instead of (18 - x). Boat speed must exceed stream speed, otherwise boat cannot move upstream!',
    difficulty: 'Hard'
  }
];
