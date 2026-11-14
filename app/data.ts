// Everything the site says lives here.

export const me = {
  first: "Muktanan",
  last: "Mohapatra",
  nick: "momo",
  place: "Bhubaneswar, India",
  email: "muktamohapatra672@gmail.com",
  github: "https://github.com/tinySage",
  linkedin: "", // add your LinkedIn URL; hidden while empty
  substack: "https://muktamohapatra.substack.com",
  cv: "", // put cv.pdf in /public and set "/cv.pdf"; hidden while empty
  // Put a photo at /public/me.jpg and set this to "/me.jpg".
  // The ID card turns it into an ASCII portrait. Until then it draws an ASCII heart.
  photo: "/me.jpg",
};

// The ID card
export const card = {
  id: "#H34RTB34T",
  no: "#1/1",
  fields: [
    ["name", "MUKTANAN", ""],
    ["surname", "MOHAPATRA", ""],
    ["pronouns", "SHE/HER", ""],
    ["position", "RESEARCHER®", "(federated, ferrari-bound)"],
  ],
  disclaimer: "*patient data never leaves the hospital*",
  issued: "November 1, 2026",
  returnTo: "if found, return to muktamohapatra672@gmail.com",
};

export const typed = [
  "i train models on heartbeats.",
  "i measure what privacy costs.",
  "i write essays about people.",
  "i build robots, sometimes.",
];

export const intro =
  "Master's researcher in computer science. I build federated learning systems that read ECGs without moving patient data out of hospitals, then measure the energy that privacy costs on small devices. Off the clock I write a Substack and think about pit walls.";

export const about = {
  paras: [
    "I'm doing my M.Tech in Computer Science and Engineering at SOA University (ITER) in Bhubaneswar. My thesis trains a cardiac diagnosis model across four hospital sites with federated learning, compresses the model updates, seals them with NIST's lightweight cipher Ascon, and works out where the battery actually goes.",
    "I came to machine learning through hardware. I built an animatronic WALL-E before I trained my first network, and I still think about models in terms of the radios and batteries they run on. I'm looking at PhD positions next. The long-term plan involves Formula 1 telemetry.",
  ],
  stack: ["Python", "PyTorch", "TensorFlow", "Federated learning", "Pandas & NumPy", "SQL", "JavaScript & React", "Raspberry Pi & Arduino"],
  stamps: [
    { top: "SOA · ITER", mid: "PHASE 1", bot: "DEFENDED · OCT 2026", tone: "red" },
    { top: "BPUT", mid: "B.TECH", bot: "CGPA 8.2 · 2024", tone: "ink" },
    { top: "IEEE MPCON", mid: "2027", bot: "IN PREPARATION", tone: "pink" },
  ],
};

export const jobs = [
  {
    org: "SOA University",
    title: "M.Tech Thesis Researcher",
    when: "2025 — present",
    where: "Bhubaneswar",
    points: [
      "Built a federated CNN-LSTM on PTB-XL 12-lead ECG, split across four real hospital sites, reaching 0.90 macro-AUC, level with centralised training.",
      "Compressed each model update 23× (top-5% sparsification, 8-bit quantisation) with no measurable accuracy loss, cutting energy per update from 422 mJ to 18 mJ.",
      "Modelled the cost of Ascon-AEAD128 authenticated encryption on ARM devices: about 1% of per-update energy. The radio is the expensive part.",
      "Supervised by Prof. (Dr.) Binod Kumar Pattanayak and Dr. Barnali Sahu.",
    ],
  },
  {
    org: "QSpiders",
    title: "Full-Stack Python Developer",
    when: "Jan — May 2024",
    where: "Bhubaneswar",
    points: ["Built web applications with Python, Django REST Framework, React and MySQL."],
  },
  {
    org: "Bharat Intern",
    title: "Data Science Intern",
    when: "Sep — Oct 2023",
    where: "Remote",
    points: ["Cleaned and analysed datasets with Pandas and NumPy, and built predictive models with scikit-learn."],
  },
  {
    org: "Oasis Infobyte",
    title: "Data Science Intern",
    when: "Aug — Sep 2023",
    where: "Remote",
    points: ["Built and evaluated machine learning models in Python and Jupyter notebooks."],
  },
];

