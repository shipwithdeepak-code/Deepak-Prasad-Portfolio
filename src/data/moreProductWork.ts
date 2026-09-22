import { MoreProductWorkItem } from '../types';

export const MORE_PRODUCT_WORK_ITEMS: MoreProductWorkItem[] = [
  // =========================================================================
  // B2B & PLATFORMS
  // =========================================================================
  {
    id: 'reshayarns',
    slug: 'reshayarns',
    title: 'ReshaYarns',
    shortTitle: 'ReshaYarns',
    storyAngle: 'B2B marketplace for silk yarn',
    description: 'B2B marketplace for silk yarn connecting reeler-side supply with textile manufacturers and weavers.',
    company: 'ReshaMandi',
    period: '2021 – 2023',
    role: 'Product Manager · Core Marketplace',
    primaryCategory: 'B2B & Platforms',
    tags: ['B2B', 'Marketplace', '0→1'],
    metrics: [
      { value: '17K+', label: 'stakeholders', context: 'ReshaYarns marketplace' },
      { value: '~₹40 Cr+', label: 'average monthly business volume', context: 'commercial silk yarn exchange' },
      { value: 'B2B marketplace', label: 'for silk yarn', context: 'reeler supply to weavers' },
    ],
    problem: 'Silk yarn trading was conducted through informal, fragmented networks of commission agents with opaque markups, volatile denier consistency, and no structured fulfillment tracking.',
    whyItMattered: 'Weavers faced inconsistent yarn quality that caused loom stoppages and uneven fabric luster, while yarn reelers lacked reliable forward demand and predictable working capital.',
    myOwnership: 'Led product discovery, catalog standardization, order workflows, and fulfillment milestones connecting yarn producers directly to textile manufacturers and master weavers.',
    keyDecision: {
      title: 'Catalog Denier Standardization vs Open-Text Listings',
      decision: 'Standardized technical denier grading and batch testing certificates into a structured catalog rather than allowing unverified free-form merchant listings.',
      tradeoff: 'Increased supplier listing friction upfront, but eliminated batch rejections, quality disputes, and offline sample checks downstream.',
      why: 'In commercial weaving, even a 2-denier variation causes warp breaks and uneven fabric luster. The platform needed to control quality standards to replace offline commission agents.',
    },
    solution: {
      summary: 'Structured a digitised multi-mill catalog, verified grade specifications, and real-time inventory allocation across yarn production hubs.',
      steps: [
        { label: 'Supply', desc: 'Reeler yarn output graded by technical denier specs and origin' },
        { label: 'Catalog / standardization', desc: 'Digital multi-mill catalog with verified quality certificates' },
        { label: 'Order', desc: 'Cluster-level weaver demand pooled with credit line clearance' },
        { label: 'Fulfilment', desc: 'Milestone dispatch tracking from spinning mill to loom shed' },
        { label: 'Manufacturer / Weaver', desc: 'Delivery verification and automated escrow settlement' },
      ],
      details: [
        'Structured catalog around technical yarn grades (denier, twist, origin).',
        'Implemented milestone-based dispatch tracking from spinning mill to loom shed.',
        'Connected order placement with automated credit line validation.',
      ]
    },
    outcome: {
      summary: 'Established a structured commercial silk yarn exchange, standardizing transactions across hundreds of spinning mills and weaving clusters at ~₹40 Cr average monthly volume.',
      type: 'Marketplace Expansion'
    },
    reflection: 'Commodity marketplaces succeed on trust and specification rigor. Without unambiguous technical grading, buyers default to physical inspection and offline habits.',
    relatedProjects: [
      { title: 'Digitising a Complex B2B Marketplace', slug: 'reshamandi', category: 'Flagship', route: '/work/reshamandi' },
      { title: 'Cocoon Bidding', slug: 'cocoon-bidding', category: 'B2B & Platforms', route: '/work/more/cocoon-bidding' },
      { title: 'Instant Payouts', slug: 'instant-payouts', category: 'B2B & Platforms', route: '/work/more/instant-payouts' },
    ],
    route: '/work/more/reshayarns',
  },
  {
    id: 'cotton-marketplace',
    slug: 'cotton-marketplace',
    title: 'Cotton Marketplace',
    shortTitle: 'Cotton Marketplace',
    storyAngle: 'Extending the marketplace model into cotton',
    description: 'Extending the core marketplace architecture into cotton procurement, multi-ginning dispatch, and spinning mill supply lines.',
    company: 'ReshaMandi',
    period: '2022 – 2023',
    role: 'Product Manager · Marketplace Expansion',
    primaryCategory: 'B2B & Platforms',
    tags: ['B2B', 'Marketplace', 'Platform'],
    metrics: [
      { value: 'Multi-fiber', label: 'unified transaction engine', context: 'single account & ledger' },
      { value: '2× faster', label: 'subsequent fiber expansion', context: 'parameterized commodity schema' },
    ],
    problem: 'Ginning mills and cotton traders operated across geographically distant agrarian clusters with zero real-time inventory visibility and manual contract negotiation.',
    whyItMattered: 'Expanding into cotton was critical to cross-selling raw materials to diversified textile manufacturers who consumed both silk and cotton blends.',
    myOwnership: 'Architected the multi-commodity transaction schema, ginning dispatch protocols, and procurement workflows to support cotton bale grading and lot tracking.',
    keyDecision: {
      title: 'Unified Commodity Engine vs Isolated Vertical Silo',
      decision: 'Built an extensible commodity data model that parameterized staple length and trash percentage rather than spinning up a separate siloed application.',
      tradeoff: 'Required refactoring core transaction tables, but cut development time by half for subsequent natural fibers.',
      why: 'Textile buyers frequently purchase multi-fiber contracts and needed a single account ledger.'
    },
    solution: {
      summary: 'Created a parameter-driven marketplace layer handling staple length, micronaire, moisture metrics, and multi-truck dispatch coordination.',
      steps: [
        { label: 'Commodity Parameterization', desc: 'Bale metrics mapped into flexible schema attributes' },
        { label: 'Ginning Allocation', desc: 'Real-time lot reservation directly from ginning floors' },
        { label: 'Multi-Truck Dispatch', desc: 'Split-shipment tracking integrated into buyer invoice' },
      ],
      details: [
        'Extended order states to handle staggered deliveries across multi-truck shipments.',
        'Created standardized bale inspection checklists for quality assurance agents.',
        'Unified credit and invoice ledgers across silk and cotton purchase agreements.',
      ]
    },
    outcome: {
      summary: 'Successfully expanded platform transaction rails into cotton bales and yarn, proving the core marketplace architecture was commodity-agnostic.',
      type: 'Platform Capability'
    },
    reflection: 'True platform thinking means identifying the invariant core—custody, verification, escrow, dispatch—and parameterizing the domain-specific edges.',
    relatedProjects: [
      { title: 'Digitising a Complex B2B Marketplace', slug: 'reshamandi', category: 'Flagship', route: '/work/reshamandi' },
      { title: 'ReshaYarns', slug: 'reshayarns', category: 'B2B & Platforms', route: '/work/more/reshayarns' },
    ],
    route: '/work/more/cotton-marketplace',
  },
  {
    id: 'vendor-kyc',
    slug: 'vendor-kyc',
    title: 'Vendor Onboarding & KYC',
    shortTitle: 'Vendor Onboarding & KYC',
    storyAngle: 'Turning informal suppliers into verified digital participants',
    description: 'Structured assisted onboarding and verification workflows to turn informal agricultural suppliers into verified digital participants.',
    company: 'ReshaMandi',
    period: '2021 – 2023',
    role: 'Product Manager · Operations & Identity',
    primaryCategory: 'B2B & Platforms',
    tags: ['B2B', 'KYC', 'Workflow', 'Operations'],
    metrics: [
      { value: 'Thousands', label: 'verified rural suppliers', context: 'assisted onboarding hubs' },
      { value: 'Automated', label: 'bank validation check', context: 'penny-drop pre-verification' },
    ],
    problem: 'Rural suppliers and reelers rarely possessed formal corporate registrations, leading to unverified entities, billing errors, and payment routing failures.',
    whyItMattered: 'Without verified legal identities and bank account ownership, the marketplace could not disburse tens of crores monthly through automated banking rails.',
    myOwnership: 'Designed the assisted onboarding workflow, multi-tier document verification steps, and field operator intake checklists across rural procurement hubs.',
    keyDecision: {
      title: 'Assisted Onboarding Hubs vs Self-Serve Mobile Uploads',
      decision: 'Equipped center coordinators with guided verification checklists on office tablets rather than relying on self-serve farmer smartphone uploads.',
      tradeoff: 'Depended on field staff availability, but achieved near-perfect document legibility and bank account validation.',
      why: 'Document photos taken on low-end smartphones under direct sunlight had a high failure rate in automated OCR pipelines.'
    },
    solution: {
      summary: 'Designed a 3-step assisted workflow capturing proof of identity, business trade registration, and verified bank account ownership with instantaneous penny-drop validation.',
      steps: [
        { label: 'Field Capture', desc: 'Mandi agent captures document images on high-contrast interface' },
        { label: 'Instant Bank Verification', desc: 'Penny-drop verification validates beneficiary name and account status' },
        { label: 'Tiered Access', desc: 'Suppliers unlocked for trade upon two-tier operator approval' },
      ],
      details: [
        'Built automated penny-drop validation against core banking APIs.',
        'Created progressive verification tiers: small lot limits for new vendors, unrestricted limits for audited traders.',
        'Integrated automated audit trails to meet strict banking compliance guidelines.',
      ]
    },
    outcome: {
      summary: 'Onboarded thousands of rural suppliers into verified digital profiles with zero banking routing failures and compliant audit-ready ledgers.',
      type: 'Operational Integrity'
    },
    reflection: 'In emerging markets, onboarding design is not about minimizing steps; it is about building verification mechanisms that respect local realities.',
    relatedProjects: [
      { title: 'Digitising a Complex B2B Marketplace', slug: 'reshamandi', category: 'Flagship', route: '/work/reshamandi' },
      { title: 'CRM / Lead Workflow', slug: 'crm-lead-workflow', category: 'B2B & Platforms', route: '/work/more/crm-lead-workflow' },
    ],
    route: '/work/more/vendor-kyc',
  },
  {
    id: 'crm-lead-workflow',
    slug: 'crm-lead-workflow',
    title: 'CRM & Lead Workflow',
    shortTitle: 'CRM & Lead Workflow',
    storyAngle: 'Digitising field-led lead management',
    description: 'Digitised field-led lead capture and buyer management across distributed rural mandi hubs and sales desks.',
    company: 'ReshaMandi',
    period: '2021 – 2023',
    role: 'Product Manager · Sales Operations & CRM',
    primaryCategory: 'B2B & Platforms',
    tags: ['B2B', 'CRM', 'Operations'],
    metrics: [
      { value: '20+', label: 'procurement hubs deployed', context: 'LeadSquared CRM' },
      { value: 'Offline-first', label: 'lead capture pipeline', context: 'rural connectivity zones' },
    ],
    problem: 'Sales teams and mandi procurement coordinators tracked farmer relationships and reeler buyer demand in physical notebooks and fragmented messaging chats.',
    whyItMattered: 'High-value buyer leads fell through the cracks, regional demand forecasts were based on guesswork, and field rep accountability could not be audited.',
    myOwnership: 'Owned the deployment, customization, and workflow integration of LeadSquared CRM across 20+ procurement hubs, aligning field incentives with data capture.',
    keyDecision: {
      title: 'Strict Stage-Gating vs Free-Form Notes',
      decision: 'Mandated strict operational stage gates (Contacted → Yard Visit → Sample Passed → Credit Approved) before deals could be logged.',
      tradeoff: 'Field sales reps complained about strict form requirements, but pipeline hygiene jumped immediately.',
      why: 'Free-form text fields resulted in incomplete contact details and unverified volume estimates.'
    },
    solution: {
      summary: 'Configured a unified lead-to-deal pipeline mapped to agricultural trade cycles with offline-first lead capture for rural connectivity zones.',
      steps: [
        { label: 'Offline Lead Capture', desc: 'Field reps log visits and farmer capacity without active internet' },
        { label: 'Demand Sync', desc: 'Buyer volume requests synchronized with daily procurement targets' },
        { label: 'Performance Dashboards', desc: 'Regional managers track lead conversion velocity across hubs' },
      ],
      details: [
        'Rolled out mobile CRM configurations tailored to regional languages.',
        'Synchronized field lead data with central marketplace demand forecasting.',
        'Automated daily task reminders for mandi coordinators based on harvest schedules.',
      ]
    },
    outcome: {
      summary: 'Replaced paper logbooks across 20+ rural hubs with structured lead lifecycles, enabling reliable regional demand forecasting.',
      type: 'Operational Efficiency'
    },
    reflection: 'Field teams only adopt a CRM when it saves them time in the field, not just when it generates reports for head office.',
    relatedProjects: [
      { title: 'Digitising a Complex B2B Marketplace', slug: 'reshamandi', category: 'Flagship', route: '/work/reshamandi' },
      { title: 'Vendor Onboarding & KYC', slug: 'vendor-kyc', category: 'B2B & Platforms', route: '/work/more/vendor-kyc' },
    ],
    route: '/work/more/crm-lead-workflow',
  },

  // =========================================================================
  // PAYMENTS / WORKFLOW (B2B / OPERATIONS)
  // =========================================================================
  {
    id: 'instant-payouts',
    slug: 'instant-payouts',
    title: 'Instant Payouts',
    shortTitle: 'Instant Payouts',
    storyAngle: 'From manual payment coordination to governed settlement',
    description: 'Automated escrow approval and disbursement workflows, transforming multi-day payment coordination into governed, sub-minute farmer settlements.',
    company: 'ReshaMandi',
    period: '2021 – 2023',
    role: 'Product Manager · Payments & Settlement',
    primaryCategory: 'B2B & Platforms',
    tags: ['Payments', 'B2B', 'Automation', 'Workflow'],
    metrics: [
      { value: '>₹5L', label: 'maximum payout within 2 hours', context: 'verified banking rails' },
      { value: '99.9%', label: 'payout settlement success', context: 'automated escrow release' },
      { value: 'Sub-minute', label: 'settlement on weighbridge lock', context: 'down from 3–15 days' },
    ],
    problem: 'Farmers historically waited 3–15 days for payment under traditional mandi broker agreements, leaving them vulnerable to cash flow crises and forced debt.',
    whyItMattered: 'Immediate liquidity was the single strongest value proposition to convince conservative rural farmers to sell their perishable harvest on our platform.',
    myOwnership: 'Designed the automated payment trigger pipeline, center manager dual-authorization UX, retry mechanisms, and bank API reconciliation monitors.',
    keyDecision: {
      title: 'Automated Dual-Authorization vs Centralized Finance Desk Batching',
      decision: 'Empowered mandi center managers to trigger payouts with a 1-tap validation that executed immediately via bank APIs, backed by automated anomaly limits.',
      tradeoff: 'Shifted operational risk to edge staff, requiring strict automated balance checks and load-cell sensor verification.',
      why: 'Batching approvals through an air-conditioned head office desk delayed payments past the time farmers left the trading gate.'
    },
    solution: {
      summary: 'Constructed an event-driven disbursement engine wired directly to weighbridge tare locks, ensuring the farmer received an automated bank transfer before exiting the mandi.',
      steps: [
        { label: 'Weighbridge Lock', desc: 'Hardware sensor locks net harvest weight into the lot record' },
        { label: 'Manager Verification', desc: 'Mandi manager performs 1-tap biometric or OTP confirmation' },
        { label: 'Instant Bank Rail', desc: 'IMPS/UPI trigger releases escrow funds with automated status SMS' },
      ],
      details: [
        'Engineered an idempotent payout retry queue handling transient banking switch timeouts.',
        'Integrated automated SMS alerts in local vernacular languages confirming transfer reference numbers.',
        'Maintained 99.9% settlement reliability with zero unreconciled escrow balance losses.',
      ]
    },
    outcome: {
      summary: 'Disbursed ₹20–25 Cr monthly with 99.9% payout reliability and zero unreconciled escrow losses, cementing farmer trust across rural mandis.',
      type: 'Core Business Impact'
    },
    reflection: 'In physical commodity marketplaces, liquidity is the product. Speed of settlement builds stronger customer loyalty than any marketing incentive.',
    relatedProjects: [
      { title: 'Digitising a Complex B2B Marketplace', slug: 'reshamandi', category: 'Flagship', route: '/work/reshamandi' },
      { title: 'Cocoon Bidding', slug: 'cocoon-bidding', category: 'B2B & Platforms', route: '/work/more/cocoon-bidding' },
      { title: 'ReshaYarns', slug: 'reshayarns', category: 'B2B & Platforms', route: '/work/more/reshayarns' },
    ],
    route: '/work/more/instant-payouts',
  },
  {
    id: 'order-workflows',
    slug: 'order-workflows',
    title: 'Purchase & Sales Order Workflows',
    shortTitle: 'Order Workflows',
    storyAngle: 'Structuring the transaction lifecycle',
    description: 'Digitised purchase and sales order state machines, connecting commercial negotiations to contract generation and financial ledgers.',
    company: 'ReshaMandi',
    period: '2021 – 2023',
    role: 'Product Manager · Core Workflows',
    primaryCategory: 'B2B & Platforms',
    tags: ['B2B', 'Workflow', 'Operations'],
    metrics: [
      { value: '7-state', label: 'transaction lifecycle', context: 'quotation to fulfillment' },
      { value: 'Governed', label: 'contract state machine', context: 'preventing untracked price amendments' },
    ],
    problem: 'Purchase agreements, credit terms, and delivery schedules were negotiated via WhatsApp and phone calls, resulting in verbal contract breaches and untracked cancellations.',
    whyItMattered: 'Without a standardized transactional state machine, inventory reservations and credit allocations could not be enforced programmatically.',
    myOwnership: 'Defined the universal transaction state machine, digital contract signing workflows, order revision rules, and cross-departmental approval trees.',
    keyDecision: {
      title: 'Strict Immutable States vs Editable Order Drafts',
      decision: 'Once an order transitioned from Draft to Confirmed, price and quantity were locked immutably; any change required an explicit Amendment state.',
      tradeoff: 'Required slightly more steps when minor shipping details shifted, but completely halted rogue discounts and untracked invoice mismatches.',
      why: 'In multi-crore commodity trading, informal price adjustments create severe accounting and legal liabilities.'
    },
    solution: {
      summary: 'Implemented a standardized 7-state transactional workflow managing the order lifecycle from quotation through credit clearance and fulfillment.',
      steps: [
        { label: 'Draft & Quotation', desc: 'Buyer demand matched to available mill lots with price-lock timer' },
        { label: 'Credit Clearance', desc: 'Automated limit check against approved credit line or advance deposit' },
        { label: 'Execution & Dispatch', desc: 'Warehouse release gatepass generated upon full contract lock' },
      ],
      details: [
        'Enforced automated margin calculation and credit threshold checks before order confirmation.',
        'Created structured amendment workflows for transportation re-routing or split dispatches.',
        'Wired real-time webhook updates to finance and warehouse logistics dashboards.',
      ]
    },
    outcome: {
      summary: 'Unified all commodity purchase orders into an auditable digital state machine, eliminating verbal contract disputes and billing leaks.',
      type: 'Workflow Standardization'
    },
    reflection: 'State machines are the foundation of business credibility. If the software cannot guarantee legal and financial invariants, the business cannot scale.',
    relatedProjects: [
      { title: 'Digitising a Complex B2B Marketplace', slug: 'reshamandi', category: 'Flagship', route: '/work/reshamandi' },
      { title: 'Logistics & Dispatch', slug: 'logistics-dispatch', category: 'Operations & Automation', route: '/work/more/logistics-dispatch' },
    ],
    route: '/work/more/order-workflows',
  },
  {
    id: 'logistics-dispatch',
    slug: 'logistics-dispatch',
    title: 'Logistics & Dispatch',
    shortTitle: 'Logistics & Dispatch',
    storyAngle: 'Connecting marketplace transactions to physical movement',
    description: 'Connecting marketplace transactions to physical warehouse movement, vehicle allocation, and weighbridge gatepass clearance.',
    company: 'ReshaMandi',
    period: '2022 – 2023',
    role: 'Product Manager · Logistics Systems',
    primaryCategory: 'Operations & Automation',
    tags: ['B2B', 'Logistics', 'Operations'],
    metrics: [
      { value: 'Thousands', label: 'monthly dispatches digitised', context: 'rural truck routes' },
      { value: 'Automated', label: 'weighbridge gatepass sync', context: 'connecting load cells to transit records' },
    ],
    problem: 'Trucks arrived at mandi centers without coordinated pickup schedules, leading to loading yard congestion, perishable cargo spoilage, and manual paper gatepasses.',
    whyItMattered: 'Cocoon batches degrade within hours; logistics delays directly ruined product quality before delivery to reeler factories.',
    myOwnership: 'Designed the digital gatepass system, driver pickup assignment workflows, and transit tracking dashboards linking procurement to transit.',
    keyDecision: {
      title: 'QR-Code Digital Gatepass vs Paper Waybills',
      decision: 'Replaced triplicate paper gatepasses with scannable QR tokens tied directly to weighbridge load cell telemetry.',
      tradeoff: 'Required installing low-cost barcode/QR scanners at gatehouses and training security guards.',
      why: 'Paper slips were routinely lost in transit or tampered with to hide weight shrinkage.'
    },
    solution: {
      summary: 'Engineered an integrated dispatch protocol linking weighbridge lot clearance with automated driver manifest generation and transit checkpoints.',
      steps: [
        { label: 'Weight Verification', desc: 'Net truck tare verified against digital lot manifest' },
        { label: 'Gatepass Generation', desc: 'Secure QR token generated containing route and receiver details' },
        { label: 'Receiving Confirmation', desc: 'Buyer scans token at destination warehouse to release custody lock' },
      ],
      details: [
        'Created real-time transit status monitoring for high-value raw material shipments.',
        'Integrated automated detention alerts when vehicle loading exceeded time windows.',
        'Standardized receiving acceptance and shrinkage logging protocols at destination mills.',
      ]
    },
    outcome: {
      summary: 'Digitised thousands of monthly rural truck dispatches with real-time custody handoffs and dramatic reductions in transit weight discrepancies.',
      type: 'Operational Velocity'
    },
    reflection: 'Software does not move goods—drivers and warehouse operators do. UX designed for dirty hands and bright sunlight always wins over desktop dashboards.',
    relatedProjects: [
      { title: 'Purchase & Sales Order Workflows', slug: 'order-workflows', category: 'B2B & Platforms', route: '/work/more/order-workflows' },
      { title: 'Digitising a Complex B2B Marketplace', slug: 'reshamandi', category: 'Flagship', route: '/work/reshamandi' },
    ],
    route: '/work/more/logistics-dispatch',
  },

  // =========================================================================
  // MARKETPLACE
  // =========================================================================
  {
    id: 'cocoon-bidding',
    slug: 'cocoon-bidding',
    title: 'Cocoon Bidding',
    shortTitle: 'Cocoon Bidding',
    storyAngle: 'Digitising a time-sensitive offline auction',
    description: 'Designed a high-speed Scan → Bid → Watch → Win → Pay flow around real-world mandi auction constraints.',
    company: 'ReshaMandi',
    period: '2021 – 2022',
    role: 'Product Manager · Core Marketplace',
    primaryCategory: 'B2B & Platforms',
    tags: ['Marketplace', 'B2B', '0→1', 'Field Product'],
    metrics: [
      { value: '>35%', label: 'pilot transaction-value uplift', context: 'vs. previous offline baseline' },
      { value: '~3/day', label: 'pilot session cadence', context: 'mandi auction yard' },
      { value: 'QR → Win', label: 'streamlined transaction flow', context: 'Scan · Bid · Watch · Win · Pay' },
    ],
    problem: 'Traditional open-cry mandi auctions were chaotic, fast-moving, and susceptible to collusive price slicing among local middlemen to shortchange farmers.',
    whyItMattered: 'Farmers had only 48 hours to sell perishable cocoons; without fair bidding price discovery, smallholders consistently took below-market rates.',
    myOwnership: 'Spearheaded the 0→1 auction terminal UX, synchronous bid tracking screens, floor operator workflows, and real-time bidder balance validation.',
    keyDecision: {
      title: 'Scan-to-Bid Terminal vs Full Mobile App',
      decision: 'Built an oversized-tap tablet interface mounted near the auction lot tables rather than requiring buyers to bid on their personal mobile devices.',
      tradeoff: 'Incurred physical terminal hardware costs across mandi centers, but achieved instant adoption in a noisy, fast-paced auction yard.',
      why: 'Reelers examining cocoon quality with physical hands will not unlock personal phones, switch apps, and navigate small forms under intense time pressure.'
    },
    solution: {
      summary: 'Engineered an intuitive 5-step bidding flow (Scan → Bid → Watch → Win → Pay) designed specifically for the physical dynamics of agricultural mandis.',
      steps: [
        { label: 'Scan Lot', desc: 'Buyer scans QR tag affixed to harvested cocoon crate' },
        { label: 'Submit Bid', desc: '1-tap increment buttons allow rapid price escalation in seconds' },
        { label: 'Watch Board', desc: 'Public digital display shows high bid without revealing bidder identity' },
        { label: 'Win & Lock', desc: 'Winning bid triggers automated lot reservation and buyer escrow hold' },
        { label: 'Pay & Release', desc: 'Immediate digital settlement clears gatepass for cargo loading' },
      ],
      details: [
        'Constructed sub-second bid distribution across floor displays using local network protocols.',
        'Designed high-contrast UI readable from 5 meters away across dusty auction sheds.',
        'Demonstrated >35% pilot transaction-value uplift in early auction trials.',
      ]
    },
    outcome: {
      summary: 'Demonstrated >35% pilot transaction-value uplift in early auction trials, unlocking fair competitive price discovery for sericulture farmers.',
      type: 'Pilot Market Impact',
      metrics: [
        { label: 'Pilot Value Uplift', value: '>35%' },
        { label: 'Pilot Sessions', value: '~3/day' },
        { label: 'Flow Design', value: 'Scan → Bid → Win' },
      ]
    },
    reflection: 'Digitizing an auction is not about replacing the excitement; it is about replacing collusion with transparent, governed market mechanics.',
    relatedProjects: [
      { title: 'Digitising a Complex B2B Marketplace', slug: 'reshamandi', category: 'Flagship', route: '/work/reshamandi' },
      { title: 'ReshaYarns', slug: 'reshayarns', category: 'B2B & Platforms', route: '/work/more/reshayarns' },
      { title: 'Instant Payouts', slug: 'instant-payouts', category: 'B2B & Platforms', route: '/work/more/instant-payouts' },
    ],
    route: '/work/more/cocoon-bidding',
  },
  {
    id: 'ml-cocoon-pricing',
    slug: 'ml-cocoon-pricing',
    title: 'ML Cocoon Pricing',
    shortTitle: 'ML Cocoon Pricing',
    storyAngle: 'Using AI to support quality-based price discovery',
    description: 'Productized a human-in-the-loop ML workflow with the data science team to recommend fair price bands based on objective cocoon quality metrics.',
    company: 'ReshaMandi',
    period: '2022 – 2023',
    role: 'Product Manager · AI & Data Workflows',
    primaryCategory: 'AI & Data',
    tags: ['AI', 'Marketplace', 'B2B', 'Human-in-the-loop'],
    metrics: [
      { value: 'Human-in-loop', label: 'advisory price bands', context: 'computer vision + market history' },
      { value: '±5%', label: 'audited variance threshold', context: 'explainable ML model' },
    ],
    problem: 'Cocoon quality was assessed subjectively by human touch, leading to inconsistent grading, farmer distrust, and volatile price fluctuations across trading centers.',
    whyItMattered: 'Objective quality pricing created trust: farmers who invested in high-grade rearing practices received verifiable premium rates.',
    myOwnership: 'Partnered with the machine learning team to define the model input schemas, human override protocols, pricing band logic, and floor UX for center staff.',
    keyDecision: {
      title: 'Advisory Price Bands vs Autonomous Black-Box Pricing',
      decision: 'Designed the system to output an explainable pricing range with confidence factors rather than forcing an autonomous, single take-it-or-leave-it price.',
      tradeoff: 'Allowed center managers to apply human judgment for anomalous lots, requiring audit logs for manager overrides.',
      why: 'Pure autonomous pricing would have faced immediate operator rebellion whenever seasonal weather anomalies distorted optical readings.'
    },
    solution: {
      summary: 'Built a human-in-the-loop evaluation workflow where computer vision defect analysis fed a dynamic pricing model, surfaced through a clean review interface.',
      steps: [
        { label: 'Sample Capture', desc: 'Standardized sample tray imaged under calibrated lighting' },
        { label: 'Feature Extraction', desc: 'Shell ratio, defect percentage, and moisture metrics computed by ML models' },
        { label: 'Price Recommendation', desc: 'Model recommends base rate and tolerance band based on regional market history' },
        { label: 'Manager Sign-Off', desc: 'Center manager confirms or records reason for manual variance' },
      ],
      details: [
        'Collaborated with ML researchers to calibrate shell ratio optical approximations.',
        'Wired real-time regional historical mandi indices into model baseline inputs.',
        'Implemented audit logging for any price variance exceeding 5% of model recommendations.',
      ]
    },
    outcome: {
      summary: 'Replaced arbitrary broker thumb-checks with transparent quality-based price bands, establishing reproducible grading across procurement centers.',
      type: 'Productized AI Workflow'
    },
    reflection: 'AI in physical markets should advise, not dictate. Empowering operators with transparent data builds adoption ten times faster than black-box automation.',
    relatedProjects: [
      { title: 'Cocoon Bidding', slug: 'cocoon-bidding', category: 'B2B & Platforms', route: '/work/more/cocoon-bidding' },
      { title: 'Digitising a Complex B2B Marketplace', slug: 'reshamandi', category: 'Flagship', route: '/work/reshamandi' },
    ],
    route: '/work/more/ml-cocoon-pricing',
  },
  {
    id: 'reshafarms',
    slug: 'reshafarms',
    title: 'ReshaFarms',
    shortTitle: 'ReshaFarms',
    storyAngle: 'Building visibility upstream of the marketplace',
    description: 'Farmer-facing advisory and supply visibility platform, guiding sericulture farmers across the 25-day rearing lifecycle.',
    company: 'ReshaMandi',
    period: '2021 – 2023',
    role: 'Product Manager · Farmer Product',
    primaryCategory: 'B2B & Platforms',
    tags: ['B2B', 'Farmer Product', 'Marketplace', 'Field Product'],
    metrics: [
      { value: '80,000+', label: 'farmers supported', context: 'crop advisory & disease prevention' },
      { value: '25-day', label: 'rearing lifecycle companion', context: 'upstream harvest visibility' },
    ],
    problem: 'Silkworms are fragile organisms susceptible to sudden microclimate shifts and viral flacherie outbreaks; farmers lacked timely agronomic guidance during rearing.',
    whyItMattered: 'A farmer who lost a crop incurred a catastrophic financial wipeout, while our downstream marketplace lost harvest predictability and volume.',
    myOwnership: 'Owned user research with rural farmers, vernacular UX design, crop milestone tracking, weather alert integrations, and certified input store workflows.',
    keyDecision: {
      title: 'Vernacular Audio-Visual Cards vs Text-Heavy Articles',
      decision: 'Structured advisory into audio-narrated visual story cards and simple iconography in Kannada, Telugu, and Hindi instead of long technical text manuals.',
      tradeoff: 'Required recording and localizing dozens of regional voice clips, but unlocked comprehension for smallholder farmers.',
      why: 'Silkworm rearing is fast-paced; farmers needed instantaneous visual diagnosis when inspecting rearing trays.'
    },
    solution: {
      summary: 'Developed a 25-day lifecycle companion tracking silkworm instar stages, providing localized climate reminders and verified disease prevention protocols.',
      steps: [
        { label: 'Rearing Calendar', desc: 'Farmer logs egg batch date to generate day-by-day milestone checklist' },
        { label: 'Microclimate Alerts', desc: 'Hyperlocal weather alerts trigger humidity and temperature management tips' },
        { label: 'Harvest Forecast', desc: 'Forward cocoon harvest date and projected volume fed into central procurement' },
      ],
      details: [
        'Engaged over 80,000 farmers with crop advisory and disease prevention guides.',
        'Streamlined access to certified mulberry inputs, disinfectants, and rearing gear.',
        'Delivered forward-looking harvest supply visibility weeks before mandi arrival.',
      ]
    },
    outcome: {
      summary: 'Built trust across 80,000+ sericulture farmers, transforming the marketplace from a transactional buyer into an indispensable agricultural partner.',
      type: 'Ecosystem Scale'
    },
    reflection: 'The best marketplace defensibility is built upstream. When you help producers protect their livelihood, they bring their supply to you by default.',
    relatedProjects: [
      { title: 'Digitising a Complex B2B Marketplace', slug: 'reshamandi', category: 'Flagship', route: '/work/reshamandi' },
      { title: 'Cocoon Bidding', slug: 'cocoon-bidding', category: 'B2B & Platforms', route: '/work/more/cocoon-bidding' },
    ],
    route: '/work/more/reshafarms',
  },

  // =========================================================================
  // CONNECTED PRODUCTS
  // =========================================================================
  {
    id: 'connected-health-wearables',
    slug: 'connected-health-wearables',
    title: 'Connected Health & Wearables',
    shortTitle: 'Connected Health',
    storyAngle: 'Bringing fragmented health data into one fitness experience',
    description: 'Unified Apple HealthKit, Google Health Connect, and BLE heart rate monitors into a cohesive cardiovascular strain engine.',
    company: 'Sportstech',
    period: '2024 – 2025',
    role: 'Lead Product Manager · Connected Platform',
    primaryCategory: 'Connected Products',
    tags: ['Connected Products', 'Integrations', 'Consumer'],
    metrics: [
      { value: '3 ecosystems', label: 'unified into one stream', context: 'HealthKit · Health Connect · BLE' },
      { value: 'Event-driven', label: 'telemetry sync architecture', context: 'zero battery-drain background loops' },
    ],
    problem: 'Fitness members logged workouts across Apple Watches, Garmin bands, and phone sensors, resulting in isolated data silos and inaccurate calorie or strain estimates.',
    whyItMattered: 'Without unified daily health context (resting heart rate, sleep, active burn), in-app workout recommendations felt generic and uncalibrated.',
    myOwnership: 'Specified the cross-platform health sync architecture, background sync cadences, BLE peripheral discovery UX, and privacy permission funnels.',
    keyDecision: {
      title: 'Lazy Aggregation vs Continuous Background Polling',
      decision: 'Implemented an event-driven sync strategy (sync on app open + workout end) rather than draining user phone batteries with continuous background polling.',
      tradeoff: 'Telemetry synced with a slight delay upon opening the app, but preserved mobile battery health and eliminated iOS background execution termination.',
      why: 'Battery-draining companion apps suffer severe uninstallation rates.'
    },
    solution: {
      summary: 'Architected a normalized health telemetry adapter mapping disparate vendor formats (Apple, Google, Bluetooth SIG) into standardized workout event schemas.',
      steps: [
        { label: 'Permission Funnel', desc: 'Clear contextual value-add explanation before requesting OS health permissions' },
        { label: 'Universal Ingestion', desc: 'Standardized schema normalizes Apple HealthKit and Google Health Connect packets' },
        { label: 'Live BLE Pairing', desc: 'Sub-second discovery and auto-reconnect for chest straps and armbands' },
      ],
      details: [
        'Built automated fallback for members with zero connected hardware using RPE scales.',
        'Designed real-time heart rate zone displays with animated color feedback.',
        'Resolved historical duplicate workout recording across dual-recording surfaces.',
      ]
    },
    outcome: {
      summary: 'Created a frictionless wearable onboarding experience, centralizing heart rate telemetry and recovery context across our mobile user base.',
      type: 'Platform Capability'
    },
    reflection: 'In connected fitness, integrations are not technical checkboxes. They determine whether your app feels like an intrusive logger or an effortless health companion.',
    relatedProjects: [
      { title: 'Performance Score', slug: 'performance-score', category: 'Flagship', route: '/work/performance-score' },
      { title: 'Smart Gym Experience', slug: 'smart-gym-experience', category: 'Connected Products', route: '/work/more/smart-gym-experience' },
    ],
    route: '/work/more/connected-health-wearables',
  },
  {
    id: 'smart-gym-experience',
    slug: 'smart-gym-experience',
    title: 'Smart Gym Experience',
    shortTitle: 'Smart Gym',
    storyAngle: 'Connecting hardware and software into one product',
    description: 'Designed the unified companion experience pairing smartphones with home workout stations, standardizing telemetry and rep detection.',
    company: 'Sportstech',
    period: '2024 – 2025',
    role: 'Lead Product Manager · Connected Ecosystem',
    primaryCategory: 'Connected Products',
    tags: ['Hardware', 'Connected Products', 'B2C'],
    metrics: [
      { value: '20Hz', label: 'real-time telemetry stream', context: 'BLE cable load & velocity' },
      { value: 'Phone-as-brain', label: 'companion architecture', context: 'bypassing embedded console redesign' },
    ],
    problem: 'Hardware workout stations operated with legacy LED consoles that lacked interactive coaching, while mobile users struggled to follow multi-exercise resistance routines.',
    whyItMattered: 'Hardware buyers expected an integrated, premium connected-fitness experience that justified their substantial physical equipment investment.',
    myOwnership: 'Owned the companion app workout controller, real-time Bluetooth telemetry contracts, rep detection UX, and resistance cable load visualization.',
    keyDecision: {
      title: 'Phone-as-Brain Architecture vs Embedded Tablet Hardware Overhaul',
      decision: 'Leveraged the customer’s smartphone/tablet via a clean Bluetooth link rather than mandating expensive embedded touchscreen hardware redesigns.',
      tradeoff: 'Depended on varying consumer phone Bluetooth chipsets, but cut product delivery time by over a year and kept equipment costs accessible.',
      why: 'Mobile phone screens offer superior rendering, frequent OS updates, and touch fidelity compared to low-cost industrial embedded screens.'
    },
    solution: {
      summary: 'Constructed an interactive companion interface displaying real-time cable velocity, rep cadence, eccentric phase pacing, and automatic weight resistance logging.',
      steps: [
        { label: 'Auto-Pairing', desc: 'Proximity BLE pairing connects app to workout station upon first cable pull' },
        { label: 'Real-time Telemetry', desc: 'Sensor packet streams cable velocity and load at 20Hz' },
        { label: 'Session Summary', desc: 'Volume load, muscle balance, and time-under-tension calculated post-set' },
      ],
      details: [
        'Implemented automatic rep counting and time-under-tension algorithms.',
        'Created muscle group balance heatmaps guiding users to under-trained muscle groups.',
        'Synchronized completed station workouts directly into user overall progress history.',
      ]
    },
    outcome: {
      summary: 'Transformed physical gym equipment into an intelligent connected station, elevating user workout consistency and equipment utility.',
      type: 'Connected Hardware UX'
    },
    reflection: 'Hardware without software is static iron. The real magic happens when physical resistance is made legible and encouraging through thoughtful software feedback.',
    relatedProjects: [
      { title: 'Performance Score', slug: 'performance-score', category: 'Flagship', route: '/work/performance-score' },
      { title: 'Connected Health & Wearables', slug: 'connected-health-wearables', category: 'Connected Products', route: '/work/more/connected-health-wearables' },
    ],
    route: '/work/more/smart-gym-experience',
  },
  {
    id: 'advanced-quick-start',
    slug: 'advanced-quick-start',
    title: 'Advanced Quick Start',
    shortTitle: 'Advanced Quick Start',
    storyAngle: 'Reducing the distance between intent and workout',
    description: 'Reduced friction to start cardio and strength sessions with a 1-tap launcher that bypassed lengthy video introductions.',
    company: 'Sportstech',
    period: '2024 – 2025',
    role: 'Product Manager · Core Experience',
    primaryCategory: 'Connected Products',
    tags: ['UX', 'Hardware', 'Connected Products'],
    metrics: [
      { value: '<3 sec', label: 'time-to-first-rep', context: 'down from 45+ seconds' },
      { value: '1-tap', label: 'zero-config launcher', context: 'in-flight configuration' },
    ],
    problem: 'Experienced members who already knew their workout routine had to wait through 90-second instructor intros and multiple setup screens before their hardware would start.',
    whyItMattered: 'Time-to-sweat friction was a major driver of pre-workout abandonment among daily habituated athletes.',
    myOwnership: 'Led the friction audit, designed the 1-tap quick start interaction pattern, and specified hardware default profiles for immediate session recording.',
    keyDecision: {
      title: '1-Tap Zero-Config Launch vs Mandatory Goal Configuration',
      decision: 'Enabled immediate recording with a single prominent tap, allowing users to configure targets (distance, calories, time) optionally while already moving.',
      tradeoff: 'Some users launched sessions without setting explicit goals, but initial workout start drop-offs vanished.',
      why: 'When an athlete steps onto a treadmill or bike, their physical momentum should never be interrupted by form inputs.'
    },
    solution: {
      summary: 'Designed an aggressive friction-reduction pattern placing instant-start launchers at the top of the app and equipment home screens.',
      steps: [
        { label: '1-Tap Activation', desc: 'Single tap initiates sensor recording and resistance engagement immediately' },
        { label: 'In-Flight Configuration', desc: 'Target duration or intervals can be adjusted mid-workout without pausing' },
        { label: 'Smart Defaults', desc: 'Remembers last-used resistance and cadence preferences automatically' },
      ],
      details: [
        'Reduced time-to-first-rep from 45+ seconds to under 3 seconds.',
        'Integrated auto-pause detection when user stepped off or stopped moving.',
        'Created high-contrast large numeric telemetry view for glanceability at high exertion.',
      ]
    },
    outcome: {
      summary: 'Substantially reduced pre-workout drop-off and established Quick Start as the most frequently used session launcher across habituated athletes.',
      type: 'Core UX Optimization'
    },
    reflection: 'Product craft often means getting out of the way. The best interface for high-intent users is the one that disappears.',
    relatedProjects: [
      { title: 'Performance Score', slug: 'performance-score', category: 'Flagship', route: '/work/performance-score' },
      { title: 'Smart Gym Experience', slug: 'smart-gym-experience', category: 'Connected Products', route: '/work/more/smart-gym-experience' },
    ],
    route: '/work/more/advanced-quick-start',
  },
  {
    id: 'community-feed',
    slug: 'community-feed',
    title: 'Community Feed',
    shortTitle: 'Community Feed',
    storyAngle: 'Adding a social layer to the fitness experience',
    description: 'Designed a lightweight social engagement layer enabling workout sharing, peer encouragement, and habit reinforcement.',
    company: 'Sportstech',
    period: '2024 – 2025',
    role: 'Product Manager · Engagement & Community',
    primaryCategory: 'Connected Products',
    tags: ['Consumer', 'Community', 'Engagement'],
    metrics: [
      { value: 'Thousands', label: 'weekly peer cheers', context: 'supportive social loop' },
      { value: 'Privacy-first', label: '3-tier visibility controls', context: 'private · friends · public' },
    ],
    problem: 'Working out at home is inherently solitary; members lacked peer visibility and social reinforcement, leading to motivation decay after 30 days.',
    whyItMattered: 'Community connections and social proof are the most resilient drivers of long-term subscriber retention in digital consumer fitness.',
    myOwnership: 'Owned the product concept, feed architecture, privacy controls (strict opt-in visibility), lightweight cheer reactions, and milestone share cards.',
    keyDecision: {
      title: 'Lightweight Cheers vs Open Unconstrained Commenting',
      decision: 'Limited initial social interactions to verified encouragement reactions (High Five, Fire, Strong) and workout achievement shares rather than open comments.',
      tradeoff: 'Limited conversational depth, but eliminated content moderation overhead and prevented toxicity in a supportive wellness space.',
      why: 'Athletes want fast positive reinforcement, not another social media comment debate.'
    },
    solution: {
      summary: 'Created an inspiring, distraction-free activity stream celebrating completed workouts, personal bests, and streak milestones with privacy-first controls.',
      steps: [
        { label: 'Post-Workout Share', desc: '1-tap generation of branded milestone card upon workout completion' },
        { label: 'Encouragement Loop', desc: 'Friends receive notification to send an instant 1-tap reaction cheer' },
        { label: 'Privacy Boundaries', desc: 'Users toggle granular privacy settings: Private, Friends Only, or Public' },
      ],
      details: [
        'Built automated milestone cards for 10th, 50th, and 100th workout milestones.',
        'Designed lightweight feed cache to ensure instantaneous loading on mobile connections.',
        'Wired social cheers to in-app notification summaries that gently reignited dormant users.',
      ]
    },
    outcome: {
      summary: 'Added a vibrant social fabric to the digital fitness experience, generating thousands of weekly peer cheers and lifting 30-day cohort engagement.',
      type: 'Retention Loop'
    },
    reflection: 'Social fitness succeeds when it celebrates effort over vanity. Keep the mechanics focused on encouragement and the community will flourish.',
    relatedProjects: [
      { title: 'Seasonal Challenges', slug: 'seasonal-challenges', category: 'Growth & Monetization', route: '/work/more/seasonal-challenges' },
      { title: 'Sportstech AI Coach', slug: 'ai-coach', category: 'Flagship', route: '/work/ai-coach' },
    ],
    route: '/work/more/community-feed',
  },
  {
    id: 'seasonal-challenges',
    slug: 'seasonal-challenges',
    title: 'Seasonal Challenges',
    shortTitle: 'Seasonal Challenges',
    storyAngle: 'Turning recurring campaigns into engagement loops',
    description: 'Structured multi-week consumer fitness challenges with gamified milestone badges, lifting mid-funnel habit formation and cohort retention.',
    company: 'Sportstech',
    period: '2024 – 2025',
    role: 'Product Manager · Growth & Engagement',
    primaryCategory: 'Growth & Monetization',
    tags: ['Growth', 'Engagement', 'Gamification'],
    metrics: [
      { value: 'Consistency', label: 'habit-based milestone mechanics', context: 'replaces extreme-volume boards' },
      { value: 'Automated', label: 'seasonal campaign framework', context: 'zero code deployments per event' },
    ],
    problem: 'User engagement experienced severe seasonal troughs (e.g. spring lulls, post-holiday slumps) without structured collective milestones to rally around.',
    whyItMattered: 'Predictable seasonal retention loops prevent subscriber churn before annual renewal dates approach.',
    myOwnership: 'Designed the challenge progression engine, milestone criteria logic, dynamic leaderboard widgets, and completion reward badges.',
    keyDecision: {
      title: 'Consistency-Based Goals vs Absolute Athletic Performance Goals',
      decision: 'Anchored challenge milestones in workout consistency (e.g. 12 workouts in 28 days) rather than raw athletic output (e.g. highest total wattage).',
      tradeoff: 'Elite athletes didn’t dominate the leaderboards, but participation across casual and intermediate subscribers surged.',
      why: 'Volume-based leaderboards demotivate 95% of subscribers who cannot train like competitive athletes.'
    },
    solution: {
      summary: 'Constructed an automated challenge framework enabling marketing and content teams to launch themed quarterly events without code deployments.',
      steps: [
        { label: 'Challenge Enrollment', desc: '1-tap sign-up with dynamic calendar countdown' },
        { label: 'Progress Tracking', desc: 'Circular visual progress tracker updating in real-time after every session' },
        { label: 'Badge Unlock', desc: 'Digital badge awarded upon milestone completion with social sharing assets' },
      ],
      details: [
        'Created dynamic progress widgets embedded directly in app home screen.',
        'Implemented smart mid-challenge push nudges for users falling 1 workout behind pace.',
        'Configured badge collection trophy case inside user profile.',
      ]
    },
    outcome: {
      summary: 'Turned seasonal marketing moments into high-retention community rituals, driving consistent multi-week workout streaks across participating cohorts.',
      type: 'Retention Loop'
    },
    reflection: 'Gamification works only when goals are achievable. Celebrating consistency builds lifelong health habits; celebrating extremes alienates everyone else.',
    relatedProjects: [
      { title: 'Community Feed', slug: 'community-feed', category: 'Connected Products', route: '/work/more/community-feed' },
      { title: 'Subscription Renewal', slug: 'subscription-renewal', category: 'Growth & Monetization', route: '/work/more/subscription-renewal' },
    ],
    route: '/work/more/seasonal-challenges',
  },
  {
    id: 'live-workout-leaderboard',
    slug: 'live-workout-leaderboard',
    title: 'Live Workout Leaderboard',
    shortTitle: 'Live Leaderboard',
    storyAngle: 'Making synchronous workouts feel competitive',
    description: 'Created real-time competitive leaderboard mechanics for synchronous and on-demand group workouts on connected equipment displays.',
    company: 'Sportstech',
    period: '2024 – 2025',
    role: 'Product Manager · Connected Display',
    primaryCategory: 'Connected Products',
    tags: ['Connected Products', 'Real-time', 'Gamification'],
    metrics: [
      { value: 'Studio-grade', label: 'real-time workout ranking', context: 'normalized wattage & cadence' },
      { value: 'Ghost pacer', label: 'personal record pacing', context: 'motivating for all fitness tiers' },
    ],
    problem: 'Riders and runners following on-demand video workouts felt disconnected from the thousands of other members who had completed the same class.',
    whyItMattered: 'Synchronous competition and live ranking create the urgency and emotional excitement that distinguish studio boutique classes from home workouts.',
    myOwnership: 'Specified the real-time scoring algorithm, output metric weighting, websocket telemetry stream, and display UI on bike and treadmill consoles.',
    keyDecision: {
      title: 'Relative Output Filtering vs Pure Absolute Wattage',
      decision: 'Enabled filtering leaderboards by demographic brackets and "Just Me / Personal Record" ghost pacing rather than showing only absolute top power.',
      tradeoff: 'Added UI complexity on small touchscreens, but made the leaderboard motivating for every age and fitness level.',
      why: 'Seeing an Olympic-level cyclist at the top with 800W output causes beginner riders to immediately hide the leaderboard.'
    },
    solution: {
      summary: 'Engineered a smooth, low-latency leaderboard component syncing output metrics across connected consoles with ghost-rider personal best pacing.',
      steps: [
        { label: 'Output Calculation', desc: 'Resistance level × cadence sampling generates normalized energy score' },
        { label: 'Real-time Sorting', desc: 'Optimized frontend array sorts positions smoothly without frame jitter' },
        { label: 'Ghost Pacer', desc: 'Displays visual marker of user previous personal record for intrinsic motivation' },
      ],
      details: [
        'Engineered responsive touch controls operable at 90+ RPM cadences.',
        'Integrated option to minimize or hide leaderboard for mindful or low-pressure rides.',
        'Created celebratory rank badge when crossing personal record thresholds.',
      ]
    },
    outcome: {
      summary: 'Delivered an electrifying, studio-grade competitive surface on connected hardware consoles, significantly increasing class replay rates.',
      type: 'Display Feature'
    },
    reflection: 'Competition is a double-edged sword. Designed carelessly, it intimidates; designed with personalized benchmarks, it pulls out the athlete inside everyone.',
    relatedProjects: [
      { title: 'Smart Gym Experience', slug: 'smart-gym-experience', category: 'Connected Products', route: '/work/more/smart-gym-experience' },
      { title: 'Connected Health & Wearables', slug: 'connected-health-wearables', category: 'Connected Products', route: '/work/more/connected-health-wearables' },
    ],
    route: '/work/more/live-workout-leaderboard',
  },

  // =========================================================================
  // GROWTH & MONETIZATION
  // =========================================================================
  {
    id: 'subscription-renewal',
    slug: 'subscription-renewal',
    title: 'Subscription Renewal',
    shortTitle: 'Subscription Renewal',
    storyAngle: 'Designing the moment after the free period',
    description: 'Designed the structural renewal and payment journey for expiring hardware-bundled subscriptions, mitigating involuntary churn.',
    company: 'Sportstech',
    period: '2024 – 2025',
    role: 'Lead Product Manager · Monetization & Growth',
    primaryCategory: 'Growth & Monetization',
    tags: ['Monetization', 'Retention', 'Payments'],
    metrics: [
      { value: '437', label: 'users in mature cohort', context: 'trial expiration cohort' },
      { value: '39.4%', label: 'renewal conversion rate', context: '172 paying subscribers converted' },
      { value: '82.5%', label: 'annual plan share', context: '17.5% monthly among converters' },
    ],
    problem: 'Hardware purchases came with 3-to-12-month bundled app access; when the complimentary trial period expired, customers dropped off due to unexpected payment failures and disjointed web renewal forms.',
    whyItMattered: 'Converting hardware-bundled trialists into paying annual or monthly subscribers was the critical economic engine of the company subscription transition.',
    myOwnership: 'Mapped the end-of-trial renewal communication sequence, in-app one-click renewal modal, self-serve billing management portal, and card update dunning flows.',
    keyDecision: {
      title: 'Proactive Value Recaps vs Surprise Auto-Billing',
      decision: 'Sent explicit value recap notifications 14 days and 3 days before renewal (showing total workouts completed and calories burned) rather than silently attempting charges.',
      tradeoff: 'Increased voluntary cancellation visibility, but dramatically reduced angry chargebacks, payment disputes, and brand backlash.',
      why: 'Customers who feel tricked into a subscription renewal cancel immediately and never return; customers reminded of their progress renew with confidence.'
    },
    solution: {
      summary: 'Constructed an end-to-end renewal journey across web and mobile, pairing personalized annual fitness retrospectives with 1-tap payment method updates.',
      steps: [
        { label: 'T-14 Days: Value Recap', desc: 'Email and in-app summary of user personal athletic milestones achieved' },
        { label: 'T-3 Days: Billing Reminder', desc: 'Transparent disclosure of upcoming billing amount and payment method' },
        { label: 'Grace Period & Dunning', desc: 'Smart retry logic and in-app banner for expired credit cards with zero lockout' },
      ],
      details: [
        'Built a modern self-serve web portal for members to change payment methods seamlessly.',
        'Configured smart dunning sequences with localized payment fallback options.',
        'Integrated plan-switch incentives allowing members to upgrade from monthly to annual.',
      ]
    },
    outcome: {
      summary: 'Transformed an opaque expiration cliff into a governed, high-converting retention funnel, significantly curbing involuntary renewal churn.',
      type: 'Monetization Workflow'
    },
    reflection: 'The best churn defense is radical transparency. When you remind members of the genuine value they extracted, renewal becomes an investment in themselves.',
    relatedProjects: [
      { title: 'Scaling a B2C Subscription Business', slug: 'subscription', category: 'Flagship', route: '/work/subscription' },
      { title: 'Seasonal Challenges', slug: 'seasonal-challenges', category: 'Growth & Monetization', route: '/work/more/seasonal-challenges' },
    ],
    route: '/work/more/subscription-renewal',
  },

  // =========================================================================
  // OPERATIONS & AUTOMATION
  // =========================================================================
  {
    id: 'n8n-feedback-automation',
    slug: 'n8n-feedback-automation',
    title: 'n8n Feedback Automation',
    shortTitle: 'Feedback Automation',
    storyAngle: 'Turning customer feedback into an operational loop',
    description: 'Designed event-driven webhook pipelines linking customer app reviews and feedback directly into operational triage queues.',
    company: 'Sportstech',
    period: '2024 – 2025',
    role: 'Lead Product Manager · Product Operations',
    primaryCategory: 'Operations & Automation',
    tags: ['Automation', 'Operations', 'n8n'],
    metrics: [
      { value: '<2 hours', label: 'regression discovery time', context: 'down from 4 days' },
      { value: 'Zero-code', label: 'event-driven review triage', context: 'App Store & Google Play webhooks' },
    ],
    problem: 'Customer reviews across the iOS App Store, Google Play, and support tickets were siloed in disconnected dashboards, delaying bug escalation to engineering by days.',
    whyItMattered: 'Critical crashes or firmware connection regressions introduced in new releases took too long to reach the triage team, damaging app store ratings.',
    myOwnership: 'Architected and implemented the zero-code n8n pipeline, regex categorization filters, alert thresholds, and automated triage notifications.',
    keyDecision: {
      title: 'Automated Sentiment & Keyword Triage vs Weekly Manual CSV Exports',
      decision: 'Automated ingestion via webhook triggers that analyzed review keywords (BLE, crash, connection) and routed high-severity alerts within minutes.',
      tradeoff: 'Occasionally triggered alerts for minor edge cases, but caught critical post-release regressions before ratings plummeted.',
      why: 'Weekly manual CSV exports meant release-day regressions festered across thousands of customer devices over weekends.'
    },
    solution: {
      summary: 'Built a lightweight, reliable n8n automation pipeline parsing public store reviews and routing categorized alerts directly to responsible pods.',
      steps: [
        { label: 'Store Webhook Trigger', desc: 'New review event ingested from App Store and Google Play APIs' },
        { label: 'Filter & Categorize', desc: 'Keywords extracted: Hardware, Subscription, Content, or Stability' },
        { label: 'Triage Alert', desc: 'Instant formatted alert dispatched to internal engineering channels' },
      ],
      details: [
        'Configured automated translation for multi-language European store reviews.',
        'Created weekly automated digest summarizing recurring sentiment themes.',
        'Shortened post-release regression discovery time from 4 days to under 2 hours.',
      ]
    },
    outcome: {
      summary: 'Shortened regression discovery time from days to hours, giving product and engineering pods an immediate operational feedback loop.',
      type: 'Operational Pipeline'
    },
    reflection: 'Product operations is the unsung multiplier of good PM work. When feedback moves from user to engineer in real-time, product quality compounds.',
    relatedProjects: [
      { title: 'Sportstech AI Coach', slug: 'ai-coach', category: 'Flagship', route: '/work/ai-coach' },
      { title: 'Procurement Automation', slug: 'procurement-automation', category: 'Operations & Automation', route: '/work/more/procurement-automation' },
    ],
    route: '/work/more/n8n-feedback-automation',
  },
  {
    id: 'procurement-automation',
    slug: 'procurement-automation',
    title: 'Procurement Automation',
    shortTitle: 'Procurement Automation',
    storyAngle: 'Reducing manual coordination in internal operations',
    description: 'Automated internal purchase requests, vendor matching, and approval hierarchies, eliminating manual spreadsheet coordination.',
    company: 'ReshaMandi',
    period: '2022 – 2023',
    role: 'Product Manager · Internal Systems',
    primaryCategory: 'Operations & Automation',
    tags: ['Automation', 'Operations', 'Workflow'],
    metrics: [
      { value: '<24 hours', label: 'internal requisition turnaround', context: 'down from 7 days' },
      { value: 'Tiered', label: 'value-based authority matrix', context: 'eliminating warehouse bottlenecks' },
    ],
    problem: 'Internal procurement requests for packaging, warehouse supplies, and test equipment were managed across email chains and spreadsheets, causing delayed orders.',
    whyItMattered: 'Operational delays at regional warehouses stalled outbound freight, creating downstream bottlenecks for farmer dispatches.',
    myOwnership: 'Defined the internal requisition workflows, approval authority matrix based on order value, and automated vendor purchase order generation.',
    keyDecision: {
      title: 'Tiered Value-Based Authority Matrix vs Universal Executive Sign-off',
      decision: 'Automated instant approval for routine warehouse replenishment under defined spend thresholds, reserving executive sign-off only for capital expenditures.',
      tradeoff: 'Required rigorous budget threshold limits, but eliminated days of bureaucratic lag for urgent packaging materials.',
      why: 'Requiring VP approval for a box of warehouse label rolls caused trucks to wait idly at the loading dock.'
    },
    solution: {
      summary: 'Constructed an internal requisition portal automating request validation, budget line checks, multi-tier approvals, and vendor notification.',
      steps: [
        { label: 'Requisition Intake', desc: 'Warehouse manager logs item request with cost center code' },
        { label: 'Automated Routing', desc: 'Routing engine evaluates spend threshold and assigns approval tasks' },
        { label: 'PO Dispatch', desc: 'Approved requisition automatically generates standardized vendor PO' },
      ],
      details: [
        'Integrated spend tracking against quarterly department budgets.',
        'Automated reminder notifications for pending approval bottlenecks.',
        'Reduced internal procurement turnaround times from 7 days to under 24 hours.',
      ]
    },
    outcome: {
      summary: 'Replaced messy spreadsheet approvals with an automated requisition pipeline, reducing internal turnaround from a week to under a day.',
      type: 'Internal Ops Automation'
    },
    reflection: 'Great PMs care just as much about internal tools as consumer apps. Eliminating friction for operational colleagues frees up the entire organization to move faster.',
    relatedProjects: [
      { title: 'Purchase & Sales Order Workflows', slug: 'order-workflows', category: 'B2B & Platforms', route: '/work/more/order-workflows' },
      { title: 'SAP / ERP Integration', slug: 'sap-erp-integration', category: 'Operations & Automation', route: '/work/more/sap-erp-integration' },
    ],
    route: '/work/more/procurement-automation',
  },
  {
    id: 'sap-erp-integration',
    slug: 'sap-erp-integration',
    title: 'SAP / ERP Integration',
    shortTitle: 'SAP / ERP Integration',
    storyAngle: 'Connecting product transactions to enterprise systems',
    description: 'Architected the bidirectional transaction sync between front-end mandi weighbridge workflows and central enterprise general ledger systems.',
    company: 'ReshaMandi',
    period: '2022 – 2023',
    role: 'Product Manager · Systems Integration',
    primaryCategory: 'Operations & Automation',
    tags: ['Enterprise', 'Integrations', 'B2B'],
    metrics: [
      { value: 'Async bus', label: 'resilient event integration', context: 'decoupling mandi ops from ERP' },
      { value: 'Automated', label: 'ledger reconciliation', context: 'idempotent transaction sync' },
    ],
    problem: 'Front-end mandi procurement was operating at high digital velocity, but financial reconciliation required finance teams to manually transcribe CSVs into enterprise SAP systems.',
    whyItMattered: 'Manual transcription created audit risks, delayed monthly closing, and produced inventory discrepancy headaches across regional hubs.',
    myOwnership: 'Spearheaded the integration scope, data contract specifications, transaction idempotency rules, and reconciliation error queues between product and SAP.',
    keyDecision: {
      title: 'Asynchronous Event Bus vs Direct Synchronous API Coupling',
      decision: 'Designed the sync through an asynchronous message queue with retry buffers rather than synchronously coupling mandi floor operations to SAP APIs.',
      tradeoff: 'Financial ledger synced with a few minutes latency, but mandi floor operations never stalled during enterprise SAP maintenance windows.',
      why: 'Mandi weighing operations cannot freeze at 5:00 AM because an enterprise ERP server is running scheduled nightly maintenance.'
    },
    solution: {
      summary: 'Engineered a robust integration layer translating physical weighbridge receipts and escrow releases into standardized enterprise journal entries and inventory movements.',
      steps: [
        { label: 'Event Ingestion', desc: 'Mandi transaction emit event upon escrow clearance' },
        { label: 'Payload Translation', desc: 'Maps lot metadata to SAP material codes and cost centers' },
        { label: 'Ledger Post & Ack', desc: 'Posts journal entry into SAP S/4HANA with automated reconciliation hash' },
      ],
      details: [
        'Built dead-letter queues and operator dashboards for failed payload inspection.',
        'Synchronized physical lot inventory with enterprise warehouse valuation records.',
        'Supported annual financial audits with end-to-end cryptographic transaction traceability.',
      ]
    },
    outcome: {
      summary: 'Connected high-volume agricultural marketplace transactions directly to enterprise ERP ledgers with automated reconciliation and zero data drift.',
      type: 'Enterprise Integration'
    },
    reflection: 'Enterprise software fails when you force agile edge operations into rigid central molds. Build resilient asynchronous bridges between the two worlds.',
    relatedProjects: [
      { title: 'Digitising a Complex B2B Marketplace', slug: 'reshamandi', category: 'Flagship', route: '/work/reshamandi' },
      { title: 'Purchase & Sales Order Workflows', slug: 'order-workflows', category: 'B2B & Platforms', route: '/work/more/order-workflows' },
    ],
    route: '/work/more/sap-erp-integration',
  },

  // =========================================================================
  // EARLIER PRODUCT WORK
  // =========================================================================
  {
    id: 'lioncircuits-assembly',
    slug: 'lioncircuits-assembly',
    title: 'LionCircuits Assembly Ordering',
    shortTitle: 'LionCircuits Assembly',
    storyAngle: 'Digitising B2B electronics manufacturing',
    description: 'Led concept-to-launch of a digital B2B electronics assembly ordering platform, eliminating manual back-and-forth for hardware engineers.',
    company: 'LionCircuits',
    period: '2020 – 2021',
    role: 'Product Manager · 0→1 Platform',
    primaryCategory: 'B2B & Platforms',
    tags: ['B2B', 'Manufacturing', '0→1'],
    metrics: [
      { value: '+40%', label: 'monthly manufacturing orders', context: 'self-serve B2B portal' },
      { value: '<5 min', label: 'instant DRC quote turnaround', context: 'down from 3–5 days' },
    ],
    problem: 'Hardware engineers ordering Printed Circuit Board Assembly (PCBA) waited 3–5 days for sales reps to manually review Gerber files and Bill of Materials spreadsheets.',
    whyItMattered: 'Slow, opaque manufacturing quoting severely bottlenecked hardware startups and embedded electronics prototyping cycles.',
    myOwnership: 'Owned the 0→1 platform concept, engineering upload flows, manufacturing constraint validation checks, and customer self-serve checkout.',
    keyDecision: {
      title: 'Instant Automated Design-for-Assembly Check vs Manual Engineer Review',
      decision: 'Built instantaneous frontend Gerber and BOM file validation checks that caught component footprint mismatches at upload time.',
      tradeoff: 'Invested heavily in parsing CAD formats upfront, but slashed customer quote turnaround from 4 days to under 5 minutes.',
      why: 'Hardware engineers abandon slow manual quote processes in favor of modern self-serve manufacturing portals.'
    },
    solution: {
      summary: 'Delivered an intuitive self-serve portal where hardware teams uploaded design files, inspected component placement visually, and ordered assemblies in minutes.',
      steps: [
        { label: 'File Upload', desc: 'Drag-and-drop Gerber files and Bill of Materials' },
        { label: 'Instant DRC Check', desc: 'Design rule check identifies trace clearances and soldering risks' },
        { label: 'Transparent Pricing', desc: 'Real-time price breakdown by batch quantity and delivery timeline' },
      ],
      details: [
        'Created interactive PCB layer visualizer directly in browser.',
        'Contributed to a 40% increase in monthly manufacturing orders.',
        'Integrated automated order tracking across SMT manufacturing lines.',
      ]
    },
    outcome: {
      summary: 'Contributed to a 40% increase in monthly manufacturing orders, establishing a modern digital standard for rapid electronics prototyping.',
      type: '0→1 Commercial Build',
      metrics: [
        { label: 'Monthly Orders', value: '+40%' },
        { label: 'Quote Turnaround', value: 'Minutes' },
      ]
    },
    reflection: 'Manufacturing is full of hidden friction. When you translate obscure engineering specifications into transparent digital workflows, customer adoption follows instantly.',
    relatedProjects: [
      { title: 'Auto Quote & BOM', slug: 'auto-quote-bom', category: 'Operations & Automation', route: '/work/more/auto-quote-bom' },
      { title: 'AI / IoT Prototypes', slug: 'ai-iot-prototypes', category: 'AI & Data', route: '/work/more/ai-iot-prototypes' },
    ],
    route: '/work/more/lioncircuits-assembly',
  },
  {
    id: 'auto-quote-bom',
    slug: 'auto-quote-bom',
    title: 'Auto Quote & BOM',
    shortTitle: 'Auto Quote & BOM',
    storyAngle: 'Automating complex manufacturing quotes',
    description: 'Engineered an automated Bill of Materials parsing engine validating component availability, pricing, and manufacturing lead times in seconds.',
    company: 'LionCircuits',
    period: '2020 – 2021',
    role: 'Product Manager · Quoting Systems',
    primaryCategory: 'Operations & Automation',
    tags: ['B2B', 'Automation', 'Manufacturing'],
    metrics: [
      { value: '<15 sec', label: 'BOM parsing & pricing speed', context: 'down from multi-day manual checks' },
      { value: 'Fuzzy match', label: 'distributor component inventory', context: 'automated equivalent suggestions' },
    ],
    problem: 'Electronics BOMs contained hundreds of disparate component part numbers, requiring sourcing managers to manually look up distributor stock across multiple supplier portals.',
    whyItMattered: 'Quoting delays lost high-value manufacturing contracts to offshore competitors who offered faster turnaround.',
    myOwnership: 'Defined the BOM scrubbing algorithm, component distributor API integrations (DigiKey, Mouser), fuzzy part matching logic, and pricing yield models.',
    keyDecision: {
      title: 'Fuzzy Part-Number Matching vs Strict Exact-String Matching',
      decision: 'Implemented heuristic fuzzy matching that suggested verified drop-in equivalent passives when exact manufacturer part numbers were out of stock.',
      tradeoff: 'Required clear visual confirmation flags for suggested substitutes, but prevented dead-end quote failures for trivial resistors and capacitors.',
      why: 'Global semiconductor shortages meant exact part numbers were routinely out of stock while functional equivalents were readily available.'
    },
    solution: {
      summary: 'Constructed an automated parsing and pricing pipeline that matched messy engineer spreadsheets to global distributor inventory in seconds.',
      steps: [
        { label: 'Multi-Format Parse', desc: 'Parses Excel, CSV, and CAD outputs regardless of column order' },
        { label: 'Distributor Query', desc: 'Real-time API calls check stock, reels, and volume break discounts' },
        { label: 'Instant Quote Sheet', desc: 'Surfaces complete production cost with substitute suggestions' },
      ],
      details: [
        'Processed multi-thousand-line BOMs in under 15 seconds.',
        'Created automated attrition calculation for high-speed SMT pick-and-place reels.',
        'Significantly lowered quotation cost per customer lead.',
      ]
    },
    outcome: {
      summary: 'Reduced quotation turnaround from days to seconds, automating component pricing and enabling immediate checkout for complex hardware orders.',
      type: 'Algorithmic Quoting'
    },
    reflection: 'Dirty data is the reality of hardware engineering. A product that gracefully parses messy spreadsheets wins over one that demands perfect compliance.',
    relatedProjects: [
      { title: 'LionCircuits Assembly Ordering', slug: 'lioncircuits-assembly', category: 'B2B & Platforms', route: '/work/more/lioncircuits-assembly' },
      { title: 'Procurement Automation', slug: 'procurement-automation', category: 'Operations & Automation', route: '/work/more/procurement-automation' },
    ],
    route: '/work/more/auto-quote-bom',
  },
  {
    id: 'ai-iot-prototypes',
    slug: 'ai-iot-prototypes',
    title: 'AI / IoT Prototypes',
    shortTitle: 'AI / IoT Prototypes',
    storyAngle: 'Exploring AI at the edge',
    description: 'Built Raspberry Pi and edge computing prototypes utilizing OpenCV for automated optical inspection and workshop monitoring.',
    company: 'LionCircuits / Independent',
    period: '2019 – 2020',
    role: 'Product Engineer · R&D & Prototyping',
    primaryCategory: 'AI & Data',
    tags: ['AI', 'IoT', 'Prototyping'],
    metrics: [
      { value: 'Sub-100ms', label: 'edge inspection response', context: 'Raspberry Pi & OpenCV' },
      { value: 'R&D', label: 'hands-on exploratory prototype', context: 'golden-template contour checks' },
    ],
    problem: 'Small-scale manufacturing lines lacked budget for massive automated optical inspection (AOI) industrial rigs, relying on eye fatigue-prone human magnifying checks.',
    whyItMattered: 'Missing a single solder bridge or misaligned IC before testing caused costly board re-spins and wasted components.',
    myOwnership: 'Built prototype edge camera fixtures, integrated OpenCV edge filtering algorithms, and configured pass/fail audio-visual alerts for line technicians.',
    keyDecision: {
      title: 'Edge Computer Vision vs Cloud Inference',
      decision: 'Ran visual difference checks locally on embedded edge hardware rather than sending video streams to cloud APIs.',
      tradeoff: 'Constrained model complexity to lightweight algorithms, but guaranteed sub-100ms inspection response with zero internet reliance.',
      why: 'Factory floors frequently experience noisy, unreliable internet connectivity.'
    },
    solution: {
      summary: 'Constructed an edge inspection prototype comparing live manufactured boards against reference golden board images under ring illumination.',
      steps: [
        { label: 'Image Registration', desc: 'Aligns live camera capture to golden reference template' },
        { label: 'Contour Analysis', desc: 'Detects solder bridges, missing passives, and polarity reversals' },
        { label: 'Technician Prompt', desc: 'Overlays bounding boxes on monitor highlighting inspection anomalies' },
      ],
      details: [
        'Clearly labeled as earlier hands-on exploratory prototype work.',
        'Deepened firsthand understanding of computer vision boundaries and physical sensor constraints.',
        'Informed later product thinking around mandi weighbridge cameras and ML cocoon pricing.',
      ]
    },
    outcome: {
      summary: 'Demonstrated rapid edge computer vision feasibility, serving as the technical foundation for later agricultural computer vision and hardware products.',
      type: 'Technical Prototyping'
    },
    reflection: 'Building with your own hands builds empathy for engineering trade-offs. The best PMs know what code and hardware can realistically do because they have built it.',
    relatedProjects: [
      { title: 'ML Cocoon Pricing', slug: 'ml-cocoon-pricing', category: 'AI & Data', route: '/work/more/ml-cocoon-pricing' },
      { title: 'LionCircuits Assembly Ordering', slug: 'lioncircuits-assembly', category: 'B2B & Platforms', route: '/work/more/lioncircuits-assembly' },
    ],
    route: '/work/more/ai-iot-prototypes',
  },
];
