import { summitDetails } from "./content";

export const HACKATHON_FORM = "https://forms.gle/TWBUjnNynFT8KojN9";

export type ScheduleEntry = {
  time?: string;
  title: string;
  duration?: string;
  people?: string[];
  sub?: { title?: string; person: string }[];
  kind?: "break";
};

export type ScheduleDay = {
  id: string;
  day: string;
  heading: string;
  entries: ScheduleEntry[];
};

export const scheduleNote =
  "Tentative programme. Sessions, speakers and timings may change as confirmations come in.";

export const schedule: ScheduleDay[] = [
  {
    id: "day-1",
    day: "Day 1 · 13 November",
    heading: "Arrival & networking",
    entries: [
      {
        title: "Arrival, registration, networking and rest",
        time: "All day",
        sub: [
          { title: "Arrival", person: "" },
          { title: "Registration", person: "" },
          { title: "Networking", person: "" },
          { title: "Rest", person: "" },
        ],
      },
    ],
  },
  {
    id: "day-2",
    day: "Day 2 · 14 November",
    heading: "Opening, policy & the AI economy",
    entries: [
      { time: "8:00 AM", title: "Arrival and registration", duration: "2 hrs" },
      {
        time: "10:00 AM",
        title: "Official Opening Ceremony",
        duration: "2 hrs",
        people: ["MC: Dr. Silas Ori"],
        sub: [
          { title: "Introduction of dignitaries, National Anthem, NCS Anthem", person: "" },
          { title: "LOC Chairman address", person: "Anambra State Chapter Chairman" },
          { title: "State welcome address", person: "SSA to Governor Anambra State on Innovations" },
          { title: "Welcome address", person: "Ugwuegbulam Chidiebere, NCS Zonal Coordinator, SouthEast Zone" },
          { title: "Opening address: AI as catalyst for regional economic development", person: "Chief Leo Stan" },
          { title: "Goodwill message", person: "Dr. Charles Onyeukwu, Deputy President, Nigeria Computer Society" },
          { title: "Goodwill message", person: "Dr. Donatus Njoku, IEEE Conference Coordinator, SouthEast Nigeria Section" },
          { title: "Keynote 1: Technology-Enhanced Development in the Era of AI: The Pros and the Cons", person: "Prof. Chinedu Nebo" },
          { title: "Host Governor's address and official opening of the event", person: "" },
          { title: "Closing remark", person: "Prof. Virginia Ejiofor, Lead, Programmes Committee" },
          { title: "Group photograph", person: "Dr. Ogbaga, Zonal Working Committee" },
        ],
      },
      { title: "Tea break", kind: "break" },
      {
        title: "Panel Discussion 1: Digital Governance and e-Government in Public Service",
        duration: "45 mins",
        sub: [
          { person: "Commissioner for Digital Economy and e-Government, Imo State" },
          { person: "Commissioner for Enterprise Development, Enugu State" },
          { person: "SA to Governor on Innovation and Economic Development, Anambra State" },
          { person: "SSA to the Governor on Science and Technology, Abia State" },
          { person: "DG, Ebonyi IT Development Agency, Ebonyi State" },
        ],
      },
      {
        title: "Symposium 1: Preparing the Zonal Workforce for the AI Economy",
        duration: "45 mins",
        sub: [
          { title: "SouthEast development roadmap: partnership opportunities for businesses and researchers", person: "Hon. Mark Okoye, CEO, SouthEast Development Commission (SEDC)" },
          { title: "Government interventions and enterprise support for SouthEast businesses and startups", person: "Mr. Charles Odii, DG, SMEDAN" },
          { title: "Federal policies, regulations and infrastructure that favour tech businesses and startups", person: "Dr. A. Onumo, Director, Stakeholders Management and Partnerships, NITDA" },
          { title: "Tax payment: what SouthEast businesses and startups need to know", person: "Chief Keneth Egbufo, Divisional Head, Revenue Assurance, National Revenue Service" },
        ],
      },
      {
        title: "Guest Speaker 1: Transforming Education and Research with Artificial Intelligence",
        duration: "15 mins",
        people: ["Prof. Bond Anyaehie, Vice Chancellor, Nnamdi Azikiwe University, Awka (UniZik)"],
      },
      { title: "Lunch", kind: "break" },
      {
        title: "Fire Chat 1: Igba Boi in the AI Era: Leveraging Technology to Transform Apprenticeship and Drive Entrepreneurship",
        duration: "45 mins",
        sub: [
          { title: "AI-powered startups: formation, ecosystem sustainability skills and opportunities", person: "CITP Andrew Agbo, Founder, Young Innovators of Nigeria (YIN)" },
          { title: "Extending Igba Boi into IoT: new skills for innovation, projects and enterprise", person: "Dr. Agu Collins Agu, Founder & Chief Digital Architect, TD4PAI IoT Hub, Abuja" },
          { title: "Extending Igba Boi into software development: lucrative skills for the digital economy", person: "Dr. Pius Okigbo Junior, MD, Nigeria Local Content Management Agency" },
          { title: "Student entrepreneurship: a catching-them-young strategy", person: "Dr. Ijeoma Emeagi, Director, Entrepreneurship Directorate, Federal Polytechnic Nekede" },
        ],
      },
      {
        title: "Cyber Security in the Era of AI",
        duration: "15 mins",
        people: ["Dr. Ifeyinwa Okoye, Immediate past Chairman, Anambra State"],
      },
      {
        title: "Fire Chat 2: Professional Practice: A Catalyst for SouthEast Regional Development",
        duration: "30 mins",
        sub: [
          { title: "New IT cadre circular of the Head of Civil Service", person: "Dr. Charles Onyeukwu, Deputy President, Nigeria Computer Society" },
          { title: "Participation and benefits of membership of NCS and CPN", person: "Engr. Chidi Ugwuegbulam, NCS SouthEast Zonal Coordinator; Mrs. Nneka Agu, Chairman, Publicity Committee" },
          { title: "Chapter membership strength: building new members, activating old ones", person: "Chapter chairmen of Imo, Anambra, Ebonyi, Abia and Enugu States" },
        ],
      },
      {
        title: "Closing remark",
        duration: "10 mins",
        people: ["Mrs. Nneka Agu, Chairman, Publicity and Sponsorship Committee"],
      },
      {
        title: "SouthEast Zonal Anthem and closing prayer",
        duration: "15 mins",
        people: ["Dr. Blessing Iduh, HOD Information Technology, UniZik"],
      },
      {
        time: "8:00 PM",
        title: "High-impact exclusive meeting",
        people: ["HODs, Chapter Chairmen and Zonal Coordinator"],
      },
    ],
  },
  {
    id: "day-3",
    day: "Day 3 · 15 November",
    heading: "Research, AGM & Award Night",
    entries: [
      { time: "9:00 AM", title: "Introductions by the MC" },
      { title: "Opening prayer", duration: "10 mins", people: ["Dr. Adaora, Zonal Working Committee"] },
      { title: "Zonal anthem", duration: "10 mins", people: ["Mr. Nathaniel Nwamuo, Zonal Working Committee"] },
      {
        title: "Keynote 2: AI-Powered Igbo Apprenticeship (Igba Boi) and Entrepreneurship",
        duration: "20 mins",
        people: ["Barr. Osita Oparaugo"],
      },
      {
        title: "Symposium 3: Research, a Serious Business and Catalyst to Zonal Development",
        duration: "35 mins",
        sub: [
          { title: "Research grants: the best practices", person: "Dr. Donatus Njoku, IEEE Conference Coordinator, SouthEast Nigeria Section" },
          { title: "Research to startup in the new era of AI", person: "Engr. Chidi Ugwuegbulam, CEO, CodeSpace Technology Ltd, Abuja" },
          { title: "Scopus made easier: the practical path to a publishable, Scopus-ready paper", person: "Prof. A. Ifeanyi, Dean of SICT, Ebonyi State University" },
        ],
      },
      {
        title: "Guest Speaker: Deepfakes and Phishing: AI Attacks, AI Defence",
        duration: "15 mins",
        people: ["Mr. Alex Otuonye, MD, Cyberetics Nigeria"],
      },
      { title: "General pictures", duration: "10 mins", people: ["Dr. Sunny Onu, Zonal Working Committee"] },
      { time: "11:00 AM", title: "Tea break", kind: "break" },
      { title: "Three parallel sessions on paper presentation", duration: "2 hrs" },
      { time: "1:00 PM", title: "Lunch", kind: "break" },
      {
        title: "Research Consortium",
        duration: "30 mins",
        people: [
          "Prof. Vincent Aso, Chairman, Paper Review Committee",
          "Gift Adene, Zonal Working Committee",
        ],
      },
      {
        title: "SouthEast Zone AGM",
        duration: "2 hrs",
        people: ["Ugwuegbulam Chidiebere, SouthEast Zonal Coordinator"],
      },
      { title: "Closing remark", duration: "5 mins", people: ["Dr. Ogbaga Ifeanyi, Zonal Working Committee"] },
      {
        time: "7:30 PM",
        title: "Dinner & Award Night",
        sub: [
          { title: "Zonal IT game (20 mins)", person: "Nathaniel Nwamuo, NIMC, Abia State" },
          { title: "Hackathon / STEM presentation (20 mins)", person: "Hon. Elvis Obi-Nwankwo, Head of Innovations Committee" },
          { title: "Awards (1 hr)", person: "Dr. Adaora, University of Nigeria, Nsukka" },
          { title: "Closing remark (10 mins)", person: "Prof. Virginia Ejiofor, Dean of SICT, UniZik" },
          { title: "Closing prayer (5 mins)", person: "Dr. Chinedu, Secretary, Programmes Committee" },
        ],
      },
      { time: "9:30 PM", title: "Closure" },
    ],
  },
];

