import {
  LeaderProfile,
  RatingEntity,
  PodcastEpisode,
  RadioSchedule,
  BlogPost,
  Branch,
  Program,
  Cause
} from '../types';

export const leadersData: LeaderProfile[] = [
  {
    id: 'president',
    name: 'Hon. Dr. Michael K. Amakye',
    role: 'National President & Founder',
    since: 'Founding Member · Established 2018',
    avatarIcon: 'ShieldAlert',
    bio: 'Hon. Dr. Michael K. Amakye provides strategic leadership, national policy direction, and overall programmatic oversight for AMANI nationwide. Leveraging over fifteen years in international development coordination, Dr. Amakye collaborates closely with traditional rulers and Ghanaian ministries to prioritize resource mobilization directly aligned with sustainable community trust plans.',
    stats: [
      { val: '16', lbl: 'Regions Overseen' },
      { val: '2018', lbl: 'Year Founded' },
      { val: '275+', lbl: 'Constituencies' },
      { val: '7', lbl: 'Working Panels' }
    ],
    linkedinUrl: 'https://linkedin.com/in/michael-amakye-amani',
    twitterUrl: 'https://twitter.com/michael_amakye_amani',
    email: 'm.amakye@amani.org.gh'
  },
  {
    id: 'national-exec',
    name: 'Mrs. Evelyn Naa Shika Osei',
    role: 'National Executive Director',
    since: 'National Secretariat',
    avatarIcon: 'Briefcase',
    bio: 'Mrs. Evelyn Naa Shika Osei oversees standard operational workflows, financial coordination, and strategic integration across all regional networks of AMANI. A former policy analyst at the West African Development Alliance, her specialty is optimizing project cycle transparency by delivering audited performance evaluations directly to local community stakeholders.',
    stats: [
      { val: 'GHS 4.8M', lbl: 'Funds Mobilized' },
      { val: '24', lbl: 'Major Partners' },
      { val: '16', lbl: 'Regions Managed' },
      { val: '100%', lbl: 'Audit Transparency' }
    ],
    linkedinUrl: 'https://linkedin.com/in/evelyn-osei-amani',
    email: 'e.osei@amani.org.gh'
  },
  {
    id: 'programmes',
    name: 'Mr. Emmanuel Tetteh-Kofi',
    role: 'Director of Programmes',
    since: 'National Secretariat',
    avatarIcon: 'NotebookPen',
    bio: 'Mr. Emmanuel Tetteh-Kofi leads program formulation, grassroots focus studies, and PIP execution. He directs the operational efforts of the seven working committees, ensuring that boreholes, legal clinics, and agricultural distribution projects meet robust timelines and stringent compliance measures.',
    stats: [
      { val: '7', lbl: 'Committees Guided' },
      { val: '124', lbl: 'Completed Projects' },
      { val: '45k+', lbl: 'Beneficiaries' },
      { val: '98%', lbl: 'Satisfaction Score' }
    ],
    linkedinUrl: 'https://linkedin.com/in/emmanuel-tetteh-amani',
    email: 'e.tettehkofi@amani.org.gh'
  },
  {
    id: 'greater-accra',
    name: 'Nii Laryea Afotey III',
    role: 'Greater Accra Regional Chair',
    since: 'Regional Development Council',
    avatarIcon: 'MapPin',
    bio: 'Nii Laryea Afotey III manages our crucial urban and peri-urban intervention setups in Greater Accra. An engineer by training and traditional leader, Nii advocates passionately for municipal solid waste upgrades and low-income legal assistance coordination across Accra, Tema, and peripheral district blocks.',
    stats: [
      { val: '29', lbl: 'Districts Reached' },
      { val: 'GHS 1.2M', lbl: 'Mobilized' },
      { val: 'Active', lbl: 'Council Status' },
      { val: '2020', lbl: 'Year Established' }
    ],
    linkedinUrl: 'https://linkedin.com/in/nii-laryea-afotey-amani'
  },
  {
    id: 'ashanti',
    name: 'Nana Yaw Boakye-Yiadom',
    role: 'Ashanti Regional Chair',
    since: 'Regional Development Council',
    avatarIcon: 'Map',
    bio: 'Nana Yaw Boakye-Yiadom directs AMANI initiatives across Ashanti land, collaborating with traditional councils under the Golden Stool as well as local Assembly Members. Nana specializes in cocoa farming modernization programs and basic education classroom builds spanning isolated farming hamlets.',
    stats: [
      { val: '43', lbl: 'Districts Reached' },
      { val: 'GHS 950k', lbl: 'Mobilized' },
      { val: 'Active', lbl: 'Council Status' },
      { val: '2020', lbl: 'Year Established' }
    ],
    linkedinUrl: 'https://linkedin.com/in/nana-yaw-boakye-amani'
  },
  {
    id: 'northern',
    name: 'Alhaji Yusuf Yakubu',
    role: 'Northern Regional Chair',
    since: 'Regional Development Council',
    avatarIcon: 'Users',
    bio: 'Alhaji Yusuf Yakubu coordinates our critical Northern Development Trust initiatives. Focused heavily on high-impact WASH setups, dry-season livestock support, and extensive civic rights workshops, Alhaji Yakubu ensures marginal geographic zones receive rapid and direct donor attention.',
    stats: [
      { val: '16', lbl: 'Districts Reached' },
      { val: 'GHS 720k', lbl: 'Mobilized' },
      { val: 'Active', lbl: 'Council Status' },
      { val: '2021', lbl: 'Year Established' }
    ],
    linkedinUrl: 'https://linkedin.com/in/alhajiyusuf-yakubu-amani'
  }
];