// Compression ratio vs. test macro-AUC, means of 3 seeds
export const curve = [
  { x: 1, auc: 0.9007 },
  { x: 22.9, auc: 0.9008 },
  { x: 88.9, auc: 0.8965 },
];

export const thesis = {
  title: "FedECG",
  sub: "Energy-aware encrypted federated learning for remote cardiac monitoring",
  body:
    "Four hospital sites train one ECG model together without sharing a single record. Each site sends back a compressed, encrypted model update instead of data. I measured every joule along the way and found that encryption is the cheap part: sending the update over the radio costs roughly 175 times more than sealing it.",
  fields: [
    ["dataset", "PTB-XL · 20,922 ECGs"],
    ["clients", "4 hospital sites"],
    ["accuracy", "0.90 macro-AUC"],
    ["update size", "0.95 → 0.041 MB"],
    ["energy", "422 → 18 mJ"],
    ["cipher", "Ascon-AEAD128"],
  ],
};

export const papers = [
  { title: "Energy cost of encrypted federated ECG learning", venue: "IEEE MPCON 2027", state: "in preparation" },
  { title: "Ping-pong-aware handover prediction for terrestrial 5G", venue: "ICoICC 2027", state: "in preparation" },
];

// A card shows up to three links: `page` (a write-up on this site), `live` and `link` (source).
type Project = {
  no: string; title: string; kind: string; desc: string; stack: string; status: string;
  link: string; linkLabel: string; live?: string; page?: string;
};

export const projects: Project[] = [
  {
    no: "01",
    title: "WingLoop",
    kind: "research",
    desc: "A CFD loop for an F1 front wing in ground effect where the agent audits every run before it is allowed to use the number. Checked against Southampton wind-tunnel data, then tested by corrupting 55 runs on purpose.",
    stack: "Python · OpenFOAM · Gmsh · scikit-learn",
    status: "finished",
    link: "https://github.com/tinySage/wingloop_llm",
    linkLabel: "source",
    page: "/projects/wingloop",
  },
  {
    no: "02",
    title: "What the Pit Wall Knew",
    kind: "software",
    desc: "Judges three of Ferrari's 2022 strategy calls using only what the pit wall knew at the decision lap. A Bayesian lap-time model and a whole-field race simulator, refitted at each cutoff.",
    stack: "Python · FastF1 · PyMC",
    status: "finished",
    link: "https://github.com/tinySage/what-the-pit-wall-knew",
    linkLabel: "source",
  },
  {
    no: "03",
    title: "TELAIO",
    kind: "software",
    desc: "A 3D vehicle engineering workstation in the browser: an 89-component study car with section views and measurement, plus labs for mass, suspension, braking, aero and lap simulation. Every value carries its provenance.",
    stack: "TypeScript · React · three.js",
    status: "live",
    link: "https://github.com/tinySage/TELAIO",
    linkLabel: "source",
    live: "https://telaioautocad.vercel.app",
  },
  {
    no: "04",
    title: "Spider Stairs",
    kind: "software",
    desc: "An eight-legged, 24-joint spider that teaches itself to climb stairs with PPO across parallel Genesis simulations. Comes with a dashboard that replays what it learned in a hand-written 3D renderer.",
    stack: "Python · PyTorch · Genesis",
    status: "demo run trained, full GPU run pending",
    link: "https://github.com/tinySage/spider-stairs",
    linkLabel: "source",
  },
  {
    no: "05",
    title: "Rot",
    kind: "software",
    desc: "A living research paper where every figure is a GPU simulation. A Gray-Scott reaction-diffusion system is seeded onto a photograph and follows its edges and faces, so the picture rots while you read.",
    stack: "TypeScript · WebGPU · Vite",
    status: "finished",
    link: "https://github.com/tinySage/rot",
    linkLabel: "source",
  },
  {
    no: "06",
    title: "APEX",
    kind: "software",
    desc: "A ballast optimiser for a formula single-seater. It places 48 kg across six stations to reach the minimum mass and the front-axle window, then checks wheel loads over seven manoeuvres. Inputs are synthetic.",
    stack: "Python · SciPy · ipywidgets",
    status: "finished",
    link: "https://github.com/tinySage/APEX_Engineering_Results",
    linkLabel: "source",
  },
  {
    no: "07",
    title: "AdamAI",
    kind: "software",
    desc: "A browser maze solver where small neural networks evolve through a genetic algorithm until one finds the way out.",
    stack: "JavaScript · Canvas · no libraries",
    status: "in the works",
    link: "",
    linkLabel: "",
  },
  {
    no: "08",
    title: "Pit Wall Log",
    kind: "software",
    desc: "My daily research log, styled after a Formula 1 pit wall. It tracks progress, meetings, papers and to-dos across my thesis, a paper and coursework.",
    stack: "HTML · JavaScript",
    status: "used daily",
    link: "",
    linkLabel: "",
  },
  {
    no: "09",
    title: "WALL-E",
    kind: "hardware",
    desc: "A fully animatronic WALL-E with servo-driven expressions and a body I 3D-printed and assembled by hand.",
    stack: "Arduino · Raspberry Pi · 3D printing",
    status: "finished",
    link: "",
    linkLabel: "",
  },
];

