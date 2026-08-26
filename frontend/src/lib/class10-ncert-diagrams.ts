export interface NCERTDiagram {
  id: string;
  chapterNumber: number;
  chapterName: string;
  figureNumber: string;
  title: string;
  subject: 'Biology' | 'Physics' | 'Chemistry';
  boardFrequency: 'Very High (Asked almost every year)' | 'High (Every 2 years)' | 'Repeated 5-Mark Question';
  marksWeightage: string;
  mermaidCode: string;
  svgAsciiIllustration?: string;
  stepByStepDrawingGuide: string[];
  mandatoryLabels: string[];
  boardExamTraps: string[];
  boardQuestionExamples: string[];
}

export const OFFICIAL_NCERT_DIAGRAMS: NCERTDiagram[] = [
  // ==========================================
  // BIOLOGY DIAGRAMS
  // ==========================================
  {
    id: 'ncert-fig-6-7-heart',
    chapterNumber: 6,
    chapterName: 'Life Processes',
    figureNumber: 'NCERT Fig 6.7',
    title: 'Schematic Sectional View of the Human Heart & Blood Circulation',
    subject: 'Biology',
    boardFrequency: 'Repeated 5-Mark Question',
    marksWeightage: '3 to 5 Marks',
    mermaidCode: `flowchart TD
    VenaCava[Vena Cava from Body] -->|Deoxygenated Blood| RA[Right Atrium]
    RA -->|Tricuspid Valve| RV[Right Ventricle]
    RV -->|Pulmonary Artery| Lungs[Lungs - Oxygenation]
    Lungs -->|Pulmonary Vein - Oxygenated| LA[Left Atrium]
    LA -->|Bicuspid/Mitral Valve| LV[Left Ventricle - Thick Muscular Wall]
    LV -->|Aorta| Body[Systemic Circulation to Body Organs]
    Body -->|Deoxygenated Blood| VenaCava`,
    stepByStepDrawingGuide: [
      'Step 1: Draw an inverted peach/pear shape divided into two halves by a central septum wall.',
      'Step 2: Partition top two chambers (Left & Right Atria) with thin walls.',
      'Step 3: Partition bottom two chambers (Left & Right Ventricles). Note: Left Ventricular wall MUST be drawn noticeably thicker than the right.',
      'Step 4: Draw the Vena Cava entering Right Atrium and Pulmonary Artery branching from Right Ventricle toward the lungs.',
      'Step 5: Draw the 4 Pulmonary Veins entering Left Atrium and the large arching Aorta leaving Left Ventricle.',
      'Step 6: Draw unidirectional directional flow arrows: Blue ink for Right side (deoxygenated), Red ink for Left side (oxygenated).'
    ],
    mandatoryLabels: [
      'Right Atrium (Receives deoxygenated blood)',
      'Right Ventricle (Pumps blood to lungs via Pulmonary Artery)',
      'Left Atrium (Receives oxygenated blood via Pulmonary Vein)',
      'Left Ventricle (Thickest wall, pumps to Aorta)',
      'Interventricular Septum (Prevents mixing of oxygenated & deoxygenated blood)',
      'Aorta (Main systemic artery)',
      'Vena Cava (Superior & Inferior)'
    ],
    boardExamTraps: [
      'CRITICAL: In biological anatomical diagrams, Left is on the paper\'s RIGHT side, and Right is on the paper\'s LEFT side.',
      'Always draw arrow marks indicating blood flow direction; examiners deduct 1 mark if arrows are missing.',
      'Remember Pulmonary Vein carries OXYGENATED blood, and Pulmonary Artery carries DEOXYGENATED blood (exception to general rule).'
    ],
    boardQuestionExamples: [
      'CBSE 2023 (5M): Draw a neat labeled diagram of human heart and explain why double circulation is necessary in humans.',
      'CBSE 2020 (3M): Differentiate between the functions of left ventricle and right ventricle. Why do ventricles have thicker walls than atria?'
    ]
  },
  {
    id: 'ncert-fig-6-14-nephron',
    chapterNumber: 6,
    chapterName: 'Life Processes',
    figureNumber: 'NCERT Fig 6.14',
    title: 'Structure and Functioning of a Nephron (Renal Tubule)',
    subject: 'Biology',
    boardFrequency: 'Very High (Asked almost every year)',
    marksWeightage: '3 to 5 Marks',
    mermaidCode: `flowchart TD
    RenalArtery[Afferent Renal Arteriole] --> Glomerulus[Glomerulus Capillary Tuft - Ultrafiltration]
    Glomerulus --> Bowman[Bowman's Capsule Cup]
    Bowman --> PCT[Proximal Convoluted Tubule - Selective Reabsorption of Glucose, AA, Salts]
    PCT --> Loop[Loop of Henle Hairpin - Water Concentration]
    Loop --> DCT[Distal Tubule - Tubular Secretion]
    DCT --> CollectDuct[Collecting Duct]
    CollectDuct --> Ureter[Ureter to Urinary Bladder]`,
    stepByStepDrawingGuide: [
      'Step 1: Draw a double-walled cup at the top (Bowman\'s Capsule).',
      'Step 2: Inside the cup, draw a dense knot of fine capillaries (Glomerulus).',
      'Step 3: Extend a highly coiled tube from the capsule (Proximal Convoluted Tubule).',
      'Step 4: Draw a long U-shaped hairpin loop descending downwards (Loop of Henle).',
      'Step 5: Coil the tube again (Distal Convoluted Tubule) and connect it into a vertical tree-like branch (Collecting Duct).',
      'Step 6: Draw efferent blood capillaries closely wrapping around the tubule for reabsorption.'
    ],
    mandatoryLabels: [
      'Bowman\'s Capsule (Cup-shaped filtration unit)',
      'Glomerulus (High-pressure capillary network for ultrafiltration)',
      'Afferent & Efferent Renal Arterioles',
      'Convoluted Renal Tubule (Site of selective reabsorption of glucose, amino acids, salts, water)',
      'Capillaries wrapping renal tubule',
      'Collecting Duct (Transports initial urine to ureter)'
    ],
    boardExamTraps: [
      'Do not confuse the Excretory System diagram (Kidneys, Ureters, Bladder) with the microscopic Nephron diagram.',
      'Afferent arteriole (incoming) is wider than efferent arteriole (outgoing) to create high filtration pressure.'
    ],
    boardQuestionExamples: [
      'CBSE 2024 (5M): Draw the structure of a nephron and explain the three steps of urine formation (Ultrafiltration, Selective Reabsorption, Tubular Secretion).',
      'CBSE 2022 (3M): Name the substances selectively reabsorbed by the tubular part of the nephron as urine flows along the tube.'
    ]
  },
  {
    id: 'ncert-fig-6-3-stomata',
    chapterNumber: 6,
    chapterName: 'Life Processes',
    figureNumber: 'NCERT Fig 6.3',
    title: 'Open and Closed Stomatal Pore with Guard Cells',
    subject: 'Biology',
    boardFrequency: 'Very High (Asked almost every year)',
    marksWeightage: '2 to 3 Marks',
    mermaidCode: `flowchart LR
    subgraph StomaOpen [Open Stomatal Pore]
      WaterIn[Water flows into Guard Cells] --> Turgid[Guard Cells Swell & Become Turgid]
      Turgid --> Curved[Outer thin walls stretch out, thick inner walls pull apart]
      Curved --> PoreOpen[Stomatal Pore Opens]
    end
    subgraph StomaClosed [Closed Stomatal Pore]
      WaterOut[Water flows out of Guard Cells] --> Flaccid[Guard Cells Shrink & Become Flaccid]
      Flaccid --> Straight[Thick inner walls relax together]
      Straight --> PoreClose[Stomatal Pore Closes]
    end`,
    stepByStepDrawingGuide: [
      'Step 1: Draw two curved kidney/bean-shaped cells facing each other (Guard Cells).',
      'Step 2: Make the inner concave wall thicker than the outer convex wall (Crucial for differential stretching).',
      'Step 3: In the Open Stoma: leave an oval gap between the bean cells.',
      'Step 4: In the Closed Stoma: draw the two bean cells touching each other tightly with no central gap.',
      'Step 5: Draw tiny green dots inside guard cells representing Chloroplasts, and a prominent Nucleus in each.',
      'Step 6: Surround with irregular epidermal cells.'
    ],
    mandatoryLabels: [
      'Guard Cells (Bean-shaped cells regulating pore size)',
      'Stomatal Pore (Aperture for transpiration & CO2/O2 exchange)',
      'Chloroplasts (Tiny circular granules inside guard cells)',
      'Nucleus of Guard Cell',
      'Epidermal Cells (Surrounding tissue)'
    ],
    boardExamTraps: [
      'Students often forget to show chloroplasts inside guard cells. Guard cells are the ONLY epidermal cells with chloroplasts.',
      'Inner wall MUST be drawn visibly thicker than the outer wall.'
    ],
    boardQuestionExamples: [
      'CBSE 2023 (3M): Draw neat diagrams showing (a) open stomatal pore and (b) closed stomatal pore. Explain how guard cells regulate this process.',
      'CBSE 2019 (2M): Mention the role of water in the opening and closing of stomatal pores.'
    ]
  },
  {
    id: 'ncert-fig-7-1-neuron',
    chapterNumber: 7,
    chapterName: 'Control and Coordination',
    figureNumber: 'NCERT Fig 7.1 (a)',
    title: 'Structure of a Neuromuscular Unit / Neuron',
    subject: 'Biology',
    boardFrequency: 'High (Every 2 years)',
    marksWeightage: '3 Marks',
    mermaidCode: `flowchart LR
    Stimulus[Sensory Stimulus] --> Dendrite[Dendrite Branch Tips - Acquired Chemical Signal]
    Dendrite --> CellBody[Cell Body / Cyton with Nucleus - Converts to Electrical Impulse]
    CellBody --> Axon[Long Axon Cable]
    Axon --> NerveEnding[Nerve Endings - Terminal Knobs]
    NerveEnding -->|Neurotransmitter across Synapse Gap| NextDendrite[Next Neuron Dendrite / Muscle]`,
    stepByStepDrawingGuide: [
      'Step 1: Draw a star-shaped central cell body (Cyton) with branching projections (Dendrites).',
      'Step 2: Draw a central prominent nucleus and granular cytoplasm.',
      'Step 3: Extend one single long cylindrical branch from the cell body (Axon).',
      'Step 4: Draw myelin sheath sausage-like segments along the axon.',
      'Step 5: End the axon with fine branching nerve terminal endings.'
    ],
    mandatoryLabels: [
      'Dendrite (Receives electrical/chemical impulses)',
      'Cell Body / Cyton (Contains nucleus & metabolic machinery)',
      'Nucleus',
      'Axon (Conducts impulse away from cell body)',
      'Nerve Ending / Axon Terminal (Releases neurotransmitters into synapse)'
    ],
    boardExamTraps: [
      'Direction of impulse MUST be shown from Dendrite -> Cell Body -> Axon -> Nerve Ending (Unidirectional).',
      'Synapse is the microscopic junction between nerve ending of one neuron and dendrite of next neuron.'
    ],
    boardQuestionExamples: [
      'CBSE 2024 (3M): Draw a neuron and identify: (i) Part where information is acquired, (ii) Part through which information travels as electrical impulse, (iii) Part where impulse is converted to chemical signal.'
    ]
  },
  {
    id: 'ncert-fig-7-2-reflex-arc',
    chapterNumber: 7,
    chapterName: 'Control and Coordination',
    figureNumber: 'NCERT Fig 7.2',
    title: 'Reflex Arc Pathway (Involuntary Automatic Response)',
    subject: 'Biology',
    boardFrequency: 'High (Every 2 years)',
    marksWeightage: '3 to 5 Marks',
    mermaidCode: `flowchart LR
    Heat[Stimulus: Hot Object] --> Receptor[Heat Pain Receptors in Skin]
    Receptor -->|Sensory Neuron| SpinalCord[Spinal Cord Grey Matter - Relay Neuron]
    SpinalCord -->|Brain informed simultaneously| Brain[Brain]
    SpinalCord -->|Motor Neuron| Effector[Effector: Arm Muscle]
    Effector --> Response[Response: Sudden Withdrawal of Hand]`,
    stepByStepDrawingGuide: [
      'Step 1: Draw a hand touching a hot plate on the left (Stimulus & Skin Receptor).',
      'Step 2: Trace a red line with forward arrows representing the Sensory Neuron carrying impulse to the spinal cord.',
      'Step 3: Draw the butterfly-shaped cross-section of the Spinal Cord.',
      'Step 4: Inside spinal cord, draw the Relay Neuron acting as the integration bridge.',
      'Step 5: Trace a blue line with forward arrows representing the Motor Neuron leaving spinal cord.',
      'Step 6: Terminate on the Biceps muscle (Effector) causing hand contraction.'
    ],
    mandatoryLabels: [
      'Receptor in Skin (Detects heat/pain stimulus)',
      'Sensory Neuron (Carries impulse to CNS)',
      'Spinal Cord (CNS Integration center)',
      'Relay Neuron (Connects sensory and motor neurons)',
      'Motor Neuron (Transmits command to effector muscle)',
      'Effector Muscle (Withdraws hand)'
    ],
    boardExamTraps: [
      'Reflex arcs are formed in the Spinal Cord, NOT the Brain (though information message is sent to brain simultaneously for memory).'
    ],
    boardQuestionExamples: [
      'CBSE 2023 (3M): Trace the sequence of events that occur when you accidentally touch a hot object. Draw a labeled reflex arc diagram.'
    ]
  },
  {
    id: 'ncert-fig-8-7-flower',
    chapterNumber: 8,
    chapterName: 'How do Organisms Reproduce?',
    figureNumber: 'NCERT Fig 8.7',
    title: 'Longitudinal Section (LS) of a Bisexual Flower',
    subject: 'Biology',
    boardFrequency: 'Repeated 5-Mark Question',
    marksWeightage: '3 to 5 Marks',
    mermaidCode: `flowchart TD
    subgraph FemalePistil [Female Reproductive Organ: Pistil / Carpel]
      Stigma[Stigma - Sticky receptive surface for pollen]
      Style[Style - Elongated tube]
      Ovary[Ovary - Basal swollen part containing Ovules / Female Gamete]
      Stigma --> Style --> Ovary
    end
    subgraph MaleStamen [Male Reproductive Organ: Stamen]
      Anther[Anther - Bilobed sac producing Pollen Grains / Male Gametes]
      Filament[Filament - Slender stalk]
      Anther --> Filament
    end
    Petals[Petals / Corolla - Colorful to attract pollinators]
    Sepals[Sepals / Calyx - Green protective outer whorl]`,
    stepByStepDrawingGuide: [
      'Step 1: Draw the swollen central flask-shaped organ (Pistil/Carpel): bottom round Ovary, slender neck Style, and flat sticky top Stigma.',
      'Step 2: Inside the ovary, draw one or more seed-like Ovules containing the female egg cell.',
      'Step 3: On either side of the pistil, draw stalks (Filaments) topped with 2-lobed bags (Anthers).',
      'Step 4: Surround with large decorative Petals.',
      'Step 5: At the base, draw green leaf-like Sepals resting on the receptacle stalk.'
    ],
    mandatoryLabels: [
      'Stamen (Male organ): Anther and Filament',
      'Carpel / Pistil (Female organ): Stigma, Style, and Ovary',
      'Ovule with female germ cell',
      'Petal / Corolla',
      'Sepal / Calyx',
      'Receptacle'
    ],
    boardExamTraps: [
      'After fertilization: Ovary turns into Fruit, while Ovules turn into Seeds (Extremely common 1M board question!).',
      'Make sure both Anther+Filament are bracketed as Stamen, and Stigma+Style+Ovary are bracketed as Pistil.'
    ],
    boardQuestionExamples: [
      'CBSE 2024 (5M): Draw the LS of a flower and label all reproductive parts. What happens to the ovary and ovule after fertilization?',
      'CBSE 2020 (3M): Distinguish between self-pollination and cross-pollination. Draw germination of pollen on stigma.'
    ]
  },

  // ==========================================
  // PHYSICS DIAGRAMS
  // ==========================================
  {
    id: 'ncert-fig-9-concave-mirror-6-cases',
    chapterNumber: 9,
    chapterName: 'Light – Reflection and Refraction',
    figureNumber: 'NCERT Fig 9.3 & 9.4',
    title: 'Concave Mirror Ray Diagrams: 6 Standard Object Positions & Sign Conventions',
    subject: 'Physics',
    boardFrequency: 'Repeated 5-Mark Question',
    marksWeightage: '3 to 5 Marks',
    mermaidCode: `flowchart TD
    Case1["1. Object at Infinity --> Real, Inverted, Point Image at Focus F (m << 1)"]
    Case2["2. Object Beyond C --> Real, Inverted, Diminished Image between C & F"]
    Case3["3. Object at C --> Real, Inverted, Same Size Image at C (m = -1)"]
    Case4["4. Object between C & F --> Real, Inverted, Magnified Image Beyond C (m > 1)"]
    Case5["5. Object at Focus F --> Real, Inverted, Highly Enlarged Image at Infinity"]
    Case6["6. Object between Pole P and F --> VIRTUAL, ERECT, MAGNIFIED behind mirror (m > +1)"]`,
    stepByStepDrawingGuide: [
      'Step 1: Draw a straight horizontal line representing the Principal Axis.',
      'Step 2: Draw an arc curved inwards with outer silvered hatching lines (Concave Mirror). Mark Pole P on mirror.',
      'Step 3: Using a ruler, accurately mark Focus F at 3 cm from P, and Center of Curvature C at 6 cm from P (R = 2f).',
      'Step 4: Draw Object AB as an upright vertical arrow.',
      'Step 5: Ray 1: Draw parallel to principal axis from tip A; after reflection it MUST pass through Focus F.',
      'Step 6: Ray 2: Draw passing through Center of Curvature C; after reflection it retraces back along the same path.',
      'Step 7: Mark intersection point A\' and draw perpendicular image arrow A\'B\' to the axis.'
    ],
    mandatoryLabels: [
      'Pole (P)',
      'Principal Focus (F) with focal length f (Negative as per sign convention)',
      'Center of Curvature (C) with radius R = 2f',
      'Principal Axis',
      'Object AB and Image A\'B\'',
      'Direction arrows on all incident and reflected rays'
    ],
    boardExamTraps: [
      'CASE 6 (Object between P and F) is the ONLY case producing a VIRTUAL & ERECT magnified image (used in shaving mirrors & dental mirrors). Asked in CBSE 2023, 2022, 2019!',
      'Mirror Formula: 1/f = 1/v + 1/u. Concave mirror focal length f is ALWAYS NEGATIVE.',
      'Magnification: m = -v/u = h\'/h. Negative m means Real/Inverted; Positive m means Virtual/Erect.'
    ],
    boardQuestionExamples: [
      'CBSE 2023 (3M): An object is placed at a distance of 12 cm in front of a concave mirror of focal length 15 cm. Draw the ray diagram and calculate image distance.',
      'CBSE 2020 (5M): Draw ray diagrams for an object placed at: (i) Center of curvature of concave mirror, (ii) Between focus and pole of concave mirror.'
    ]
  },
  {
    id: 'ncert-fig-10-2-3-eye-defects',
    chapterNumber: 10,
    chapterName: 'The Human Eye and the Colourful World',
    figureNumber: 'NCERT Fig 10.2 & 10.3',
    title: 'Defects of Vision (Myopia & Hypermetropia) & Their Ray Diagram Corrections',
    subject: 'Physics',
    boardFrequency: 'Repeated 5-Mark Question',
    marksWeightage: '3 to 5 Marks',
    mermaidCode: `flowchart TD
    subgraph Myopia [Myopia / Near-Sightedness]
      M_Cause[Causes: Excessive eye lens curvature OR Elongation of eyeball] --> M_Defect[Image formed IN FRONT of Retina]
      M_Defect --> M_Fix[Correction: DIVERGING CONCAVE LENS with negative focal length]
    end
    subgraph Hypermetropia [Hypermetropia / Far-Sightedness]
      H_Cause[Causes: Focal length of eye lens is too long OR Eyeball is too short] --> H_Defect[Image formed BEHIND Retina]
      H_Defect --> H_Fix[Correction: CONVERGING CONVEX LENS with positive focal length]
    end`,
    stepByStepDrawingGuide: [
      'MYOPIA DIAGRAM SET (3 figures required):',
      '  (a) Far point of myopic eye: Parallel rays from infinity focus at far point point O in front of eye.',
      '  (b) Myopic eye: Parallel rays from infinity enter eye lens and converge in front of retina.',
      '  (c) Corrected Myopic Eye: Draw a Concave lens in front of eye. Parallel rays diverge slightly so they appear to come from far point, focusing sharply ON the retina.',
      'HYPERMETROPIA DIAGRAM SET (3 figures required):',
      '  (a) Near point N\' of hypermetropic eye (greater than 25 cm).',
      '  (b) Hypermetropic eye: Rays from normal near point N (25 cm) converge behind the retina.',
      '  (c) Corrected Hypermetropic eye: Draw a Convex lens in front of eye. Rays converge and focus sharply ON the retina.'
    ],
    mandatoryLabels: [
      'Cornea and Eye Lens',
      'Retina (Screen where image must form)',
      'Far Point (O) for Myopia / Near Point (N\') for Hypermetropia',
      'Concave Lens (for Myopia correction, P = 1/f < 0)',
      'Convex Lens (for Hypermetropia correction, P = 1/f > 0)'
    ],
    boardExamTraps: [
      'Board examiners require ALL 3 DIAGRAMS for full 5 marks: (1) Defective eye, (2) Location of defect point, (3) Corrected eye with lens.',
      'Normal near point of adult human eye is 25 cm, and far point is Infinity.'
    ],
    boardQuestionExamples: [
      'CBSE 2024 (5M): A student unable to see clearly blackboard 5 m away. Identify defect, list 2 causes, and draw corrective ray diagram with lens calculation.',
      'CBSE 2022 (3M): Draw ray diagram to show the correction of hypermetropia using a suitable optical lens.'
    ]
  },
  {
    id: 'ncert-fig-10-4-5-prism-dispersion',
    chapterNumber: 10,
    chapterName: 'The Human Eye and the Colourful World',
    figureNumber: 'NCERT Fig 10.4 & 10.5',
    title: 'Refraction through Glass Prism, Dispersion (VIBGYOR) & Newton\'s Double Prism',
    subject: 'Physics',
    boardFrequency: 'Very High (Asked almost every year)',
    marksWeightage: '3 to 5 Marks',
    mermaidCode: `flowchart LR
    WhiteLight[Incident White Light Beam] --> Prism1[First Glass Prism - Triangular Base]
    Prism1 -->|Refraction & Differential Wavelength Bending| Spectrum[Dispersion: Red Bends Least, Violet Bends Most - VIBGYOR]
    Spectrum --> Prism2[Inverted Second Glass Prism]
    Prism2 -->|Recombination of Spectrum Colors| WhiteBeam[Emergent Recombined White Light Beam]`,
    stepByStepDrawingGuide: [
      'REFRACTION THROUGH PRISM:',
      '  Step 1: Draw an equilateral triangle ABC representing glass prism.',
      '  Step 2: Draw incident ray PE hitting face AB at angle i to the normal NN\'.',
      '  Step 3: Draw refracted ray EF bending TOWARDS normal inside glass.',
      '  Step 4: Draw emergent ray FS exiting face AC bending AWAY from normal MM\'.',
      '  Step 5: Extend incident ray forward and emergent ray backward with dashed lines to show Angle of Deviation (D or δ).',
      'NEWTON\'S RECOMBINATION EXPERIMENT:',
      '  Draw first erect prism ABC producing 7 colors, followed by an inverted identical prism A\'B\'C\' recombining 7 rays back into a single white beam.'
    ],
    mandatoryLabels: [
      'Angle of Prism (A)',
      'Incident Ray (PE) and Angle of Incidence (i)',
      'Refracted Ray (EF) and Angle of Refraction (r)',
      'Emergent Ray (FS) and Angle of Emergence (e)',
      'Angle of Deviation (D) - Angle between incident ray extended forward and emergent ray backward',
      'VIBGYOR (Violet at bottom, Red at top)'
    ],
    boardExamTraps: [
      'Red light has the longest wavelength ($\lambda$) and suffers the LEAST deviation. Violet light has the shortest wavelength and suffers the MAXIMUM deviation ($D \propto 1/\lambda$).'
    ],
    boardQuestionExamples: [
      'CBSE 2023 (3M): Draw a ray diagram showing the path of a ray of light through a triangular glass prism. Mark angles i, r, e, A, and D.',
      'CBSE 2020 (3M): Explain Newton\'s experiment using two identical prisms that demonstrated white light is made up of seven constituent colors.'
    ]
  },
  {
    id: 'ncert-fig-12-10-solenoid',
    chapterNumber: 12,
    chapterName: 'Magnetic Effects of Electric Current',
    figureNumber: 'NCERT Fig 12.10',
    title: 'Magnetic Field Lines Through and Around a Current-Carrying Solenoid',
    subject: 'Physics',
    boardFrequency: 'High (Every 2 years)',
    marksWeightage: '3 Marks',
    mermaidCode: `flowchart LR
    Battery[Battery DC Voltage] --> Key[Plug Key & Rheostat]
    Key --> Solenoid[Helical Insulated Copper Coil Cylindrical Solenoid]
    Solenoid -->|Inside Core: Uniform Straight Parallel Field Lines| Core[Strong Uniform Magnetic Field B]
    Solenoid -->|Outside: Closed Continuous Loops from North to South| ExternalField[Bar Magnet Dipole Field Pattern]`,
    stepByStepDrawingGuide: [
      'Step 1: Draw a horizontal cylinder wrapped with helical coils of insulated copper wire.',
      'Step 2: Connect the two ends to a DC battery and plug key, marking current direction arrows.',
      'Step 3: Inside the solenoid: Draw straight, parallel, equidistant horizontal lines (representing uniform magnetic field).',
      'Step 4: Outside the solenoid: Draw curved closed loops emerging from North Pole and entering South Pole (identical to a bar magnet).',
      'Step 5: Mark arrowheads: Outside from N to S; Inside from S to N.'
    ],
    mandatoryLabels: [
      'Solenoid (Coil of many circular turns of insulated copper wire)',
      'North Pole (N) and South Pole (S) of Solenoid',
      'Uniform magnetic field lines inside core (Straight parallel lines)',
      'Closed magnetic field loops outside',
      'Battery (+ and - terminals) with current flow direction'
    ],
    boardExamTraps: [
      'Magnetic field INSIDE a long current-carrying solenoid is UNIFORM at all points (Parallel lines).',
      'Placing a soft iron core inside creates a powerful Electromagnet.'
    ],
    boardQuestionExamples: [
      'CBSE 2024 (3M): What is a solenoid? Draw magnetic field lines produced by a current-carrying solenoid. State two ways to increase magnetic field strength.'
    ]
  },

  // ==========================================
  // CHEMISTRY EXPERIMENTAL SETUPS & DOT STRUCTURES
  // ==========================================
  {
    id: 'ncert-fig-1-6-electrolysis',
    chapterNumber: 1,
    chapterName: 'Chemical Reactions and Equations',
    figureNumber: 'NCERT Fig 1.6',
    title: 'Electrolysis of Water (Electrolytic Decomposition of H2O)',
    subject: 'Chemistry',
    boardFrequency: 'Very High (Asked almost every year)',
    marksWeightage: '3 Marks',
    mermaidCode: `flowchart TD
    Water["Acidified Water H2O + Dilute H2SO4"] -->|6V DC Electric Current| Electrolysis[Electrolytic Decomposition 2H2O -> 2H2 + O2]
    Electrolysis -->|Negative Cathode| Hydrogen["Cathode: Hydrogen Gas H2 (2 Volumes - Double Quantity)"]
    Electrolysis -->|Positive Anode| Oxygen["Anode: Oxygen Gas O2 (1 Volume)"]`,
    stepByStepDrawingGuide: [
      'Step 1: Draw a plastic mug/beaker with two holes at bottom fitted with rubber stoppers.',
      'Step 2: Insert two carbon/graphite electrodes through stoppers.',
      'Step 3: Invert two graduated test tubes filled with water over the electrodes.',
      'Step 4: Connect electrodes to a 6V battery: Left to positive terminal (Anode), Right to negative terminal (Cathode).',
      'Step 5: Draw water level and gas collection bubbles: Hydrogen volume at Cathode MUST be drawn TWICE as large as Oxygen volume at Anode.'
    ],
    mandatoryLabels: [
      'Cathode (- terminal) collecting Hydrogen gas (H2) - 2 Volumes',
      'Anode (+ terminal) collecting Oxygen gas (O2) - 1 Volume',
      'Graphite Electrodes',
      'Acidified Water (Dilute H2SO4 added to increase electrical conductivity)',
      '6V Battery and Switch'
    ],
    boardExamTraps: [
      'Why is gas collected at cathode double the volume at anode? Because water molecule formula is H2O (2 parts hydrogen to 1 part oxygen by volume: 2H2O -> 2H2 + O2).',
      'Remember: Cations (+ H+) move to Cathode (-); Anions (O2-) move to Anode (+).'
    ],
    boardQuestionExamples: [
      'CBSE 2023 (3M): In the electrolysis of water: (a) Name the gases evolved at cathode and anode. (b) Why is the volume of gas collected in one test tube double that of the other? (c) How are these gases tested?'
    ]
  },
  {
    id: 'ncert-fig-4-12-micelle',
    chapterNumber: 4,
    chapterName: 'Carbon and its Compounds',
    figureNumber: 'NCERT Fig 4.12 & 4.13',
    title: 'Structure of a Soap Micelle & Cleansing Action on Oily Dirt',
    subject: 'Chemistry',
    boardFrequency: 'Repeated 5-Mark Question',
    marksWeightage: '3 to 5 Marks',
    mermaidCode: `flowchart TD
    SoapMolecule["Soap Molecule: Sodium Stearate C17H35COONa"] --> Hydrophobic["Hydrophobic Tail: Long Hydrocarbon Chain (Insoluble in water, dissolves in oily dirt)"]
    SoapMolecule --> Hydrophilic["Hydrophilic Head: Ionic Carboxylate End COO- Na+ (Soluble in water, interacts with water molecules)"]
    Hydrophobic --> RadialCluster["Micelle: Hydrophobic tails attach to oily dirt droplet in center; Ionic heads face outwards into surrounding water forming stable emulsion"]`,
    stepByStepDrawingGuide: [
      'Step 1: Draw a soap molecule showing a zigzag hydrocarbon tail (hydrophobic) attached to a circular ionic head COO- Na+ (hydrophilic).',
      'Step 2: Draw a central circle representing the Oil/Grease droplet.',
      'Step 3: Draw multiple soap molecules radiating outwards from the droplet like a sunflower: all zigzag tails embedded in the central oil droplet, and all circular ionic heads on the outside circumference facing water.',
      'Step 4: Draw negative charges COO- on outer heads to show electrostatic repulsion preventing micelle coalescence.'
    ],
    mandatoryLabels: [
      'Hydrophobic end (Non-polar hydrocarbon tail dissolves in oil)',
      'Hydrophilic end (Ionic end COO- Na+ interacts with water)',
      'Central Oil / Grease droplet',
      'Soap Micelle sphere in aqueous emulsion'
    ],
    boardExamTraps: [
      'Soap does NOT form lather with Hard Water because Ca2+ and Mg2+ ions react with soap to form insoluble curdy white precipitate called Scum.',
      'Detergents do not form scum because their charged ends do not form insoluble precipitates with Ca2+/Mg2+.'
    ],
    boardQuestionExamples: [
      'CBSE 2024 (5M): Explain the mechanism of the cleansing action of soaps with the help of a labeled micelle diagram. Why are detergents better than soaps in hard water?'
    ]
  }
];