export const officialsRatings: RatingEntity[] = [
  {
    id: 'off-1',
    rank: 1,
    name: 'Minister of Finance',
    subtitle: 'Ministry of Finance & Economic Planning',
    sector: 'Finance',
    score: 84,
    grade: 'A',
    trend: { type: 'up', value: 6 },
    reviewedDate: 'April 2026',
    details: 'Received high ratings for exceptional transparency in local development fund allocations, prompt release of statutory assembly common fund percentages, and robust budget presentation and integration models.'
  },
  {
    id: 'off-2',
    rank: 2,
    name: 'The Chief Justice',
    subtitle: 'Judicial Service of Ghana',
    sector: 'Judiciary',
    score: 79,
    grade: 'A',
    trend: { type: 'up', value: 3 },
    reviewedDate: 'April 2026',
    details: 'Commended for expanding community direct-court outreach schemes, reducing local land litigation backlogs, and introducing virtual court capabilities that benefit regional municipal centers.'
  },
  {
    id: 'off-3',
    rank: 3,
    name: 'Director General, Ghana Education Service',
    subtitle: 'National Education Coordinating Authority',
    sector: 'Education',
    score: 73,
    grade: 'B',
    trend: { type: 'flat', value: 0 },
    reviewedDate: 'April 2026',
    details: 'Acknowledged for stabilizing rural teacher supply frameworks and implementing robust basic teaching material supply checks, although localized classroom shortages persist in the mid-belts.'
  },
  {
    id: 'off-4',
    rank: 4,
    name: 'Minister of Health',
    subtitle: 'Ministry of Health',
    sector: 'Health',
    score: 58,
    grade: 'C',
    trend: { type: 'down', value: 4 },
    reviewedDate: 'April 2026',
    details: 'Criticized for sluggish timelines on community clinic staffing policies and uneven distribution of basic medical goods, though community-level health insurance registration has improved.'
  },
  {
    id: 'off-5',
    rank: 5,
    name: 'Regional Minister, Volta Coordination',
    subtitle: 'Volta Regional Coordinating Council',
    sector: 'Governance',
    score: 52,
    grade: 'C',
    trend: { type: 'down', value: 9 },
    reviewedDate: 'April 2026',
    details: 'Faced public concerns regarding slow infrastructural road repair oversight in southern municipal districts & lag in resolving dispute issues among localized market guilds.'
  },
  {
    id: 'off-6',
    rank: 6,
    name: 'Director of Public Health',
    subtitle: 'Ghana Health Service (Epidemiology Dept)',
    sector: 'Health',
    score: 34,
    grade: 'D',
    trend: { type: 'down', value: 12 },
    reviewedDate: 'April 2026',
    details: 'Severe public feedback concerning public sanitational surveillance campaigns, lack of response to waterborne threats, and low local immunization facility indicators in outskirt villages.'
  }
];

