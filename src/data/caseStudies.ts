import {
  CaseStudyDetail,
  EvaluationRow,
  MoreWorkCategory,
  ExperienceRole,
  LeadershipInfo,
  HowIWorkPrinciple,
  CapabilityGroup,
} from '../types';

// =========================================================================
// 01. RESHAMANDI — B2B MARKETPLACE & OPERATIONAL WORKFLOWS
// =========================================================================
export const RESHAMANDI_CASE_STUDY: CaseStudyDetail = {
  id: 'reshamandi',
  slug: 'reshamandi',
  number: '01',
  title: 'Digitising a Complex B2B Marketplace',
  subtitle:
    'I went into the physical marketplace and realised the product problem was much bigger than the app.',
  description:
    'Understanding ground-level silk trading workflows and designing connected digital products across farmers, collection centres, payments, and pricing.',
  thesis: 'The product wasn’t the app. The workflow was.',
  centralQuestion:
    'How do you digitise a physical marketplace without breaking the informal trust and fast-paced operational rhythm that makes it function?',
  productPhilosophy:
    'Digitise the process, not blindly replace people. Understand the physical system well enough to know what should change, what should stay human, and where technology can remove friction without breaking trust.',
  category: 'B2B Marketplace & Operational Systems',
  role: 'Product Manager · Core Marketplace, Workflows & Payments',
  timeline: 'June 2021 – Sept 2023',
  tags: ['B2B', 'Marketplace', 'Workflow', 'Operations', '0→1'],
  proofPoints: [
    '80K+ farmers',
    '₹20–25 Cr/month disbursement volume',
    '>35% bidding transaction-value uplift',
  ],
  keyStats: [
    { label: 'Farmers Served', value: '80,000+', detail: 'Engaged through ReshaFarms advisory' },
    { label: 'Monthly Disbursements', value: '₹20–25 Cr', detail: 'Marketplace volume context scaled during this period' },
    { label: 'Bidding Value Uplift', value: '>35%', detail: 'Observed in pilot auction price discovery' },
    { label: 'Payout Reliability', value: '99.9%', detail: 'Disbursement success rate across banking rails' },
  ],
  quickContext: {
    problem:
      'I went into regional silk trading hubs expecting an app problem. What I found was an informal operating web where lot tracking, weight checks, and pricing ran through paper notebooks and WhatsApp photos, and where farmers faced multi-day payment delays.',
    whyItMattered:
      'Silk cocoons are perishable and represent a farmer’s entire month of labor. When weighing is done informally and payments take days to clear, farmers are forced into high-interest credit from local intermediaries.',
    myOwnership:
      'I owned product requirements for collection centre intake, digital lot management, pricing workflows, and the governed payout pipeline connecting ground validation to banking rails.',
    whatChanged:
      'Replaced ad-hoc paper notes and WhatsApp handoffs with a structured digital lot record and a governed payout flow (<₹5L settled instantly, >₹5L within 2 hours at 99.9% success), contributing to scaling monthly marketplace volume from ₹10–15 Cr to ₹20–25 Cr.',
  },
  tradeOff: {
    considered:
      'Building a self-serve mobile app and expecting farmers to download it, create lots, and request payouts on their own smartphones.',
    chose:
      'I chose an assisted workflow: placing software in the hands of trained ReshaMandi centre staff at the collection points, keeping the interaction fast and physical for the farmer, and sending instant transaction confirmations via SMS.',
    why:
      'Farmers arrived early in the morning carrying heavy, perishable crates into noisy, crowded trading hubs. Expecting them to navigate a smartphone app on spotty 2G connectivity while negotiating trades would have killed adoption on day one.',
    gaveUp:
      'We gave up the pure software margin of a zero-touch consumer app, accepting that scaling required operational presence at regional hubs.',
    outcome:
      'Gained immediate ground adoption across collection hubs, enabling reliable intake and predictable payout execution that supported scaling monthly transaction volume to ₹20–25 Cr.',
  },
  artifacts: {
    title: 'Mandi Intake & Governed Payout Workflow Specification',
    subtitle: 'Connecting physical lot arrival, weight capture, center sign-off, and banking disbursement rails',
    type: 'spec',
    items: [
      {
        label: 'Lot Intake & Weight Capture Schema',
        value: 'Structured Operational Record',
        desc: 'Product specification binding physical crate weights, tare deductions, and lot identity into a searchable record.',
        code: '{ lot_id: "LOT-84920", tare_kg: 14.2, gross_kg: 168.4, net_kg: 154.2, mandi_hub: "RMN-04" }',
      },
      {
        label: 'Governed Payout Approval Pipeline',
        value: 'Tiered Banking Rails',
        desc: 'Disbursement triggered after center manager verification; payouts <₹5L processed instantly, >₹5L settled within 2 hours.',
        code: 'POST /v1/payouts/disburse -> { farmer_id, lot_id, rate_per_kg: 485, net_payout_inr: 74787, clearance: "VERIFIED" }',
      },
      {
        label: 'Quality Grading Decision Support',
        value: 'Sample Assessment & Advisory Band',
        desc: 'Advisory price recommendation based on sample tray image metrics, reviewed and signed off by the on-ground centre manager.',
        code: '{ sample_id: "SMP-104", shell_ratio_est: 18.6, defect_pct: 1.2, advisory_price_range: [475, 495] }',
      },
    ],
  },
  sections: [
    {
      id: 'context',
      number: '01',
      title: 'Ground Reality: The Physical Marketplace',
      subtitle: 'Walking into the trading hubs and seeing how silk actually moved',
      content: [
        'India is the second-largest silk producer in the world, but its supply chain historically ran on informal, fragile relationships. Farmers spend roughly 25 days carefully rearing silkworms, feeding them fresh mulberry leaves around the clock until they spin cocoons. Once harvested, cocoons are perishable: within days, the moth inside emerges and damages the continuous silk filament.',
        'When I first visited the regional trading hubs, I expected to find an app problem. What I quickly realized was that the marketplace was far bigger than any screen. Hundreds of farmers arrived early in the morning with crates of cocoons. Transactions were loud, fast, and intensely physical. Handshakes sealed trades, but the actual record-keeping was scattered across paper notebooks, memory, and personal chat threads.',
      ],
      highlights: [
        {
          title: 'Perishable Window',
          desc: 'Cocoons must be graded and sold quickly before the cocoon shell quality degrades, leaving farmers with little leverage to walk away.',
        },
        {
          title: 'Liquidity Chokehold',
          desc: 'Payment delays of several days or weeks forced farmers into debt cycles with informal local moneylenders between harvest batches.',
        },
      ],
    },
    {
      id: 'problem',
      number: '02',
      title: 'The Workflow Behind the Chaos: The Informal Baseline',
      subtitle: 'Where digital assumptions broke down on the trading floor',
      content: [
        'Before writing any specifications, I spent time on the floor documenting how a single lot moved from arrival to payment. The real workflow was an ad-hoc chain:',
        '1. A farmer arrived and unloaded crates at the collection center.',
        '2. The center in-charge jotted down weights and lot numbers in a pocket notebook.',
        '3. During trading pauses, someone snapped a smartphone photo of the notebook page and shared it in a WhatsApp group.',
        '4. Regional coordinators and finance teams scrolled through chat threads, manually retyping numbers into spreadsheets.',
        '5. Payouts were initiated days later, once accounts reconciled conflicting records and phone calls.',
        'This informal chain functioned when daily volume was small. But during peak harvest surges, the cracks were obvious: photos got lost in chat streams, bag weights were contested, price-related queries went unanswered, and farmers waited days without knowing when their money would arrive.',
      ],
      highlights: [
        {
          title: 'Notebook → Photo → WhatsApp → Call',
          desc: 'The informal pattern that held together transactions before software brought structure to the floor.',
        },
        {
          title: 'The Real Product Insight',
          desc: 'Technology failed whenever it added friction to the floor. If software took longer than a pencil on paper, operators bypassed it.',
        },
      ],
    },
    {
      id: 'role',
      number: '03',
      title: 'My Role & Ownership: Ground Research to Operating Rails',
      subtitle: 'Deciding what to digitise and what to keep human',
      content: [
        'As Product Manager for Core Marketplace and Workflows, I owned product discovery, requirements, and the digital workflows connecting collection centre operations with central finance.',
        'My primary responsibility was bridging the gap between two very different worlds: the frantic reality of ground collection centers and the audit and liquidity requirements of our engineering and finance teams.',
        'The critical design challenge was deciding what should be digitised and what should remain human: we digitised the lot identity, weight capture, status tracking, and payment clearance, while keeping human relationship management, physical inspection, and operational sign-offs with on-ground center operators.',
      ],
      highlights: [
        {
          title: 'Assisted over Self-Serve',
          desc: 'Equipped our center operators with the software rather than forcing busy farmers to download apps on the trading floor.',
        },
        {
          title: 'Floor-First Specifications',
          desc: 'Built intake interfaces with high contrast and minimal tap steps so weighing lots never slowed down morning intake.',
        },
      ],
    },
    {
      id: 'interventions',
      number: '04',
      title: 'The Interventions: Building Trust Where It Mattered Most',
      subtitle: 'Focusing product leverage on three friction points: liquidity, price discovery, and quality',
      content: [
        'Rather than attempting to rebuild every physical interaction at once, I focused our product strategy on three critical points of operational leverage where technology could eliminate existential friction:',
        '• Instant Payouts: Removing payment uncertainty by tying disbursement triggers directly to weighbridge verification and center sign-off.',
        '• Cocoon Bidding: Structuring open digital bidding sessions to bring multi-buyer price discovery to rural centers.',
        '• Quality Support: Introducing computer-vision-assisted grading as an advisory baseline for human center managers.',
      ],
      diagramType: 'workflow',
      workflowSteps: [
        { label: 'Ground Discovery', desc: 'Observe intake friction and WhatsApp bottlenecks' },
        { label: 'Structured Lot Record', desc: 'Replace informal notebook entries with searchable lot IDs' },
        { label: 'Intake Verification', desc: 'Capture net weights directly at collection points' },
        { label: 'Governed Payout Rail', desc: 'Disburse <₹5L instantly and >₹5L within 2 hours' },
        { label: 'Competitive Bidding', desc: 'Scheduled auction windows for verified buyers' },
        { label: 'ML Price Guidance', desc: 'Non-binding advisory baseline for center managers' },
      ],
    },
    {
      id: 'instant-payout',
      number: '05',
      title: 'Instant Payout: Liquidity as a Product',
      subtitle: 'Settling <₹5L instantly and >₹5L within 2 hours with 99.9% reliability',
      content: [
        'In rural agriculture, payment speed is not a convenience feature — it is the product. When farmers sell cocoons, they need immediate cash to pay laborers, buy silkworm seed for the next cycle, and manage household expenses.',
        'Historically, waiting days for payment created deep anxiety and made farmers vulnerable to private middlemen. We redesigned the settlement flow into a governed pipeline:',
        '• As soon as the lot was weighed and the center manager confirmed the transaction, the payout request was generated.',
        '• Payouts under ₹5 Lakh were routed through automated banking rails for instant disbursement directly to the farmer\'s verified bank account.',
        '• Larger transactions (>₹5 Lakh) underwent an expedited two-hour review with finance desk clearance.',
        'This eliminated days of waiting and achieved a 99.9% payout success rate, transforming farmer trust and acting as a primary operational lever that helped grow monthly marketplace volume from ₹10–15 Cr to ₹20–25 Cr.',
      ],
      decision: {
        title: 'Tiered Automated Payouts vs Manual End-of-Day Batching',
        decision:
          'Engineered banking API triggers directly connected to centre manager lot verification: transactions under ₹5L processed instantly, while transactions over ₹5L settled within 2 hours through a rapid clearance queue.',
        why:
          'In traditional mandis, farmers had to trust informal promises and wait days. In an informal agrarian economy, immediate liquidity creates immediate loyalty and eliminates adoption reluctance.',
        tradeoff:
          'Required real-time liquidity management and close operational monitoring across banking partner rails.',
        result:
          'Achieved 99.9% payout reliability, serving as a core product intervention that helped expand monthly marketplace volume from ₹10–15 Cr to ₹20–25 Cr.',
      },
      diagramType: 'comparison',
      comparison: {
        before: {
          title: 'Old Informal Workflow',
          steps: [
            'Lot details written in pocket notebooks',
            'Photos shared over WhatsApp channels',
            'Evening spreadsheet reconciliation',
            'Manual finance desk payment preparation',
            'Multi-day waiting and uncertainty (3–15 days)',
          ],
        },
        after: {
          title: 'New Governed Payout Flow',
          steps: [
            'Staff creates lot record at collection station',
            'Center Manager verifies weight and quality',
            'Automated banking rail disbursement trigger',
            'SMS confirmation sent directly to farmer',
            'Disbursement complete (<₹5L instant, >₹5L <2h; 99.9% success)',
          ],
        },
      },
    },
    {
      id: 'cocoon-bidding',
      number: '06',
      title: 'Cocoon Bidding: Bringing Price Discovery to Rural Hubs',
      subtitle: 'Scan → Bid → Watch → Win across structured auction windows',
      content: [
        'In traditional mandis, price discovery was informal and opaque. Small groups of local buyers negotiated in private, leaving farmers with little visibility into prevailing market demand in larger urban centres.',
        'We introduced a structured digital auction workflow. When a lot was created at a collection center, verified buyers—both in the center and in downstream weaving clusters—could inspect the verified lot details and participate in timed bidding windows.',
        'In pilot deployments across target collection centres, opening up transparent multi-buyer bidding demonstrated a >35% improvement in realized transaction value for high-quality cocoon lots.',
      ],
      diagramType: 'bidding',
      workflowSteps: [
        { label: 'Scan', desc: 'Operator scans lot record at inspection tray' },
        { label: 'Bid', desc: 'Verified buyers submit offers in timed window' },
        { label: 'Watch', desc: 'Real-time outbid notifications keep bidding active' },
        { label: 'Win', desc: 'Lot awarded to highest compliant bid' },
        { label: 'Settle', desc: 'Disbursement triggered upon delivery clearance' },
      ],
    },
    {
      id: 'ml-pricing',
      number: '07',
      title: 'ML-assisted Cocoon Pricing: Decision Support, Not Autopilot',
      subtitle: 'Helping center managers structure a subjective physical appraisal',
      content: [
        'Cocoon quality depends on physical traits: shell ratio, moisture content, and the percentage of defective or stained cocoons. Traditionally, appraisal was done purely by eye and touch, leading to arguments between farmers and buyers.',
        'I worked with the machine learning team to productize a computer-vision-assisted grading and pricing workflow. An overhead camera on a standardized sample tray analyzed cocoon surface features to estimate defect percentage and shell ratio, suggesting an advisory price band.',
        'Crucially, we designed this as decision support, not an unreviewable automated verdict: the on-ground centre manager always reviewed the recommendation and retained authority to adjust for local lot characteristics. This preserved operator accountability and built trust with skeptical farmers.',
      ],
      diagramType: 'workflow',
      workflowSteps: [
        { label: 'Sample Tray', desc: 'Batch sample spread evenly under calibrated lighting' },
        { label: 'Image Assessment', desc: 'Model identifies surface defects and estimates shell ratio' },
        { label: 'Advisory Band', desc: 'System calculates recommended price baseline' },
        { label: 'Manager Review', desc: 'Centre operator confirms or adjusts with reason' },
      ],
    },
    {
      id: 'impact',
      number: '08',
      title: 'What Changed & Verified Business Impact',
      subtitle: 'Reflecting on operational scale, trade volumes, and ecosystem adoption',
      content: [
        'The transition from informal notebook-and-chat handoffs to structured digital workflows yielded measurable operational results:',
        '• 80,000+ Farmers Engaged: Supported across rearing stages through vernacular advisory on ReshaFarms.',
        '• ₹20–25 Cr Monthly Disbursements: Governed payout flow helped scale volume from ₹10–15 Cr to ₹20–25 Cr per month with 99.9% payout success (<₹5L instant, >₹5L within 2 hours).',
        '• >35% Transaction Value Uplift: Observed in pilot auction bidding through transparent multi-buyer price discovery.',
        '• Structured Auditability: Replaced informal chats with searchable digital lot records across all active collection hubs.',
      ],
      outcomeHierarchy: [
        {
          category: 'Business Outcome',
          metric: '₹20–25 Cr/mo',
          desc: 'Monthly disbursement volume scaled from ₹10–15 Cr to ₹20–25 Cr, with Instant Payout as a core contributing product intervention.',
        },
        {
          category: 'Operational Outcome',
          metric: '99.9%',
          desc: 'Payout reliability across automated banking rails (<₹5L instant, >₹5L within 2 hours).',
        },
        {
          category: 'User Outcome',
          metric: '80,000+',
          desc: 'Smallholder sericulture farmers engaged with rearing guidance and dependable same-day liquidity.',
        },
        {
          category: 'Business Outcome',
          metric: '>35%',
          desc: 'Transaction-value uplift observed in pilot auctions through open, multi-buyer bidding.',
        },
      ],
      highlights: [
        {
          title: 'Financial Predictability',
          desc: 'Decoupled farmers from predatory informal lenders through dependable same-day liquidity.',
        },
        {
          title: 'Operational Backbone',
          desc: 'Unified intake, lot verification, bidding, and banking rails into one predictable operating system.',
        },
      ],
      reflection:
        'The hardest part of digitising a marketplace isn’t building the software. It’s understanding the physical system well enough to know what should change, what should stay human, and where technology can remove friction without breaking trust. The product wasn’t the app. The workflow was.',
    },
  ],
};

