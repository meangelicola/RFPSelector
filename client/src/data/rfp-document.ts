export interface DocumentSection {
  sectionId: string;
  title: string;
  content: string;
  tabCategory: string;
  pageNumber: number;
}

export interface OutlineItem {
  title: string;
  children?: OutlineItem[];
}

export const rfpContent: DocumentSection[] = [
  {
    sectionId: "a",
    title: "SECTION A - SOLICITATION/CONTRACT FORM",
    content: "SOLICITATION NO: HHS-2023-IT-0042\nDATE ISSUED: August 15, 2023\nISSUED BY: Department of Health and Human Services\nCONTRACT TYPE: Firm-Fixed Price\nNAICS CODE: 541513\nSET-ASIDE: Small Business",
    tabCategory: "fullDocument",
    pageNumber: 1
  },
  {
    sectionId: "b",
    title: "SECTION B - SUPPLIES OR SERVICES AND PRICES/COSTS",
    content: "B.1 GENERAL\nThe contractor shall provide all resources necessary to accomplish the tasks and deliverables described in this solicitation. The Government intends to award a Firm-Fixed Price contract resulting from this solicitation.\nB.2 CONTRACT LINE ITEMS\nCLIN 0001: IT Support Services Base Period\nCLIN 0002: IT Support Services Option Period 1\nCLIN 0003: IT Support Services Option Period 2",
    tabCategory: "fullDocument",
    pageNumber: 2
  },
  {
    sectionId: "c",
    title: "SECTION C - DESCRIPTION/SPECIFICATIONS/STATEMENT OF WORK",
    content: "C.1 BACKGROUND\nThe Department of Health and Human Services (HHS) requires professional IT support services to maintain its technological infrastructure and provide timely service to its employees and stakeholders.\nC.2 SCOPE\nThe contractor shall provide comprehensive IT support services including but not limited to help desk support, network administration, cybersecurity services, and software application maintenance for HHS headquarters and designated field offices.",
    tabCategory: "fullDocument",
    pageNumber: 2
  },
  {
    sectionId: "pws",
    title: "PERFORMANCE WORK STATEMENT (PWS)",
    content: "1.0 PURPOSE\nThis Performance Work Statement (PWS) defines the performance requirements for IT Support Services for the Department of Health and Human Services.\n2.0 SCOPE\nThe contractor shall provide qualified personnel, management, materials, equipment, and services to perform IT support services as defined in this PWS.\n3.0 SPECIFIC TASKS\n3.1 Help Desk Support\nThe contractor shall provide Tier 1, 2, and 3 help desk support services to approximately 5,000 users across HHS facilities.\n3.2 Network Administration\nThe contractor shall manage and maintain network infrastructure including routers, switches, firewalls, and wireless access points.\n3.3 Cybersecurity Services\nThe contractor shall provide cybersecurity support including vulnerability assessments, security patch management, and incident response.",
    tabCategory: "pws",
    pageNumber: 3
  },
  {
    sectionId: "evaluation",
    title: "SECTION M - EVALUATION CRITERIA",
    content: "M.1 EVALUATION APPROACH\nThe Government will award a contract resulting from this solicitation to the responsible offeror whose offer conforming to the solicitation represents the best value to the Government, price and other factors considered.\nM.2 EVALUATION FACTORS\nThe following evaluation factors will be used to evaluate proposals:\nFactor 1: Technical Approach (40%)\nFactor 2: Management Plan (25%)\nFactor 3: Corporate Experience (20%)\nFactor 4: Past Performance (15%)\nPrice will be evaluated for fairness and reasonableness but is not a weighted factor.",
    tabCategory: "evaluation",
    pageNumber: 4
  },
  {
    sectionId: "instructions",
    title: "SECTION L - INSTRUCTIONS TO OFFERORS",
    content: "L.1 GENERAL INSTRUCTIONS\nOfferors are expected to examine the entire solicitation document. Failure to do so will be at the offeror's risk.\nL.2 PROPOSAL SUBMISSION REQUIREMENTS\nProposals must be submitted electronically via the SAM.gov portal no later than September 15, 2023, at 5:00 PM Eastern Time.\nL.3 PROPOSAL FORMAT\nThe proposal shall consist of two separate volumes:\nVolume I: Technical Proposal\nVolume II: Price Proposal\nL.4 PROPOSAL CONTENT\nVolume I should address all technical evaluation factors and be limited to 50 pages excluding resumes and past performance information.\nVolume II shall include a complete pricing breakdown structure for all CLINs and periods of performance.",
    tabCategory: "instructions",
    pageNumber: 5
  }
];

export const documentOutline: OutlineItem[] = [
  {
    title: "SECTION A - SOLICITATION/CONTRACT FORM",
    children: [
      { title: "Solicitation Information" },
      { title: "Contract Type" },
      { title: "NAICS Code and Set-Aside" }
    ]
  },
  {
    title: "SECTION B - SUPPLIES OR SERVICES AND PRICES/COSTS",
    children: [
      { title: "B.1 General" },
      { title: "B.2 Contract Line Items" }
    ]
  },
  {
    title: "SECTION C - DESCRIPTION/SPECIFICATIONS/STATEMENT OF WORK",
    children: [
      { title: "C.1 Background" },
      { title: "C.2 Scope" }
    ]
  },
  {
    title: "PERFORMANCE WORK STATEMENT (PWS)",
    children: [
      { title: "1.0 Purpose" },
      { title: "2.0 Scope" },
      { 
        title: "3.0 Specific Tasks",
        children: [
          { title: "3.1 Help Desk Support" },
          { title: "3.2 Network Administration" },
          { title: "3.3 Cybersecurity Services" }
        ]
      }
    ]
  },
  {
    title: "SECTION L - INSTRUCTIONS TO OFFERORS",
    children: [
      { title: "L.1 General Instructions" },
      { title: "L.2 Proposal Submission Requirements" },
      { title: "L.3 Proposal Format" },
      { 
        title: "L.4 Proposal Content",
        children: [
          { title: "L.4.1 Volume I - Technical Proposal" },
          { title: "L.4.2 Volume II - Price Proposal" }
        ]
      }
    ]
  },
  {
    title: "SECTION M - EVALUATION CRITERIA",
    children: [
      { title: "M.1 Evaluation Approach" },
      { title: "M.2 Evaluation Factors" },
      { title: "M.3 Factor Descriptions" }
    ]
  }
];