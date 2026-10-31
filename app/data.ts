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

export const projects = [
  {
    no: "01",
    title: "What the Pit Wall Knew",
    kind: "software",
    desc: "Race-strategy analysis of Formula 1 pit stops: what the team could have known on the day, and what a different call would have changed.",
    stack: "Python · FastF1 · Pandas",
    status: "being built",
    link: "https://github.com/tinySage/what-the-pit-wall-knew",
    linkLabel: "source",
  },
  {
    no: "02",
    title: "AdamAI",
    kind: "software",
    desc: "A browser maze solver where small neural networks evolve through a genetic algorithm until one finds the way out.",
    stack: "JavaScript · Canvas · no libraries",
    status: "in the works",
    link: "",
    linkLabel: "",
  },
  {
    no: "03",
    title: "Pit Wall Log",
    kind: "software",
    desc: "My daily research log, styled after a Formula 1 pit wall. It tracks progress, meetings, papers and to-dos across my thesis, a paper and coursework.",
    stack: "HTML · JavaScript",
    status: "used daily",
    link: "",
    linkLabel: "",
  },
  {
    no: "04",
    title: "WALL-E",
    kind: "hardware",
    desc: "A fully animatronic WALL-E with servo-driven expressions and a body I 3D-printed and assembled by hand.",
    stack: "Arduino · Raspberry Pi · 3D printing",
    status: "finished",
    link: "",
    linkLabel: "",
  },
];

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