export const institutionsRatings: RatingEntity[] = [
  {
    id: 'inst-1',
    rank: 1,
    name: 'Ministry of Finance & Economic Planning',
    subtitle: 'National Fiscal and Treasury Authority',
    sector: 'Finance',
    score: 85,
    grade: 'A',
    trend: { type: 'up', value: 7 },
    reviewedDate: 'March 2026',
    details: 'Recognized for excellent automated disbursement systems, audit publication metrics, and the launch of a public resource monitoring dashboard.'
  },
  {
    id: 'inst-2',
    name: 'Electoral Commission of Ghana',
    rank: 2,
    subtitle: 'Independent Electoral Management Body',
    sector: 'Governance',
    score: 78,
    grade: 'A',
    trend: { type: 'up', value: 2 },
    reviewedDate: 'March 2026',
    details: 'Highly rated for proactive voter registry cleanups, decentralized card registration points, and consistent updates delivered via periodic IPAC reports.'
  },
  {
    id: 'inst-3',
    rank: 3,
    name: 'Ghana Education Service (GES)',
    subtitle: 'National Basic & Secondary Education Management',
    sector: 'Education',
    score: 66,
    grade: 'B',
    trend: { type: 'up', value: 1 },
    reviewedDate: 'March 2026',
    details: 'Showed steady improvement in distributing standardized curriculum textbooks, though peripheral rural schools reported persistent resource lags.'
  },
  {
    id: 'inst-4',
    rank: 4,
    name: 'Ghana Health Service (GHS)',
    subtitle: 'National Preventive & Curative Medicine Agency',
    sector: 'Health',
    score: 54,
    grade: 'C',
    trend: { type: 'down', value: 5 },
    reviewedDate: 'March 2026',
    details: 'Marked down heavily due to slow response to regional hospital upgrade petitions and low supply rates of specialized medicine to community clinics.'
  },
  {
    id: 'inst-5',
    rank: 5,
    name: 'District Health Authority (Northern Districts Block)',
    subtitle: 'Northern Regional Primary Healthcare Directorate',
    sector: 'Health',
    score: 29,
    grade: 'D',
    trend: { type: 'down', value: 14 },
    reviewedDate: 'March 2026',
    details: 'Lowest rated due to critical issues including persistent vaccine outreach cancellations, zero functional emergency response vehicles, and lack of basic prenatal care units across rural hubs.'
  }
];

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 'ep-1',
    episodeNumber: 88,
    title: 'Community Development Hour — Grassroots Resource Mobilization in 2026',
    category: 'Community Dev',
    duration: '48:32',
    date: 'June 13, 2026'
  },
  {
    id: 'ep-2',
    episodeNumber: 87,
    title: 'Local Government Accountability & The Role of Assembly Members',
    category: 'Governance',
    duration: '52:10',
    date: 'June 06, 2026'
  },
  {
    id: 'ep-3',
    episodeNumber: 86,
    title: 'Securing Primary Maternal Healthcare in Isolated Rural Centers',
    category: 'Health',
    duration: '44:15',
    date: 'May 30, 2026'
  },
  {
    id: 'ep-4',
    episodeNumber: 85,
    title: 'Understanding Citizen Legal Rights: Navigating Civic Education',
    category: 'Civic Ed',
    duration: '38:40',
    date: 'May 23, 2026'
  },
  {
    id: 'ep-5',
    episodeNumber: 84,
    title: 'Smallholder Agriculture Boosts: Evaluating the Planting for Food & Jobs Initiative',
    category: 'Agriculture',
    duration: '56:05',
    date: 'May 16, 2026'
  }
];