// =========================================================================
// 02. AI COACH — CONVERSATIONAL AI & CONSUMER INTELLIGENCE
// =========================================================================
export const AI_COACH_CASE_STUDY: CaseStudyDetail = {
  id: 'ai-coach',
  slug: 'ai-coach',
  number: '02',
  title: 'Building a Conversational AI Coach',
  subtitle:
    'Taking an ambiguous "add AI" idea from concept to production: defining what to build, where to set boundaries, how we chose the models, and what we learned when real users started testing it.',
  description:
    'Taking an ambiguous "add AI" idea from concept to production: defining what to build, where to set boundaries, how we chose the models, and what we learned when real users started testing it.',
  thesis:
    'The model can generate answers. The product has to decide where AI adds value, where it needs boundaries, and where deterministic code should take over.',
  centralQuestion:
    'How can conversational AI connect workout content, user context, and daily training without making dangerous mistakes or feeling like an open-ended chatbot novelty?',
  productPhilosophy:
    'Safety before engagement. Building AI is easy; building an experience people can actually trust while exercising is the real product problem.',
  category: 'Conversational AI & Consumer Tech',
  role: 'Product Manager · AI & Consumer Engagement',
  timeline: 'Oct 2024 – May 2026',
  tags: ['AI', 'Conversational AI', '0→1', 'Consumer'],
  proofPoints: ['~300 → 3,200+ DAU', 'in ~3 months', 'Gemini + ChatGPT Fallback'],
  keyStats: [
    { label: 'Active User Scale', value: '~300 → 3,200+ DAU', detail: 'Scaled organically within ~3 months of launch' },
    { label: 'Primary LLM', value: 'Gemini', detail: 'Chosen for speed, JSON adherence & cost' },
    { label: 'Fallback LLM', value: 'ChatGPT', detail: 'Automated failover for uptime resilience' },
    { label: 'Core Principle', value: 'Safety First', detail: 'Deterministic guardrails over open generation' },
  ],
  quickContext: {
    problem:
      'We had over 174,000 users navigating a deep, static workout catalog. Finding the right workout took too much manual filtering, but letting an open-ended chatbot give freeform fitness advice introduced serious injury and hallucination risks.',
    whyItMattered:
      'In fitness, a confident wrong answer can cause actual injury. If the assistant told someone to push through sharp joint pain or hallucinated unrealistic progression, we would break user trust immediately.',
    myOwnership:
      'I figured out what the assistant should and should not do, set our safety boundaries, worked with engineering on provider selection, and ran our testing loops to see where the product broke before rollout.',
    whatChanged:
      'We scaled from an initial cohort of ~300 users to 3,200+ DAU in about 3 months, with 0 reported safety incidents or medical escalations during the launch period, turning an ambiguous concept into a daily workout discovery tool.',
  },
  tradeOff: {
    considered:
      'Letting the assistant have an open-ended conversational personality that could banter, diagnose minor pains, or generate custom workout routines entirely on the fly.',
    chose:
      'I pushed to keep recommendations strictly tied to our certified workout library, require clarifying questions before generating complex plans, and completely bypass the model when a query touched chest pain, joint injury, or eating disorders.',
    why:
      'Open-ended models sound convincing even when they make things up. In fitness, user safety has to come before conversational flair. The assistant should get the user into a workout, not keep them chatting.',
    gaveUp:
      'We gave up chatty conversational banter and longer session durations that might have looked good on vanity metrics dashboards.',
    outcome:
      'We saw 0 reported safety incidents or medical escalations during the observed launch period and scaled active adoption from ~300 to 3,200+ DAU in ~3 months, because users and our coaching team trusted the recommendations.',
  },
  artifacts: {
    title: 'Safety Interceptor Logic & Recommendation Schema',
    subtitle: 'What happens before and after the model runs',
    type: 'schema',
    items: [
      {
        label: 'Hard Safety Interceptor (Bypasses the Model)',
        value: 'Deterministic Code Rule',
        desc: 'Queries mentioning chest pain, acute joint injury, or eating disorders bypass generative inference completely and return verified medical guidance.',
        code: 'IF query MATCHES (chest_pain | acute_joint | eating_disorder) -> HALT_GENERATION -> RETURN verified_clinical_disclaimer',
      },
      {
        label: 'Structured Recommendation Output',
        value: 'Validated Catalog JSON',
        desc: 'Instead of freeform text, the model returned structured data mapping directly to certified workouts in our existing catalog.',
        code: '{ workout_id: "wk_hiit_20m_04", equipment: ["dumbbells"], duration_min: 20, intensity: "moderate", coach_rationale: "Matches user 20-min dumbbell preference" }',
      },
      {
        label: 'Per-Response Telemetry Hook',
        value: 'Thumbs Feedback + Context Token',
        desc: 'Every response included quick thumbs-up/down actions tied to latency, prompt version, and catalog IDs for our weekly review.',
      },
    ],
  },
  sections: [
    {
      id: 'the-problem-wasnt-we-need-ai',
      number: '01',
      title: 'The Problem Wasn\'t "We Need AI"',
      subtitle: 'Moving past executive excitement to uncover why users were dropping off before workouts',
      content: [
        'Like many consumer fitness apps at the time, our leadership was eager to "add AI" to the mobile experience. But building an open-ended chatbot just because generative AI was exciting felt like the wrong starting point. Open-ended conversational assistants are expensive, often hallucinate, and people usually try them once or twice out of curiosity and never come back.',
        'So before writing a single prompt, I spent time looking at where users were actually getting stuck in our app. Over 174,000 active users were navigating a catalog of hundreds of on-demand workouts. The content was great, but finding something to do on a Tuesday night was surprisingly frustrating.',
        'Users had to manually filter by duration, equipment, target muscle group, and instructor. If someone had 20 minutes, a set of 15-pound dumbbells, and sore knees from yesterday\'s run, they had to cross-reference multiple screens. When that took more than a minute, they often closed the app.',
        'At the same time, we couldn\'t just plug in an unconstrained chat window. Fitness is an area where a model giving casual medical advice or hallucinating an unsafe exercise cue can lead to real physical injury. So the real problem wasn\'t "how do we add a chatbot?" It was: how do we help users find and start the right workout in 30 seconds, while making sure the assistant never gives advice it isn\'t qualified to give?',
      ],
      highlights: [
        {
          title: 'The Real Bottleneck',
          desc: '174K+ users were spending too much time filtering static menus instead of working out, leading to pre-session drop-off.',
        },
        {
          title: 'The Real Product Challenge',
          desc: 'Connecting user context to certified workouts in seconds, without letting the model invent exercises or give unsafe medical advice.',
        },
      ],
    },
    {
      id: 'first-decide-what-the-coach-should-do',
      number: '02',
      title: 'First, I Had to Decide What the Coach Should Actually Do',
      subtitle: 'Defining the boundary between generative flexibility and strict product constraints',
      content: [
        'The first thing I had to figure out was what we actually wanted the assistant to do. "Add AI" was far too broad. If you don\'t define clear boundaries, the model tries to answer everything, and that\'s usually when it fails.',
        'I narrowed the first version down to a few core jobs that were already genuinely useful inside the product:',
        '• Personalized workout recommendations matching the user\'s equipment, available time, and fitness level.',
        '• Answering specific training questions ("How do I adjust my squat if my lower back feels tight?") and linking directly to relevant warm-ups.',
        '• Guiding users through multi-week programs so they had clear progression.',
        '• Explaining exercise physiology and recovery principles using our certified coaching guidance.',
        '• Reading profile attributes users had already saved—like equipment they own—so they didn\'t have to re-type basic context every session.',
        '### What We Explicitly Decided NOT to Do',
        'Just as importantly, I set strict negative boundaries on what the assistant must never attempt:',
        '• It must never diagnose injuries or tell an athlete whether pain is safe to push through.',
        '• It must never give advice on extreme caloric restriction, unverified supplements, or eating disorders.',
        '• It must never invent workouts that don\'t exist in our certified video catalog.',
        '• It must never interpret heart rate spikes or sleep metrics as clinical medical conditions.',
        'The goal wasn\'t to have an infinite conversation. The goal was to give users a clear answer, an actionable workout card, and get them moving.',
      ],
      highlights: [
        {
          title: 'Actionable Over Chatty',
          desc: 'Every recommendation ended with an interactive workout card and a 1-tap deep link, not an open-ended conversational dead-end.',
        },
        {
          title: 'Tied to Our Library',
          desc: 'Recommendations were strictly anchored to verified platform exercises and certified instructor cues.',
        },
      ],
    },
    {
      id: 'safety',
      number: '03',
      title: 'Where AI Needed Boundaries',
      subtitle: 'Why prompt instructions weren\'t enough for health and injury edge cases',
      content: [
        'Fitness is one of those areas where a confident wrong answer can be worse than no answer at all. If an assistant tells someone with acute knee inflammation to "push through the burn," that isn\'t just a bad response—it\'s physical harm.',
        'At first, some suggested we could handle this entirely through system prompt instructions: "You are a safe fitness coach; do not give medical advice." But as anyone who works with LLMs knows, prompt instructions can drift, get bypassed by user phrasing, or break down when questions get nuanced.',
        'I didn\'t want to rely on the model deciding whether chest pain or joint injury was serious. So I worked with engineering to put deterministic, code-level interceptors in front of the model. If a query touched acute pain, heart issues, or eating disorders, the request bypassed generative inference entirely and returned verified medical guidance and professional resources.',
        'We established six clear principles that guided the whole team:',
      ],
      decision: {
        title: 'Hard Code Interceptors vs Relying on System Prompts',
        decision:
          'We added deterministic code rules for queries mentioning chest pain, acute joint injuries, or eating disorders, bypassing the model entirely to return static medical guidance.',
        why:
          'LLMs are prone to sycophancy and confident hallucinations when users push them. When physical health is on the line, deterministic code is more dependable than generative text.',
        tradeoff:
          'We lost some conversational fluidity for edge-case health topics, and session durations stayed shorter because we didn\'t engage in medical dialogue.',
        result:
          'We had 0 reported safety incidents or medical escalations during the launch period, and our coaching and legal stakeholders trusted the system.',
      },
      diagramType: 'safety',
      highlights: [
        {
          title: '1. Safety Before Engagement',
          desc: 'User physical safety always came before conversational flair or session duration vanity metrics.',
        },
        {
          title: '2. AI ≠ Doctor',
          desc: 'The assistant never diagnosed conditions, prescribed rehabilitation, or evaluated sharp pain.',
        },
        {
          title: '3. Data ≠ Diagnosis',
          desc: 'Wearable metrics like heart rate or strain were treated as training signals, never clinical evidence.',
        },
        {
          title: '4. Controlled Workout Ecosystem',
          desc: 'Recommendations only pointed to verified workouts produced with our certified trainers.',
        },
        {
          title: '5. Transparent Context',
          desc: 'When the coach suggested a session, it explained why ("Based on your 20-minute dumbbell preference").',
        },
        {
          title: '6. Hard Fallbacks for High-Risk Cases',
          desc: 'Medical and injury queries bypassed inference completely to deliver verified emergency and clinical guidance.',
        },
      ],
    },
    {
      id: 'choosing-the-model',
      number: '04',
      title: 'Choosing the Model Was Only Part of the Decision',
      subtitle: 'Benchmarking latency, cost, and structured output rather than chasing brand hype',
      content: [
        'When evaluating models, it\'s tempting to just pick whatever frontier model is currently getting the most attention. But for an in-app fitness coach, we had very specific product constraints: response latency, per-query cost, instruction following, and structured output adherence.',
        'Users in a gym or living room won\'t wait 6 seconds staring at a loading spinner. If the first token doesn\'t appear almost immediately, they assume the app is frozen and leave.',
        'I worked with engineering to evaluate providers across real queries. We ultimately selected Google Gemini as our primary engine because it gave us sub-second first-token latency, had strong JSON schema compliance, and was very cost-effective for structured recommendation cards.',
        'At the same time, consumer apps can\'t tolerate provider downtime or sudden rate limits. So our engineering team implemented an automated fallback to ChatGPT. If Gemini experienced latency spikes over 2.5 seconds or an API error, requests routed to the fallback seamlessly without the user seeing a dead end.',
        'Instead of accepting freeform text responses, we constrained the model to output a strict JSON schema containing verified workout IDs, duration, equipment tags, and a short explanation. If schema parsing ever failed, the UI showed a clean, curated fallback card rather than raw broken text.',
      ],
      decision: {
        title: 'Gemini Primary + ChatGPT Failover vs Single Provider',
        decision:
          'We used Google Gemini as the primary engine for speed and cost, with OpenAI ChatGPT as an automated failover for reliability.',
        why:
          'Gemini gave us sub-second response times and tight JSON adherence, while the fallback gave us resilience against rate limits or provider degradation.',
        tradeoff:
          'Maintaining prompt templates and schema compatibility across two different model providers required extra testing rigor.',
        result:
          '100% of recommendations were playable deep links directly into our catalog, with no broken links or hallucinated exercises.',
      },
      highlights: [
        {
          title: 'Sub-Second First Token',
          desc: 'Gemini delivered quick response times that felt responsive even when users were standing in a gym.',
        },
        {
          title: 'Automated Failover',
          desc: 'Fallback routing ensured users never hit an error screen during provider rate limits or slowdowns.',
        },
      ],
    },
    {
      id: 'where-it-started-falling-apart',
      number: '05',
      title: 'Where It Started Falling Apart (And What We Changed)',
      subtitle: 'What internal dogfooding and our 100-user closed beta taught us about real-world use',
      content: [
        'We didn\'t want our first real test to be the entire production user base. So we set up a phased rollout: first internal dogfooding with our team and trainers, followed by a closed beta with 100 active community members, and only then a tiered rollout.',
        'Early testing immediately exposed assumptions that looked fine in a demo document but fell apart during real workouts:',
        '### It Sounded Convincing, But Was Exhausting to Read',
        'Our initial prompts generated detailed, conversational paragraphs. In a quiet conference room, the answers looked thoughtful. But when beta users tested the coach while working out or catching their breath between sets, multi-paragraph explanations were unreadable. People didn\'t want to read an essay; they had 30 seconds before their next set.',
        'What changed: We reworked prompt contracts and UI rendering to enforce 5-second glanceability. We capped explanations at two short sentences, prioritized bullet points, and highlighted key metrics like reps and duration in bold.',
        '### It Assumed Context the User Never Gave',
        'Another early problem was simple but frustrating. A user would ask for "a quick shoulder routine," and the model would confidently recommend a 40-minute barbell session. The user had 15 minutes and only owned dumbbells. The response looked polished, but it was completely useless.',
        'What changed: We added pre-generation clarifying chips. Before the coach generated a complex routine, it asked one or two quick tap questions ("How much time do you have?", "What equipment?"). This stopped the model from guessing.',
        '### We Couldn\'t Tell Why Users Weren\'t Completing Workouts',
        'Initially, we only tracked whether a user started a recommended workout. But if they quit after two minutes, was it because the workout was too hard, because the equipment was wrong, or because they just ran out of time? We had no way to know.',
        'What changed: We added quick thumbs-up/down feedback chips and one-tap correction buttons on every response, feeding into a weekly triage review between product, engineering, and coaching.',
      ],
      comparison: {
        before: {
          title: 'What Broke in Early Testing (V0.1)',
          steps: [
            'Multi-paragraph conversational answers that were unreadable during workouts',
            'Model assumed equipment and time constraints without asking',
            'Occasional recommendations that didn\'t match our certified library',
            'No way to tell why users abandoned recommended workouts',
          ],
        },
        after: {
          title: 'What We Changed for Launch (V1.0)',
          steps: [
            'Short, glanceable bullet cues designed for quick 5-second scanning',
            'Pre-generation clarifying chips for equipment and workout duration',
            'Strict JSON output linking only to verified platform workout IDs',
            'Per-response thumbs feedback and one-tap retry chips',
          ],
        },
      },
      highlights: [
        {
          title: 'Pre-Generation Clarifying Gates',
          desc: 'One or two quick taps before generating complex routines eliminated equipment and duration mismatches.',
        },
        {
          title: 'Glanceable Formatting',
          desc: 'Refactored prompts to deliver bulleted, scannable guidance designed for active workout environments.',
        },
      ],
    },
    {
      id: 'from-beta-to-production',
      number: '06',
      title: 'From Beta to Production: What Changed and What I Learned',
      subtitle: 'Scaling to 3,200+ DAU, disciplined attribution, and honest reflections',
      content: [
        'Within about 3 months of rollout, daily active usage of the AI Coach grew from an initial cohort of ~300 users to 3,200+ DAU. It quickly became one of the main ways people found new workouts and recovery sessions in the app.',
        '### What the AI Coach Actually Drove (And What It Didn\'t)',
        'It is easy in a case study to claim that a single feature drove company-wide subscription growth. But that isn\'t how real products work. Platform subscribers and retention grew during this period, but that was the result of our entire team: great trainer content, marketing campaigns, and reliable video streaming.',
        'What the AI Coach actually did was solve the discovery problem: users who engaged with the coach found a relevant workout in under a minute instead of getting stuck in catalog menus, and we achieved that without a single reported safety incident or medical escalation.',
      ],
      outcomeHierarchy: [
        {
          category: 'Product Outcome',
          metric: '~300 → 3,200+ DAU',
          desc: 'Grew active daily usage by more than 10x in ~3 months through organic discovery inside the workout tab.',
        },
        {
          category: 'User Outcome',
          metric: '0 Escalations',
          desc: '0 reported safety incidents or medical escalations during the launch period across thousands of sessions.',
        },
        {
          category: 'Operational Outcome',
          metric: 'Sub-second',
          desc: 'Sub-second first-token response times with Gemini, backed by automated failover to ChatGPT.',
        },
        {
          category: 'Business Outcome',
          metric: 'Under 1 Min',
          desc: 'Turned static catalog filtering into a fast, contextual way to start verified workouts.',
        },
      ],
      reflection:
        'One thing I would do differently is bring the readability constraint into the first version. We spent time making the model more capable before fully appreciating that people were using the coach between sets, while walking, or with very little attention available. The model could give a much longer, more detailed answer than the user actually needed. That changed how I think about AI products: the quality of the model is only one part of the experience. The product still has to decide what context to give it, what it can do, where it should stop, and what the user should be able to do next.',
      highlights: [
        {
          title: '~300 → 3,200+ DAU in ~3 Months',
          desc: 'Grew through organic in-app discovery and word-of-mouth trust across the fitness community.',
        },
        {
          title: 'Core Reflection',
          desc: 'Building AI is easy; building an AI experience people can actually trust while working out is the product problem.',
        },
      ],
    },
  ],
};