// The WingLoop write-up at /projects/wingloop
export const wingloop = {
  title: "WingLoop",
  question: "Can an agent tell when its own CFD result is wrong?",
  lede:
    "Optimising a wing with an AI agent has been done. I wanted to know something narrower: if the agent audits every simulation before it uses the number, does it catch the bad ones, and does the optimisation come out more trustworthy? I wrote the brief and the research question, and Claude was the agent that built and ran the loop.",
  repo: "https://github.com/tinySage/wingloop_llm",
  fields: [
    ["solver", "OpenFOAM, steady RANS"],
    ["turbulence", "k-omega SST"],
    ["mesher", "Gmsh, y+ below 1"],
    ["geometry", "Tyrrell 026 section"],
    ["ground", "moving belt"],
    ["runs", "about 140"],
  ],
  phases: [
    ["Solver and validation", "A parametric main plane with flaps over a moving ground, checked against Zerihan's Southampton wind-tunnel data for downforce against ride height, with a three-mesh study."],
    ["Self-audit", "After every run an audit reads the raw outputs: convergence, y+, mesh quality, boundary conditions read back from the case, flow sanity, separation. It returns accept, accept with warning, or reject, with reasons in plain language."],
    ["Measuring the auditor", "Ten clean designs and 55 deliberately corrupted versions: stationary ground, coarse wall mesh, early stop, wrong Reynolds number, flipped flap, collapsed slot. Two auditors judged them blind, one rule-based and one a separate language model."],
    ["Optimising with and without it", "The same 15-point design of experiments and surrogate model, run twice. One optimiser never sees a rejected run. The other uses every number that comes back. Both final designs were re-run on finer meshes."],
  ],
  figures: [
    {
      src: "/wingloop/validation_cl_vs_h.png", w: 1296, h: 828,
      alt: "Downforce coefficient against ride height for the single-element wing. This work follows the shape of the experiment and peaks at the same height, but sits 7 to 12 percent above it and close to Zerihan's own k-omega results.",
      head: "It reproduces the trend and overshoots the level",
      body: "Downforce peaks at the same ride height as the experiment, h/c = 0.134, and falls below it. The level is 7 to 12% too high at every height. At h/c = 0.090 the steady solver never settles, so that point is drawn as a range.",
    },
    {
      src: "/wingloop/optimisation_A_vs_B.png", w: 1332, h: 828,
      alt: "Best usable downforce against evaluation number. With the auditor on, the best value climbs from 5.93 to 6.79 over six added points. With it off, the best value stays at 5.93 and five of six added points are runs the audit rejects.",
      head: "The audited optimiser found the better wing",
      body: "Near 34 to 35 degrees the flap sits on a stall cliff. The unaudited optimiser took five stalled runs at face value and never improved on its starting set. The audited one read the rejections, backed the flap off to 32 degrees and reached Cl 6.79.",
    },
    {
      src: "/wingloop/velocity_baseline_vs_best.png", w: 1115, h: 933,
      alt: "Velocity magnitude around a baseline two-element wing with downforce coefficient 3.98 and around the best audited design with 6.79. The best design has a longer, steeper flap, faster flow under the main plane and a thicker wake.",
      head: "Baseline against the best audited design",
      body: "A longer, steeper flap pulls more air under the main plane. On the finest mesh the best design drops from Cl 6.79 to 6.40 with the flow still attached. The unaudited design drops from 5.93 to 5.55 and its flap stalls.",
    },
  ],
  table: {
    cols: ["fault injected", "runs", "rule-based caught", "language model caught"],
    rows: [
      ["none (clean run, false alarms)", "10", "0", "0"],
      ["stationary ground", "10", "10", "10"],
      ["coarse wall mesh, y+ 30 to 60", "10", "10", "10"],
      ["stopped before convergence", "10", "10", "10"],
      ["wrong Reynolds number", "10", "10", "9"],
      ["flipped flap, collapsed or narrow slot", "15", "15", "15"],
    ],
  },
  caveats: [
    "The detection score flatters the auditor. Most of these faults are written in files it is handed, so catching them is reading. With the read-back checks removed, wrong Reynolds number is caught 4 times in 10.",
    "Nine of the ten flipped-flap and collapsed-slot cases never reached an audit, because the mesher refused the geometry first.",
    "The audit cannot see mesh error. It accepted the coarse run behind the unaudited optimiser's final design, whose flap stalls on finer meshes.",
    "Each optimisation was run once, and only the single-element wing is validated against experiment. Everything with a flap is a 2D, fully turbulent, steady-RANS number.",
  ],
  refs: "Reference data: J. Zerihan, An investigation into the aerodynamics of wings in ground effect, PhD thesis, University of Southampton, 2001, Table 15.",
};