export const radioSchedule: RadioSchedule[] = [
  { day: 'Mon', time: '08:00', show: 'Morning Community Briefing', desc: 'Latest government announcements & local policy review' },
  { day: 'Tue', time: '14:00', show: 'Assembly Members Forum', desc: 'Live open caller dial-in with constituent assembly reps' },
  { day: 'Wed', time: '10:00', show: 'Community Development Hour', desc: 'Deep dives on direct funding checks, boreholes, and medical infrastructure' },
  { day: 'Thu', time: '15:00', show: 'Voices of Tradition & Chiefs', desc: 'Exploring traditional rulers\' advisory roles in structural modern development' },
  { day: 'Fri', time: '17:00', show: 'AMANI State of the Nation Review', desc: 'Week in review highlights, rating analysis, and local feedback' }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How AMANI\'s Community Reference Code System is Revolutionizing Resource Accountability',
    category: 'Community Dev',
    excerpt: 'An evidence-based audit on how directing public donations to specific communities through unique identification tokens blocks financial leakages and ensures visible local impact.',
    content: `For decades, community funding across Sub-Saharan Africa has suffered from a lack of direct linkage. Universal funding pots are often consumed by overhead administration costs, leaving isolated community centers with empty hands. 

To solve this, AMANI launched the **Community Reference Code System**. Each participating town has a unique identifier (e.g., *AR-004* for Kwadaso, *GA-012* for Ga East). When donors complete transactions (Mobile Money, credit tokens, or bank networks) appending this code, the system isolates the payment directly to that constituency trust ledger. 

Our Q1 2026 impact reviews indicated that this simple, structural accountability protocol improved resource execution timelines by **74%**, and increased local donor return rates by **82%** because of a singular fact: every single GHS donated translates directly to visible local structures, tracked and audited by resident chiefs.`,
    author: 'AMANI Research Directorate',
    date: 'June 10, 2026',
    readTime: '10 min read',
    icon: 'BookOpen'
  },
  {
    id: 'blog-2',
    title: 'The Role of Assembly Rulers in Monitoring Infrastructure Projects',
    category: 'Governance',
    excerpt: 'Practical guidelines on how elected officials coordinate with traditional authorities to run community-wide inspections on borehole and educational construction sites.',
    content: `Civic development thrives when institutional government meshes seamlessly with traditional rulers on the ground. When AMANI deploys a community resource project, we require dual inspection panels: the traditional Chiefs and the elected Assembly Members. 

This post offers key lessons from the Ashanti expansion blocks. By requiring both bodies to co-sign the Quality of Build checklist prior to final PIP contractor payout, we successfully eliminated low-integrity drilling and poor quality structural cement work on over 14 classroom blocks.`,
    author: 'Nii Laryea Afotey III',
    date: 'May 28, 2026',
    readTime: '7 min read',
    icon: 'UserCheck'
  },
  {
    id: 'blog-3',
    title: 'Primary Healthcare Gaps in the Northern Regions: A Data-Driven Study',
    category: 'Health',
    excerpt: 'An overview of clinical access bottlenecks, mapping physical distances to maternal care infrastructure, and the immediate interventions being led by community trusts.',
    content: `AMANI Health surveys conducted across 48 remote settlements in the Northern Region revealed that rural families walk an average of 18 kilometers to reach emergency maternal services. This distance, coupled with unpaved road networks, spikes local child morbidity indicators during rain delays.

Through the *Community Development Trust*, AMANI has begun funding a network of rapid-delivery motorcycle ambulances with local partner PIPs, ensuring secure, high-integrity transport for isolated clinics.`,
    author: 'Mr. Emmanuel Tetteh-Kofi',
    date: 'May 18, 2026',
    readTime: '6 min read',
    icon: 'Pulse'
  },
  {
    id: 'blog-4',
    title: 'Evaluating Q1 2026 Institutional Performance Standards',
    category: 'Reports',
    excerpt: 'Detailed methodology breakdown of the independent ratings index, explaining public surveys, digital audit tracking, and direct citizen response parameters.',
    content: `AMANI\'s rating framework operates with the objective structure of international financial watchdogs. We do not rate based on rumor; we rate based on **five structured sub-pillars**:
1. Statutory Fund Disbursement Timely Speed (30%)
2. Decentralized Local Access Integrity (20%)
3. Public Project Audit Publication Transparency (20%)
4. Direct Citizen Assistance Quality (15%)
5. Technical Project Execution Efficiency (15%)

Citizen surveys are conducted on-site in 16 regions, ensuring represented feedback that counters centralized capital bias.`,
    author: 'Mrs. Evelyn Naa Shika Osei',
    date: 'April 30, 2026',
    readTime: '4 min read',
    icon: 'ChartBar'
  }
];

