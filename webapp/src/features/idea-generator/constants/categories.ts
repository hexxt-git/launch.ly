export type TechnologyCategory =
  | 'ai'
  | 'blockchain'
  | 'cloud'
  | 'web'
  | 'mobile'
  | 'video'
  | 'data'
  | 'devops'
  | 'iot'
  | 'gamedev'
  | 'security'
  | 'design'
  | 'other'

// A generic category type for other pickers
export type PickerCategory =
  | TechnologyCategory
  | 'connectivity'
  | 'cost'
  | 'usability'
  | 'service'
  | 'compatibility'
  | 'reliability'
  | 'scalability'
  | 'monetization'
  | 'user_engagement'
  | 'data_management'
  | 'development_workflow'
  | 'age'
  | 'profession'
  | 'interest'
  | 'geography'
  | 'tech_savviness'
  | 'psychographic'
  | 'environment'
  | 'social'
  | 'health'
  | 'education'
  | 'work'
  | 'lifestyle'
  | 'finance'
  | 'commerce'
  | 'art_culture'
  | 'governance'
  | 'futurism'

export interface CategoryColors {
  border: string
  bg: string
  selectedBorder: string
  text: string
}

export interface TechnologyTag {
  id: string
  text: string
  category: TechnologyCategory
}

export interface PickerItem {
  id: string
  text: string
  category: PickerCategory
}

export interface PickerCategoryConfig {
  id: PickerCategory
  name: string
  color: string
}

export interface PickerConfig {
  title: string
  items: PickerItem[]
  categories: PickerCategoryConfig[]
}

/**
 * Master color configur  ation for all categories across the application.
 * This ensures a consistent color scheme for tags, filters, and other UI elements.
 */
