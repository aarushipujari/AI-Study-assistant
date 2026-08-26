export interface NCERTQuestion {
  id: string;
  chapterId: string;
  chapterName: string;
  subject: string;
  category: 'Solved Example' | 'In-Text Question (Blue Box)' | 'Chapter-End Exercise';
  exerciseName: string; // e.g. 'Exercise 1.1', 'Example 3', 'In-Text Page 102'
  questionNumber: string;
  question: string;
  options?: string[];
  correctOption?: string;
  stepByStepSolution: string;
  keyConceptsApplied: string[];
  boardImportanceTag: 'Extremely High (Repeat Example)' | 'High' | 'Fundamental Concept';
}

export const NCERT_SOLUTIONS_DATA: NCERTQuestion[] = [
  // ========================================================
  // MATHEMATICS: CH 1 - REAL NUMBERS
  // ========================================================
  {
    id: 'ncert-math-1-ex1',
    chapterId: 'math-ch1',
    chapterName: 'Real Numbers',
    subject: 'Mathematics',
    category: 'Solved Example',
    exerciseName: 'Example 5 (NCERT Page 9)',
    questionNumber: 'Example 5',
    question: 'Consider the numbers 4ⁿ, where n is a natural number. Check whether there is any value of n for which 4ⁿ ends with the digit zero.',
    stepByStepSolution: `**Step-by-step Solution:**\n\n1. **Divisibility Condition:**\n   If any number ends with the digit zero, it must be divisible by 10, which means it must have both 2 and 5 as prime factors in its prime factorisation (since 10 = 2 × 5).\n\n2. **Prime Factorisation of 4ⁿ:**\n   4ⁿ = (2²)ⁿ = 2²ⁿ\n\n3. **Analysis:**\n   The only prime factor in the prime factorisation of 4ⁿ is 2. There is no factor of 5 in the prime factorisation of 4ⁿ for any natural number n.\n\n4. **Uniqueness by Fundamental Theorem of Arithmetic:**\n   The Fundamental Theorem of Arithmetic guarantees that the prime factorisation of any composite number is unique.\n\n**Conclusion:**\nTherefore, there is no natural number n for which 4ⁿ ends with the digit zero.`,
    keyConceptsApplied: ['Fundamental Theorem of Arithmetic', 'Prime Factorisation', 'Divisibility Rule of 10 (2 × 5)'],
    boardImportanceTag: 'Extremely High (Repeat Example)'
  },
  {
    id: 'ncert-math-1-ex2',
    chapterId: 'math-ch1',
    chapterName: 'Real Numbers',
    subject: 'Mathematics',
    category: 'Chapter-End Exercise',
    exerciseName: 'Exercise 1.1',
    questionNumber: 'Q3',
    question: 'An army contingent of 616 members is to march behind an army band of 32 members in a parade. The two groups are to march in the same number of columns. What is the maximum number of columns in which they can march?',
    stepByStepSolution: `**Step-by-step Solution:**\n\n1. **Understanding the Problem:**\n   The maximum number of columns is given by the Highest Common Factor of the number of contingent members (616) and band members (32), i.e., HCF(616, 32).\n\n2. **Prime Factorisation Method:**\n   - 616 = 2³ × 7 × 11 = 8 × 77\n   - 32 = 2⁵ = 32\n\n3. **Finding HCF:**\n   Common prime factor is 2, with smallest power 2³ = 8.\n   HCF(616, 32) = 8\n\n**Conclusion:**\nTherefore, the maximum number of columns in which they can march is **8 columns**.`,
    keyConceptsApplied: ['HCF Word Problems', 'Prime Factorisation'],
    boardImportanceTag: 'High'
  },
  {
    id: 'ncert-math-1-ex3',
    chapterId: 'math-ch1',
    chapterName: 'Real Numbers',
    subject: 'Mathematics',
    category: 'Chapter-End Exercise',
    exerciseName: 'Exercise 1.2',
    questionNumber: 'Q2',
    question: 'Prove that 3 + 2√5 is irrational.',
    stepByStepSolution: `**Proof by Contradiction:**\n\n1. Let us assume, to the contrary, that 3 + 2√5 is rational.\n2. Therefore, we can find co-prime integers a and b (b ≠ 0) such that:\n   3 + 2√5 = a/b\n\n3. Rearranging to isolate √5:\n   2√5 = (a/b) - 3 = (a - 3b)/b\n   √5 = (a - 3b) / (2b)\n\n4. Since a and b are integers, (a - 3b)/(2b) is a rational number.\n5. This implies that √5 is also a rational number.\n\n6. But this contradicts the known fact that √5 is irrational.\n7. This contradiction has arisen because of our incorrect assumption that 3 + 2√5 is rational.\n\n**Hence, 3 + 2√5 is irrational. (Proved)**`,
    keyConceptsApplied: ['Linear Combination of Irrationals', 'Proof by Contradiction'],
    boardImportanceTag: 'Extremely High (Repeat Example)'
  },

  // ========================================================
  // MATHEMATICS: CH 4 - QUADRATIC EQUATIONS
  // ========================================================
  {
    id: 'ncert-math-4-ex1',
    chapterId: 'math-ch4',
    chapterName: 'Quadratic Equations',
    subject: 'Mathematics',
    category: 'Solved Example',
    exerciseName: 'Example 14 (NCERT Page 87)',
    questionNumber: 'Example 14',
    question: 'Find the roots of the following equation: x + 1/x = 3, (x ≠ 0).',
    stepByStepSolution: `**Step-by-step Solution:**\n\n1. **Given:** x + 1/x = 3\n2. Multiplying entire equation by x (since x ≠ 0):\n   x² + 1 = 3x\n   x² - 3x + 1 = 0\n\n3. **Comparing with standard form ax² + bx + c = 0:**\n   a = 1, b = -3, c = 1\n\n4. **Discriminant:**\n   D = b² - 4ac = (-3)² - 4(1)(1) = 9 - 4 = 5 > 0 (Two distinct real roots exist)\n\n5. **Applying Quadratic Formula:**\n   x = [-b ± √D] / (2a)\n   x = [-(-3) ± √5] / [2(1)]\n   x = (3 ± √5) / 2\n\n**Roots are x = (3 + √5)/2 and x = (3 - √5)/2.**`,
    keyConceptsApplied: ['Quadratic Formula', 'Algebraic Simplification'],
    boardImportanceTag: 'High'
  },
  {
    id: 'ncert-math-4-ex2',
    chapterId: 'math-ch4',
    chapterName: 'Quadratic Equations',
    subject: 'Mathematics',
    category: 'Chapter-End Exercise',
    exerciseName: 'Exercise 4.3',
    questionNumber: 'Q7',
    question: 'The difference of squares of two numbers is 180. The square of the smaller number is 8 times the larger number. Find the two numbers.',
    stepByStepSolution: `**Step-by-step Solution:**\n\n1. Let the larger number be x and smaller number be y.\n2. According to first condition: x² - y² = 180  --- (1)\n3. According to second condition: y² = 8x  --- (2)\n\n4. Substituting (2) into (1):\n   x² - 8x = 180\n   x² - 8x - 180 = 0\n\n5. **Factorising:**\n   x² - 18x + 10x - 180 = 0\n   x(x - 18) + 10(x - 18) = 0\n   (x - 18)(x + 10) = 0\n   x = 18  or  x = -10\n\n6. **Case 1 (When x = 18):**\n   y² = 8(18) = 144 ⟹ y = ±√144 = ±12\n\n7. **Case 2 (When x = -10):**\n   y² = 8(-10) = -80 (Square of a real number cannot be negative, so x = -10 is rejected).\n\n**The numbers are (18, 12) or (18, -12).**`,
    keyConceptsApplied: ['Word Problems on Quadratic Equations', 'Factorisation Method'],
    boardImportanceTag: 'Extremely High (Repeat Example)'
  },

  // ========================================================
  // MATHEMATICS: CH 8 - TRIGONOMETRY
  // ========================================================
  {
    id: 'ncert-math-8-ex1',
    chapterId: 'math-ch8',
    chapterName: 'Introduction to Trigonometry',
    subject: 'Mathematics',
    category: 'Solved Example',
    exerciseName: 'Example 15 (NCERT Page 192)',
    questionNumber: 'Example 15',
    question: 'Prove that: (sin θ - cos θ + 1) / (sin θ + cos θ - 1) = 1 / (sec θ - tan θ), using the identity sec² θ = 1 + tan² θ.',
    stepByStepSolution: `**Step-by-step Solution:**\n\n1. **LHS:** (sin θ - cos θ + 1) / (sin θ + cos θ - 1)\n\n2. **Dividing numerator and denominator by cos θ:**\n   = (tan θ - 1 + sec θ) / (tan θ + 1 - sec θ)\n   = [(tan θ + sec θ) - 1] / [(tan θ - sec θ) + 1]\n\n3. **Using 1 = sec² θ - tan² θ = (sec θ - tan θ)(sec θ + tan θ) in numerator:**\n   = [(sec θ + tan θ) - (sec θ - tan θ)(sec θ + tan θ)] / [(tan θ - sec θ) + 1]\n   = [(sec θ + tan θ) {1 - (sec θ - tan θ)}] / [(tan θ - sec θ + 1)]\n   = [(sec θ + tan θ) (1 - sec θ + tan θ)] / (tan θ - sec θ + 1)\n   = sec θ + tan θ\n\n4. **Multiplying and dividing by (sec θ - tan θ):**\n   = [(sec θ + tan θ)(sec θ - tan θ)] / (sec θ - tan θ)\n   = (sec² θ - tan² θ) / (sec θ - tan θ)\n   = 1 / (sec θ - tan θ) = RHS\n\n**Hence Proved.**`,
    keyConceptsApplied: ['Trigonometric Identities', 'Algebraic Rationalisation'],
    boardImportanceTag: 'Extremely High (Repeat Example)'
  },
  {
    id: 'ncert-math-8-ex2',
    chapterId: 'math-ch8',
    chapterName: 'Introduction to Trigonometry',
    subject: 'Mathematics',
    category: 'Chapter-End Exercise',
    exerciseName: 'Exercise 8.4',
    questionNumber: 'Q5 (vi)',
    question: 'Prove that: √[(1 + sin A) / (1 - sin A)] = sec A + tan A.',
    stepByStepSolution: `**Proof:**\n\n1. **LHS:** √[(1 + sin A) / (1 - sin A)]\n\n2. **Multiplying numerator and denominator inside root by (1 + sin A):**\n   = √[ (1 + sin A)(1 + sin A) / ((1 - sin A)(1 + sin A)) ]\n   = √[ (1 + sin A)² / (1 - sin² A) ]\n\n3. **Using identity 1 - sin² A = cos² A:**\n   = √[ (1 + sin A)² / cos² A ]\n   = (1 + sin A) / cos A\n\n4. **Separating terms:**\n   = (1 / cos A) + (sin A / cos A)\n   = sec A + tan A = RHS\n\n**Hence Proved.**`,
    keyConceptsApplied: ['Conjugate Rationalisation', 'Fundamental Trigonometric Identity'],
    boardImportanceTag: 'Extremely High (Repeat Example)'
  },

  // ========================================================
  // SCIENCE: BIOLOGY - LIFE PROCESSES
  // ========================================================
  {
    id: 'ncert-bio-5-intext1',
    chapterId: 'bio-ch5',
    chapterName: 'Life Processes',
    subject: 'Science (Biology)',
    category: 'In-Text Question (Blue Box)',
    exerciseName: 'In-Text Page 95',
    questionNumber: 'Q2',
    question: 'What are the necessary conditions for autotrophic nutrition and what are its by-products?',
    stepByStepSolution: `**Answer:**\n\n1. **Necessary Conditions for Autotrophic Nutrition (Photosynthesis):**\n   - **Chlorophyll:** Green pigment in chloroplasts to absorb light energy.\n   - **Sunlight:** Energy source to split water molecules.\n   - **Carbon Dioxide (CO₂):** Taken from atmosphere through stomatal pores for reduction into carbohydrates.\n   - **Water (H₂O):** Absorbed from soil by roots along with minerals (N, P, Fe, Mg).\n\n2. **Balanced Chemical Reaction:**\n   6CO₂ + 12H₂O ⟶(Sunlight / Chlorophyll)⟶ C₆H₁₂O₆ + 6O₂ + 6H₂O\n\n3. **By-Products:**\n   - **Oxygen (O₂):** Released into atmosphere as gas.\n   - **Water (H₂O):** Released through transpiration.\n   - *(Main product is Glucose stored as Starch in plant tissues)*.`,
    keyConceptsApplied: ['Photosynthesis Equation', 'Stomata Gas Exchange', 'Chloroplast Photolysis'],
    boardImportanceTag: 'High'
  },
  {
    id: 'ncert-bio-5-ex1',
    chapterId: 'bio-ch5',
    chapterName: 'Life Processes',
    subject: 'Science (Biology)',
    category: 'Chapter-End Exercise',
    exerciseName: 'Exercise Q6 (Page 113)',
    questionNumber: 'Q6',
    question: 'What is the role of the acid (HCl) in our stomach?',
    stepByStepSolution: `**Role of Hydrochloric Acid (HCl) in Stomach:**\n\n1. **Creates Acidic Medium (pH ~1.5 to 2.5):**\n   HCl provides the acidic environment necessary for the inactive enzyme **pepsinogen** to get activated into the active proteolytic enzyme **pepsin**.\n\n2. **Germicidal Action:**\n   The strong acid kills harmful bacteria and microorganisms ingested along with food.\n\n3. **Softening Food:**\n   Helps in breaking down tough food fibers for enzymatic digestion.\n\n*(Note: The stomach wall is protected from HCl corrosion by the secretion of Mucus by gastric goblet cells).*`,
    keyConceptsApplied: ['Gastric Secretions', 'Pepsin Activation', 'Mucus Protection'],
    boardImportanceTag: 'High'
  },
  {
    id: 'ncert-bio-5-ex2',
    chapterId: 'bio-ch5',
    chapterName: 'Life Processes',
    subject: 'Science (Biology)',
    category: 'Chapter-End Exercise',
    exerciseName: 'Exercise Q11 (Page 113)',
    questionNumber: 'Q11',
    question: 'What are the differences between the transport of materials in xylem and phloem?',
    stepByStepSolution: `**Comparison between Xylem and Phloem Transport:**\n\n| Feature | Xylem | Phloem |\n| :--- | :--- | :--- |\n| **Substance Transported** | Water and dissolved minerals | Soluble food products (Sucrose), amino acids, hormones |\n| **Direction of Flow** | **Unidirectional** (Only upwards from roots to leaves) | **Bidirectional** (Upwards and downwards from leaves/storage organs) |\n| **Tissue Composition** | Tracheids, Vessels (mostly dead cells) | Sieve tubes, Companion cells (living cells) |\n| **Driving Mechanism** | Physical forces (Transpiration pull and root pressure; **no ATP used**) | Active transport (**utilises energy in the form of ATP** creating osmotic pressure) |\n| **Process Name** | Ascent of Sap | **Translocation** |`,
    keyConceptsApplied: ['Ascent of Sap vs Translocation', 'ATP Consumption', 'Xylem/Phloem Anatomy'],
    boardImportanceTag: 'Extremely High (Repeat Example)'
  },

  // ========================================================
  // SCIENCE: PHYSICS - LIGHT & REFRACTION
  // ========================================================
  {
    id: 'ncert-phy-9-ex1',
    chapterId: 'phy-ch9',
    chapterName: 'Light – Reflection and Refraction',
    subject: 'Science (Physics)',
    category: 'Solved Example',
    exerciseName: 'Example 10.1 (NCERT Page 170)',
    questionNumber: 'Example 10.1',
    question: 'A convex mirror used for rearview on an automobile has a radius of curvature of 3.00 m. If a bus is located at 5.00 m from this mirror, find the position, nature and size of the image.',
    stepByStepSolution: `**Step-by-step Solution:**\n\n1. **Given:**\n   - Convex mirror radius of curvature R = +3.00 m ⟹ Focal length f = R/2 = +1.50 m\n   - Object distance u = -5.00 m\n   - Image distance v = ?\n\n2. **Applying Mirror Formula:**\n   1/f = 1/v + 1/u\n   1/v = 1/f - 1/u = 1/(+1.50) - 1/(-5.00) = (1/1.50) + (1/5.00) = (10/15) + (1/5) = (2/3) + (1/5) = (10 + 3)/15 = 13/15\n   v = 15/13 = +1.15 m\n\n3. **Magnification:**\n   m = -v/u = -(+1.15) / (-5.00) = +1.15 / 5.00 = +0.23\n\n**Conclusion:**\n- **Position:** Image is formed at **1.15 m behind the mirror**.\n- **Nature:** **Virtual and erect** (positive sign of m and v).\n- **Size:** **Diminished** to 0.23 times the size of the bus.`,
    keyConceptsApplied: ['Mirror Formula', 'Convex Mirror Sign Conventions', 'Magnification Ratio'],
    boardImportanceTag: 'Extremely High (Repeat Example)'
  },
  {
    id: 'ncert-phy-9-ex2',
    chapterId: 'phy-ch9',
    chapterName: 'Light – Reflection and Refraction',
    subject: 'Science (Physics)',
    category: 'Chapter-End Exercise',
    exerciseName: 'Exercise Q10 (Page 186)',
    questionNumber: 'Q10',
    question: 'An object 5 cm in length is held 25 cm away from a converging lens of focal length 10 cm. Draw the ray diagram and find the position, size and the nature of the image formed.',
    stepByStepSolution: `**Step-by-step Solution:**\n\n1. **Given:**\n   - Object height h = +5 cm\n   - Object distance u = -25 cm\n   - Converging (Convex) lens focal length f = +10 cm\n\n2. **Applying Lens Formula:**\n   1/f = 1/v - 1/u\n   1/v = 1/f + 1/u = 1/10 + 1/(-25) = (1/10) - (1/25) = (5 - 2)/50 = 3/50\n   v = +50/3 = +16.67 cm\n\n3. **Image Height (h\'):**\n   m = h\'/h = v/u\n   h\' = h × (v/u) = 5 × [(50/3) / (-25)] = 5 × (-2/3) = -10/3 = -3.33 cm\n\n**Conclusion:**\n- **Position:** Formed at **16.67 cm on the other side of the lens** (between F2 and 2F2).\n- **Nature:** **Real and inverted** (negative height and positive v).\n- **Size:** **Diminished** (height is 3.33 cm).`,
    keyConceptsApplied: ['Lens Formula', 'Convex Lens Image Formation', 'Magnification'],
    boardImportanceTag: 'Extremely High (Repeat Example)'
  },

  // ========================================================
  // SCIENCE: CHEMISTRY - CHEMICAL REACTIONS
  // ========================================================
  {
    id: 'ncert-chem-1-intext1',
    chapterId: 'chem-ch1',
    chapterName: 'Chemical Reactions and Equations',
    subject: 'Science (Chemistry)',
    category: 'In-Text Question (Blue Box)',
    exerciseName: 'In-Text Page 6',
    questionNumber: 'Q1',
    question: 'Why should a magnesium ribbon be cleaned before burning in air?',
    stepByStepSolution: `**Answer:**\n\n1. Magnesium is a very reactive alkaline earth metal.\n2. When exposed to moist air, it slowly reacts with atmospheric oxygen to form a tough, unreactive layer of **Magnesium Oxide (MgO)** on its surface.\n3. This oxide coating prevents the underlying magnesium metal from coming in direct contact with oxygen and burning efficiently.\n4. Therefore, it is cleaned with sandpaper before burning to remove this protective oxide layer so that it catches fire easily and burns with a dazzling white flame.`,
    keyConceptsApplied: ['Magnesium Oxide Protective Layer', 'Combustion Kinetics', 'Metal Reactivity'],
    boardImportanceTag: 'High'
  },
  {
    id: 'ncert-chem-1-ex1',
    chapterId: 'chem-ch1',
    chapterName: 'Chemical Reactions and Equations',
    subject: 'Science (Chemistry)',
    category: 'Chapter-End Exercise',
    exerciseName: 'Exercise Q9 (Page 15)',
    questionNumber: 'Q9',
    question: 'What does one mean by exothermic and endothermic reactions? Give examples.',
    stepByStepSolution: `**Answer:**\n\n1. **Exothermic Reactions:**\n   Reactions in which energy is released in the form of heat, light, or sound along with the formation of products.\n   - **Example 1 (Respiration):**\n     C₆H₁₂O₆ + 6O₂ ⟶ 6CO₂ + 6H₂O + Energy (Heat)\n   - **Example 2 (Burning of Natural Gas):**\n     CH₄ + 2O₂ ⟶ CO₂ + 2H₂O + Heat\n\n2. **Endothermic Reactions:**\n   Reactions in which energy is absorbed from the surroundings in the form of heat, light, or electricity to proceed.\n   - **Example 1 (Thermal Decomposition of Limestone):**\n     CaCO₃(s) ⟶(Heat)⟶ CaO(s) + CO₂(g)\n   - **Example 2 (Photolytic Decomposition of Silver Chloride):**\n     2AgCl(s) ⟶(Sunlight)⟶ 2Ag(s) + Cl₂(g)`,
    keyConceptsApplied: ['Enthalpy of Reaction', 'Decomposition Thermochemistry', 'Respiration Energetics'],
    boardImportanceTag: 'High'
  }
];
