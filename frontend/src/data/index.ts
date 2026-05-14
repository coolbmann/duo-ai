export const AGENTS = [
  {
    id: "court-booking",
    name: "Court Booking Agent",
    desc: "Find available courts at a time of your choosing and provides quick-access booking links.",
    icon: "🎾",
    iconColor: "lime" as const,
    runs: 0,
    triggers: "Chat",
  },
  {
    id: "dupr-analysis",
    name: "DUPR Analysis Agent",
    desc: "Analyzes player DUPR ratings, match results and provides a detailed analysis of the player's performance.",
    icon: "💻",
    iconColor: "purple",
    runs: 0,
    triggers: "Chat",
  },
];

export const WORKFLOWS = [
  {
    id: "wf1",
    name: "Auto-book my Saturday game",
    desc: "Every Friday 6pm · finds a court, drafts the email, waits for my approval",
    trigger: "Scheduled",
    runs: 12,
    status: "live",
    icon: "🎾",
  },
  {
    id: "wf2",
    name: "Rain-check rebook",
    desc: "When weather forecast >70% rain, cancel outdoor and find indoor alternative",
    trigger: "Webhook",
    runs: 4,
    status: "live",
    icon: "☔",
  },
  {
    id: "wf3",
    name: "New player onboarding",
    desc: "When someone joins the crew, send them the playbook and add to group SMS",
    trigger: "Manual",
    runs: 7,
    status: "live",
    icon: "🤝",
  },
  {
    id: "wf4",
    name: "Tournament hunt",
    desc: "Weekly scan for local tournaments matching skill level 3.5+",
    trigger: "Scheduled",
    runs: 0,
    status: "paused",
    icon: "🏆",
  },
  {
    id: "wf5",
    name: "Court conditions check",
    desc: "Morning-of court inspection summary from booking partner data",
    trigger: "Scheduled",
    runs: 28,
    status: "live",
    icon: "📋",
  },
];

export const BOOKING_SYSTEMS = [
  {
    id: "voyager",
    name: "Voyager Tennis",
    type: "Pickleball",
    logoMark: "V",
    logoColor: "teal" as const,
    status: "connected",
    // connectedOn: "Mar 14",
    lastSync: "2 min ago",
    locations: [
      {
        name: "The Willis Recreation and Sports Centre (Willoughby)",
        courts: 8,
      },
      { name: "Seaforth (Wakehurst)", courts: 8 },
    ],
  },
  {
    id: "playtomic",
    name: "Playtomic",
    type: "Pickleball",
    logoMark: "P",
    logoColor: "orange" as const,
    status: "notConnected",
    // connectedOn: "Feb 02",
    lastSync: "-",
    locations: [
      // { name: "Padel Club - North Rocks", courts: 6 }
    ],
  },
  {
    id: "playbypoint",
    name: "PlayByPoint",
    type: "Pickleball",
    logoMark: "Pb",
    logoColor: "purple" as const,
    status: "notConnected",
    // connectedOn: "Apr 28",
    lastSync: "-",
    locations: [],
  },
];

export const COURTS = [
  {
    id: "redfern",
    name: "Redfern Pickleball Club",
    courts: 2,
    distance: "1.2km",
    price: "$24/court",
    time: "Sat 10:00–11:30",
    preferred: true,
    surface: "Cushioned acrylic",
  },
  {
    id: "marrickville",
    name: "Marrickville Sports Centre",
    courts: 4,
    distance: "2.4km",
    price: "$22/court",
    time: "Sat 10:30–12:00",
    surface: "Indoor",
  },
  {
    id: "centennial",
    name: "Centennial Park Courts",
    courts: 1,
    distance: "3.1km",
    price: "$18/court",
    time: "Sat 09:00–10:30",
    surface: "Outdoor",
  },
  {
    id: "alexandria",
    name: "Alexandria Padel & Pickleball",
    courts: 3,
    distance: "4.0km",
    price: "$28/court",
    time: "Sat 11:00–12:30",
    surface: "Premium indoor",
  },
];

