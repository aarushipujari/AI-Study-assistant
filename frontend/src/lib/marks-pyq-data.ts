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
    'Prime Factorisation & Decimal Expansions'
  ],
  'math-ch2': [
    'All Topics',
    'Geometrical Meaning of Zeroes (X-axis Intercepts)',
    'Relationship between Zeroes and Coefficients (α+β, αβ)',
    'Forming Quadratic Polynomial from Zeroes'
  ],
  'math-ch4': [
    'All Topics',
    'Quadratic Formula Method & Discriminant (D = b² - 4ac)',
    'Nature of Roots (Equal Roots: D = 0)',
    'Speed-Time & Upstream-Downstream Word Problems',
    'Work & Pipes Filling Tank Word Problems'
  ],
  'math-ch5': [
    'All Topics',
    'nth Term of an AP (an = a + (n-1)d)',
    'Sum of First n Terms (Sn = n/2[2a + (n-1)d])',
    'Word Problems & Case Studies on AP'
  ],
  'math-ch8': [
    'All Topics',
    'Trigonometric Ratios & Specific Angles (0°-90°)',
    'Trigonometric Identities Proofs (sin²θ + cos²θ = 1)',
    'Complementary Angles & Algebraic Trigonometry'
  ],
  'math-ch9': [
    'All Topics',
    'Angle of Elevation Single Triangle Problems',
    'Angle of Depression Double Triangle Problems',
    'Heights & Distances Case Study Questions (Balloons, Towers)'
  ],
  'math-ch10': [
    'All Topics',
    'Theorem 10.1: Tangent Perpendicular to Radius',
    'Theorem 10.2: Tangent Lengths from External Point Equal',
    'Circumscribing Quadrilaterals & Triangles Proofs'
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
  // ========================================================
  // MATHEMATICS: CH 1 - REAL NUMBERS
  // ========================================================
  {
    id: 'pyq-math-1-1',
    chapterId: 'math-ch1',
    chapterName: 'Real Numbers',
    subject: 'Mathematics',
    topic: 'Proof of Irrationality (Prove √2, √3, √5 is Irrational)',
    year: 2024,
    marks: 3,
    section: 'Section C (3M)',
    question: 'Prove that √5 is an irrational number using the method of contradiction.',
    modelAnswer: '**Proof by Contradiction:**\n1. Let us assume, to the contrary, that √5 is a rational number.\n2. Therefore, √5 = a/b, where a and b are co-prime integers (b ≠ 0) having no common factor other than 1.\n\n3. Squaring both sides:\n   5 = a²/b²  ⟹  a² = 5b²  --- (1)\n   This means 5 divides a². According to the theorem, if a prime number p divides a², then p divides a. Therefore, **5 divides a**.\n\n4. Let a = 5c for some integer c. Substituting a = 5c into equation (1):\n   (5c)² = 5b²  ⟹  25c² = 5b²  ⟹  b² = 5c²\n   This means 5 divides b², which implies **5 divides b**.\n\n5. From steps 3 and 4, 5 is a common factor of both a and b.\n6. But this contradicts our initial assumption that a and b are co-prime.\n7. This contradiction has arisen because of our incorrect assumption that √5 is rational.\n\n**Hence, √5 is irrational. (Proved)**',
    markingScheme: [
      '0.5 Mark: Assumption of rational form a/b where a, b are co-prime',
      '1.0 Mark: Proving 5 divides a',
      '1.0 Mark: Proving 5 divides b by substituting a = 5c',
      '0.5 Mark: Concluding contradiction and proving irrationality'
    ],
    commonTrap: 'Forgetting to explicitly state that "a and b are co-prime". Without the word "co-prime", examiners deduct 0.5 marks.',
    difficulty: 'Medium'
  },
  {
    id: 'pyq-math-1-2',
    chapterId: 'math-ch1',
    chapterName: 'Real Numbers',
    subject: 'Mathematics',
    topic: 'Fundamental Theorem of Arithmetic (HCF x LCM = a x b)',
    year: 2023,
    marks: 2,
    section: 'Section B (2M)',
    question: 'Find the HCF and LCM of 96 and 404 using prime factorisation method. Hence, verify that HCF × LCM = Product of the two numbers.',
    modelAnswer: '**Prime Factorisation:**\n- 96 = 2⁵ × 3\n- 404 = 2² × 101\n\n**1. HCF Calculation:**\n- HCF(96, 404) = 2² = 4\n\n**2. LCM Calculation:**\n- LCM(96, 404) = 2⁵ × 3 × 101 = 32 × 303 = 9696\n\n**3. Verification:**\n- HCF × LCM = 4 × 9696 = 38784\n- Product of numbers = 96 × 404 = 38784\n\n**Since HCF × LCM = 96 × 404 = 38784, the identity is verified.**',
    markingScheme: [
      '0.5 Mark: Correct prime factorisation of 96 and 404',
      '0.5 Mark: HCF = 4 and LCM = 9696',
      '1.0 Mark: Verification of HCF x LCM = a x b (38784 = 38784)'
    ],
    commonTrap: 'Calculation error in multiplying 32 x 303 for LCM. Double-check factor powers.',
    difficulty: 'Easy'
  },
  {
    id: 'pyq-math-1-3',
    chapterId: 'math-ch1',
    chapterName: 'Real Numbers',
    subject: 'Mathematics',
    topic: 'Prime Factorisation & Decimal Expansions',
    year: 2024,
    marks: 1,
    section: 'Section A (1M)',
    question: 'If two positive integers a and b are written as a = x³y² and b = xy³, where x, y are prime numbers, then HCF(a, b) is:\n(A) xy\n(B) xy²\n(C) x³y³\n(D) x²y²',
    options: [
      '(A) xy',
      '(B) xy²',
      '(C) x³y³',
      '(D) x²y²'
    ],
    correctOption: '(B) xy²',
    modelAnswer: '**Correct Option: (B) xy²**\n\n**Explanation:**\n- HCF of algebraic terms is the product of the smallest power of each common prime factor.\n- Common factor x: smallest power is x¹\n- Common factor y: smallest power is y²\n- Therefore, HCF(a, b) = x¹y² = xy².',
    markingScheme: [
      '1.0 Mark: Correct option (B) with smallest power rationale'
    ],
    commonTrap: 'Selecting LCM (x³y³) instead of HCF (xy²). LCM takes greatest power; HCF takes lowest power.',
    difficulty: 'Easy'
  },

  // ========================================================
  // MATHEMATICS: CH 2 - POLYNOMIALS
  // ========================================================
  {
    id: 'pyq-math-2-1',
    chapterId: 'math-ch2',
    chapterName: 'Polynomials',
    subject: 'Mathematics',
    topic: 'Relationship between Zeroes and Coefficients (α+β, αβ)',
    year: 2024,
    marks: 3,
    section: 'Section C (3M)',
    question: 'Find the zeroes of the quadratic polynomial p(x) = 6x² - 3 - 7x and verify the relationship between the zeroes and the coefficients.',
    modelAnswer: '**1. Rewriting in Standard Form (ax² + bx + c):**\np(x) = 6x² - 7x - 3\nHere a = 6, b = -7, c = -3.\n\n**2. Finding Zeroes by Splitting Middle Term:**\n6x² - 9x + 2x - 3 = 0\n3x(2x - 3) + 1(2x - 3) = 0\n(2x - 3)(3x + 1) = 0\nx = 3/2  or  x = -1/3\nTherefore, the zeroes are α = 3/2 and β = -1/3.\n\n**3. Verification of Relationships:**\n- **Sum of Zeroes:**\n  α + β = 3/2 + (-1/3) = (9 - 2)/6 = 7/6\n  -b/a = -(-7)/6 = 7/6  ⟹  α + β = -b/a (Verified)\n\n- **Product of Zeroes:**\n  αβ = (3/2) × (-1/3) = -3/6 = -1/2\n  c/a = -3/6 = -1/2  ⟹  αβ = c/a (Verified)',
    markingScheme: [
      '1.0 Mark: Rearranging to standard form and finding zeroes α = 3/2 and β = -1/3',
      '1.0 Mark: Verification of Sum of zeroes α + β = -b/a = 7/6',
      '1.0 Mark: Verification of Product of zeroes αβ = c/a = -1/2'
    ],
    commonTrap: 'Taking b = -3 and c = -7 directly without rearranging into standard form ax² + bx + c first!',
    difficulty: 'Medium'
  },
  {
    id: 'pyq-math-2-2',
    chapterId: 'math-ch2',
    chapterName: 'Polynomials',
    subject: 'Mathematics',
    topic: 'Relationship between Zeroes and Coefficients (α+β, αβ)',
    year: 2023,
    marks: 3,
    section: 'Section C (3M)',
    question: 'If α and β are the zeroes of the quadratic polynomial f(x) = 2x² - 5x + 7, find the value of:\n(i) 1/α + 1/β\n(ii) α² + β²',
    modelAnswer: '**Given:** f(x) = 2x² - 5x + 7 ⟹ a = 2, b = -5, c = 7\n- Sum of zeroes: α + β = -b/a = -(-5)/2 = 5/2\n- Product of zeroes: αβ = c/a = 7/2\n\n**(i) Value of 1/α + 1/β:**\n1/α + 1/β = (α + β)/(αβ) = (5/2)/(7/2) = 5/7\n\n**(ii) Value of α² + β²:**\nUsing identity (α + β)² = α² + β² + 2αβ:\nα² + β² = (α + β)² - 2αβ\nα² + β² = (5/2)² - 2(7/2) = 25/4 - 7 = (25 - 28)/4 = -3/4',
    markingScheme: [
      '1.0 Mark: Finding sum α+β = 5/2 and product αβ = 7/2',
      '1.0 Mark: Calculation of 1/α + 1/β = 5/7',
      '1.0 Mark: Calculation of α² + β² = -3/4'
    ],
    commonTrap: 'Trying to find actual values of α and β using quadratic formula. Always use symmetric algebraic identities!',
    difficulty: 'Medium'
  },

  // ========================================================
  // MATHEMATICS: CH 4 - QUADRATIC EQUATIONS
  // ========================================================
  {
    id: 'pyq-math-4-1',
    chapterId: 'math-ch4',
    chapterName: 'Quadratic Equations',
    subject: 'Mathematics',
    topic: 'Speed-Time & Upstream-Downstream Word Problems',
    year: 2023,
    marks: 5,
    section: 'Section D (5M)',
    question: 'A motor boat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than to return downstream to the same spot. Find the speed of the stream.',
    modelAnswer: '**Solution:**\n1. Let the speed of the stream be x km/h.\n2. Given speed of boat in still water = 18 km/h.\n   - Speed upstream = (18 - x) km/h\n   - Speed downstream = (18 + x) km/h\n\n3. Distance = 24 km.\n   - Time taken upstream t₁ = 24 / (18 - x)\n   - Time taken downstream t₂ = 24 / (18 + x)\n\n4. According to problem: t₁ - t₂ = 1\n   24/(18 - x) - 24/(18 + x) = 1\n   24 [ (18 + x - 18 + x) / (324 - x²) ] = 1\n   24 [ 2x / (324 - x²) ] = 1\n   48x = 324 - x²\n   x² + 48x - 324 = 0\n\n5. Solving by factorisation:\n   x² + 54x - 6x - 324 = 0\n   x(x + 54) - 6(x + 54) = 0\n   (x - 6)(x + 54) = 0\n   x = 6  or  x = -54\n\n6. Since speed cannot be negative, reject x = -54.\n\n**Therefore, the speed of the stream is 6 km/h.**',
    markingScheme: [
      '1.0 Mark: Forming speed expressions (18-x) and (18+x)',
      '1.5 Marks: Setting up fractional time equation t1 - t2 = 1',
      '1.5 Marks: Reducing to quadratic equation x² + 48x - 324 = 0',
      '1.0 Mark: Factoring and finding x = 6 km/h with negative root rejection'
    ],
    commonTrap: 'Writing upstream speed as (x - 18) instead of (18 - x). Boat speed must exceed stream speed!',
    difficulty: 'Hard'
  },
  {
    id: 'pyq-math-4-2',
    chapterId: 'math-ch4',
    chapterName: 'Quadratic Equations',
    subject: 'Mathematics',
    topic: 'Nature of Roots (Equal Roots: D = 0)',
    year: 2024,
    marks: 3,
    section: 'Section C (3M)',
    question: 'Find the values of k for which the quadratic equation (k - 12)x² + 2(k - 12)x + 2 = 0 has equal roots.',
    modelAnswer: '**Standard Form:** ax² + bx + c = 0\nHere a = (k - 12),  b = 2(k - 12),  c = 2\n\n**Condition for Equal Roots:**\nDiscriminant D = b² - 4ac = 0\n[2(k - 12)]² - 4(k - 12)(2) = 0\n4(k - 12)² - 8(k - 12) = 0\n\nFactoring out common term 4(k - 12):\n4(k - 12) [(k - 12) - 2] = 0\n4(k - 12)(k - 14) = 0\nk - 12 = 0 ⟹ k = 12   or   k - 14 = 0 ⟹ k = 14\n\n**Validation:**\nIf k = 12, the coefficient of x² becomes (k - 12) = 0, so the equation is no longer quadratic.\nTherefore, k = 12 is rejected.\n\n**Hence, the only valid value of k is 14.**',
    markingScheme: [
      '1.0 Mark: Applying D = b² - 4ac = 0',
      '1.0 Mark: Factoring and obtaining k = 12 and k = 14',
      '1.0 Mark: Rejecting k = 12 (as a ≠ 0 in quadratic) and concluding k = 14'
    ],
    commonTrap: 'Accepting k = 12 as a valid answer. If k = 12, the x² coefficient vanishes!',
    difficulty: 'Hard'
  },
  {
    id: 'pyq-math-4-3',
    chapterId: 'math-ch4',
    chapterName: 'Quadratic Equations',
    subject: 'Mathematics',
    topic: 'Work & Pipes Filling Tank Word Problems',
    year: 2022,
    marks: 5,
    section: 'Section D (5M)',
    question: 'Two water taps together can fill a tank in 9⅜ hours (75/8 hours). The tap of larger diameter takes 10 hours less than the smaller one to fill the tank separately. Find the time in which each tap can separately fill the tank.',
    modelAnswer: '**Solution:**\n1. Let the time taken by smaller tap to fill tank = x hours.\n2. Time taken by larger tap = (x - 10) hours.\n3. Combined time = 75/8 hours ⟹ Combined 1-hour rate = 8/75.\n\n4. Equation for 1-hour work:\n   1/x + 1/(x - 10) = 8/75\n   (x - 10 + x) / [x(x - 10)] = 8/75\n   (2x - 10) / (x² - 10x) = 8/75\n   75(2x - 10) = 8(x² - 10x)\n   150x - 750 = 8x² - 80x\n   8x² - 230x + 750 = 0\n   4x² - 115x + 375 = 0\n\n5. Factoring:\n   4x² - 100x - 15x + 375 = 0\n   4x(x - 25) - 15(x - 25) = 0\n   (x - 25)(4x - 15) = 0\n   x = 25  or  x = 15/4 = 3.75\n\n6. If x = 3.75, larger tap time = 3.75 - 10 = -6.25 hrs (impossible).\n   Therefore, x = 25.\n\n**Conclusion:**\n- Smaller tap takes **25 hours**.\n- Larger tap takes **25 - 10 = 15 hours**.',
    markingScheme: [
      '1.0 Mark: Expressing 1-hour filling rates',
      '1.5 Marks: Setting up equation 1/x + 1/(x-10) = 8/75',
      '1.5 Marks: Reducing to 4x² - 115x + 375 = 0 and solving',
      '1.0 Mark: Rejecting x = 3.75 and stating final answers (25 hrs and 15 hrs)'
    ],
    commonTrap: 'Inverting combined time 75/8 into 8/75 in 1-hour rate.',
    difficulty: 'Hard'
  },

  // ========================================================
  // MATHEMATICS: CH 5 - ARITHMETIC PROGRESSIONS (AP)
  // ========================================================
  {
    id: 'pyq-math-5-1',
    chapterId: 'math-ch5',
    chapterName: 'Arithmetic Progressions (AP)',
    subject: 'Mathematics',
    topic: 'nth Term of an AP (an = a + (n-1)d)',
    year: 2024,
    marks: 3,
    section: 'Section C (3M)',
    question: 'The sum of the 4th and 8th terms of an AP is 24 and the sum of the 6th and 10th terms is 44. Find the first three terms of the AP.',
    modelAnswer: '**Let the first term be a and common difference be d.**\n\n1. **First Condition (a₄ + a₈ = 24):**\n   (a + 3d) + (a + 7d) = 24\n   2a + 10d = 24  ⟹  a + 5d = 12  --- (1)\n\n2. **Second Condition (a₆ + a₁₀ = 44):**\n   (a + 5d) + (a + 9d) = 44\n   2a + 14d = 44  ⟹  a + 7d = 22  --- (2)\n\n3. **Subtracting (1) from (2):**\n   (a + 7d) - (a + 5d) = 22 - 12\n   2d = 10  ⟹  d = 5\n\n4. **Finding a:**\n   a + 5(5) = 12  ⟹  a + 25 = 12  ⟹  a = 12 - 25 = -13\n\n5. **First Three Terms:**\n   - a₁ = -13\n   - a₂ = -13 + 5 = -8\n   - a₃ = -8 + 5 = -3\n\n**The first three terms of the AP are -13, -8, -3.**',
    markingScheme: [
      '1.0 Mark: Forming equations a + 5d = 12 and a + 7d = 22',
      '1.0 Mark: Solving simultaneously to find d = 5 and a = -13',
      '1.0 Mark: Stating first three terms (-13, -8, -3)'
    ],
    commonTrap: 'Sign mistake when calculating a = 12 - 25 = -13.',
    difficulty: 'Medium'
  },
  {
    id: 'pyq-math-5-2',
    chapterId: 'math-ch5',
    chapterName: 'Arithmetic Progressions (AP)',
    subject: 'Mathematics',
    topic: 'Sum of First n Terms (Sn = n/2[2a + (n-1)d])',
    year: 2023,
    marks: 3,
    section: 'Section C (3M)',
    question: 'If the sum of first n terms of an AP is given by Sₙ = 3n² + 5n, find the nth term aₙ and hence find its 15th term.',
    modelAnswer: '**Method: Using formula aₙ = Sₙ - Sₙ₋₁**\n\n1. **Given:** Sₙ = 3n² + 5n\n\n2. **Finding Sₙ₋₁:**\n   Sₙ₋₁ = 3(n - 1)² + 5(n - 1)\n   Sₙ₋₁ = 3(n² - 2n + 1) + 5n - 5 = 3n² - 6n + 3 + 5n - 5 = 3n² - n - 2\n\n3. **Finding nth term aₙ:**\n   aₙ = Sₙ - Sₙ₋₁\n   aₙ = (3n² + 5n) - (3n² - n - 2)\n   aₙ = 3n² + 5n - 3n² + n + 2 = 6n + 2\n\n4. **Finding 15th Term (a₁₅):**\n   a₁₅ = 6(15) + 2 = 90 + 2 = 92\n\n**The general nth term is aₙ = 6n + 2 and the 15th term is 92.**',
    markingScheme: [
      '1.0 Mark: Setting up a_n = S_n - S_(n-1)',
      '1.0 Mark: Expanding and finding a_n = 6n + 2',
      '1.0 Mark: Calculating a_15 = 92'
    ],
    commonTrap: 'Confusing S1 with an. S1 = a1 = 8, but an must be calculated from Sn - S(n-1).',
    difficulty: 'Medium'
  },

  // ========================================================
  // MATHEMATICS: CH 8 - INTRODUCTION TO TRIGONOMETRY
  // ========================================================
  {
    id: 'pyq-math-8-1',
    chapterId: 'math-ch8',
    chapterName: 'Introduction to Trigonometry',
    subject: 'Mathematics',
    topic: 'Trigonometric Identities Proofs (sin²θ + cos²θ = 1)',
    year: 2024,
    marks: 3,
    section: 'Section C (3M)',
    question: 'Prove the following trigonometric identity:\n(sin θ - 2 sin³ θ) / (2 cos³ θ - cos θ) = tan θ',
    modelAnswer: '**Proof:**\nLHS = (sin θ - 2 sin³ θ) / (2 cos³ θ - cos θ)\n\n1. **Factor out sin θ from numerator and cos θ from denominator:**\n   LHS = [ sin θ (1 - 2 sin² θ) ] / [ cos θ (2 cos² θ - 1) ]\n\n2. **Substitute sin² θ = 1 - cos² θ in numerator:**\n   1 - 2 sin² θ = 1 - 2(1 - cos² θ) = 1 - 2 + 2 cos² θ = 2 cos² θ - 1\n\n3. **Substitute back into LHS:**\n   LHS = [ sin θ (2 cos² θ - 1) ] / [ cos θ (2 cos² θ - 1) ]\n\n4. **Cancel common term (2 cos² θ - 1):**\n   LHS = sin θ / cos θ = tan θ = RHS\n\n**Hence Proved.**',
    markingScheme: [
      '1.0 Mark: Factoring sin θ and cos θ',
      '1.5 Marks: Using identity sin² θ = 1 - cos² θ to transform (1 - 2sin² θ) to (2cos² θ - 1)',
      '0.5 Mark: Canceling common bracket and concluding tan θ = RHS'
    ],
    commonTrap: 'Converting to secant/cosecant. Simple factoring of sin θ / cos θ solves it cleanly!',
    difficulty: 'Medium'
  },
  {
    id: 'pyq-math-8-2',
    chapterId: 'math-ch8',
    chapterName: 'Introduction to Trigonometry',
    subject: 'Mathematics',
    topic: 'Trigonometric Identities Proofs (sin²θ + cos²θ = 1)',
    year: 2023,
    marks: 3,
    section: 'Section C (3M)',
    question: 'Prove that:\n[ cos A / (1 + sin A) ] + [ (1 + sin A) / cos A ] = 2 sec A',
    modelAnswer: '**Proof:**\nLHS = [ cos A / (1 + sin A) ] + [ (1 + sin A) / cos A ]\n\n1. **Take LCM (1 + sin A)(cos A):**\n   LHS = [ cos² A + (1 + sin A)² ] / [ (1 + sin A)(cos A) ]\n\n2. **Expand (1 + sin A)² = 1 + 2 sin A + sin² A:**\n   LHS = [ cos² A + 1 + 2 sin A + sin² A ] / [ (1 + sin A)(cos A) ]\n\n3. **Use identity sin² A + cos² A = 1:**\n   LHS = [ (sin² A + cos² A) + 1 + 2 sin A ] / [ (1 + sin A)(cos A) ]\n   LHS = [ 1 + 1 + 2 sin A ] / [ (1 + sin A)(cos A) ]\n   LHS = [ 2 + 2 sin A ] / [ (1 + sin A)(cos A) ]\n\n4. **Factor out 2 from numerator:**\n   LHS = [ 2(1 + sin A) ] / [ (1 + sin A)(cos A) ] = 2 / cos A = 2 sec A = RHS\n\n**Hence Proved.**',
    markingScheme: [
      '1.0 Mark: Taking LCM and expanding numerator',
      '1.0 Mark: Applying sin² A + cos² A = 1 to get 2(1 + sin A)',
      '1.0 Mark: Canceling (1 + sin A) and obtaining 2 sec A'
    ],
    commonTrap: 'Expanding (1 + sin A)² as 1 + sin² A (missing 2 sin A).',
    difficulty: 'Easy'
  },
  {
    id: 'pyq-math-8-3',
    chapterId: 'math-ch8',
    chapterName: 'Introduction to Trigonometry',
    subject: 'Mathematics',
    topic: 'Trigonometric Ratios & Specific Angles (0°-90°)',
    year: 2024,
    marks: 2,
    section: 'Section B (2M)',
    question: 'If tan(A + B) = √3 and tan(A - B) = 1/√3, where 0° < A + B ≤ 90° and A > B, find the values of acute angles A and B.',
    modelAnswer: '**Solution:**\n1. tan(A + B) = √3\n   Since tan 60° = √3, we have:\n   A + B = 60°  --- (1)\n\n2. tan(A - B) = 1/√3\n   Since tan 30° = 1/√3, we have:\n   A - B = 30°  --- (2)\n\n3. **Adding (1) and (2):**\n   (A + B) + (A - B) = 60° + 30°\n   2A = 90°  ⟹  A = 45°\n\n4. **Finding B:**\n   45° + B = 60°  ⟹  B = 60° - 45° = 15°\n\n**Therefore, A = 45° and B = 15°.**',
    markingScheme: [
      '0.5 Mark: Writing A + B = 60° and A - B = 30°',
      '1.0 Mark: Solving to find A = 45°',
      '0.5 Mark: Finding B = 15°'
    ],
    commonTrap: 'Writing tan(A+B) as tan A + tan B.',
    difficulty: 'Easy'
  },

  // ========================================================
  // MATHEMATICS: CH 9 - HEIGHTS & DISTANCES
  // ========================================================
  {
    id: 'pyq-math-9-1',
    chapterId: 'math-ch9',
    chapterName: 'Some Applications of Trigonometry (Heights & Distances)',
    subject: 'Mathematics',
    topic: 'Heights & Distances Case Study Questions (Balloons, Towers)',
    year: 2023,
    marks: 5,
    section: 'Section D (5M)',
    question: 'A 1.2 m tall girl spots a balloon moving with the wind in a horizontal line at a height of 88.2 m from the ground. The angle of elevation of the balloon from the eyes of the girl at any instant is 60°. After some time, the angle of elevation reduces to 30°. Find the distance travelled by the balloon during the interval. (Use √3 = 1.732)',
    modelAnswer: '**Step-by-step Solution:**\n\n1. **Height of Balloon above Eye Level:**\n   Effective Height h = 88.2 - 1.2 = 87 m\n\n2. **In first right triangle (Initial Position, angle = 60°):**\n   tan 60° = Height / x₁\n   √3 = 87 / x₁  ⟹  x₁ = 87 / √3 = 87√3 / 3 = 29√3 m\n\n3. **In second right triangle (Final Position, angle = 30°):**\n   tan 30° = Height / x₂\n   1/√3 = 87 / x₂  ⟹  x₂ = 87√3 m\n\n4. **Distance Travelled by Balloon (d = x₂ - x₁):**\n   d = 87√3 - 29√3 = (87 - 29)√3 = 58√3 m\n   d = 58 × 1.732 = 100.456 m\n\n**The distance travelled by the balloon is 58√3 m (or 100.46 m).**',
    markingScheme: [
      '1.0 Mark: Subtracting girl\'s height h = 88.2 - 1.2 = 87 m with diagram',
      '1.5 Marks: Using tan 60° to find initial distance x1 = 29√3 m',
      '1.5 Marks: Using tan 30° to find final distance x2 = 87√3 m',
      '1.0 Mark: Calculating distance traveled d = 58√3 m'
    ],
    commonTrap: 'Using total height 88.2 m directly without subtracting girl\'s height 1.2 m.',
    difficulty: 'Hard'
  },
  {
    id: 'pyq-math-9-2',
    chapterId: 'math-ch9',
    chapterName: 'Some Applications of Trigonometry (Heights & Distances)',
    subject: 'Mathematics',
    topic: 'Angle of Depression Double Triangle Problems',
    year: 2024,
    marks: 5,
    section: 'Section D (5M)',
    question: 'From the top of a 7 m high building, the angle of elevation of the top of a cable tower is 60° and the angle of depression of its foot is 45°. Determine the height of the cable tower. (Use √3 = 1.732)',
    modelAnswer: '**Solution:**\n1. Let the building be AB = 7 m and cable tower be CD = H m.\n2. Distance between building and tower = BD = x.\n3. Horizontal line from top of building meets tower at E, so ED = AB = 7 m and AE = BD = x.\n4. Tower top segment CE = H - 7.\n\n5. **In right ΔABD (Angle of depression = 45°):**\n   tan 45° = AB / BD  ⟹  1 = 7 / x  ⟹  x = 7 m\n\n6. **In right ΔAEC (Angle of elevation = 60°):**\n   tan 60° = CE / AE\n   √3 = (H - 7) / x = (H - 7) / 7\n   H - 7 = 7√3  ⟹  H = 7√3 + 7 = 7(√3 + 1) m\n\n7. **Numerical Value:**\n   H = 7(1.732 + 1) = 7(2.732) = 19.124 m\n\n**The height of the cable tower is 7(√3 + 1) m (or 19.12 m).**',
    markingScheme: [
      '1.0 Mark: Neat geometric sketch with angles labeled',
      '1.5 Marks: Using tan 45° to find horizontal distance x = 7 m',
      '1.5 Marks: Using tan 60° to set up H - 7 = 7√3',
      '1.0 Mark: Final height H = 7(√3 + 1) m'
    ],
    commonTrap: 'Confusing angle of elevation with depression.',
    difficulty: 'Medium'
  },

  // ========================================================
  // MATHEMATICS: CH 10 - CIRCLES
  // ========================================================
  {
    id: 'pyq-math-10-1',
    chapterId: 'math-ch10',
    chapterName: 'Circles',
    subject: 'Mathematics',
    topic: 'Theorem 10.2: Tangent Lengths from External Point Equal',
    year: 2024,
    marks: 3,
    section: 'Section C (3M)',
    question: 'Prove that the lengths of tangents drawn from an external point to a circle are equal (Theorem 10.2).',
    modelAnswer: '**Theorem Proof:**\n\n1. **Given:** A circle with centre O, a point P lying outside the circle, and two tangents PQ and PR on the circle from P touching at Q and R respectively.\n\n2. **To Prove:** PQ = PR\n\n3. **Construction:** Join OP, OQ, and OR.\n\n4. **Proof:**\n   - A tangent at any point of a circle is perpendicular to the radius through the point of contact.\n   - Therefore, ∠OQP = 90° and ∠ORP = 90°.\n\n   Now, in right-angled triangles ΔOQP and ΔORP:\n   - ∠OQP = ∠ORP = 90° (Each 90°)\n   - OP = OP (Common hypotenuse)\n   - OQ = OR (Radii of the same circle)\n\n   Therefore, by **RHS Congruence Criterion**:\n   ΔOQP ≅ ΔORP\n\n   By Corresponding Parts of Congruent Triangles (CPCT):\n   **PQ = PR**\n\n**Hence Proved.**',
    markingScheme: [
      '0.5 Mark: Given, To Prove, and Construction statements with neat diagram',
      '2.0 Marks: Applying RHS congruence on ΔOQP and ΔORP',
      '0.5 Mark: Concluding PQ = PR by CPCT'
    ],
    commonTrap: 'Using SSS congruence without first proving angle 90°. RHS congruence using hypotenuse OP and radius is standard.',
    difficulty: 'Easy'
  },
  {
    id: 'pyq-math-10-2',
    chapterId: 'math-ch10',
    chapterName: 'Circles',
    subject: 'Mathematics',
    topic: 'Circumscribing Quadrilaterals & Triangles Proofs',
    year: 2023,
    marks: 3,
    section: 'Section C (3M)',
    question: 'Prove that the parallelogram circumscribing a circle is a rhombus.',
    modelAnswer: '**Proof:**\n1. **Given:** A parallelogram ABCD circumscribing a circle touching its sides AB, BC, CD, DA at points P, Q, R, S respectively.\n2. **To Prove:** ABCD is a rhombus (AB = BC = CD = DA).\n\n3. **Tangents from External Points are Equal:**\n   - From A: AP = AS  --- (1)\n   - From B: BP = BQ  --- (2)\n   - From C: CR = CQ  --- (3)\n   - From D: DR = DS  --- (4)\n\n4. **Adding equations (1), (2), (3), and (4):**\n   (AP + BP) + (CR + DR) = (AS + DS) + (BQ + CQ)\n   AB + CD = AD + BC  --- (5)\n\n5. **Using properties of Parallelogram (AB = CD and AD = BC):**\n   AB + AB = BC + BC\n   2AB = 2BC  ⟹  AB = BC\n\n6. Since opposite sides are equal (AB = CD, BC = AD) and adjacent sides are equal (AB = BC):\n   AB = BC = CD = DA\n\n**Therefore, ABCD is a rhombus. (Hence Proved)**',
    markingScheme: [
      '1.0 Mark: Setting up 4 tangent equations AP=AS, BP=BQ, CR=CQ, DR=DS',
      '1.0 Mark: Adding equations to prove AB + CD = AD + BC',
      '1.0 Mark: Applying parallelogram properties to conclude AB = BC = CD = DA (Rhombus)'
    ],
    commonTrap: 'Adding equations in wrong order so that sides cannot be paired into AB and CD.',
    difficulty: 'Medium'
  },

  // ========================================================
  // SCIENCE: BIOLOGY (LIFE PROCESSES)
  // ========================================================
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
    modelAnswer: '**(a) Diagram of Human Heart:**\nStudents must draw the standard 4-chambered sectional view showing Right Atrium, Left Atrium, Right Ventricle, Left Ventricle with the thick muscular wall on the left side, Aorta curving upwards, Pulmonary Artery branching to lungs, and the central Interventricular Septum.\n\n**(b) Necessity of Double Circulation:**\n1. Humans are warm-blooded (endothermic) organisms and require a constant body temperature (37°C), which demands a high amount of cellular energy.\n2. Complete separation of oxygenated blood (left chambers) and deoxygenated blood (right chambers) prevents mixing.\n3. This ensures an extremely efficient supply of high-pressure oxygen to all body tissues for rapid aerobic cellular respiration.',
    markingScheme: [
      '1.5 Marks: Accurate sectional diagram of heart with 4 chambers',
      '2.0 Marks: Correct labeling of Aorta (0.5M), Pulmonary Artery (0.5M), Left Ventricle (0.5M), Septum (0.5M)',
      '1.5 Marks: Reason for double circulation (High energy requirement + zero mixing of oxygenated/deoxygenated blood)'
    ],
    commonTrap: 'Drawing the left ventricle wall with the same thickness as the right ventricle. Left ventricle must be visibly 3x thicker!',
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
    modelAnswer: '**Breakdown of Glucose (6-Carbon Molecule) in Cytoplasm ⟹ Pyruvate (3-Carbon Molecule) + Energy**\n\n1. **Absence of Oxygen (Anaerobic / Yeast Fermentation):**\n   - *Site:* Cytoplasm of Yeast\n   - *Products:* Ethanol (2-Carbon) + CO₂ + Energy (2 ATP)\n\n2. **Lack of Oxygen (Muscle Cells during heavy exercise):**\n   - *Site:* Human Skeletal Muscle Cells\n   - *Products:* Lactic Acid (3-Carbon) + Energy (Causes muscle cramps)\n\n3. **Presence of Oxygen (Aerobic Respiration):**\n   - *Site:* Mitochondria\n   - *Products:* 6CO₂ + 6H₂O + Energy (36-38 ATP)',
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
    modelAnswer: '**1. Structure of Nephron:**\n- **Bowman\'s Capsule:** Cup-like structure enclosing a knot of capillaries called **Glomerulus**.\n- **Tubular Part (PCT, Loop of Henle, DCT):** Highly coiled tube wrapped with blood capillaries.\n- **Collecting Duct:** Collects concentrated urine from multiple nephrons.\n\n**2. Steps of Urine Formation:**\n- **Ultrafiltration:** Blood is filtered under high pressure in the Glomerulus. Glucose, amino acids, salts, and excess water enter Bowman\'s capsule as initial filtrate.\n- **Selective Reabsorption:** As filtrate flows through the tubule, essential substances (all glucose, amino acids, most salts & water) are reabsorbed back into the peritubular capillaries.\n- **Tubular Secretion:** Urea, uric acid, and excess ions are secreted into the collecting duct to form urine.\n\n**3. Regulation:**\nRegulated by the amount of excess water in the body and dissolved nitrogenous waste to be excreted (controlled by Anti-Diuretic Hormone - ADH).',
    markingScheme: [
      '1.0 Mark: Nephron structural parts (Glomerulus, Bowman\'s cup, Tubule, Collecting duct)',
      '1.0 Mark: 3 stages of urine formation (Ultrafiltration, Selective reabsorption, Secretion)',
      '1.0 Mark: Regulation factor (Water intake and nitrogenous waste level)'
    ],
    commonTrap: 'Confusing filtration with selective reabsorption.',
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
    modelAnswer: '**Correct Option: (C) Amount of water in guard cells**\n\n**Explanation:**\nWhen water flows into the guard cells, they become turgid and swell, causing their curved inner thick walls to pull apart and OPEN the stomatal pore. When guard cells lose water, they become flaccid and shrink, CLOSING the pore.',
    markingScheme: [
      '1.0 Mark: Correct option (C) with scientific reason'
    ],
    commonTrap: 'Selecting temperature or sunlight.',
    difficulty: 'Easy'
  },

  // ========================================================
  // SCIENCE: PHYSICS (LIGHT & ELECTRICITY)
  // ========================================================
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
    modelAnswer: '**(a) Ray Diagram (Case 6 of Concave Mirror):**\n- Principal axis with C, F, P.\n- Object AB between P and F.\n- Ray 1 parallel to axis reflects through F.\n- Ray 2 passing through Center of Curvature C reflects back along same path.\n- The two reflected rays diverge in front of mirror, but their backward dotted extensions intersect behind the mirror at A\'B\'.\n\n**Image Characteristics:**\n1. **Position:** Behind the mirror\n2. **Nature:** Virtual and Erect\n3. **Size:** Magnified / Enlarged\n\n**(b) Numerical Calculation:**\n- Object distance u = -10 cm\n- Real image magnification m = -3\n- We know m = -v/u ⟹ -3 = -v/(-10) ⟹ v = -30 cm\n- **Image Location:** 30 cm in front of the concave mirror.\n\n**Focal Length Calculation:**\n1/f = 1/v + 1/u = 1/(-30) + 1/(-10) = (-1 - 3)/30 = -4/30 = -2/15\nf = -15/2 = -7.5 cm\n**Focal length of mirror is 7.5 cm (Concave mirror has negative focal length).**',
    markingScheme: [
      '2.0 Marks: Accurate ray diagram with arrows showing divergence and virtual image behind mirror',
      '1.0 Mark: 3 image characteristics (Behind mirror, Virtual & Erect, Magnified)',
      '1.0 Mark: Correct calculation of v = -30 cm with formula',
      '1.0 Mark: Correct calculation of f = -7.5 cm with negative sign'
    ],
    commonTrap: 'Forgetting arrows on light rays or using positive magnification for real image.',
    difficulty: 'Hard'
  },
  {
    id: 'pyq-phy-11-1',
    chapterId: 'phy-ch11',
    chapterName: 'Electricity',
    subject: 'Science (Physics)',
    topic: 'Resistors in Parallel (1/Rp = 1/R1 + 1/R2 + 1/R3)',
    year: 2024,
    marks: 3,
    section: 'Section C (3M)',
    question: 'Derive an expression for the equivalent resistance of three resistors R1, R2, R3 connected in parallel across a battery of potential difference V. State two advantages of connecting electrical appliances in parallel rather than in series in a domestic circuit.',
    modelAnswer: '**Derivation of Equivalent Resistance in Parallel:**\n1. In a parallel circuit, the potential difference V across each resistor is the same.\n2. The total current I divides into branches: I = I₁ + I₂ + I₃\n3. According to Ohm\'s law, I₁ = V/R₁, I₂ = V/R₂, I₃ = V/R₃, and I = V/Rₚ\n4. Substituting these into the current equation:\n   V/Rₚ = V/R₁ + V/R₂ + V/R₃\n5. Dividing both sides by V:\n   1/Rₚ = 1/R₁ + 1/R₂ + 1/R₃\n\n**Advantages of Parallel Domestic Circuits:**\n1. **Independent Operation:** If one appliance fails or is turned off, other appliances continue working uninterrupted.\n2. **Equal Voltage:** Each appliance receives the full rated voltage (220 V in India).\n3. **Lower Total Resistance:** Equivalent resistance decreases, allowing high-power appliances to draw adequate current.',
    markingScheme: [
      '2.0 Marks: Step-by-step mathematical derivation with circuit explanation',
      '1.0 Mark: Any two valid advantages of parallel domestic wiring'
    ],
    commonTrap: 'Assuming current is constant in parallel. Potential difference is constant (V), while current divides.',
    difficulty: 'Medium'
  },

  // ========================================================
  // SCIENCE: CHEMISTRY (REACTIONS & CARBON)
  // ========================================================
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
    modelAnswer: '**(a) Gases Collected:**\n- **Cathode (Negative electrode):** **Hydrogen gas (H₂)**\n- **Anode (Positive electrode):** **Oxygen gas (O₂)**\n\n**(b) Reason for 2:1 Volume Ratio:**\nWater (H₂O) consists of 2 parts of hydrogen and 1 part of oxygen by volume. On decomposition, 2 moles of H₂ gas are liberated for every 1 mole of O₂ gas.\n\n**(c) Balanced Chemical Equation:**\n2H₂O(l) ⟶ 2H₂(g) ↑ + O₂(g) ↑',
    markingScheme: [
      '1.0 Mark: Cathode = Hydrogen (0.5M), Anode = Oxygen (0.5M)',
      '1.0 Mark: Explanation of 2:1 molar stoichiometry in H2O molecule',
      '1.0 Mark: Balanced chemical equation with state symbols'
    ],
    commonTrap: 'Reversing cathode and anode. Hydrogen is collected at Cathode!',
    difficulty: 'Easy'
  },
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
    modelAnswer: '**(a) Chemical Nature & Micelle Mechanism:**\n- **Definition:** Soaps are sodium or potassium salts of long-chain fatty acids (e.g. Sodium stearate C₁₇H₃₅COO⁻Na⁺).\n- **Structure of Soap Molecule:**\n  1. **Hydrophobic Tail (Hydrocarbon chain):** Water-repelling, dissolves in oily dirt.\n  2. **Hydrophilic Head (-COO⁻Na⁺):** Water-loving, interacts with water.\n\n- **Micelle Formation:**\n  When soap is dissolved in water, the hydrophobic tails cluster radially inwards attaching to the central oil dirt droplet, while the hydrophilic ionic heads point outwards into water. This spherical cluster is called a **Micelle**.\n\n- **Cleansing Action:**\n  The oily dirt is trapped inside the micelle core. On agitating with water, the micelle remains suspended as an emulsion and is rinsed away.\n\n**(b) Soaps in Hard Water:**\n- Hard water contains dissolved Ca²⁺ and Mg²⁺ ions which react with soap to form an insoluble white precipitate called **Scum**, wasting soap.\n- **Detergents** are sodium salts of sulphonic acids or ammonium salts with chlorides. Their charged ends do not form insoluble precipitates with Ca²⁺/Mg²⁺, hence they form rich lather even in hard water.',
    markingScheme: [
      '1.0 Mark: Chemical definition of soap + two ends (Hydrophobic tail & Hydrophilic head)',
      '2.0 Marks: Micelle formation diagram + explanation of oil trapping',
      '1.0 Mark: Reason for scum formation in hard water with Ca2+/Mg2+',
      '1.0 Mark: Why synthetic detergents work in hard water'
    ],
    commonTrap: 'Drawing the hydrophilic ionic head inside the oil. Ionic heads MUST face outwards towards water!',
    difficulty: 'Hard'
  }
];