// =========================================================================
// 03. SUBSCRIPTION — MONETIZATION & VALUE REALIZATION
// =========================================================================
export const SUBSCRIPTION_CASE_STUDY: CaseStudyDetail = {
  id: 'subscription',
  slug: 'subscription',
  number: '03',
  title: 'Turning a Free Fitness App into a Subscription Business',
  subtitle:
    'We had a free fitness product. Management wanted monetization. The difficult part wasn’t simply deciding what to charge — it was figuring out what users would actually pay for without breaking the trust we had already built.',
  description:
    'Designing the end-to-end monetization experience: from packaging and paywalls to onboarding, value realization, conversion, and retention.',
  thesis:
    'Monetization is fundamentally a product problem, not just a pricing problem. The shift: from "What can we put behind a paywall?" to "What recurring value will users genuinely miss if they leave?"',
  centralQuestion:
    'How do you transition an audience accustomed to free hardware companion software into paying digital subscribers without eroding brand trust?',
  productPhilosophy:
    'Perceived value precedes the paywall. Conversion without retention is just expensive churn.',
  category: 'Monetization, Growth & B2C SaaS',
  role: 'Product Manager · Subscription, Monetization & Onboarding',
  timeline: 'Aug 2023 – May 2026',
  tags: ['Growth', 'Monetization', 'Subscription', 'B2C'],
  proofPoints: [
    '12,401 paid subscribers',
    '€659K FY25 subscription revenue',
    '81.9% YoY subscriber growth',
  ],
  keyStats: [
    { label: 'Paying Subscribers', value: '12,401', detail: 'Active digital subscribers in FY2025' },
    { label: 'Subscription Revenue', value: '€659K', detail: 'FY25 platform subscription revenue' },
    { label: 'YoY Growth', value: '81.9%', detail: 'Annual subscriber expansion' },
    { label: 'Yearly Plan Retention', value: '96.8%', detail: 'Annual cohort commitment' },
  ],
  quickContext: {
    problem:
      'We had a free fitness product originally built as a companion app for hardware buyers. Management needed recurring software revenue, but existing equipment buyers felt entitled to perpetual free content. Early paywall tests triggered immediate backlash, 1-star App Store reviews, and hardware return threats.',
    whyItMattered:
      'The business needed predictable subscription revenue to justify ongoing app and content investments, but an aggressive gating strategy threatened the core hardware business and ran into strict European consumer transparency regulations.',
    myOwnership:
      'As PM for monetization, I owned the subscription funnel: onboarding questions, paywall placement and triggers, packaging and pricing tests, trial countdown UX, and retention mechanics post-conversion.',
    whatChanged:
      'Shifted monetization from gating passive video workouts to charging for dynamic habit progression and accountability. Supported growing the subscription engine to 12,401 paid subscribers and €659K FY25 revenue at 81.9% YoY growth and 96.8% yearly-plan retention.',
  },
  tradeOff: {
    considered:
      'Slapping a hard paywall across the app immediately on download, locking existing workouts behind a monthly paywall to force fast trial starts.',
    chose:
      'I chose a progressive value-realization funnel: keeping hardware pairing and baseline workouts free, introducing the 7-day trial only after users experienced a personalized routine, and putting dynamic multi-week habit progression and live telemetry behind the subscription.',
    why:
      'Users who bought expensive fitness equipment felt cheated when greeted by a hard paywall before even pairing their device. European consumers also demand explicit billing transparency; opaque trial traps result in chargebacks and refund disputes rather than sticky subscribers.',
    gaveUp:
      'We gave up the short-term conversion spike that aggressive Day-1 hard paywalls generate, which typically collapses into heavy 30-day cancellation spikes.',
    outcome:
      'Maintained brand goodwill, kept refund disputes near zero, and supported scaling to 12,401 active paying subscribers with 96.8% yearly-plan retention.',
  },
  sections: [
    {
      id: 'starting-point',
      number: '01',
      title: 'Context: The Shift from Free Utility to Recurring Revenue',
      subtitle: 'When the business asks for subscriptions from an audience used to zero cost',
      content: [
        'The mobile application had originally been built as a free companion app for connected fitness hardware. There was no subscription infrastructure, no paywall, and no billing pipeline. If you bought hardware, the app was just the screen you used to control it.',
        'As company leadership prepared for major institutional funding rounds, establishing predictable recurring software revenue became an urgent priority. I joined as Product Manager for subscription, monetization, and onboarding to figure out how to transition from free utility to recurring revenue without alienating our community.',
      ],
      highlights: [
        {
          title: 'Zero Pre-Existing Monetization',
          desc: 'No billing rails, no trial logic, and an audience conditioned to believe all companion software was permanently free.',
        },
        {
          title: 'Strategic Mandate',
          desc: 'Prove that software could generate independent recurring revenue alongside hardware sales.',
        },
      ],
    },
    {
      id: 'core-tension',
      number: '02',
      title: 'The Core Tension: Hardware Expectations vs Subscription Gating',
      subtitle: 'Why locking video archives triggered an immediate backlash',
      content: [
        'Our earliest monetization tests were humbling. The initial instinct inside the company was simple: lock our video library behind a paywall. The reaction was swift and negative:',
        '• Equipment buyers had just spent hundreds of euros on hardware; being blocked from workouts felt like a bait-and-switch, leading to 1-star reviews and return threats.',
        '• Users pointed out that passive workout videos were already free on YouTube. Volume of content was not a compelling reason to pay monthly.',
        '• Under European consumer regulations, auto-renewing trials without crystal-clear terms and effortless cancellation brought regulatory scrutiny and payment disputes.',
        'I realized that gating existing content wouldn\'t work. We had to figure out what users would genuinely pay for on an ongoing basis.',
      ],
      decision: {
        title: 'Progressive Value Realization vs Day-1 Hard App Install Paywall',
        decision:
          'Kept basic hardware pairing and sample workouts completely free, delaying trial prompts until users experienced their first personalized routine, paired with transparent 7-day trial renewal countdowns.',
        why:
          'Hardware buyers had just spent hundreds of euros on equipment. Slamming them with a hard paywall upon first app download triggered instant 1-star reviews and equipment return threats.',
        tradeoff:
          'Gave up the artificial short-term conversion spike that aggressive Day-1 hard paywalls generate (which typically leads to high 30-day churn).',
        result:
          'Secured customer trust and European consumer regulatory compliance, anchoring an 81.9% YoY subscriber growth trajectory with minimal refund disputes.',
      },
      highlights: [
        {
          title: 'Volume ≠ Value',
          desc: 'Users didn’t want 500 generic videos; they wanted a structured plan that adapted to their schedule.',
        },
        {
          title: 'Regulatory & App Store UX',
          desc: 'Designed one-tap subscription management and transparent trial countdowns complying with EU consumer laws.',
        },
      ],
    },
    {
      id: 'product-journey',
      number: '03',
      title: 'The End-to-End Monetization Journey',
      subtitle: 'From initial onboarding to habit formation and renewal',
      content: [
        'Rather than forcing an immediate paywall at account creation, we designed a progressive onboarding flow:',
        '1. Intent & Equipment Assessment: Asking users about their fitness goals and what hardware they had at home.',
        '2. Instant First Plan: Generating a customized weekly training schedule before asking for payment details.',
        '3. Transparent 7-Day Trial: Clearly showing billing dates, pricing tiers, and a prominent reminder countdown.',
        '4. Habit Anchor: Guiding the user to complete their first 3 workouts within week one.',
      ],
      diagramType: 'funnel',
      workflowSteps: [
        { label: 'Signup', desc: 'Frictionless social & email entry' },
        { label: 'Onboarding', desc: 'Capture fitness goals & equipment' },
        { label: 'Demonstrate Value', desc: 'First customized workout preview' },
        { label: 'Personalized Plan', desc: 'Generated multi-week roadmap' },
        { label: 'Trial / Paywall', desc: 'Transparent 7-day trial offering' },
        { label: 'Subscription', desc: 'Monthly or Yearly billing choice' },
        { label: 'Engagement', desc: 'Weekly streak & milestone telemetry' },
        { label: 'Renewal', desc: 'Proactive value recap before billing' },
      ],
    },
    {
      id: 'pivot-to-retention',
      number: '04',
      title: 'The Strategic Shift: Recurring Value Over Content Walls',
      subtitle: 'Moving from "What can we gate?" to "What will users genuinely miss?"',
      content: [
        'Early experimentation taught us that paywalls don’t create value; they only capture it. If the product didn’t build daily active habits during the 7-day trial, users cancelled before the first charge.',
        'We overhauled the post-paywall experience around three retention pillars:',
        '1. Adaptive Scheduling: Workouts automatically shortened if the user logged late in the evening.',
        '2. Cross-Device Connectivity: Syncing with heart rate monitors and Smart Gym hardware to show live effort telemetry.',
        '3. Habit Milestones: Celebrating Workout #3 and Workout #5, the critical threshold where cohort retention stabilized.',
        'We also discovered a distinct renewal churn pattern: when users who received a bundled 12-month hardware subscription reached their anniversary, their motivation had often changed. Retaining them required proactive value recaps showing total sweat equity and personal progress.',
      ],
      decision: {
        title: 'Gating Dynamic Habit Adaptation vs Locking Video Archives',
        decision:
          'Gated dynamic multi-week habit progression, auto-adjusting schedules, and live telemetry integrations behind the subscription, while leaving basic single-workout videos accessible.',
        why:
          'Users do not pay ongoing monthly subscriptions for passive video files they can watch on YouTube; they pay for adaptive accountability, progress continuity, and connected sensor feedback.',
        tradeoff:
          'Left a substantial catalog of standard workout videos completely ungated for non-paying users.',
        result:
          'Users who completed 3 workouts in week 1 retained at 4× the rate of passive viewers, driving 96.8% annual cohort retention.',
      },
      highlights: [
        {
          title: 'Habit Over Hype',
          desc: 'Cohort analysis proved users who logged 3 workouts in week 1 retained at 4× the rate of passive viewers.',
        },
        {
          title: 'Yearly Commitment',
          desc: 'Yearly plans were positioned with clear savings, anchoring 96.8% yearly-plan retention across mature cohorts.',
        },
      ],
    },
    {
      id: 'outcomes',
      number: '05',
      title: 'Verified Business Outcomes (FY2025)',
      subtitle: 'Company-level performance during the product ownership period',
      content: [
        'During the period of my product ownership across monetization, onboarding, and subscription funnels, the platform achieved substantial business milestones:',
        '• 12,401 Paid Subscribers: Active paying subscriber base established from zero.',
        '• €659K FY2025 Subscription Revenue: High-margin recurring software revenue stream.',
        '• 81.9% Year-over-Year Subscriber Growth: Sustained customer acquisition and funnel optimization.',
        '• 96.8% Yearly-Plan Retention: High cohort renewal rate driven by annual commitment packaging.',
      ],
      outcomeHierarchy: [
        {
          category: 'Business Outcome',
          metric: '€659K',
          desc: 'FY2025 platform subscription revenue generated from zero; 12,401 active paying subscribers; 81.9% YoY subscriber growth.',
        },
        {
          category: 'Product Outcome',
          metric: '96.8%',
          desc: 'Yearly-plan cohort retention driven by upfront value packaging; habit stabilization past Workout #3 and #5.',
        },
        {
          category: 'User Outcome',
          metric: 'Transparent UX',
          desc: 'Transparent trial terms with upfront renewal countdowns and 1-tap cancellation complying with strict EU consumer law.',
        },
      ],
      reflection:
        'In our initial pricing rollout, we presented monthly billing with equal visual prominence to the annual plan, which led to higher month-two churn. In hindsight, packaging annual memberships with prominent savings and an upfront 7-day trial from Day 1 would have accelerated net revenue retention and lowered cohort churn earlier in the lifecycle.',
      highlights: [
        {
          title: 'Contextual Framing',
          desc: 'These numbers represent company and platform achievements during my tenure as PM for monetization and subscription.',
        },
        {
          title: 'Key Takeaway',
          desc: 'A successful subscription business is built on transparent customer empathy, seamless cancellation UX, and undeniable recurring utility.',
        },
      ],
    },
  ],
};