export const SESSIONS = [
  {
    id: "s-7K3X9",
    title: "Saturday 10am at Redfern PC",
    status: "completed",
    agent: "Court Booking Agent",
    when: "2 hours ago",
  },
  {
    id: "s-7J2W4",
    title: "Indoor backup for Friday rain-out",
    status: "completed",
    agent: "Court Booking Agent",
    when: "Yesterday · 4:18 PM",
  },
  {
    id: "s-7H9V1",
    title: "Sunday morning with Priya + Dan",
    status: "completed",
    agent: "Court Booking Agent",
    when: "Sun · 8:02 AM",
  },
  {
    id: "s-7G6T8",
    title: "Find a court near Alexandria after work",
    status: "cancelled",
    agent: "Court Booking Agent",
    when: "Fri · 5:44 PM",
  },
  {
    id: "s-7F1S2",
    title: "Book my usual Saturday game",
    status: "completed",
    agent: "Court Booking Agent",
    when: "May 3",
  },
  {
    id: "s-7E8R5",
    title: "Tournament hunt — 3.5+ near Sydney",
    status: "failed",
    agent: "Court Booking Agent",
    when: "May 1",
  },
  {
    id: "s-7D2Q9",
    title: "Saturday morning rebook (rain check)",
    status: "completed",
    agent: "Court Booking Agent",
    when: "Apr 27",
  },
  {
    id: "s-7C4P3",
    title: "Quick singles match Thursday evening",
    status: "completed",
    agent: "Court Booking Agent",
    when: "Apr 23",
  },
  {
    id: "s-7B9N1",
    title: "Find an indoor court — Marrickville",
    status: "completed",
    agent: "Court Booking Agent",
    when: "Apr 20",
  },
];

export const FEED_SCRIPT = {
  parse: [
    {
      agent: "ORCHESTRATOR",
      msg: "routing to intent agent...",
      dur: null as number | null,
      status: "active",
      delay: 0,
    },
    {
      agent: "INTENT AGENT",
      msg: "parsing natural language input...",
      dur: null as number | null,
      status: "active",
      delay: 350,
    },
    {
      agent: "INTENT AGENT",
      msg: "extracted: sport=pickleball, day=saturday, time≈10am",
      dur: 184,
      status: "done",
      delay: 900,
    },
    {
      agent: "MEMORY AGENT",
      msg: "matched recurring booking pattern",
      dur: 42,
      status: "done",
      delay: 1200,
    },
  ],
  discover: [
    {
      agent: "ORCHESTRATOR",
      msg: "handing off to discovery...",
      dur: null as number | null,
      status: "active",
      delay: 100,
    },
    {
      agent: "DISCOVERY AGENT",
      msg: "querying 3 court APIs...",
      dur: null as number | null,
      status: "active",
      delay: 350,
    },
    {
      agent: "DISCOVERY AGENT",
      msg: "6 courts found within 5km",
      dur: 412,
      status: "done",
      delay: 1100,
    },
    {
      agent: "DISCOVERY AGENT",
      msg: "ranking by your preferences...",
      dur: null as number | null,
      status: "active",
      delay: 1300,
    },
    {
      agent: "DISCOVERY AGENT",
      msg: "top 4 ranked · 2 filtered out",
      dur: 88,
      status: "done",
      delay: 1700,
    },
  ],
  coordinate: [
    {
      agent: "ORCHESTRATOR",
      msg: "court selected, drafting booking...",
      dur: null as number | null,
      status: "active",
      delay: 100,
    },
    {
      agent: "BOOKING AGENT",
      msg: "reserving slot at Redfern PC...",
      dur: null as number | null,
      status: "active",
      delay: 400,
    },
    {
      agent: "BOOKING AGENT",
      msg: "hold placed (expires 5min)",
      dur: 612,
      status: "done",
      delay: 1200,
    },
    {
      agent: "PAYMENT AGENT",
      msg: "generating split-pay link...",
      dur: null as number | null,
      status: "active",
      delay: 1400,
    },
    {
      agent: "PAYMENT AGENT",
      msg: "link ready · $6/person × 4",
      dur: 220,
      status: "done",
      delay: 1900,
    },
    {
      agent: "EMAIL AGENT",
      msg: "drafting group email...",
      dur: null as number | null,
      status: "active",
      delay: 2100,
    },
    {
      agent: "EMAIL AGENT",
      msg: "draft ready, awaiting approval",
      dur: 156,
      status: "done",
      delay: 2500,
    },
  ],
  send: [
    {
      agent: "EMAIL AGENT",
      msg: "sending to 5 recipients...",
      dur: null as number | null,
      status: "active",
      delay: 100,
    },
    {
      agent: "EMAIL AGENT",
      msg: "delivered · 5/5",
      dur: 380,
      status: "done",
      delay: 800,
    },
    {
      agent: "BOOKING AGENT",
      msg: "finalizing reservation...",
      dur: null as number | null,
      status: "active",
      delay: 1100,
    },
    {
      agent: "BOOKING AGENT",
      msg: "confirmed · ref PB-7K3X9",
      dur: 290,
      status: "done",
      delay: 1600,
    },
    {
      agent: "ORCHESTRATOR",
      msg: "flow complete · 7.2s end-to-end",
      dur: null as number | null,
      status: "done",
      delay: 1900,
    },
  ],
};

export type FeedLine = {
  agent: string;
  msg: string;
  dur: number | null;
  status: "active" | "done" | "error";
  delay: number;
};