export const CATEGORY_COLORS: Record<string, CategoryColors> = {
  // Technology Categories
  ai: {
    border: 'from-red-500/60 to-red-600/40',
    bg: 'from-red-500/20 to-red-600/10',
    selectedBorder: 'border-red-400/50',
    text: 'text-red-300',
  },
  blockchain: {
    border: 'from-blue-500/60 to-blue-600/40',
    bg: 'from-blue-500/20 to-blue-600/10',
    selectedBorder: 'border-blue-400/50',
    text: 'text-blue-300',
  },
  cloud: {
    border: 'from-green-500/60 to-green-600/40',
    bg: 'from-green-500/20 to-green-600/10',
    selectedBorder: 'border-green-400/50',
    text: 'text-green-300',
  },
  web: {
    border: 'from-purple-500/50 to-purple-600/30',
    bg: 'from-purple-500/15 to-purple-600/8',
    selectedBorder: 'border-purple-400/40',
    text: 'text-purple-300',
  },
  mobile: {
    border: 'from-pink-500/50 to-pink-600/30',
    bg: 'from-pink-500/15 to-pink-600/8',
    selectedBorder: 'border-pink-400/40',
    text: 'text-pink-300',
  },
  video: {
    border: 'from-orange-500/60 to-orange-600/40',
    bg: 'from-orange-500/20 to-orange-600/10',
    selectedBorder: 'border-orange-400/50',
    text: 'text-orange-300',
  },
  data: {
    border: 'from-yellow-500/60 to-yellow-600/40',
    bg: 'from-yellow-500/20 to-yellow-600/10',
    selectedBorder: 'border-yellow-400/50',
    text: 'text-yellow-300',
  },
  devops: {
    border: 'from-cyan-500/60 to-cyan-600/40',
    bg: 'from-cyan-500/20 to-cyan-600/10',
    selectedBorder: 'border-cyan-400/50',
    text: 'text-cyan-300',
  },
  iot: {
    border: 'from-teal-500/60 to-teal-600/40',
    bg: 'from-teal-500/20 to-teal-600/10',
    selectedBorder: 'border-teal-400/50',
    text: 'text-teal-300',
  },
  gamedev: {
    border: 'from-indigo-500/60 to-indigo-600/40',
    bg: 'from-indigo-500/20 to-indigo-600/10',
    selectedBorder: 'border-indigo-400/50',
    text: 'text-indigo-300',
  },
  design: {
    border: 'from-fuchsia-500/60 to-fuchsia-600/40',
    bg: 'from-fuchsia-500/20 to-fuchsia-600/10',
    selectedBorder: 'border-fuchsia-400/50',
    text: 'text-fuchsia-300',
  },
  other: {
    border: 'from-gray-500/50 to-gray-600/30',
    bg: 'from-gray-500/15 to-gray-600/8',
    selectedBorder: 'border-gray-400/40',
    text: 'text-gray-300',
  },
  // Problem Categories
  connectivity: {
    border: 'from-sky-500/60 to-sky-600/40',
    bg: 'from-sky-500/20 to-sky-600/10',
    selectedBorder: 'border-sky-400/50',
    text: 'text-sky-300',
  },
  security: {
    border: 'from-rose-500/60 to-rose-600/40',
    bg: 'from-rose-500/20 to-rose-600/10',
    selectedBorder: 'border-rose-400/50',
    text: 'text-rose-300',
  },
  cost: {
    border: 'from-emerald-500/60 to-emerald-600/40',
    bg: 'from-emerald-500/20 to-emerald-600/10',
    selectedBorder: 'border-emerald-400/50',
    text: 'text-emerald-300',
  },
  usability: {
    border: 'from-violet-500/60 to-violet-600/40',
    bg: 'from-violet-500/20 to-violet-600/10',
    selectedBorder: 'border-violet-400/50',
    text: 'text-violet-300',
  },
  scalability: {
    border: 'from-teal-500/60 to-teal-600/40',
    bg: 'from-teal-500/20 to-teal-600/10',
    selectedBorder: 'border-teal-400/50',
    text: 'text-teal-300',
  },
  monetization: {
    border: 'from-amber-500/60 to-amber-600/40',
    bg: 'from-amber-500/20 to-amber-600/10',
    selectedBorder: 'border-amber-400/50',
    text: 'text-amber-300',
  },
  // Audience Categories
  age: {
    border: 'from-blue-500/60 to-blue-600/40',
    bg: 'from-blue-500/20 to-blue-600/10',
    selectedBorder: 'border-blue-400/50',
    text: 'text-blue-300',
  },
  profession: {
    border: 'from-green-500/60 to-green-600/40',
    bg: 'from-green-500/20 to-green-600/10',
    selectedBorder: 'border-green-400/50',
    text: 'text-green-300',
  },
  interest: {
    border: 'from-purple-500/60 to-purple-600/40',
    bg: 'from-purple-500/20 to-purple-600/10',
    selectedBorder: 'border-purple-400/50',
    text: 'text-purple-300',
  },
  // Theme Categories
  environment: {
    border: 'from-lime-500/60 to-lime-600/40',
    bg: 'from-lime-500/20 to-lime-600/10',
    selectedBorder: 'border-lime-400/50',
    text: 'text-lime-300',
  },
  health: {
    border: 'from-red-500/60 to-red-600/40',
    bg: 'from-red-500/20 to-red-600/10',
    selectedBorder: 'border-red-400/50',
    text: 'text-red-300',
  },
  social: {
    border: 'from-cyan-500/60 to-cyan-600/40',
    bg: 'from-cyan-500/20 to-cyan-600/10',
    selectedBorder: 'border-cyan-400/50',
    text: 'text-cyan-300',
  },
}

/**
 * A comprehensive list of available technologies and capabilities, categorized for easy filtering.
 */