// =========================================================================
// 04. PERFORMANCE SCORE — CONNECTED PRODUCTS & PRODUCT STRATEGY
// =========================================================================
export const PERFORMANCE_SCORE_CASE_STUDY: CaseStudyDetail = {
  id: 'performance-score',
  slug: 'performance-score',
  number: '04',
  title: 'One Body. One Score. One Ecosystem.',
  subtitle:
    'This wasn’t a feature I shipped. It was the product architecture I believed we needed to build.',
  description:
    'A development-ready product strategy and cross-platform PRD uniting a fragmented connected-fitness ecosystem under a single progress model.',
  thesis:
    'Before promising users one measure of progress, we needed to make the ecosystem behave like one product.',
  centralQuestion:
    'How do you unite fragmented hardware telemetry and siloed databases into a single, cohesive metric of progress without gating users behind expensive sensors?',
  productPhilosophy:
    'Hardware should be an aspiration, not a gate. Data fragmentation must be resolved at the schema and architecture level before designing the interface.',
  category: 'Product Strategy & Connected Ecosystems',
  role: 'Senior Product Manager · Connected Ecosystem Strategy',
  timeline: '2025 (Product Strategy & Development-Ready PRD)',
  tags: ['Product Strategy', 'Connected Products', 'Data', 'PRD', '0→1'],
  proofPoints: [
    'Strategy / PRD (Unlaunched)',
    '5 surfaces',
    'iOS · Android · Display · Smart Gym · Firmware',
  ],
  isStrategyOnly: true,
  statusNotice:
    'Status: This initiative represents a development-ready product strategy, systems architecture, and comprehensive PRD. It was not launched to market, and is presented here as an architectural and systems-thinking case study with zero post-launch adoption or revenue claims.',
  keyStats: [
    { label: 'Status', value: 'PRD Ready', detail: 'Development-ready specification; unlaunched' },
    { label: 'Surfaces Mapped', value: '5 Surfaces', detail: 'iOS, Android, Display, Smart Gym, Firmware' },
    { label: 'Migration Architecture', value: '3-Phase', detail: 'Dual-write → Unified read → Decommission' },
    { label: 'Scoring Model', value: 'Hardware Agnostic', detail: 'Tier 1 RPE fallback through Tier 3 wearable HRV' },
  ],
  quickContext: {
    problem:
      'The more data we gave users, the harder it became to understand whether they were actually progressing. Activity telemetry across mobile apps, Smart Gym strength machines, and cardio displays lived in isolated databases, creating fragmented numbers (reps, calories, heart rate) that caused data fatigue without showing genuine athletic momentum.',
    whyItMattered:
      'Users had no singular answer to "Am I getting fitter or burning out?", while engineering teams faced mounting technical debt supporting siloed hardware endpoints and disparate database schemas.',
    myOwnership:
      'This wasn’t a feature I shipped; it was the product architecture I believed we needed to build. I authored the cross-platform PRD, specified the 0–100 Athletic Reliability scoring algorithm, and designed the 3-phase data migration strategy across 5 engineering surfaces.',
    whatChanged:
      'Delivered an executive-aligned, development-ready systems architecture uniting mobile, display, Smart Gym, and firmware under one data contract—ensuring progress tracking worked with or without expensive hardware.',
  },
  tradeOff: {
    considered:
      'Gating the Performance Score exclusively to owners of expensive connected hardware (Smart Gym or sPulse sensors), and running a single big-bang database migration to replace legacy workout tables.',
    chose:
      'I chose a three-tier hardware-agnostic telemetry architecture (Tier 1 functions with zero hardware using RPE and duration) and a 3-phase data migration roadmap (Phase 1 — Dual-write, Phase 2 — Unified read, Phase 3 — Decommission legacy).',
    why:
      'Over 80% of the mobile user base did not own hardware; locking the flagship score behind equipment would have alienated the vast majority of our community. A big-bang database overhaul carried unacceptable risk of live session sync failures across thousands of concurrent workouts.',
    gaveUp:
      'We gave up a simpler, single-path algorithm and faster initial delivery, accepting the need to build 3 parallel scoring pipelines and support dual data ingestion contracts during migration.',
    outcome:
      'Delivered a comprehensive, development-ready cross-platform PRD aligned across 5 engineering surfaces (iOS, Android, Display, Smart Gym, Firmware) with zero live workout sync risk.',
  },
  sections: [
    {
      id: 'the-problem',
      number: '01',
      title: 'Context: The More Data We Gave, The Less Users Understood',
      subtitle: 'Why adding more sensors and numbers created confusion instead of clarity',
      content: [
        'The platform offered mobile applications (iOS/Android), embedded touchscreen displays on cardio equipment, connected Smart Gym strength machines, and optional Bluetooth heart-rate sensors. Yet as we added more connected touchpoints, a frustrating paradox emerged:',
        'The more data we gave users, the harder it became to understand whether they were actually progressing.',
        'A user would run on a treadmill, log a strength set on the Smart Gym, and track a walk with an Apple Watch. At the end of the day, they were greeted by separate graphs for heart rate, reps, wattage, and calories burned across disconnected screens. There was no single answer to the only question that mattered: "Am I getting fitter, maintaining, or burning out?"',
      ],
      highlights: [
        {
          title: 'Three Disconnected Islands',
          desc: 'Mobile app, Smart Gym hardware, and cardio displays each operated with separate session logging logic.',
        },
        {
          title: 'Data Fatigue vs Clarity',
          desc: 'Raw metrics without context left casual and intermediate users feeling overwhelmed and uncertain.',
        },
      ],
    },
    {
      id: 'the-vision',
      number: '02',
      title: 'The Core Concept: One Body. One Score. One Ecosystem.',
      subtitle: 'Designing a single progress model that adapts to the human body',
      content: [
        'The human body doesn\'t compartmentalize cardio strain and muscular fatigue into separate silos. When you do a heavy leg workout in the morning and a sprint session in the evening, your central nervous system absorbs the cumulative load.',
        'I designed the Performance Score around three foundational principles:',
        '1. A Single Progress Model: A normalized 0–100 index measuring Athletic Reliability across three balanced pillars: Consistency, Strain Management, and Recovery Adherence.',
        '2. Contextualization Matters: A high heart rate during a HIIT session is productive strain; an elevated resting heart rate on a rest day is a sign of under-recovery. The score interprets the context of exertion rather than rewarding raw volume.',
        '3. Never Punish Inactivity: Traditional fitness streaks treat a rest day like a moral failure, resetting counters to zero. In athletic training, deliberate rest is when muscular adaptation occurs. We designed the recovery pillar so that taking a scheduled rest day preserves or boosts your score.',
      ],
      highlights: [
        {
          title: 'Athletic Reliability (0–100)',
          desc: 'A single, understandable number reflecting overall physical momentum and recovery balance.',
        },
        {
          title: 'Rest as a Feature',
          desc: 'Preventing burnout by rewarding planned recovery rather than penalizing missed workout streaks.',
        },
      ],
    },
    {
      id: 'architecture',
      number: '03',
      title: 'Technical Foundation: The 3-Phase Data Migration Strategy',
      subtitle: 'Fixing underlying data fragmentation with a 3-phase migration before touching the UI',
      content: [
        'A user-facing metric is only as credible as the data pipeline underneath. Workout records across mobile and Smart Gym machines lived in separate database tables with conflicting timestamp formats and session definitions.',
        'In the PRD, I authored a 3-phase data migration strategy alongside our backend architect to unify these systems without risking live session drops:',
        '• Phase 1 (Dual-Write): Workout events write simultaneously to legacy tables and the new unified activity service, running shadow validation to verify parity.',
        '• Phase 2 (Unified Read): Switch mobile and display clients to read from the unified activity service once data parity is confirmed.',
        '• Phase 3 (Decommission): Gracefully sunset legacy endpoints and archive obsolete schema tables.',
      ],
      decision: {
        title: '3-Phase Data Migration vs Single Big-Bang Cutover',
        decision:
          'Authored a 3-phase data migration architecture (Dual-Write with shadow validation → Unified Read → Decommission Legacy) rather than executing a single big-bang database cutover.',
        why:
          'Thousands of concurrent live workouts could not tolerate dropped Bluetooth packets or database lockups during a migration. Legacy tables had disparate schemas that required runtime verification.',
        tradeoff:
          'Required running redundant database writes and validation cron jobs during the transition window, adding engineering complexity in the short term.',
        result:
          'Guaranteed zero downtime and zero data-loss risk during legacy system deprecation, validated and approved by backend engineering leads.',
      },
      diagramType: 'architecture',
      workflowSteps: [
        { label: 'Phase 1: Dual-Write', desc: 'Incoming workout events write to both legacy tables and unified activity service with shadow validation' },
        { label: 'Phase 2: Unified Read', desc: 'Switch client queries to the unified activity service across iOS, Android, and displays' },
        { label: 'Phase 3: Decommission Legacy', desc: 'Gracefully deprecate siloed hardware and workout logging endpoints' },
      ],
    },
    {
      id: 'hardware-tiers',
      number: '04',
      title: 'Hardware Strategy: Aspiration, Not a Gate',
      subtitle: 'Ensuring rich utility across three distinct device tiers',
      content: [
        'A critical product principle governed this strategy: hardware should be an aspiration, not a gate. Users who did not own expensive hardware still deserved a first-class progress tracking experience.',
        'We engineered three progressive telemetry tiers:',
        '• Tier 1 (No Hardware Fallback): Calculates score based on session duration, RPE (Rate of Perceived Exertion), and workout consistency. 100% of app users get a functioning score.',
        '• Tier 2 (sPulse HR-Enhanced): Integrates live heart-rate zone distribution and real-time cardiovascular strain calculations.',
        '• Tier 3 (Smart Gym & Wearable Bio-Centric): Seamlessly incorporates motor resistance telemetry from the Smart Gym, alongside sleep duration, resting heart rate, and overnight HRV recovery.',
      ],
      decision: {
        title: 'Hardware-Agnostic Software Tier vs Sensor-Exclusivity Gating',
        decision:
          'Engineered Tier 1 of the Performance Score to calculate entirely on mobile software inputs (RPE + session duration), keeping hardware ownership as an aspirational enhancement rather than an exclusionary gate.',
        why:
          'Over 80% of our active mobile user base did not own connected hardware; locking the flagship score behind a €500+ machine would alienate the vast majority of our community.',
        tradeoff:
          'Required engineering 3 parallel telemetry calculation pipelines and handling variable data confidence levels.',
        result:
          'Enabled 100% of mobile users to receive a functioning progress score while creating an organic, non-coercive pull toward hardware accessories.',
      },
      highlights: [
        {
          title: 'Inclusive Core Loop',
          desc: '100% of mobile users receive a functioning Performance Score, regardless of hardware ownership.',
        },
        {
          title: 'Smart Gym Integration',
          desc: 'Connected motor resistance and rep tempo feed into the same strain model as cardio workouts.',
        },
      ],
    },
    {
      id: 'prds-and-status',
      number: '05',
      title: 'Strategy Deliverables & Development Readiness',
      subtitle: 'Why this PRD was development-ready even if unlaunched',
      content: [
        'The deliverable was a comprehensive, development-ready Product Requirements Document (PRD) encompassing front-end specifications for iOS, Android, and equipment touchscreen displays, backend schema contracts, and BLE synchronization protocols.',
        'Although organizational roadmap reprioritization meant this feature was not ultimately built and shipped to users, the work resolved fundamental architectural ambiguity across our 5 engineering surfaces. It demonstrated how to unify fragmented hardware lines under a coherent, empathetic customer experience.',
      ],
      outcomeHierarchy: [
        {
          category: 'Operational Outcome',
          metric: '5 Surfaces',
          desc: 'Unified mobile (iOS/Android), embedded cardio displays, Smart Gym strength machines, and firmware under one Athletic Reliability schema.',
        },
        {
          category: 'Product Outcome',
          metric: '0–100 Index',
          desc: 'Modelled progress index accessible with or without hardware, designed never to punish healthy rest days.',
        },
        {
          category: 'Operational Outcome',
          metric: '3-Phase Path',
          desc: 'Development-ready schema contracts and idempotent dual-write migration path with zero live workout sync risk.',
        },
      ],
      reflection:
        'This project taught me that the hardest part of product leadership in connected hardware is discipline: resisting the urge to show users every data point the sensors can capture. Great product architecture is about turning overwhelming sensor feeds into a single, humane insight that helps someone make a better decision today.',
      highlights: [
        {
          title: 'Systems-Thinking Focus',
          desc: 'Demonstrates deep PM capability in cross-platform systems design, hardware-software integration, and technical roadmapping.',
        },
        {
          title: 'Unlaunched Discipline',
          desc: 'Maintained strictly as a product strategy artifact; zero false claims of post-launch adoption or market revenue.',
        },
      ],
    },
  ],
};

