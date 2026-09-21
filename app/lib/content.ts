export type Slide = {
  id: string;
  kind: "event" | "announcement" | "deadline" | "membership";
  layout?: "default" | "image-hero" | "speakers";
  eyebrow: string;
  title: string;
  titleAccent?: string;
  summary: string;
  meta: string;
  href: string;
  cta: string;
  tone: "green" | "lime" | "red" | "blue" | "yellow";
  image?: {
    src: string;
    alt: string;
  };
  facts?: { label: string; value: string }[];
  speakers?: { name: string; role: string; topic: string }[];
};

export const slides: Slide[] = [
  {
    id: "innovation-summit-hero",
    kind: "event",
    layout: "image-hero",
    eyebrow: "Zonal summit · Registration open",
    title: "SouthEast Innovation",
    titleAccent: "Summit",
    summary:
      "Founders, researchers and state ICT leadership on what the zone ships next.",
    meta: "14–16 May 2027",
    href: "/events/innovation-summit",
    cta: "Register your interest",
    tone: "lime",
    image: {
      src: "/images/icc-awka-venue.jpg",
      alt: "The main hall at the International Conference Centre, Awka, set up for a large event",
    },
    facts: [
      { label: "Theme", value: "Engineering the SouthEast's Digital Future" },
      { label: "Date", value: "14–16 May 2027" },
      {
        label: "Venue",
        value: "International Conference Centre, Awka",
      },
    ],
  },
  {
    id: "innovation-summit-speakers",
    kind: "event",
    layout: "speakers",
    eyebrow: "SouthEast Innovation Summit 2026",
    title: "Featured speakers",
    summary:
      "Zonal leadership, researchers and industry partners taking the stage in Awka.",
    meta: "14–16 May 2027 · Awka",
    href: "/events/innovation-summit",
    cta: "See the full agenda",
    tone: "green",
    image: {
      src: "/images/summit-speakers.jpg",
      alt: "Keynote speaker presenting on stage at the tech innovation conference in Awka",
    },
    speakers: [
      {
        name: "Chidiebere Ugwuegbulam",
        role: "Zonal Coordinator, NCS SouthEast",
        topic: "Opening keynote",
      },
      {
        name: "Dr. Ijeoma Emeagi",
        role: "Director of Education, NCS SouthEast",
        topic: "AI adoption in public education",
      },
      {
        name: "Dr. Emmanuel Ololo",
        role: "Zonal Working Committee",
        topic: "Cybersecurity for state government systems",
      },
      {
        name: "IEEE Nigeria SouthEast",
        role: "Sub Section representative",
        topic: "Peer review and research standards",
      },
    ],
  },
  {
    id: "se-papers",
    kind: "deadline",
    eyebrow: "Call for papers",
    title: "SouthEast Innovation Summit — papers open",
    summary:
      "Submit research on AI, cybersecurity, smart governance and digital identity. Reviewed with IEEE Nigeria SouthEast Sub Section.",
    meta: "Submissions close 30 April 2027",
    href: "https://bit.ly/SEpapers",
    cta: "Submit a paper",
    tone: "red",
    image: {
      src: "/images/call-for-papers.jpg",
      alt: "High-tech computing and cybersecurity research workstation with neural network visualizations",
    },
  },
  {
    id: "zonal-it-assembly",
    kind: "event",
    eyebrow: "Flagship event",
    title: "Zonal IT Assembly 2026",
    summary:
      "Every chapter in the zone under one roof: policy, practice and the people building SouthEast tech.",
    meta: "November 2026 · Enugu",
    href: "/events/zonal-it-assembly",
    cta: "View event",
    tone: "blue",
    image: {
      src: "/images/zonal-assembly.jpg",
      alt: "Delegates and tech leaders attending the Nigeria Computer Society Zonal IT Assembly in Enugu",
    },
  },
  {
    id: "membership-drive",
    kind: "membership",
    eyebrow: "Announcement",
    title: "500 new members by July 2026",
    summary:
      "Zonal membership drive is live across Abia, Anambra, Ebonyi, Enugu and Imo. Student and professional grades available.",
    meta: "Ongoing · all five chapters",
    href: "/join",
    cta: "Join NCS",
    tone: "yellow",
    image: {
      src: "/images/membership-drive.jpg",
      alt: "Young Nigerian software engineers and computer science students collaborating at a tech hub",
    },
  },
  {
    id: "elders-forum",
    kind: "announcement",
    eyebrow: "Announcement",
    title: "Zonal Elders Forum inaugurated",
    summary:
      "A standing council of professors advising the zone on research direction, curriculum and industry partnership.",
    meta: "Now seated",
    href: "/news/elders-forum",
    cta: "Read the announcement",
    tone: "green",
    image: {
      src: "/images/elders-forum.jpg",
      alt: "Distinguished council of professors and senior tech advisors meeting in an executive boardroom",
    },
  },
];

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  location: string;
  status: "Registration open" | "Waitlist" | "Save the date" | "Concluded";
  blurb: string;
  details: string[];
};