export const AVAILABLE_TECHNOLOGIES: TechnologyTag[] = [
  // AI
  { id: 'ai-1', text: 'chatbot assistants', category: 'ai' },
  { id: 'ai-2', text: 'image to video', category: 'ai' },
  { id: 'ai-3', text: 'text to video', category: 'ai' },
  { id: 'ai-4', text: 'video dubbing', category: 'ai' },
  { id: 'ai-5', text: 'generative ai', category: 'ai' },
  { id: 'ai-6', text: 'natural language processing (nlp)', category: 'ai' },
  { id: 'ai-7', text: 'computer vision', category: 'ai' },
  { id: 'ai-8', text: 'recommendation engines', category: 'ai' },
  { id: 'ai-9', text: 'speech recognition', category: 'ai' },
  { id: 'ai-10', text: 'sentiment analysis', category: 'ai' },
  { id: 'ai-11', text: 'predictive modeling', category: 'ai' },
  { id: 'ai-12', text: 'ai-powered analytics', category: 'ai' },
  { id: 'ai-13', text: 'large language models (llms)', category: 'ai' },
  { id: 'ai-14', text: 'image generation', category: 'ai' },
  { id: 'ai-15', text: 'autonomous agents', category: 'ai' },
  // Blockchain
  { id: 'bc-1', text: 'smart contracts', category: 'blockchain' },
  { id: 'bc-2', text: 'decentralized applications (dapps)', category: 'blockchain' },
  { id: 'bc-3', text: 'nfts (non-fungible tokens)', category: 'blockchain' },
  { id: 'bc-4', text: 'decentralized finance (defi)', category: 'blockchain' },
  { id: 'bc-5', text: 'tokenization', category: 'blockchain' },
  { id: 'bc-6', text: 'supply chain management', category: 'blockchain' },
  { id: 'bc-7', text: 'fraud prevention', category: 'blockchain' },
  { id: 'bc-8', text: 'decentralized content', category: 'blockchain' },
  { id: 'bc-9', text: 'digital identity', category: 'blockchain' },
  { id: 'bc-10', text: 'web3 integration', category: 'blockchain' },
  // Cloud
  { id: 'cld-1', text: 'fast cdns', category: 'cloud' },
  { id: 'cld-2', text: 'cloud computing', category: 'cloud' },
  { id: 'cld-3', text: 'serverless architecture', category: 'cloud' },
  { id: 'cld-4', text: 'cloud storage solutions', category: 'cloud' },
  { id: 'cld-5', text: 'managed databases', category: 'cloud' },
  { id: 'cld-6', text: 'auto-scaling infrastructure', category: 'cloud' },
  { id: 'cld-7', text: 'edge computing', category: 'cloud' },
  { id: 'cld-8', text: 'kubernetes orchestration', category: 'cloud' },
  { id: 'cld-9', text: 'iaas / paas / saas', category: 'cloud' },
  { id: 'cld-10', text: 'hybrid cloud environments', category: 'cloud' },
  // Web
  { id: 'web-1', text: 'progressive web apps (pwas)', category: 'web' },
  { id: 'web-2', text: 'single page applications (spas)', category: 'web' },
  { id: 'web-3', text: 'real-time web (websockets)', category: 'web' },
  { id: 'web-4', text: 'jamstack architecture', category: 'web' },
  { id: 'web-5', text: 'webassembly (wasm)', category: 'web' },
  { id: 'web-6', text: 'responsive design', category: 'web' },
  { id: 'web-7', text: 'api development (rest, graphql)', category: 'web' },
  { id: 'web-8', text: 'content management systems (cms)', category: 'web' },
  { id: 'web-9', text: 'e-commerce platforms', category: 'web' },
  { id: 'web-10', text: 'web performance optimization', category: 'web' },
  // Mobile
  { id: 'mob-1', text: 'native ios development (swift)', category: 'mobile' },
  { id: 'mob-2', text: 'native android development (kotlin)', category: 'mobile' },
  { id: 'mob-3', text: 'cross-platform (react native)', category: 'mobile' },
  { id: 'mob-4', text: 'cross-platform (flutter)', category: 'mobile' },
  { id: 'mob-5', text: 'mobile backend as a service (mbaas)', category: 'mobile' },
  { id: 'mob-6', text: 'push notifications', category: 'mobile' },
  { id: 'mob-7', text: 'in-app purchases', category: 'mobile' },
  { id: 'mob-8', text: 'augmented reality (ar) apps', category: 'mobile' },
  { id: 'mob-9', text: 'location-based services', category: 'mobile' },
  { id: 'mob-10', text: 'offline-first applications', category: 'mobile' },
  // Video
  { id: 'vid-1', text: 'live video streaming', category: 'video' },
  { id: 'vid-2', text: 'video on demand (vod)', category: 'video' },
  { id: 'vid-3', text: 'peer to peer sharing (webrtc)', category: 'video' },
  { id: 'vid-4', text: 'video transcoding', category: 'video' },
  { id: 'vid-5', text: 'interactive video', category: 'video' },
  { id: 'vid-6', text: 'video content management', category: 'video' },
  { id: 'vid-7', text: 'digital rights management (drm)', category: 'video' },
  { id: 'vid-8', text: '360-degree video', category: 'video' },
  { id: 'vid-9', text: 'video analytics', category: 'video' },
  { id: 'vid-10', text: 'low-latency streaming', category: 'video' },
  // Data
  { id: 'dat-1', text: 'big data processing', category: 'data' },
  { id: 'dat-2', text: 'data warehousing', category: 'data' },
  { id: 'dat-3', text: 'data visualization', category: 'data' },
  { id: 'dat-4', text: 'etl pipelines', category: 'data' },
  { id: 'dat-5', text: 'business intelligence dashboards', category: 'data' },
  { id: 'dat-6', text: 'real-time data streams', category: 'data' },
  { id: 'dat-7', text: 'database management', category: 'data' },
  { id: 'dat-8', text: 'data governance & compliance', category: 'data' },
  // DevOps
  { id: 'dev-1', text: 'continuous integration (ci)', category: 'devops' },
  { id: 'dev-2', text: 'continuous delivery/deployment (cd)', category: 'devops' },
  { id: 'dev-3', text: 'infrastructure as code (iac)', category: 'devops' },
  { id: 'dev-4', text: 'containerization (docker)', category: 'devops' },
  { id: 'dev-5', text: 'automated testing', category: 'devops' },
  { id: 'dev-6', text: 'monitoring & logging', category: 'devops' },
  // IoT
  { id: 'iot-1', text: 'iot device management', category: 'iot' },
  { id: 'iot-2', text: 'sensor data collection', category: 'iot' },
  { id: 'iot-3', text: 'smart home automation', category: 'iot' },
  { id: 'iot-4', text: 'industrial iot (iiot)', category: 'iot' },
  { id: 'iot-5', text: 'wearable technology', category: 'iot' },
  // GameDev
  { id: 'game-1', text: 'game engines (unity, unreal)', category: 'gamedev' },
  { id: 'game-2', text: 'multiplayer networking', category: 'gamedev' },
  { id: 'game-3', text: 'virtual reality (vr) games', category: 'gamedev' },
  { id: 'game-4', text: 'game physics simulation', category: 'gamedev' },
  // Security
  { id: 'sec-1', text: 'end-to-end encryption', category: 'security' },
  { id: 'sec-2', text: 'identity & access management (iam)', category: 'security' },
  { id: 'sec-3', text: 'threat detection & response', category: 'security' },
  { id: 'sec-4', text: 'secure coding practices', category: 'security' },
  // Design
  { id: 'des-1', text: 'ui/ux design systems', category: 'design' },
  { id: 'des-2', text: 'interactive prototyping', category: 'design' },
  { id: 'des-3', text: 'motion design', category: 'design' },
  { id: 'des-4', text: 'accessibility (a11y) design', category: 'design' },
  // Other
  { id: 'oth-1', text: 'apis', category: 'other' },
  { id: 'oth-2', text: 'sdk development', category: 'other' },
  { id: 'oth-3', text: 'microservices architecture', category: 'other' },
  { id: 'oth-4', text: 'open-source integration', category: 'other' },
]