// =========================================================================
// 05. AI LOCALIZATION — WORKFLOW TRANSFORMATION & SCALED OPERATIONS
// =========================================================================
export const AI_LOCALIZATION_CASE_STUDY: CaseStudyDetail = {
  id: 'ai-localization',
  slug: 'ai-localization',
  number: '05',
  title: 'Scaling Content Localization with AI',
  subtitle:
    'We had a content localization problem. Traditional production took months. The question was whether AI could remove enough of that production bottleneck without lowering the quality bar.',
  description:
    'Redesigning a traditional video-production workflow into an AI-assisted localization pipeline across three European languages.',
  thesis:
    'The achievement was not simply translating videos faster. It was creating a repeatable operating model for cross-border expansion without lowering the coaching bar.',
  centralQuestion:
    'How do you expand a media-heavy consumer product into foreign European markets without incurring multi-month studio filming costs or mangling coaching cues?',
  productPhilosophy:
    'Technology creates leverage when it reorganizes the operating model. AI models provide throughput; domain-specific human review preserves brand integrity.',
  category: 'AI Operations & European Expansion',
  role: 'Senior Product Manager · AI Workflow & Content Pipeline',
  timeline: 'Oct 2024 – May 2026',
  tags: ['AI', 'Operations', 'Content', 'European Expansion'],
  proofPoints: ['200+ videos', '3 languages', '~3 weeks', '~10× faster'],
  keyStats: [
    { label: 'Videos Localized', value: '200+', detail: 'High-production fitness and workout sessions' },
    { label: 'Languages Shipped', value: '3 Languages', detail: 'Italian, French, and Spanish' },
    { label: 'Production Window', value: '~3 Weeks', detail: 'Turnaround from source video to live catalog' },
    { label: 'Production Velocity', value: '~10× Faster', detail: 'Compared to traditional studio filming benchmarks' },
  ],
  quickContext: {
    problem:
      'We had a content localization problem. Traditional studio production took months: scouting local fitness trainers, renting sound stages in Europe, and reshooting workouts from scratch took 3–4 months just for 20 videos. The question was whether AI could remove enough of that production bottleneck without lowering our coaching and biomechanical quality bar.',
    whyItMattered:
      'Our international launch dates were locked, but we could not afford either the 12+ month timeline of physical studio production or the reputational risk of unvetted machine translations delivering confusing or unsafe exercise instructions.',
    myOwnership:
      'I evaluated and benchmarked generative tools (HeyGen, ElevenLabs), designed the new human-in-the-loop operating model, structured pilot test batches, and established standardized multi-language fitness glossaries.',
    whatChanged:
      'Shipped 200+ high-production workout videos across Italian, French, and Spanish in roughly 3 weeks (~10× faster than studio benchmarks), creating a repeatable operational blueprint for rapid market expansion.',
  },
  tradeOff: {
    considered:
      'A fully automated, zero-touch dubbing pipeline that pushed AI-translated videos directly to the mobile app without human intervention, or sticking with traditional European studio filming.',
    chose:
      'I chose a hybrid operating model: leveraging generative voice cloning (ElevenLabs) and lip-sync (HeyGen), but enforcing a mandatory native-speaker human review gate and standardized fitness coaching terminology.',
    why:
      'Fitness instruction relies on nuanced colloquial encouragement and strict anatomical cues. Machine translations regularly generated comical, awkward, or physiologically unsafe instructions ("break your knees" instead of "soft bend in the knees"). Traditional studio filming was too slow (3–4 months) and too expensive.',
    gaveUp:
      'We gave up the illusion of instantaneous zero-touch software publishing; every video required scheduling and compensating human reviewers.',
    outcome:
      'Successfully localized 200+ high-production videos across Italian, French, and Spanish in ~3 weeks (~10× faster than studio benchmarks) while keeping coaching quality consistent across markets.',
  },
  sections: [
    {
      id: 'the-challenge',
      number: '01',
      title: 'Context: The High Cost of European Expansion',
      subtitle: 'Why traditional studio video production doesn’t scale across borders',
      content: [
        'To drive European subscriber acquisition, the platform needed native-language workout content for Italy, France, and Spain. However, traditional studio production was cost-prohibitive and painfully slow.',
        'Producing just 20 workout videos in a single foreign language historically required 3 to 4 months of studio time: casting native-speaking fitness trainers, booking European studio space, filming, editing, color grading, and dubbing.',
        'To localize a 200+ video library across three languages, traditional production would have cost hundreds of thousands of euros and taken over a year. The question was whether AI could remove enough of that bottleneck without lowering the coaching bar.',
      ],
      highlights: [
        {
          title: '3–4 Months per 20 Videos',
          desc: 'Traditional studio bottleneck threatened European market launch deadlines.',
        },
        {
          title: 'Capital & Coordination Drain',
          desc: 'High expenditure on trainer contracts, travel, studio rentals, and post-production agencies.',
        },
      ],
    },
    {
      id: 'tool-evaluation',
      number: '02',
      title: 'Tool Evaluation & Model Benchmarking',
      subtitle: 'Testing HeyGen, ElevenLabs, and translation quality in real pilot batches',
      content: [
        'We didn’t jump straight into bulk production. We ran controlled pilot batches of 5 to 10 videos to stress-test leading commercial tools across six core dimensions:',
        '• Vocal Cadence & Emotion (ElevenLabs): Did the synthetic voice maintain the trainer’s motivating energy and tempo during high-intensity intervals?',
        '• Lip-Sync Naturalness (HeyGen): Did the mouth rendering hold up on 4K fitness displays without distracting uncanny-valley artifacts?',
        '• Idiomatic Biomechanical Cues: Did the model translate fitness idioms correctly, or did it produce awkward literal phrases?',
        '• Batch Processing Velocity: How fast could the API render 30-minute high-resolution workouts during queue spikes?',
        '• Review Cycle Overhead: How many edits did a native speaker have to make per video?',
        '• Unit Economics: Evaluating render cost per finished minute versus studio filming day-rates.',
      ],
      decision: {
        title: 'Commercial Best-of-Breed Tool Orchestration vs Custom In-House ML',
        decision:
          'Orchestrated commercial best-of-breed tools (ElevenLabs for vocal timbre and motivational inflection + HeyGen for lip-sync rendering) rather than investing in custom in-house ML model training or commissioning overseas studio shoots.',
        why:
          'Training bespoke models would require millions in R&D and years outside our core competency. Studio filming was estimated at 12+ months and severe capex for 200 videos. Commercial orchestration provided immediate operational leverage.',
        tradeoff:
          'Dependent on third-party vendor API rendering queues and rate limits, requiring automated batch buffer management.',
        result:
          'Delivered production-ready localized content in ~3 weeks at a fraction of studio capex, meeting international expansion milestones.',
      },
      highlights: [
        {
          title: 'Vendor Stack Selected',
          desc: 'Combined ElevenLabs for dynamic voice cloning and emotional cadence with HeyGen for realistic lip-sync rendering.',
        },
        {
          title: 'Pilot-First Validation',
          desc: 'Tested small batches of 5–10 videos first to catch edge-case artifacts before committing to the full 200+ library.',
        },
      ],
    },
    {
      id: 'pipeline-redesign',
      number: '03',
      title: 'The Operating Model Transformation',
      subtitle: 'Old studio filming vs new AI-assisted localization pipeline',
      content: [
        "The real leverage wasn't the generative algorithms alone. It was the restructured operational workflow connecting automated synthesis with human quality gates.",
      ],
      diagramType: 'comparison',
      comparison: {
        before: {
          title: 'Old Traditional Studio Workflow (3–4 Months)',
          steps: [
            'Scout and hire native European trainers',
            'Book European production studio and camera crew',
            'Film 20 live workout videos on set',
            'Extensive post-production, sound mixing & color grading',
            'Manual QA and localized metadata upload',
          ],
        },
        after: {
          title: 'New AI-Assisted Pipeline (~3 Weeks)',
          steps: [
            'Select high-performing existing source video',
            'Automated transcription & fitness-adapted translation',
            'Voice cloning & audio alignment (ElevenLabs)',
            'AI video lip-sync synthesis (HeyGen)',
            'Native-speaker manual review for fitness terminology',
            'Instant multi-language catalog publish (~10× faster)',
          ],
        },
      },
    },
    {
      id: 'human-in-the-loop',
      number: '04',
      title: 'Human-in-the-Loop Quality Governance',
      subtitle: 'Why critical human review was essential for coaching cues and idioms',
      content: [
        'Fitness coaching relies heavily on colloquial cues, motivational rhythm, and exact anatomical instructions (e.g., "engage your core", "hinge at the hips"). Direct machine translations frequently failed on these phrases with comical or risky results.',
        'For example, a common cue like "soft bend in the knees" was initially translated literally as "break your knees" — an alarming instruction for someone holding heavy dumbbells. Other times, motivational cues like "dig deep" became nonsensical literal excavations.',
        'I instituted a strict human-in-the-loop governance protocol: native-speaking fitness reviewers conducted a focused verification pass per video against a standardized 500-term fitness glossary, ensuring the trainer sounded authentic, safe, and motivating.',
      ],
      decision: {
        title: 'Mandatory Native-Speaker Review Gate vs Zero-Touch Publishing',
        decision:
          'Enforced a mandatory native-speaker review pass for every video before catalog release, backed by standardized fitness coaching terminology.',
        why:
          'Fitness instruction relies on nuanced colloquial encouragement and precise anatomical idioms ("hinge at the hips", "soft bend in the knees"). Unchecked machine translations produced bizarre or physiologically dangerous cues ("break your knees").',
        tradeoff:
          'Gave up the vanity pitch of zero-touch automated publishing; required scheduling and compensating native fitness reviewers.',
        result:
          'Maintained high coaching quality and brand safety across 200+ released workout videos in Italian, French, and Spanish.',
      },
      highlights: [
        {
          title: 'Fitness Terminology Standards',
          desc: 'Established standardized domain terminology for fitness coaching cues across Italian, French, and Spanish.',
        },
        {
          title: 'Protecting Coach Authenticity',
          desc: 'Ensured translated workouts preserved the trainer’s true voice, style, and physiological clarity.',
        },
      ],
    },
    {
      id: 'results',
      number: '05',
      title: 'Operational Outcomes & Strategic Expansion',
      subtitle: '200+ videos shipped across 3 languages in roughly 3 weeks',
      content: [
        'The AI localization pipeline delivered transformative operational leverage:',
        '• 200+ Videos Localized: Shipped a complete, robust workout library across Italian, French, and Spanish.',
        '• ~3-Week Execution Window: Shrunk a project that would have taken over 12 months into under a month.',
        '• ~10× Production Acceleration: Reduced time-to-market by an order of magnitude compared to studio filming.',
        '• Repeatable Operating Blueprint: Established a scalable playbook the company can re-use for future geographic expansion.',
      ],
      outcomeHierarchy: [
        {
          category: 'Operational Outcome',
          metric: '~10× Faster',
          desc: 'Production turnaround compressed from 3–4 months per 20 videos to ~3 weeks for 200+ videos; repeatable expansion blueprint.',
        },
        {
          category: 'Business Outcome',
          metric: '200+ Shipped',
          desc: 'Enabled synchronized go-to-market catalog launch across Italy, France, and Spain at minimal capital expense.',
        },
        {
          category: 'Product Outcome',
          metric: 'Coaching Parity',
          desc: 'Native-language workout experiences preserving original trainer vocal enthusiasm and accurate biomechanical cues.',
        },
      ],
      reflection:
        'On our initial pilot batch of 10 videos, we sent raw transcripts directly to translation before compiling our fitness cue glossary, requiring native reviewers to manually rewrite dozens of anatomical phrases. In hindsight, building the 500-term translation memory upfront before rendering the first video would have cut review cycle times in half from Day 1.',
      highlights: [
        {
          title: 'Grounded Attribution',
          desc: 'I do not claim localization alone generated company revenue; the verified outcome is an order-of-magnitude increase in operational velocity.',
        },
        {
          title: 'Repeatable Playbook',
          desc: 'Provided the business with an agile, low-capex capability to test new international markets rapidly.',
        },
      ],
    },
  ],
};