export const branchesData: Branch[] = [
  {
    id: 'br-acc',
    region: 'Greater Accra Region (National Headquarters)',
    cities: 'Accra Metropolitan Area · Tema · Ga East · Ga West · Dangme East',
    status: 'Active',
    programs: 'All 7 working committees fully active with local PIP directories',
    icon: 'Building'
  },
  {
    id: 'br-ash',
    region: 'Ashanti Region',
    cities: 'Kumasi Metropolitan · Suame · Oforikrom · Kwadaso · Obuasi',
    status: 'Active',
    programs: 'Agriculture & cocoa livelihood, educational supplies, GHS monitoring',
    icon: 'Map'
  },
  {
    id: 'br-nrt',
    region: 'Northern Region',
    cities: 'Tamale Metropolitan · Sagnarigu · Tolon · Yendi Area',
    status: 'Active',
    programs: 'WASH clean boreholes, humanitarian aid delivery, trade support clinics',
    icon: 'Compass'
  },
  {
    id: 'br-wst',
    region: 'Western Region',
    cities: 'Sekondi-Takoradi · Effia-Kwesimintsim · Tarkwa-Nsuaem',
    status: 'Active',
    programs: 'Environmental climate checks, clinical support, community safe-water',
    icon: 'Anchor'
  },
  {
    id: 'br-vol',
    region: 'Volta Region',
    cities: 'Ho · Hohoe · Keta · Tongu Districts Area',
    status: 'Active',
    programs: 'Civic education programs, agricultural cooperative networks, free legal aid',
    icon: 'Lightbulb'
  },
  {
    id: 'br-cnt',
    region: 'Central Region',
    cities: 'Cape Coast · Elmina · Assin Fosu · Komenda-Edina Area',
    status: 'Newly Established',
    programs: 'Classroom framework additions, teacher supply, maternal care logistics',
    icon: 'School'
  },
  {
    id: 'br-est',
    region: 'Eastern Region',
    cities: 'Koforidua · Nsawam · Nkawkaw · Akuapem Districts',
    status: 'Newly Established',
    programs: 'Civic education programs, sustainable reforestation support',
    icon: 'TreePine'
  },
  {
    id: 'br-ue',
    region: 'Upper East Region',
    cities: 'Bolgatanga · Bawku · Navrongo · Bongo Constituency',
    status: 'Active',
    programs: 'Dry-season agricultural boreholes, health facility aid networks',
    icon: 'Droplets'
  }
];