// Logical groupings of technology categories
export const CAPABILITY_CATEGORIES: TechnologyCategory[] = [
  'ai',
  'blockchain',
  'cloud',
  'video',
  'data',
  'iot',
  'security',
]
export const TECHNOLOGY_CATEGORIES: TechnologyCategory[] = [
  'web',
  'mobile',
  'devops',
  'gamedev',
  'design',
  'other',
]

// Picker Configurations for different aspects of a project idea
export const PICKER_CONFIGS: Record<string, PickerConfig> = {
  technology: {
    title: 'technologies/capabilities',
    items: AVAILABLE_TECHNOLOGIES.map((tech) => ({
      id: tech.id,
      text: tech.text,
      category: tech.category,
    })),
    categories: [
      { id: 'ai', name: 'AI & Machine Learning', color: 'red' },
      { id: 'blockchain', name: 'Blockchain & Web3', color: 'blue' },
      { id: 'cloud', name: 'Cloud & Infrastructure', color: 'green' },
      { id: 'data', name: 'Data & Analytics', color: 'yellow' },
      { id: 'devops', name: 'DevOps & Automation', color: 'cyan' },
      { id: 'web', name: 'Web Technologies', color: 'purple' },
      { id: 'mobile', name: 'Mobile Development', color: 'pink' },
      { id: 'video', name: 'Video & Streaming', color: 'orange' },
      { id: 'gamedev', name: 'Game Development', color: 'indigo' },
      { id: 'iot', name: 'Internet of Things (IoT)', color: 'teal' },
      { id: 'security', name: 'Security', color: 'rose' },
      { id: 'design', name: 'UI/UX Design', color: 'fuchsia' },
      { id: 'other', name: 'Other Technologies', color: 'gray' },
    ],
  },
  problem: {
    title: 'problems to solve',
    items: [
      // Connectivity
      { id: 'p-con-1', text: 'slow internet speeds', category: 'connectivity' },
      { id: 'p-con-2', text: 'unreliable network connections', category: 'connectivity' },
      { id: 'p-con-3', text: 'managing low-bandwidth environments', category: 'connectivity' },
      { id: 'p-con-4', text: 'high latency communication', category: 'connectivity' },
      // Security
      { id: 'p-sec-1', text: 'data privacy concerns', category: 'security' },
      { id: 'p-sec-2', text: 'unauthorized access', category: 'security' },
      { id: 'p-sec-3', text: 'phishing and social engineering', category: 'security' },
      { id: 'p-sec-4', text: 'malware and viruses', category: 'security' },
      { id: 'p-sec-5', text: 'insecure apis', category: 'security' },
      // Cost
      { id: 'p-cost-1', text: 'expensive software licenses', category: 'cost' },
      { id: 'p-cost-2', text: 'high hosting costs', category: 'cost' },
      { id: 'p-cost-3', text: 'inefficient resource allocation', category: 'cost' },
      { id: 'p-cost-4', text: 'high development overhead', category: 'cost' },
      // Usability
      { id: 'p-usa-1', text: 'complex user interfaces', category: 'usability' },
      { id: 'p-usa-2', text: 'lack of accessibility', category: 'usability' },
      { id: 'p-usa-3', text: 'steep learning curve', category: 'usability' },
      { id: 'p-usa-4', text: 'poor user onboarding', category: 'usability' },
      // Service
      { id: 'p-ser-1', text: 'poor customer support', category: 'service' },
      { id: 'p-ser-2', text: 'slow response times', category: 'service' },
      { id: 'p-ser-3', text: 'lack of personalization', category: 'service' },
      // Compatibility
      { id: 'p-com-1', text: 'limited device compatibility', category: 'compatibility' },
      { id: 'p-com-2', text: 'browser inconsistencies', category: 'compatibility' },
      { id: 'p-com-3', text: 'integration with legacy systems', category: 'compatibility' },
      // Reliability
      { id: 'p-rel-1', text: 'frequent system crashes', category: 'reliability' },
      { id: 'p-rel-2', text: 'data loss or corruption', category: 'reliability' },
      { id: 'p-rel-3', text: 'inconsistent performance', category: 'reliability' },
      // Scalability
      { id: 'p-sca-1', text: 'inability to handle traffic spikes', category: 'scalability' },
      { id: 'p-sca-2', text: 'performance degradation under load', category: 'scalability' },
      { id: 'p-sca-3', text: 'database bottlenecks', category: 'scalability' },
      // Monetization
      { id: 'p-mon-1', text: 'difficulty acquiring paying users', category: 'monetization' },
      { id: 'p-mon-2', text: 'low user lifetime value (ltv)', category: 'monetization' },
      { id: 'p-mon-3', text: 'over-reliance on ad revenue', category: 'monetization' },
      // User Engagement
      { id: 'p-eng-1', text: 'low user retention rates', category: 'user_engagement' },
      { id: 'p-eng-2', text: 'lack of community features', category: 'user_engagement' },
      { id: 'p-eng-3', text: 'content discovery challenges', category: 'user_engagement' },
    ],
    categories: [
      { id: 'connectivity', name: 'Connectivity', color: 'sky' },
      { id: 'security', name: 'Security & Privacy', color: 'rose' },
      { id: 'cost', name: 'Cost & Budget', color: 'emerald' },
      { id: 'usability', name: 'User Experience', color: 'violet' },
      { id: 'scalability', name: 'Scalability', color: 'teal' },
      { id: 'monetization', name: 'Monetization', color: 'amber' },
      { id: 'user_engagement', name: 'User Engagement', color: 'indigo' },
      { id: 'service', name: 'Service Quality', color: 'orange' },
      { id: 'compatibility', name: 'Compatibility', color: 'pink' },
      { id: 'reliability', name: 'Reliability', color: 'gray' },
    ],
  },
  audience: {
    title: 'target audiences',
    items: [
      // Age
      { id: 'a-age-1', text: 'children 6-12', category: 'age' },
      { id: 'a-age-2', text: 'teenagers 13-17', category: 'age' },
      { id: 'a-age-3', text: 'young adults 18-25', category: 'age' },
      { id: 'a-age-4', text: 'adults 26-40', category: 'age' },
      { id: 'a-age-5', text: 'middle-aged adults 41-64', category: 'age' },
      { id: 'a-age-6', text: 'seniors 65+', category: 'age' },
      // Profession
      { id: 'a-pro-1', text: 'content creators', category: 'profession' },
      { id: 'a-pro-2', text: 'small business owners', category: 'profession' },
      { id: 'a-pro-3', text: 'students (k-12 & university)', category: 'profession' },
      { id: 'a-pro-4', text: 'developers & engineers', category: 'profession' },
      { id: 'a-pro-5', text: 'healthcare professionals', category: 'profession' },
      { id: 'a-pro-6', text: 'artists & designers', category: 'profession' },
      { id: 'a-pro-7', text: 'educators & teachers', category: 'profession' },
      { id: 'a-pro-8', text: 'sales & marketing teams', category: 'profession' },
      // Interest
      { id: 'a-int-1', text: 'gamers', category: 'interest' },
      { id: 'a-int-2', text: 'fitness enthusiasts', category: 'interest' },
      { id: 'a-int-3', text: 'movie & tv show fans', category: 'interest' },
      { id: 'a-int-4', text: 'music lovers', category: 'interest' },
      { id: 'a-int-5', text: 'travelers & adventurers', category: 'interest' },
      { id: 'a-int-6', text: 'foodies & home cooks', category: 'interest' },
      { id: 'a-int-7', text: 'diy & crafters', category: 'interest' },
      // Geography
      { id: 'a-geo-1', text: 'urban dwellers', category: 'geography' },
      { id: 'a-geo-2', text: 'suburban families', category: 'geography' },
      { id: 'a-geo-3', text: 'rural communities', category: 'geography' },
      { id: 'a-geo-4', text: 'digital nomads', category: 'geography' },
      // Tech Savviness
      { id: 'a-tec-1', text: 'early adopters', category: 'tech_savviness' },
      { id: 'a-tec-2', text: 'mainstream users', category: 'tech_savviness' },
      { id: 'a-tec-3', text: 'technophobes', category: 'tech_savviness' },
      // Psychographic
      { id: 'a-psy-1', text: 'eco-conscious consumers', category: 'psychographic' },
      { id: 'a-psy-2', text: 'budget-conscious shoppers', category: 'psychographic' },
      { id: 'a-psy-3', text: 'luxury brand seekers', category: 'psychographic' },
    ],
    categories: [
      { id: 'age', name: 'Age Groups', color: 'blue' },
      { id: 'profession', name: 'Professions', color: 'green' },
      { id: 'interest', name: 'Interests & Hobbies', color: 'purple' },
      { id: 'geography', name: 'Geography', color: 'orange' },
      { id: 'tech_savviness', name: 'Tech Savviness', color: 'pink' },
      { id: 'psychographic', name: 'Psychographics', color: 'teal' },
    ],
  },
  theme: {
    title: 'themes & concepts',
    items: [
      // Environment
      { id: 't-env-1', text: 'sustainability', category: 'environment' },
      { id: 't-env-2', text: 'climate change action', category: 'environment' },
      { id: 't-env-3', text: 'circular economy', category: 'environment' },
      { id: 't-env-4', text: 'conservation', category: 'environment' },
      // Social
      { id: 't-soc-1', text: 'social justice', category: 'social' },
      { id: 't-soc-2', text: 'community building', category: 'social' },
      { id: 't-soc-3', text: 'diversity & inclusion', category: 'social' },
      { id: 't-soc-4', text: 'philanthropy', category: 'social' },
      // Health
      { id: 't-hea-1', text: 'mental health & wellness', category: 'health' },
      { id: 't-hea-2', text: 'physical fitness', category: 'health' },
      { id: 't-hea-3', text: 'telemedicine', category: 'health' },
      { id: 't-hea-4', text: 'mindfulness', category: 'health' },
      // Education
      { id: 't-edu-1', text: 'education reform', category: 'education' },
      { id: 't-edu-2', text: 'lifelong learning', category: 'education' },
      { id: 't-edu-3', text: 'online learning (e-learning)', category: 'education' },
      { id: 't-edu-4', text: 'skill development', category: 'education' },
      // Work
      { id: 't-wor-1', text: 'remote work enablement', category: 'work' },
      { id: 't-wor-2', text: 'work-life balance', category: 'work' },
      { id: 't-wor-3', text: 'future of work', category: 'work' },
      { id: 't-wor-4', text: 'collaboration tools', category: 'work' },
      // Lifestyle
      { id: 't-lif-1', text: 'digital minimalism', category: 'lifestyle' },
      { id: 't-lif-2', text: 'personal productivity', category: 'lifestyle' },
      { id: 't-lif-3', text: 'smart living', category: 'lifestyle' },
      // Finance
      { id: 't-fin-1', text: 'financial literacy', category: 'finance' },
      { id: 't-fin-2', text: 'personal finance management', category: 'finance' },
      { id: 't-fin-3', text: 'investment tools', category: 'finance' },
      // Commerce
      { id: 't-com-1', text: 'e-commerce revolution', category: 'commerce' },
      { id: 't-com-2', text: 'creator economy', category: 'commerce' },
      { id: 't-com-3', text: 'gig economy platforms', category: 'commerce' },
      // Art & Culture
      { id: 't-art-1', text: 'digital art & nfts', category: 'art_culture' },
      { id: 't-art-2', text: 'virtual museums & galleries', category: 'art_culture' },
      { id: 't-art-3', text: 'cultural preservation', category: 'art_culture' },
      // Governance
      { id: 't-gov-1', text: 'e-governance & civic tech', category: 'governance' },
      { id: 't-gov-2', text: 'decentralized autonomous orgs (daos)', category: 'governance' },
      { id: 't-gov-3', text: 'fighting misinformation', category: 'governance' },
    ],
    categories: [
      { id: 'environment', name: 'Environment', color: 'lime' },
      { id: 'social', name: 'Social Impact', color: 'cyan' },
      { id: 'health', name: 'Health & Wellness', color: 'red' },
      { id: 'education', name: 'Education', color: 'purple' },
      { id: 'work', name: 'Work & Career', color: 'orange' },
      { id: 'lifestyle', name: 'Lifestyle', color: 'pink' },
      { id: 'finance', name: 'Finance', color: 'gray' },
      { id: 'commerce', name: 'Commerce', color: 'amber' },
      { id: 'art_culture', name: 'Art & Culture', color: 'fuchsia' },
      { id: 'governance', name: 'Governance & Civics', color: 'indigo' },
    ],
  },
}