export const writing = {
  name: "briocheclub",
  url: "https://muktamohapatra.substack.com",
  blurb: "Essays, poems and media recs. Sometimes about neural networks, mostly about people.",
  posts: [
    { title: "The algorithm the brain can't run", kind: "on backpropagation", url: "https://muktamohapatra.substack.com/p/the-algorithm-the-brain-cant-run" },
    { title: "The dates don't add up", kind: "on Anne Boleyn", url: "https://muktamohapatra.substack.com/p/the-dates-dont-add-up" },
    { title: "Maybe Medusa Wasn't a Monster", kind: "essay", url: "https://muktamohapatra.substack.com/p/maybe-medusa-wasnt-a-monster" },
    { title: "if I feel it in my body, whose feeling is it?", kind: "on empathy", url: "https://muktamohapatra.substack.com/p/if-i-feel-it-in-my-body-whose-feeling" },
  ],
};

export const education = [
  { when: "2025 — 2027", what: "M.Tech, Computer Science and Engineering", where: "Siksha 'O' Anusandhan University (ITER), Bhubaneswar" },
  { when: "2020 — 2024", what: "B.Tech, Computer Science · CGPA 8.2", where: "Government College of Engineering Kalahandi, Bhawanipatna · BPUT" },
  { when: "School", what: "Class X and Class XII", where: "Stewart School, Bhubaneswar" },
];