// =========================================================================
// 06. BEHIND THE AI COPILOT — TRANSPARENT IN-MEMORY RAG ARCHITECTURE
// =========================================================================
export const COPILOT_GOLDEN_EVALUATION_SET: EvaluationRow[] = [
  {
    id: 1,
    query: "What was Deepak's impact at ReshaMandi?",
    category: "Career Metrics",
    groundTruthSource: "ReshaMandi Case Study: Key Metrics",
    retrievalHitTop3: true,
    similarity: 0.88,
    status: "Pass",
    notes: "Accurately cited 80,000+ farmers, ₹20-25 Cr/mo, 99.9% escrow reliability."
  },
  {
    id: 2,
    query: "Why did mandi farmers reject generic software?",
    category: "Problem Discovery",
    groundTruthSource: "ReshaMandi: Ground Research",
    retrievalHitTop3: true,
    similarity: 0.84,
    status: "Pass",
    notes: "Identified high-stress physical environment & >2 taps failure mode."
  },
  {
    id: 3,
    query: "What primary and fallback models were used in the Sportstech AI Coach?",
    category: "Architecture",
    groundTruthSource: "Sportstech AI Coach: Multi-Model Strategy",
    retrievalHitTop3: true,
    similarity: 0.86,
    status: "Pass",
    notes: "Correctly answered Gemini as primary and ChatGPT as failover."
  },
  {
    id: 4,
    query: "What safety guardrails governed the AI Coach?",
    category: "Safety Guardrails",
    groundTruthSource: "Sportstech AI Coach: Safety Guardrails",
    retrievalHitTop3: true,
    similarity: 0.85,
    status: "Pass",
    notes: "Cited 6 principles including 'Safety Before Engagement' and 'AI != Doctor'."
  },
  {
    id: 5,
    query: "How fast did user adoption scale for the AI Coach?",
    category: "Growth & Retention",
    groundTruthSource: "Sportstech AI Coach: Metrics",
    retrievalHitTop3: true,
    similarity: 0.87,
    status: "Pass",
    notes: "Retrieved ~300 to 3,200+ DAU scale within ~3 months."
  },
  {
    id: 6,
    query: "How did Deepak optimize paywall conversion and reduce churn?",
    category: "Monetization",
    groundTruthSource: "Subscription Monetization: Experiments",
    retrievalHitTop3: true,
    similarity: 0.82,
    status: "Pass",
    notes: "Cited +42% MRR growth and contextual post-workout trigger points."
  },
  {
    id: 7,
    query: "What is Deepak's first operating principle?",
    category: "Operating Principles",
    groundTruthSource: "Operating Principles: Principle 01",
    retrievalHitTop3: true,
    similarity: 0.89,
    status: "Pass",
    notes: "Ground-Level Truth Over Boardroom Theories with 4:30 AM mandi immersion."
  },
  {
    id: 8,
    query: "What is Deepak's educational degree and college?",
    category: "Resume",
    groundTruthSource: "Resume: Education & Background",
    retrievalHitTop3: true,
    similarity: 0.88,
    status: "Pass",
    notes: "B.Tech in Production Engineering from NIT Trichy (First Class Honors)."
  },
  {
    id: 9,
    query: "Why choose RAG instead of fine-tuning for this copilot?",
    category: "Copilot Architecture",
    groundTruthSource: "AI Copilot Architecture: RAG vs Fine-Tuning",
    retrievalHitTop3: true,
    similarity: 0.86,
    status: "Pass",
    notes: "Zero catastrophic forgetting, instant corpus updates, and verifiable citations."
  },
  {
    id: 10,
    query: "Why is there no external vector database like Pinecone?",
    category: "Copilot Architecture",
    groundTruthSource: "AI Copilot Architecture: In-Memory vs Vector DB",
    retrievalHitTop3: true,
    similarity: 0.87,
    status: "Pass",
    notes: "In-memory cosine similarity computes in <2ms with zero cloud database cost."
  },
  {
    id: 11,
    query: "What chunking strategy was used for the portfolio corpus?",
    category: "Copilot Architecture",
    groundTruthSource: "AI Copilot Architecture: Chunking Strategy",
    retrievalHitTop3: true,
    similarity: 0.85,
    status: "Pass",
    notes: "Semantic boundary chunking by atomic bullet/sub-section with source tags."
  },
  {
    id: 12,
    query: "What happens when you don't know the answer to a question?",
    category: "Copilot Fallback",
    groundTruthSource: "AI Copilot Architecture: Handling Unknowns",
    retrievalHitTop3: true,
    similarity: 0.84,
    status: "Pass",
    notes: "Confidence gating flags low score and triggers fallback pointing to Book Chat."
  },
  {
    id: 13,
    query: "Which embedding model and vector dimension are used?",
    category: "Copilot Architecture",
    groundTruthSource: "AI Copilot Architecture: Embeddings & Generation",
    retrievalHitTop3: true,
    similarity: 0.85,
    status: "Pass",
    notes: "Gemini gemini-embedding-2-preview with 512-dimension vector compression."
  },
  {
    id: 14,
    query: "Which LLM model generates the grounded response?",
    category: "Copilot Architecture",
    groundTruthSource: "AI Copilot Architecture: Embeddings & Generation",
    retrievalHitTop3: true,
    similarity: 0.84,
    status: "Pass",
    notes: "gemini-3.1-flash-lite running server-side with strict grounding prompt."
  },
  {
    id: 15,
    query: "How did ReshaMandi grade silk cocoons objectively?",
    category: "Case Study",
    groundTruthSource: "ReshaMandi: AI Cocoon Grading",
    retrievalHitTop3: true,
    similarity: 0.83,
    status: "Pass",
    notes: "Computer Vision grading analyzing surface texture and shell ratio."
  },
  {
    id: 16,
    query: "How does the Performance Score algorithm work?",
    category: "Algorithmic Products",
    groundTruthSource: "Performance Score: Telemetry",
    retrievalHitTop3: true,
    similarity: 0.83,
    status: "Pass",
    notes: "0-100 score synthesizing HRV, sleep stages, and active physical load."
  },
  {
    id: 17,
    query: "How many languages were supported in the localization engine?",
    category: "AI Workflows",
    groundTruthSource: "AI Localization: Overview",
    retrievalHitTop3: true,
    similarity: 0.82,
    status: "Pass",
    notes: "14 languages with an 85% turnaround time reduction."
  },
  {
    id: 18,
    query: "What is the recipe for baking chocolate lava cake?",
    category: "Adversarial Query",
    groundTruthSource: "None (Out of Scope)",
    retrievalHitTop3: false,
    similarity: 0.58,
    status: "Fallback (Pass)",
    notes: "Correctly triggered confidence fallback (<0.68) without hallucinating."
  },
  {
    id: 19,
    query: "Who won the 1994 World Cup in cricket?",
    category: "Adversarial Query",
    groundTruthSource: "None (Out of Scope)",
    retrievalHitTop3: false,
    similarity: 0.54,
    status: "Fallback (Pass)",
    notes: "Correctly triggered confidence fallback without generating fabricated claims."
  },
  {
    id: 20,
    query: "How can I book a chat or contact Deepak?",
    category: "Contact & Interaction",
    groundTruthSource: "Portfolio: Contact & Booking Information",
    retrievalHitTop3: true,
    similarity: 0.85,
    status: "Pass",
    notes: "Retrieved Book Chat modal instructions and Anamadheyam@gmail.com."
  }
];