export const events: EventItem[] = [
  {
    slug: "zonal-it-assembly",
    title: "Zonal IT Assembly 2026",
    date: "November 2026",
    location: "Enugu",
    status: "Registration open",
    blurb:
      "The zone's flagship assembly. Chapter reports, elections, technical tracks and the annual zonal address.",
    details: [
      "Two days of plenary and parallel technical tracks",
      "Chapter delegate accreditation on day one",
      "Awards for outstanding chapters and student branches",
    ],
  },
  {
    slug: "rise-conference",
    title: "NCS RISE Conference",
    date: "July 2026",
    location: "Jos, Plateau State",
    status: "Concluded",
    blurb:
      "The national NCS conference. The zone travelled as a delegation — the event has now held.",
    details: [
      "National keynote and policy sessions",
      "Zonal delegation represented the SouthEast",
      "Recap available in the news feed",
    ],
  },
  {
    slug: "innovation-summit",
    title: "SouthEast Innovation Summit 2026",
    date: "14–16 May 2027",
    location: "International Conference Centre, Awka, Anambra State",
    status: "Registration open",
    blurb:
      "Theme: Engineering the SouthEast's Digital Future. Research meets industry — AI adoption, cybersecurity, IoT for smart governance and blockchain in public records.",
    details: [
      "Peer-reviewed papers with IEEE Nigeria SouthEast Sub Section",
      "Featured speakers from across the zone and industry partners",
      "Startup showcase and investor roundtable",
      "State ICT commissioners' panel",
    ],
  },
];

export const chapters = [
  {
    slug: "abia",
    name: "Abia State Chapter",
    lead: "Mr. Nathaniel Nwamuo",
    role: "Abia Representative",
    base: "Umuahia",
  },
  {
    slug: "anambra",
    name: "Anambra State Chapter",
    lead: "Engr. David Okeya",
    role: "Chairman, Anambra State",
    base: "Awka",
  },
  {
    slug: "ebonyi",
    name: "Ebonyi State Chapter",
    lead: "Dr. Blessing Iduh",
    role: "Chapter Lead",
    base: "Abakaliki",
  },
  {
    slug: "enugu",
    name: "Enugu State Chapter",
    lead: "Mrs. Nneka Agu",
    role: "Enugu Representative",
    base: "Enugu",
  },
  {
    slug: "imo",
    name: "Imo State Chapter",
    lead: "Dr. Oladimeji Saheed",
    role: "Chairman, Imo State",
    base: "Owerri",
  },
];

export const team = [
  { name: "Chidiebere Ugwuegbulam", role: "Zonal Coordinator" },
  { name: "Dr. Silas Ori", role: "Secretary" },
  { name: "Dr. Ijeoma Emeagi", role: "Director of Education" },
  { name: "Dr. Ogbaga", role: "Zonal Working Committee" },
  { name: "Mrs. Nneka Agu", role: "Enugu Representative" },
  { name: "Mr. Nathaniel Nwamuo", role: "Abia Representative" },
  { name: "Dr. Ifeyinwa", role: "Anambra Representative" },
  { name: "Engr. David Okeya", role: "Chairman, Anambra State" },
  { name: "Dr. Oladimeji Saheed", role: "Chairman, Imo State" },
  { name: "Dr. Emmanuel Ololo", role: "Member" },
  { name: "Dr. Blessing Iduh", role: "Member" },
  { name: "Mr. Sunny Onu", role: "Member" },
  { name: "Dr. Adaora O.", role: "Member" },
];

export const news = [
  {
    slug: "elders-forum",
    title: "Zonal Elders Forum inaugurated",
    date: "2026-08-14",
    excerpt:
      "A standing council of professors now advises the zone on research direction, curriculum alignment and industry partnership.",
  },
  {
    slug: "ieee-partnership",
    title: "Paper review partnership with IEEE Nigeria SouthEast Sub Section",
    date: "2026-07-02",
    excerpt:
      "Summit submissions will be peer reviewed jointly, raising the bar for zonal research output.",
  },
  {
    slug: "membership-drive",
    title: "Zonal membership drive targets 500 new members",
    date: "2026-06-19",
    excerpt:
      "All five chapters are running accredited sign-up desks through July 2026.",
  },
];

export const jobs = [
  {
    title: "Software Engineer (Backend)",
    org: "Zinox Computers",
    location: "Enugu · Hybrid",
    type: "Full-time",
  },
  {
    title: "Cybersecurity Analyst",
    org: "State ICT Agency",
    location: "Awka",
    type: "Full-time",
  },
  {
    title: "Data Analyst",
    org: "CBTng.Com",
    location: "Remote (Nigeria)",
    type: "Contract",
  },
  {
    title: "ICT Instructor",
    org: "OGSL Group",
    location: "Owerri",
    type: "Part-time",
  },
];

export const focusAreas = [
  "Artificial intelligence adoption",
  "Cybersecurity",
  "Smart governance and IoT",
  "Blockchain in public records",
  "Digital identity systems",
  "Responsible AI",
  "Cloud-native infrastructure",
];

export const contact = {
  email: "info@southeastzone.org.ng",
  phones: ["+234 806 474 7096", "+234 903 617 5625"],
  address: "SouthEast Zone, Nigeria Computer Society, Nigeria",
};