export const hackathon = {
  intro:
    "Young innovators, developers, researchers and entrepreneurs are challenged to create practical technology solutions to problems affecting individuals, businesses, communities and government.",
  facts: [
    { label: "Event", value: summitDetails.event },
    { label: "Dates", value: summitDetails.date },
    { label: "Venue", value: summitDetails.venue },
    { label: "Showcase", value: "Hackathon / STEM presentation, Dinner & Award Night" },
    { label: "Team size", value: "To be announced" },
    { label: "Prizes", value: "To be announced" },
  ],
  challenges: [
    {
      name: "Individuals",
      detail:
        "Tools that make everyday life easier, safer and more productive for people across the SouthEast.",
    },
    {
      name: "Businesses",
      detail:
        "Solutions that help businesses and startups grow, operate efficiently and compete in the digital economy.",
    },
    {
      name: "Communities",
      detail:
        "Technology that solves local problems in education, health, agriculture, safety and beyond.",
    },
    {
      name: "Government",
      detail:
        "Digital tools that improve public services, governance and citizen engagement.",
    },
  ],
  eligibility: [
    "Open to young innovators, developers, researchers and entrepreneurs.",
    "Your solution must address a real problem faced by individuals, businesses, communities or government.",
    "Solutions should use technology, including Artificial Intelligence where it adds value, in line with the Summit theme.",
    "Selected teams present their solutions at the Summit in Awka.",
  ],
  criteria: [
    { name: "Relevance", detail: "How clearly the solution addresses a real, regional problem." },
    { name: "Innovation", detail: "How original and creative the approach is." },
    { name: "Feasibility", detail: "How well the solution works, or could work, in practice." },
    { name: "Impact & enterprise value", detail: "Potential to grow into a sustainable enterprise that creates economic value." },
    { name: "Responsible technology", detail: "Awareness of the pros and the cons of the technology used." },
    { name: "Presentation", detail: "How clearly the team communicates the problem, solution and impact." },
  ],
  steps: [
    { name: "Review the brief", detail: "Read the challenge areas, eligibility and judging criteria on this page." },
    { name: "Register", detail: "Complete the registration form. It opens in Google Forms in a new tab." },
    { name: "Build", detail: "Develop a practical solution to a problem you care about." },
    { name: "Present", detail: "Showcase your solution at the Hackathon / STEM presentation on the final evening of the Summit." },
  ],
  note: "Team size, prizes and the submission deadline will be announced. Watch this page and the Summit channels for updates.",
};