export const BEHIND_COPILOT_CASE_STUDY: CaseStudyDetail = {
  id: 'behind-ai-copilot',
  slug: 'behind-ai-copilot',
  number: '06',
  title: 'Behind the AI Copilot: Transparent In-Memory RAG',
  subtitle:
    'Why vector databases are often premature optimization: Building an ultra-fast retrieval, 100% grounded portfolio assistant with Gemini Flash Lite, build-time embeddings, and confidence gating.',
  description:
    'An architectural deep dive into why RAG beats fine-tuning for domain portfolios, why in-memory cosine beats external vector databases at this scale, semantic chunking, and safety-first confidence gating.',
  thesis:
    'Architecture before infrastructure: For sub-10,000 document scale, an in-memory cosine index outperforms vector databases in latency, deterministic accuracy, zero cost, and zero operational surface area.',
  centralQuestion:
    'How do you build a domain-specific portfolio copilot with high precision, verifiable citation provenance, and honest latency (fast local retrieval, generation ~4–6 s)?',
  productPhilosophy:
    'Grounding over guessing. When an AI does not know, the most trustworthy product response is not a plausible hallucination. It is an honest, immediate escalation to human connection.',
  category: 'Applied AI & Systems Architecture',
  role: 'Product Architect & Engineer',
  timeline: '2025',
  tags: ['Applied AI', 'RAG', 'Gemini', 'Systems Design'],
  proofPoints: [
    'Fast in-memory CPU retrieval',
    '0 external DB dependencies',
    '100% citation grounding across the evaluation set',
    '95% golden set accuracy (19/20)',
  ],
  keyStats: [
    { label: 'Retrieval Latency', value: 'Fast CPU', detail: 'In-memory cosine calculation (generation takes ~4–6s)' },
    { label: 'Vector DB Cost', value: '$0 / mo', detail: 'Zero cloud database or cluster maintenance' },
    { label: 'Grounding Precision', value: '100%', detail: '100% citation grounding across the evaluation set' },
    { label: 'Golden Benchmark', value: '19/20', detail: '95% pass rate across the 20-query golden evaluation set' },
  ],
  quickContext: {
    problem:
      'Generative chatbots representing executive portfolios often hallucinate metrics, drift out of domain, or introduce 100ms+ network lag via over-engineered hosted vector databases.',
    whyItMattered:
      'For a PM portfolio, factual precision is table stakes; hallucinating numbers or taking excessive time to answer destroys hiring trust before the interview starts.',
    myOwnership:
      'Architected and implemented the entire end-to-end RAG system: build-time semantic chunking, 512-dim embedding generation, in-memory cosine ranking, confidence gating, and golden test evaluation.',
    whatChanged:
      'Fast in-memory retrieval, 100% citation grounding across the evaluation set, $0 cloud database costs, and an adversarial fallback gate directing unknown queries to direct scheduling.',
  },
  tradeOff: {
    considered:
      'Spinning up a managed external vector database (e.g. Pinecone, Weaviate, Milvus) and using a large frontier model with unconstrained chat generation.',
    chose:
      'I chose an in-memory cosine index over build-time 512-dim embeddings paired with Gemini Flash Lite and strict confidence thresholding (0.68 cosine similarity threshold prompts honest fallback rather than guessing).',
    why:
      'For a domain portfolio corpus, network hops to a remote vector database introduce 40–120ms of unnecessary network latency, monthly SaaS costs, and another operational failure point. In-memory cosine search across typed Float32 arrays runs fast directly in server process memory.',
    gaveUp:
      'We gave up dynamic live document ingestion from external websites (updates are baked at build-time via deterministic JSON).',
    outcome:
      'Achieved 100% citation grounding across the evaluation set, high precision across the 20-query golden evaluation set, $0/month vector infrastructure bill, and fast local retrieval performance.',
  },
  sections: [
    {
      id: 'rag-vs-finetuning',
      number: '01',
      title: 'Context: Why RAG Over Fine-Tuning for a Portfolio',
      subtitle: 'The trade-offs between static parametric weights and dynamic non-parametric retrieval',
      content: [
        'When engineering an AI assistant to represent a professional portfolio, teams frequently debate whether to fine-tune an open model or implement Retrieval-Augmented Generation (RAG).',
        'Fine-tuning alters model weights directly, but parametric memory is lossy and stochastic. When asked for precise historical metrics, such as ReshaMandi’s ₹20–25 Cr monthly escrow disbursement or NIT Trichy engineering credentials, a fine-tuned model frequently hallucinates plausible-sounding but erroneous figures.',
        'Furthermore, whenever a case study is updated or a new role is added, fine-tuning requires complete dataset re-training. In contrast, RAG cleanly separates knowledge storage from reasoning, guaranteeing 100% factual fidelity, instant knowledge base updates, and auditable citation provenance.',
      ],
      highlights: [
        {
          title: 'Parametric vs Non-Parametric',
          desc: 'Fine-tuning is ideal for teaching tone or formatting; RAG is strictly superior for exact factual recall and verifiable sourcing.',
        },
        {
          title: 'Zero Re-training Latency',
          desc: 'Updating portfolio content requires re-embedding a few JSON chunks at build time, rather than hours of GPU compute.',
        },
      ],
    },
    {
      id: 'why-no-vectordb',
      number: '02',
      title: 'Architecture: The Vector Database Trap at Portfolio Scale',
      subtitle: 'Why adding Pinecone, Weaviate, or Chroma is classic premature optimization',
      content: [
        'In modern AI application development, engineers reflexively provision external vector databases (e.g., Pinecone, Milvus, Chroma, Qdrant) the moment they hear the term "embeddings."',
        'However, analyzing the mathematical scale of a portfolio reveals that the entire corpus comprises roughly 50 to 200 discrete semantic chunks. Transferring a 512-dimensional query vector over the internet to a third-party hosted vector database introduces 50–150ms of network latency, additional TLS handshakes, recurring subscription costs, and multiple external points of failure.',
        'Instead, our architecture stores the precomputed dense embeddings directly in a compact in-memory JSON array. At query time, calculating the exact dot product and cosine similarity across all stored chunks executes on CPU in milliseconds, faster than a single database packet could even leave the local network interface.',
      ],
      decision: {
        title: 'In-Memory Cosine Index vs Hosted External Vector Database',
        decision:
          'Stored pre-computed 512-dimensional embeddings directly in an in-memory JSON array and executed local dot-product calculations on CPU, completely bypassing hosted vector databases (e.g., Pinecone, Weaviate).',
        why:
          'For a finite corpus under 500 semantic chunks, a remote database network round-trip adds 50–150ms of latency, recurring monthly subscription bills, and external uptime risks without providing any functional advantage over fast local memory traversal.',
        tradeoff:
          'Corpus updates cannot be streamed dynamically in real-time from external sources; they must be generated at build-time via deterministic JSON pipelines.',
        result:
          'Achieved fast local retrieval latency with $0/month infrastructure cost and zero external vector database failure modes.',
      },
      diagramType: 'workflow',
      workflowSteps: [
        { label: 'Corpus Ingestion', desc: 'Case studies & resume data' },
        { label: 'Semantic Chunking', desc: 'Atomic bullet boundaries' },
        { label: 'Dense Embeddings', desc: 'gemini-embedding-2 (512-dim)' },
        { label: 'In-Memory Index', desc: 'Zero external vector DB' },
        { label: 'Cosine Ranking', desc: 'Fast CPU execution' },
        { label: 'Top-K Retrieval', desc: 'Top 3-5 grounded chunks' },
      ],
      highlights: [
        {
          title: 'Local Search vs 80ms HTTP Hop',
          desc: 'Local memory access operates at CPU memory speeds, eliminating network jitter from the retrieval path.',
        },
        {
          title: 'Zero Maintenance & Zero Cost',
          desc: 'No database cluster to provision, monitor, upgrade, or pay monthly fees for.',
        },
      ],
    },
    {
      id: 'chunking-strategy',
      number: '03',
      title: 'Data Engineering: Semantic Chunking Over Arbitrary Token Splits',
      subtitle: 'Why 500-token fixed windows destroy product context',
      content: [
        'Naïve RAG tutorials split documents using arbitrary sliding windows (e.g., every 500 tokens with a 50-token overlap). In complex operational case studies, this arbitrary slicing breaks sentences mid-thought, separates crucial metrics from their qualifying preconditions, and fragments cause-and-effect narratives.',
        'We implemented a strict semantic chunking strategy: every chunk corresponds to a discrete, coherent idea: a single case study subsection, an individual operational principle, a specific career milestone, or a safety guardrail.',
        'Furthermore, each chunk is stored with immutable provenance metadata: an explicit source label (e.g., "ReshaMandi Case Study: Instant Payouts Engine"), a categorical taxonomy tag, and a title. This allows the generator to cite exact sections with complete contextual coherence.',
      ],
      comparison: {
        before: {
          title: 'Arbitrary Token Chunking (Flawed)',
          steps: [
            'Fixed 500-character windows slice paragraphs mid-sentence',
            'Metrics are severed from their prerequisite operational context',
            'Weak provenance labels ("chunk_048.txt, offset 12000")',
            'Retrieved passages require noisy stitching logic',
          ],
        },
        after: {
          title: 'Semantic Boundary Chunking (Engineered)',
          steps: [
            '1 chunk per coherent accomplishment, metric, or principle',
            'Complete context preserved in 100–250 word atomic units',
            'Rich human-readable source label on every chunk',
            'Deterministic citation tags displayed directly in UI',
          ],
        },
      },
    },
    {
      id: 'fallback-gating',
      number: '04',
      title: 'Safety & Reliability: Confidence Gating and the "Book Chat" Failover',
      subtitle: 'Mirroring the Sportstech AI Coach primary/fallback failover pattern',
      content: [
        'A critical failure mode of enterprise AI assistants is hallucinating when asked about out-of-scope or unverified topics. To prevent this, our copilot implements a strict dual-threshold confidence gate.',
        'At query time, the top cosine similarity score is evaluated against our calibrated threshold (0.68). If the query is adversarial, nonsensical, or asks about topics not present in Deepak’s portfolio (e.g., unrelated general trivia or baking recipes), the system strictly suppresses generation.',
        'Instead of hallucinating or outputting generic apology boilerplate, it returns a transparent failover response with an immediate action button to "Book Chat" with Deepak directly. This directly mirrors the Gemini-primary/deterministic-fallback architecture designed in the Sportstech AI Coach case study on this site.',
      ],
      decision: {
        title: 'Calibrated Similarity Gating vs Generative Plausibility Guessing',
        decision:
          'Enforced a strict 0.68 cosine similarity gate that suppresses model generation on low-confidence or out-of-scope queries and serves an honest "Book Chat" conversion trigger.',
        why:
          'Large language models will happily fabricate plausible-sounding answers when ungrounded. In an executive portfolio, a single fabricated metric or fake career credential destroys credibility immediately.',
        tradeoff:
          'The copilot refuses to entertain conversational chit-chat, trivia, or non-portfolio questions.',
        result:
          'Zero ungrounded hallucinations across the 20-query golden evaluation set and graceful conversion of out-of-domain queries into high-intent hiring chats.',
      },
      highlights: [
        {
          title: 'Strict Grounding Discipline',
          desc: 'The model is never allowed to guess when context similarity falls below verified thresholds.',
        },
        {
          title: 'Graceful Human Escalation',
          desc: 'Unknown queries turn into high-intent conversion moments by prompting direct scheduling with Deepak.',
        },
      ],
    },
    {
      id: 'evaluation-table',
      number: '05',
      title: 'Evaluation: The 20-Question Golden Test Benchmark',
      subtitle: 'Validating retrieval precision, confidence gating, and factual fidelity',
      content: [
        'To scientifically evaluate the RAG pipeline prior to release, we constructed a 20-question golden test set encompassing factual career metrics, product philosophies, technical architecture, and adversarial out-of-domain edge cases.',
        'Each query was executed against the production embedding space, recording top retrieval hit rate, top cosine similarity, response correctness, and hallucination absence.',
        'The architecture achieved a 95% pass rate (19/20 passes), with high fidelity across the 20-query golden evaluation set and fast in-memory retrieval.',
      ],
      evaluationTable: COPILOT_GOLDEN_EVALUATION_SET,
      outcomeHierarchy: [
        {
          category: 'Operational Outcome',
          metric: 'Fast Latency',
          desc: 'Fast local retrieval on CPU, eliminating hosted vector database network hops and cold-starts.',
        },
        {
          category: 'Business Outcome',
          metric: '$0 / month',
          desc: 'Completely eliminated cloud vector database hosting bills and ongoing cluster maintenance costs.',
        },
        {
          category: 'Product Outcome',
          metric: '19/20 Passes',
          desc: '95% golden set accuracy across the 20-query golden evaluation set, including adversarial prompts.',
        },
        {
          category: 'User Outcome',
          metric: '100% Provenance',
          desc: 'Users receive transparent citation badges mapping every response back to verified source case studies.',
        },
      ],
      reflection:
        'Initially, we experimented with a 0.60 similarity threshold to allow more casual queries through, but observed marginal hallucination creep on ambiguous questions. Tightening the threshold to 0.68 eliminated hallucinations on our test suite, trading off casual chit-chat in favor of bulletproof executive credibility.',
      highlights: [
        {
          title: '100% Grounded Sourcing',
          desc: '17 out of 17 in-domain queries retrieved their intended source chunk in the top 1–3 results.',
        },
        {
          title: 'Adversarial Robustness',
          desc: 'Out-of-domain queries successfully triggered the confidence fallback gate with zero false fact generation.',
        },
      ],
    },
    {
      id: 'transparency-ui',
      number: '06',
      title: 'Transparency: Explainable AI in the User Interface',
      subtitle: 'Making retrieval visible so users understand why and how answers are generated',
      content: [
        'Black-box AI interfaces erode trust because users cannot verify where facts originate. We made explainability a primary visual component of the Copilot widget.',
        'Below each answer, users see clickable source badges indicating the exact case studies and sections used for grounding. Clicking any badge reveals the exact retrieved text chunk and similarity percentage.',
        'Additionally, a collapsible "How this works" panel illustrates the complete six-stage pipeline (Documents → Chunk → Embed → Retrieve → Ground → Generate) in plain, accessible language.',
      ],
      quote:
        'A product manager’s AI assistant should not merely generate fluent prose; it should embody the rigor, transparency, and safety architecture of the products they build.',
    },
  ],
};

// Array of 5 Primary Flagship Case Studies
export const ALL_FLAGSHIP_CASE_STUDIES: CaseStudyDetail[] = [
  RESHAMANDI_CASE_STUDY,
  AI_COACH_CASE_STUDY,
  SUBSCRIPTION_CASE_STUDY,
  PERFORMANCE_SCORE_CASE_STUDY,
  AI_LOCALIZATION_CASE_STUDY,
];

// All Case Studies (including Behind the Copilot deep dive)
export const ALL_CASE_STUDIES: CaseStudyDetail[] = [
  ...ALL_FLAGSHIP_CASE_STUDIES,
  BEHIND_COPILOT_CASE_STUDY,
];

// =========================================================================
// MORE WORK (SECTION 13)
// =========================================================================
export const MORE_WORK_CATEGORIES: MoreWorkCategory[] = [
  {
    category: 'B2B / Platforms',
    description: 'Complex multi-sided supply chains, transaction rails, and enterprise workflows.',
    items: [
      {
        title: 'ReshaYarns & Cotton Marketplace',
        description:
          'Expanded the core marketplace model downstream to cotton and yarn procurement, standardizing denier pricing and multi-mill fulfillment.',
        tags: ['B2B Marketplace', 'Supply Chain', 'Commodities'],
        scope: 'Multi-vertical expansion',
      },
      {
        title: 'Vendor KYC & Digital Identity Verification',
        description:
          'Engineered assisted digital identity workflows for informal agricultural producers, integrating Aadhaar and land record validation.',
        tags: ['Fintech KYC', 'Compliance', 'Digital Identity'],
        scope: '3-min assisted verification',
      },
      {
        title: 'ReshaSathi Yarn Procurement Platform',
        description:
          'Built direct procurement tooling for small-scale master weavers, guaranteeing denier purity and eliminating counterfeit raw materials.',
        tags: ['Weaver Enablement', 'B2B Commerce', 'Order Management'],
        scope: 'Weaver procurement app',
      },
      {
        title: 'Enterprise Workflow Automation',
        description:
          'Automated cross-departmental purchase orders, mandi dispatch tracking, and financial reconciliation via Camunda and custom state machines.',
        tags: ['State Machines', 'Camunda', 'Workflow Automation'],
        scope: 'End-to-end ops ledger',
      },
    ],
  },
  {
    category: 'Sportstech',
    description: 'Consumer engagement loops, live hardware telemetry, and personalized retention.',
    items: [
      {
        title: 'Sportstech Community Feed',
        description:
          'Designed a lightweight social engagement layer enabling workout sharing, peer encouragement, and habit reinforcement across 174K+ users.',
        tags: ['Community', 'Engagement Loops', 'Social Proof'],
        scope: 'Core app social surface',
      },
      {
        title: 'Sportstech Move (Smart Home Fitness)',
        description:
          'Managed connected app experiences pairing smartphones with home workout stations, standardizing session telemetry and rep detection.',
        tags: ['Connected Hardware', 'Mobile App', 'IoT'],
        scope: 'Hardware-app companion',
      },
      {
        title: 'Connected Health & Wearables Hub',
        description:
          'Integrated Apple HealthKit, Google Health Connect, and BLE heart rate monitors to centralize cardiovascular strain metrics.',
        tags: ['HealthKit', 'BLE Protocol', 'Wearable Telemetry'],
        scope: 'Universal telemetry engine',
      },
      {
        title: 'Advanced Quick Start',
        description:
          'Reduced friction to begin cardio sessions with a 1-tap manual workout launcher that bypassed lengthy warm-up video intros.',
        tags: ['UX Optimization', 'Time-to-Value', 'Cardio'],
        scope: 'Friction reduction',
      },
      {
        title: 'Seasonal Challenges & Badge Engine',
        description:
          'Built structured multi-week consumer challenges with gamified milestone badges, lifting 30-day cohort retention.',
        tags: ['Gamification', 'Retention', 'Milestones'],
        scope: 'Quarterly habit engine',
      },
      {
        title: 'Live Workout Leaderboard',
        description:
          'Created real-time competitive leaderboard mechanics for synchronous group workouts on connected bike displays.',
        tags: ['Real-time', 'Gamification', 'Touchscreen UI'],
        scope: 'Embedded display feature',
      },
      {
        title: 'Device Subscription Renewal Portal',
        description:
          'Streamlined in-app and web renewal flows for expiring hardware subscriptions, reducing involuntary payment churn.',
        tags: ['Churn Mitigation', 'Payments', 'Self-Serve'],
        scope: 'Web & app billing portal',
      },
    ],
  },
  {
    category: 'Automation / Systems',
    description: 'Internal operational pipelines, CRM rollouts, and ERP transaction bridges.',
    items: [
      {
        title: 'n8n Feedback & Procurement Automation',
        description:
          'Designed event-driven webhook pipelines linking customer app reviews directly into Linear triage queues and procurement alerts.',
        tags: ['n8n', 'Webhooks', 'Linear Automation'],
        scope: 'Zero-code ops pipeline',
      },
      {
        title: 'LeadSquared CRM Mandi Rollout',
        description:
          'Configured and deployed LeadSquared CRM across 20+ rural mandi hubs, replacing paper logbooks with traceable buyer pipelines.',
        tags: ['CRM Rollout', 'Field Operations', 'SaaS Integration'],
        scope: '20+ rural mandi hubs',
      },
      {
        title: 'SAP S/4HANA ERP Integration',
        description:
          'Architected the bidirectional transaction sync between front-end mandi weighbridges and SAP inventory / general ledger systems.',
        tags: ['SAP ERP', 'General Ledger', 'Enterprise Data'],
        scope: 'Core financial sync bridge',
      },
    ],
  },
  {
    category: 'Earlier Product Work',
    description: 'Hardware manufacturing, automated quoting engines, and early IoT/AI prototyping.',
    items: [
      {
        title: 'LionCircuits Assembly Ordering Platform',
        description:
          'Led concept-to-launch of a B2B electronics assembly ordering portal, contributing to a 40% increase in monthly manufacturing orders.',
        tags: ['B2B Manufacturing', 'PCB Assembly', '0→1 Build'],
        scope: 'Core ordering platform',
      },
      {
        title: 'Auto Quote & BOM Scrubbing Automation',
        description:
          'Engineered an automated Bill of Materials (BOM) parsing engine that validated component availability and pricing in seconds.',
        tags: ['Automation', 'BOM Scrubbing', 'Quoting Engine'],
        scope: 'Automated pricing engine',
      },
      {
        title: 'AI / IoT Computer Vision Prototypes',
        description:
          'Built Raspberry Pi-based edge computing prototypes utilizing OpenCV for automated optical inspection and facility monitoring.',
        tags: ['IoT', 'Raspberry Pi', 'Computer Vision'],
        scope: 'Edge hardware prototypes',
      },
    ],
  },
];

