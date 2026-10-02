export type Slide = {
  id: string;
  kind: "event" | "announcement" | "deadline" | "membership";
  layout?: "default" | "image-hero" | "speakers";
  eyebrow: string;
  title: string;
  titleAccent?: string;
  titleImage?: { src: string; alt: string; width: number; height: number };
  summary: string;
  meta: string;
  href: string;
  cta: string;
  secondaryCta?: { href: string; label: string };
  tone: "green" | "lime" | "red" | "blue" | "yellow";
  image?: {
    src: string;
    alt: string;
  };
  video?: {
    embedSrc: string;
    title: string;
  };
  facts?: { label: string; value: string }[];
  speakers?: {
    name: string;
    role: string;
    topic?: string;
    photo?: string;
    photoFit?: "cover" | "contain";
    photoSize?: "featured";
    note?: string;
    photoAlt?: string;
  }[];
};

export const slides: Slide[] = [
  {
    id: "innovation-summit-hero",
    kind: "event",
    layout: "image-hero",
    eyebrow: "Registration open · 12–14 November 2026",
    title: "NCS SouthEast",
    titleAccent: "Innovation Summit & Awards",
    titleImage: {
      src: "/images/summit-title.png",
      alt: "NCS SouthEast Innovation Summit & Awards",
      width: 2507,
      height: 528,
    },
    summary:
      "Connecting Research, Innovation, Enterprise and Technology for Regional Development",
    meta: "12–14 November 2026",
    href: "/register",
    cta: "Register for the Event",
    secondaryCta: { href: "/hackathon", label: "Join the Hackathon" },
    tone: "lime",
    image: {
      src: "/images/icc-awka-venue.jpg",
      alt: "The main hall at the International Conference Centre, Awka, set up for a large event",
    },
    video: {
      embedSrc:
        "https://res.cloudinary.com/ejr7iufx/video/upload/q_auto:good,f_auto,vc_auto,w_1920,h_1080,c_fill/v1790841268/WhatsApp_Video_2026-10-01_at_8.45.43_AM.mp4",
      title: "NCS SouthEast Innovation Summit & Awards",
    },
    facts: [
      { label: "Venue", value: "International Conference Centre, Awka" },
      { label: "Date", value: "12th to 14th November 2026" },
    ],
  },
  {
    id: "summit-experience",
    kind: "event",
    eyebrow: "Summit Experience",
    title: "What to expect at the Summit",
    summary:
      "Opening keynotes, AI and digital transformation sessions, the Innovation Hackathon, government–industry–academia engagement, research presentations, a technology showcase and the Leadership & Innovation Awards — over three days in Awka.",
    meta: "12–14 November 2026 · Awka",
    href: "/about",
    cta: "See the full experience",
    tone: "red",
    image: {
      src: "/images/summit-experience.jpg",
      alt: "Large crowd at a packed hall for the NCS SouthEast Innovation Summit experience",
    },
  },
  {
    id: "innovation-summit-speakers",
    kind: "event",
    layout: "speakers",
    eyebrow: "NCS SouthEast Innovation Summit & Awards 2026",
    title: "Featured speakers",
    summary:
      "Government, academia, industry, researchers and innovators taking the stage in Awka.",
    meta: "12–14 November 2026 · Awka",
    href: "/schedule",
    cta: "See the full schedule",
    tone: "green",
    image: {
      src: "/images/stock-speaker-stage.jpg",
      alt: "A speaker addressing a large audience from a stage at a technology conference",
    },
    speakers: [
      {
        name: "Gov. Charles Soludo",
        role: "Governor, Anambra State",
        photo: "/images/team/charles-soludo.jpg",
        photoSize: "featured",
        photoAlt:
          "Gov. Charles Soludo. Photo by Chinedueri, CC BY 4.0, via Wikimedia Commons",
      },
      {
        name: "Prof. Chinedu Nebo",
        role: "Keynote Speaker",
        photo: "/images/team/chinedu-nebo.jpg",
      },
      {
        name: "Dr. Chinwe Okoli",
        role: "SA to Anambra State Governor on Innovation & CEO, SID",
        photo: "/images/team/chinwe-okoli.png",
      },
      { name: "Unveiling Soon", role: "More speakers to be announced" },
      { name: "Unveiling Soon", role: "More speakers to be announced" },
    ],
  },
  {
    id: "innovation-hackathon",
    kind: "event",
    eyebrow: "Innovation Hackathon",
    title: "Build real solutions to real challenges",
    summary:
      "Young innovators, developers, researchers and entrepreneurs create technology solutions for challenges facing people, businesses, communities and government.",
    meta: "12–14 November 2026 · Awka",
    href: "/hackathon",
    cta: "Join the Hackathon",
    tone: "blue",
    image: {
      src: "/images/stock-hackathon.jpg",
      alt: "A developer writing code on a laptop at a hackathon",
    },
  },
  {
    id: "leadership-innovation-awards",
    kind: "event",
    eyebrow: "Leadership & Innovation Recognition",
    title: "Leadership & Innovation Awards",
    summary:
      "Recognizing government officials, industry leaders, researchers, entrepreneurs and innovators who have advanced technology, governance, enterprise and economic development.",
    meta: "12–14 November 2026 · Awka",
    href: "/events/innovation-summit",
    cta: "Nominate a leader",
    tone: "yellow",
    image: {
      src: "/images/stock-awards.jpg",
      alt: "Glass award trophies lined up on stage ahead of an awards ceremony",
    },
  },
  {
    id: "solution-innovation-district",
    kind: "announcement",
    eyebrow: "Strategic Partnership",
    title: "Anambra State Government joins as strategic partner",
    summary:
      "Through the Solution Innovation District (SID), Anambra State Government is supporting the Summit as a key strategic partner.",
    meta: "Strategic partner",
    href: "/sponsorship",
    cta: "See partnership opportunities",
    tone: "green",
    image: {
      src: "/images/stock-partnership.jpg",
      alt: "Government and industry partners in a meeting",
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

// The Summit is the zone's one event (the concept note calls it the SouthEast
// Zonal IT Assembly & Workshop). Registration, /events and the confirmation
// email all read from here.
export const events: EventItem[] = [
  {
    slug: "innovation-summit",
    title: "NCS SouthEast Innovation Summit & Awards",
    date: "12–14 November 2026",
    location: "International Conference Centre, Awka, Anambra State",
    status: "Registration open",
    blurb:
      "Theme: Technology-Enhanced Development in the Era of Artificial Intelligence: The Pros and the Cons. A high-impact regional platform connecting research, innovation, enterprise and technology for regional development.",
    details: [
      "Pillar I — Research Consortium: collaborative research with universities, industry and government",
      "Pillar II — Innovation Hackathon: practical technology solutions from young innovators and entrepreneurs",
      "Pillar III — Technology & Economic Development Dialogue: high-level conversations on productivity, investment and growth",
      "Pillar IV — Leadership & Innovation Recognition: awards for outstanding contributors to technology and development",
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
  {
    name: "Chidiebere Ugwuegbulam",
    role: "Zonal Coordinator",
    photo: "/images/team/chidiebere-ugwuegbulam.jpeg",
  },
  { name: "Dr. Silas Ori", role: "Secretary" },
  {
    name: "Dr. Ijeoma Emeagi",
    role: "Director of Education",
    photo: "/images/team/ijeoma-emeagi.png",
  },
  {
    name: "Dr. Ogbaga",
    role: "Zonal Working Committee",
    photo: "/images/team/ogbaga.png",
  },
  {
    name: "Mrs. Nneka Agu",
    role: "Enugu Representative",
    photo: "/images/team/nneka-agu.png",
  },
  {
    name: "Mr. Nathaniel Nwamuo",
    role: "Abia Representative",
    photo: "/images/team/nathaniel-nwamuo.png",
  },
  { name: "Dr. Ifeyinwa", role: "Anambra Representative" },
  {
    name: "Engr. David Okeya",
    role: "Chairman, Anambra State",
    photo: "/images/team/david-okeya.png",
  },
  {
    name: "Dr. Oladimeji Saheed",
    role: "Chairman, Imo State",
    photo: "/images/team/oladimeji-saheed.png",
  },
  {
    name: "Dr. Emmanuel Ololo",
    role: "Member",
    photo: "/images/team/emmanuel-ololo.png",
  },
  {
    name: "Dr. Blessing Iduh",
    role: "Member",
    photo: "/images/team/blessing-iduh.jpeg",
  },
  {
    name: "Mr. Sunny Onu",
    role: "Member",
    photo: "/images/team/sunny-onu.png",
  },
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
  "Artificial intelligence and digital transformation",
  "Research and the Research Consortium",
  "Innovation and entrepreneurship",
  "Technology and economic development",
  "Government, industry and academia partnership",
  "Leadership and innovation recognition",
];

export const objectives = [
  "Promote technology and Artificial Intelligence as drivers of regional economic development.",
  "Connect researchers, universities, industry and government around strategic regional challenges.",
  "Support innovators, developers and entrepreneurs to develop practical technology solutions.",
  "Facilitate partnerships, investment opportunities and collaboration across the technology ecosystem.",
  "Strengthen the connection between research, innovation and enterprise.",
  "Recognize individuals whose contributions have advanced technology, governance, entrepreneurship and economic development.",
  "Establish a lasting regional platform that contributes to the SouthEast's technology and innovation ecosystem.",
];

export const pillars = [
  {
    name: "Research Consortium",
    numeral: "I",
    detail:
      "A platform connecting researchers, universities, industry and government to undertake collaborative research addressing strategic challenges in the SouthEast.",
  },
  {
    name: "Innovation Hackathon",
    numeral: "II",
    detail:
      "A practical innovation program challenging young innovators, developers, researchers and entrepreneurs to create technology solutions addressing real challenges faced by individuals, businesses, communities and government.",
  },
  {
    name: "Technology & Economic Development Dialogue",
    numeral: "III",
    detail:
      "High-level conversations examining how technology can strengthen productivity, entrepreneurship, businesses, public services and government, while creating opportunities for investment and economic growth.",
  },
  {
    name: "Leadership & Innovation Recognition",
    numeral: "IV",
    detail:
      "The Summit & Awards will recognize outstanding government officials, industry leaders, researchers, entrepreneurs and innovators whose contributions have advanced technology, governance, enterprise and economic development.",
  },
];

export const summitDetails = {
  event: "NCS SouthEast Innovation Summit & Awards",
  tagline:
    "Connecting Research, Innovation, Enterprise and Technology for Regional Development.",
  theme:
    "Technology-Enhanced Development in the Era of Artificial Intelligence: The Pros and the Cons",
  date: "12–14 November 2026",
  venue: "International Conference Centre, Awka, Anambra State",
  organizer: "Nigeria Computer Society (NCS), SouthEast Zone",
};

export const contact = {
  email: "info@southeastzone.org.ng",
  phones: ["+234 806 474 7096", "+234 903 617 5625"],
  address: "SouthEast Zone, Nigeria Computer Society, Nigeria",
  website: "www.southeastncs.org.ng",
};

export const sponsors = [
  { name: "Zinox", src: "/images/zinox.png", width: 512, height: 288 },
  {
    name: "Anambra State Government — Solution Innovation District (SID)",
    src: "/images/solutioninnovationdistrict.png",
    width: 1474,
    height: 462,
  },
  {
    name: "Nigeria Computer Society",
    src: "/images/nationalncslogo.jpg",
    width: 738,
    height: 305,
  },
  { name: "IEEE", src: "/images/IEEE.jpg", width: 738, height: 405 },
];