export const programsData: Program[] = [
  {
    id: 'prog-health',
    name: 'Health & Humanitarian Support',
    committee: 'Humanitarian & Infrastructure Committee',
    themeColor: 'green',
    icon: 'HeartPulse',
    description: 'Directly coordinates clinical infrastructural additions, provides maternal healthcare logistics to remote settlements, and operates a direct individual humanitarian emergency funding channel.',
    metrics: [
      { val: '210+', lbl: 'Vulnerable Assisted' },
      { val: '16', lbl: 'Active Regions' },
      { val: 'GHS 1.8M', lbl: 'Spent on Clinics' }
    ],
    tags: ['Health', 'Humanitarian', 'WASH']
  },
  {
    id: 'prog-edu',
    name: 'Education & Capacity Building',
    committee: 'Employee Committee',
    themeColor: 'blue',
    icon: 'GraduationCap',
    description: 'Mobilizes resources for basic public school classroom frameworks, distributes localized reading libraries, and recruits & trains community executive volunteers.',
    metrics: [
      { val: '84', lbl: 'Schools Retooled' },
      { val: '22k+', lbl: 'Pupils Supported' },
      { val: '3,200', lbl: 'Executive Volunteers' }
    ],
    tags: ['Education', 'Youth Skills', 'Coaching']
  },
  {
    id: 'prog-agric',
    name: 'Agriculture, Trade & Local Business Boosts',
    committee: 'Agric & Trade Committee',
    themeColor: 'orange',
    icon: 'Tractor',
    description: 'Promotes smart cooperative agricultural networks, links cocoa and shea farmers with wholesale buyers, and runs small-scale microfinance trading grants.',
    metrics: [
      { val: '420', lbl: 'Farming Leads Coached' },
      { val: '8', lbl: 'Cooperative Stores' },
      { val: '150+', lbl: 'Trade Grants Issued' }
    ],
    tags: ['Agriculture', 'Trade Livelihoods', 'Cooperative']
  },
  {
    id: 'prog-env',
    name: 'Environment, WASH & Climate Resilience',
    committee: 'Environmental Committee',
    themeColor: 'green',
    icon: 'Leaf',
    description: 'Facilitates clean deep-borehole drilling, supports environmental sanitation programs with local waste champions, and trains towns in climate-ready dry farming.',
    metrics: [
      { val: '12', lbl: 'Drilled Boreholes' },
      { val: '3,200+', lbl: 'With Daily Clean Water' },
      { val: '42', lbl: 'Waste Stations Built' }
    ],
    tags: ['Sanitation', 'WASH', 'Resilience']
  },
  {
    id: 'prog-civic',
    name: 'Civic Education & Government Policy Outreach',
    committee: 'Civic Education Committee',
    themeColor: 'blue',
    icon: 'Megaphone',
    description: 'Acts as a direct informational pipeline between central government policy releases (e.g., healthcare registry, educational loans) and high-density interior communities.',
    metrics: [
      { val: '24', lbl: 'Town Assemblies' },
      { val: '1,800+', lbl: 'Advised Residents' },
      { val: '100%', lbl: 'Non-Partisan Mandate' }
    ],
    tags: ['Civic Rights', 'Public Intelligence', 'Outreach']
  },
  {
    id: 'prog-legal',
    name: 'Legal Aid & Community Mediation Services',
    committee: 'Legal Aid Committee',
    themeColor: 'dark',
    icon: 'Scale',
    description: 'Brings free legal advocacy, family support services, property mediation, and statutory civil rights counseling directly to underserved constituents and traditional rulers.',
    metrics: [
      { val: '6', lbl: 'Free Legal Clinics' },
      { val: '1,800', lbl: 'Legal Clients Advised' },
      { val: '15', lbl: 'Volunteer Barristers' }
    ],
    tags: ['Free Legal Aid', 'Dispute Mediation', 'Rights']
  }
];

export const causesData: Cause[] = [
  {
    id: 'cause-health',
    name: 'Community Health Infrastructure Support',
    description: 'Equipping village CHP compounds with emergency vaccine refrigeration solar units, basic beds, and clean piped sanitation facilities.',
    goalAmount: 100000,
    raisedAmount: 68000,
    icon: 'HeartPulse',
    thumbClass: 'g1'
  },
  {
    id: 'cause-edu',
    name: 'Education & Classroom Blocks retuning',
    description: 'Funding dry, premium corrugated steel roofing sheets and modular student desks for basic schools in high-wind zones.',
    goalAmount: 100000,
    raisedAmount: 54000,
    icon: 'School',
    thumbClass: 'g2'
  },
  {
    id: 'cause-humanitarian',
    name: 'Humanitarian & Individual Emergency Support',
    description: 'A dedicated relief fund providing targeted medicine, food logistics, and support parcels directly to families struck by crisis.',
    goalAmount: 100000,
    raisedAmount: 42000,
    icon: 'Activity',
    thumbClass: 'g3'
  },
  {
    id: 'cause-civic',
    name: 'Civic Education Campaigns & Digital Public Radio',
    description: 'Funding public community sound systems, printing local policy translation booklets, and supporting independent broadcast tools.',
    goalAmount: 50000,
    raisedAmount: 38000,
    icon: 'Megaphone',
    thumbClass: 'g4'
  },
  {
    id: 'cause-agric',
    name: 'Agricultural seed logistics & Shea cooperative grants',
    description: 'Delivering direct moisture-resistant seed packages and manual organic processing machines to local women shea associations.',
    goalAmount: 100000,
    raisedAmount: 38000,
    icon: 'Tractor',
    thumbClass: 'g5'
  },
  {
    id: 'cause-legal',
    name: 'Legal Aid clinics & dispute resolution centers',
    description: 'Supporting mobile community clinics where real attorneys resolve land registry disputes and protect individual citizen civil rights.',
    goalAmount: 100000,
    raisedAmount: 61000,
    icon: 'Scale',
    thumbClass: 'g6'
  }
];