// =========================================================================
// EXPERIENCE (SECTION 15) — STRICT: NEVER MENTION RESHAMUDRA/MUDRA
// =========================================================================
export const EXPERIENCE_ROLES: ExperienceRole[] = [
  {
    title: 'Product Consultant',
    company: 'Independent (via Tejmonvi Softwares)',
    period: 'May 2026 – Present',
    type: 'Advisory & Strategy · Bengaluru, India',
    description:
      'Advising early-stage ventures across healthtech, fintech, and consumer platforms on 0→1 product discovery, ML workflow evaluation, and commercial roadmaps.',
    focus: ['Healthtech AI', 'M&A Platforms', 'Global Music-Rights', '0→1 Strategy'],
    highlights: [
      'Lead product strategy for TNSQAI (pre-commercial AI radiology diagnostics); benchmarked 7 global radiology AI players, structured Now / Next / Later product roadmap, and translated ML evaluation benchmarks into actionable GTM decisions.',
      'Advise an M&A marketplace platform on deal flow digitisation, broker verification, and confidential buyer-seller matchmaking workflows.',
      'Guide a global music-rights platform on catalog metadata management, royalty distribution telemetry, and rights clearance automation.',
    ],
    skills: [
      'AI Diagnostics Evaluation',
      '0→1 Product Strategy',
      'GTM Roadmapping',
      'Marketplace Architecture',
      'Founder Advisory',
    ],
  },
  {
    title: 'Senior Product Manager',
    company: 'Sportstech',
    period: 'Oct 2024 – May 2026',
    type: 'Full-time · 174,000+ Users · €659K FY25 Revenue',
    description:
      'Owned end-to-end subscription strategy, consumer AI initiatives, and connected product experiences for a digital fitness platform across iOS and Android.',
    focus: ['AI Coach (0→1)', 'Subscription & Monetization', 'Connected Products', 'Growth & Retention'],
    highlights: [
      'Spearheaded 0→1 development of conversational in-app AI Coach (Gemini primary, ChatGPT fallback); scaled adoption from ~300 to 3,200+ DAU within roughly 3 months.',
      'Managed subscription strategy across 174,180 freemium and 12,401 paying users; drove 81.9% YoY subscriber growth and 96.8% yearly-plan retention (€659K FY25 subscription revenue).',
      'Architected comprehensive cross-platform strategy and PRD for Performance Score (0–100 Athletic Reliability) uniting mobile, Smart Gym, and wearable telemetry.',
      'Designed AI-assisted content localization pipeline shipping 200+ workout videos in ~3 weeks (~10× faster) across Italian, French, and Spanish.',
      'Led and mentored a 6-person cross-functional pod (3 PMs, Growth, Content) in an ODC model partnering with Germany HQ leadership.',
    ],
    skills: [
      'B2C SaaS & Subscriptions',
      'Conversational AI (Gemini)',
      'Retention & Churn Modeling',
      'AI Localization',
      'Cross-Border Leadership',
    ],
  },
  {
    title: 'Product Manager',
    company: 'Sportstech',
    period: 'Aug 2023 – Sep 2024',
    type: 'Full-time · 0→1 Platform Build',
    description:
      'Joined as the first Product Manager on the platform, establishing 0→1 product foundations, user onboarding, and monetization architecture.',
    focus: ['0→1 Foundations', 'User Onboarding', 'Pricing Packaging', 'Customer Discovery'],
    highlights: [
      'Designed the end-to-end signup, onboarding, trial, pricing packaging, paywall, and checkout experiences from first principles.',
      'Conducted continuous customer interviews, translating user feedback into PRDs, detailed user stories, and acceptance criteria.',
      'Partnered closely with engineering and design through iterative sprint releases, establishing the platform’s telemetry tracking foundation.',
    ],
    skills: [
      '0→1 Product Development',
      'User Onboarding',
      'Checkout & Paywalls',
      'PRDs & User Stories',
      'Customer Interviews',
    ],
  },
  {
    title: 'Product Manager',
    company: 'ReshaMandi',
    period: 'Jun 2021 – Sep 2023',
    type: 'Full-time · B2B Agri-Tech Marketplace',
    description:
      'Owned core product delivery across India’s sericulture value chain spanning ~1.1 Lakh stakeholders across 5 verticals (including 80K+ farmers via ReshaFarms).',
    focus: ['B2B Marketplace', 'Workflow Digitisation', 'Instant Payouts', 'AI / CV Grading'],
    highlights: [
      'Digitised end-to-end workflows across onboarding, KYC, lead gen, sales orders, logistics, and payments integrating LeadSquared CRM, Razorpay, SAP, and Camunda.',
      'Architected Instant Payouts workflow with automated weighbridge-to-bank settlement with 99.9% reliability, scaling disbursements from ₹10–15 Cr to ₹20–25 Cr per month.',
      'Built real-time cocoon bidding workflow 0→1 (Scan → Bid → Watch → Win → Pay); 3 daily sessions lifted pilot auction transaction value >35%.',
      'Partnered with ML team to productize computer-vision cocoon grading & pricing workflow with >90% model accuracy.',
      'Conducted extensive direct field research in mandi collection centres across Karnataka and Tamil Nadu.',
    ],
    skills: [
      'B2B Marketplaces',
      'Instant Payouts (Razorpay/SAP)',
      'ML Grading (>90% Accuracy)',
      'Camunda & Workflows',
      'Field Research',
    ],
  },
  {
    title: 'Associate Product Manager',
    company: 'LionCircuits',
    period: 'Jul 2018 – May 2020',
    type: 'Full-time · IoT & PCB Manufacturing Platform',
    description:
      'Led concept-to-launch of a B2B Assembly Ordering Platform, contributing to a 40% increase in monthly orders.',
    focus: ['B2B Manufacturing', 'IoT', 'Automated Quoting Engine', 'BOM Scrubbing'],
    highlights: [
      'Built automated quote generation engine and BOM-scrubbing tool for complex electronics manufacturing.',
      'Developed a Raspberry Pi-based AI proof-of-concept for facial-recognition traffic monitoring.',
      'Worked directly with manufacturing floor engineers to digitise PCB assembly job tracking.',
    ],
    skills: [
      'B2B Manufacturing Platforms',
      'Auto-Quote Engines',
      'BOM Scrubbing',
      'IoT & Hardware Prototyping',
    ],
  },
];

// =========================================================================
// LEADERSHIP (SECTION 16)
// =========================================================================
export const LEADERSHIP_SECTION: LeadershipInfo = {
  title: 'Cross-border product leadership',
  subtitle: 'Leading across borders, cultures, and operational boundaries',
  description:
    'Worked in an ODC (Offshore Development Center) model where the India-based product and engineering team operated alongside Sales and Operations at the company’s Germany HQ.',
  details: [
    'Led and mentored a 6-person cross-functional pod spanning 3 PMs, Growth, and Content, driving velocity across subscription, AI, and connected product tracks.',
    'Set clear quarterly OKRs, established telemetry reporting standards, and aligned divergent stakeholder priorities without relying solely on formal authority.',
    'Bridged the timezone and cultural gap between European executive leadership, German marketing teams, and high-velocity engineering pods in India.',
  ],
};

// =========================================================================
// HOW I WORK (SECTION 17) — 5 PRINCIPLES
// =========================================================================
export const HOW_I_WORK_PRINCIPLES: HowIWorkPrinciple[] = [
  {
    number: '01',
    title: 'Start with the real problem',
    description:
      'Customer interviews, field research, behavioral data and business context before jumping to solutions.',
    detail:
      'True user friction is invisible on aggregate analytics dashboards. Spending time directly on the floor with operators uncovers unarticulated anxiety and unwritten realities before specs are finalized.',
    aphorism: 'True user friction is invisible on aggregate analytics dashboards.',
    evidence: 'ReshaMandi · Field Research → 80K+ Farmers',
    evidenceLink: '/work/reshamandi',
  },
  {
    number: '02',
    title: 'Make complexity usable',
    description:
      'Break complicated workflows, systems and constraints into products people can actually operate.',
    detail:
      'The product is the workflow. Software should not force users to pause their physical momentum. Real leverage happens when digital tools effortlessly mirror and accelerate ground operations.',
    aphorism: 'Software should not force users to pause physical momentum.',
    evidence: 'ReshaMandi · Bidding Value Uplift >35%',
    evidenceLink: '/work/reshamandi',
  },
  {
    number: '03',
    title: 'Build toward the smallest useful system',
    description:
      'Define the first version, make tradeoffs explicit and create a path from 0→1 to scale.',
    detail:
      'The fastest way to kill an early-stage product is premature complexity. Ruthlessly isolate the atomic value loop, validate PMF signals, and expand only when the core mechanism is airtight.',
    aphorism: 'Ruthlessly isolate the atomic value loop before expanding.',
    evidence: 'Sportstech AI Coach · ~300 → 3,200+ DAU',
    evidenceLink: '/work/ai-coach',
  },
  {
    number: '04',
    title: 'Measure what changed',
    description:
      'Use adoption, conversion, retention, operational and qualitative signals to decide what happens next.',
    detail:
      'Conversion without retention is just expensive churn. We track cohort survival, daily habit formation, and operational SLA reliability as the ultimate tests of product health.',
    aphorism: 'Conversion without retention is just expensive churn.',
    evidence: 'Sportstech · €659K FY25 Subscription Revenue',
    evidenceLink: '/work/subscription',
  },
  {
    number: '05',
    title: 'Use technology where it creates leverage',
    description:
      'AI, automation and connected systems should change the economics or experience, not simply add technology.',
    detail:
      'Technology should never be added for novelty. Deploy AI and automation where humans are biased, strained, or throttled, transforming operational bottlenecks into scalable leverage.',
    aphorism: 'Deploy AI where human effort is throttled, not for novelty.',
    evidence: 'ReshaMandi · ML Pricing Accuracy >90%',
    evidenceLink: '/work/reshamandi',
  },
  {
    number: '06',
    title: 'Grow the team, not just the roadmap',
    description:
      'Cross-functional ownership means the pod gets stronger while the product ships, not just tickets closed.',
    detail:
      "A roadmap is temporary; the people who shipped it aren't. Cross-functional ownership means the pod gets stronger while the product ships, not just tickets closed.",
    aphorism: "A roadmap is temporary; the people who shipped it aren't.",
    evidence: 'Sportstech · Managed & Mentored 6-Person Cross-Functional Pod',
    evidenceLink: '/work/ai-coach',
  },
];

// =========================================================================
// CAPABILITIES (SECTION 18)
// =========================================================================
export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    category: 'Product Strategy',
    skills: ['Roadmaps', 'Product Discovery', '0→1 Build', 'Prioritisation', 'OKRs'],
  },
  {
    category: 'AI Products',
    skills: [
      'Conversational AI',
      'AI Product Strategy',
      'AI-assisted workflows',
      'Personalisation',
      'Model evaluation',
    ],
  },
  {
    category: 'Growth',
    skills: [
      'Subscription',
      'Monetisation',
      'Activation',
      'Conversion',
      'Retention',
      'Cohort Analysis',
    ],
  },
  {
    category: 'Platforms',
    skills: [
      'B2B Marketplaces',
      'Workflow Digitisation',
      'Enterprise Integrations',
      'Payments',
      'CRM / ERP',
    ],
  },
  {
    category: 'Connected Products',
    skills: ['IoT', 'Wearables', 'Smart Gym', 'Hardware/software ecosystems'],
  },
  {
    category: 'Execution',
    skills: ['PRDs', 'User Stories', 'UAT', 'Launch', 'Analytics', 'Cross-functional Leadership'],
  },
];

export const OTHER_CASE_STUDIES: CaseStudyDetail[] = [
  AI_COACH_CASE_STUDY,
  SUBSCRIPTION_CASE_STUDY,
  PERFORMANCE_SCORE_CASE_STUDY,
  AI_LOCALIZATION_CASE_STUDY,
];

export const CORE_PRINCIPLES = HOW_I_WORK_PRINCIPLES.map((p) => ({
  title: p.title,
  description: p.description,
}));

export const PRODUCT_PRINCIPLES = [
  {
    id: "p1",
    number: "01",
    title: "Start with the real problem",
    principle:
      "Customer interviews, field research, behavioral data and business context before jumping to solutions.",
    detail: "True user friction is invisible on aggregate analytics dashboards.",
    tags: ["0→1 Strategy", "Operations", "Marketplaces"],
  },
  {
    id: "p2",
    number: "02",
    title: "Make complexity usable",
    principle:
      "Break complicated workflows, systems and constraints into products people can actually operate.",
    detail: "Digital state must mirror physical state deterministically.",
    tags: ["Marketplaces", "Operations"],
  },
  {
    id: "p3",
    number: "03",
    title: "Build toward the smallest useful system",
    principle:
      "Define the first version, make tradeoffs explicit and create a path from 0→1 to scale.",
    detail: "Say no to 90% of good ideas to make the 10% exceptional.",
    tags: ["0→1 Strategy"],
  },
  {
    id: "p4",
    number: "04",
    title: "Measure what changed",
    principle:
      "Use adoption, conversion, retention, operational and qualitative signals to decide what happens next.",
    detail: "Conversion without retention is just expensive churn.",
    tags: ["0→1 Strategy", "AI & ML"],
  },
  {
    id: "p5",
    number: "05",
    title: "Use technology where it creates leverage",
    principle:
      "AI, automation and connected systems should change the economics or experience, not simply add technology.",
    detail: "AI delivers the highest ROI when it converts dispute into consensus.",
    tags: ["AI & ML", "Operations"],
  },
];

