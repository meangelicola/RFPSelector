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

// RFP content extracted from the provided PDF
export const rfpContent: DocumentSection[] = [
  {
    sectionId: "intro",
    title: "NOTICE TO VENDORS",
    content: "The objective of this acquisition is to award a Blanket Purchase Agreement (BPA) against the General Services Administration (GSA) Multiple Award Schedule (MAS), in accordance with Federal Acquisition Regulation (FAR) 8.405-2, for the services described in this RFQ and its attachments.\n\nThis requirement is for small businesses using NAICS 541511 – Custom Computer Programming Services, with a size standard of $34 million determined to represent the principal purpose of this requirement. In order to be considered for award, a vendor/Contractor Team Arrangement (CTA), collectively, will be required to cover the Special Item Number (SIN) (518210C) listed above awarded on their (or collectively on the CTA's) Schedule contract(s). Any quotes received from a vendor or CTA that does not cover the required SIN will be ineligible for award.\n\nIt is anticipated that services will begin on or about September 27, 2024. It is anticipated that the BPA will consist of a Base Period (12 months) and four (4) one-year options, September 27, 2024 – September 26, 2029.",
    tabCategory: "fullDocument",
    pageNumber: 1
  },
  {
    sectionId: "brief-description",
    title: "BRIEF DESCRIPTION OF SERVICES",
    content: "In the HR Systems, Analytics, and Information Division (HR SAID), the Web and Information Management Branch (WIMB) maintains the NIH Office of Human Resources (OHR) website in Drupal. The branch needs experienced Drupal developers to help in the areas of website management, search, and content design. Engaging contractors who have experience in Drupal site development and content structure, specifically in an Acquia cloud environment is desired. Contractors who have experience in content editing, strategy, and architecture will help the branch deliver communication in a marketable way to our audiences.\n\nHR SAID has established a framework that 1) supports the development, maintenance and operations to support OHR Divisions' business needs for SharePoint Online and Power Platform; 2) migrate subsites to a SharePoint Online platform within the Office 365 environment; and 3) supports the creation of holistic digital experiences through the creation of digital solutions in such platforms as SharePoint, SharePoint Online and other web technologies/solutions. The planning for migration and support for current sites and support for future work will need to be completed during the duration of this BPA. OHR is seeking Contractors to provide full lifecycle support, which includes planning and maintenance, to all OHR Divisions.",
    tabCategory: "fullDocument",
    pageNumber: 1
  },
  {
    sectionId: "goal",
    title: "Goal",
    content: "The primary goal is to offer OHR a method to procure budget module tools and maintenance support services. OHR intends to award one BPA. This initiative is expected to streamline OHR's process for acquiring experienced support services for specific projects and help achieve discounts through economies of scale.",
    tabCategory: "fullDocument",
    pageNumber: 1
  },
  {
    sectionId: "scope",
    title: "Scope",
    content: "OHR intends to establish one and/or more BPAs under SCHEDULE (MAS), CATEGORY 518210C Cloud-related IT professional services Federal Acquisition Regulation (FAR) Subpart 8.4 procedures. All labor categories offered in response to this RFQ must be awarded under the Contractor's SCHEDULE (MAS) contract. Prices proposed under this BPA shall not exceed those rates currently awarded under the Contractor's Schedule (MAS) contract.\n\nContractors are encouraged to offer discounts from their currently awarded Schedule prices. OHR may choose to not enter into a BPA with a Contractor whose quoted prices offer no discounts from prices awarded under Schedule (MAS) contracts. There are no intended nor implied guarantees regarding the Government's usage of this vehicle.",
    tabCategory: "fullDocument",
    pageNumber: 2
  },
  {
    sectionId: "quote-prep",
    title: "QUOTE PREPARATION INSTRUCTIONS",
    content: "The purpose of this section is to provide instructions on how to prepare the quote. The information must be presented in a practical straightforward manner, providing concise delineation of the Quoter's ability to meet the requirements.\n\nQuoters are expected to conform to RFQ provisions and its protocols in all respects. In particular, the quote must be prepared in accordance with the instructions provided and all items/areas cited as required must be addressed. The level of detail should be adequate and concise. The quote should be prepared logically and coherently. All pages of each part must be appropriately numbered and identified with the name of the Quoter, the date, and the RFQ number.\n\nThe Government intends to issue multiple-award GSA Schedule Blanket Purchase Agreements (BPA) from this solicitation to the responsible Quoters whose quotes represent the best value to the Government in accordance with the criteria set forth in the Request for Quote (RFQ).\n\nThe Government reserves the right to reject any quote that does not comply with this document or RFQ Attachment E – Evaluation Criteria.",
    tabCategory: "instructions",
    pageNumber: 1
  },
  {
    sectionId: "quote-format",
    title: "Quote Format",
    content: "Quotes shall contain a table of contents and follow the instructions below. The Quote must include each volume concurrently as follows:",
    tabCategory: "instructions",
    pageNumber: 2
  },
  {
    sectionId: "eval-approach",
    title: "EVALUATION APPROACH",
    content: "Quotes will be evaluated in accordance with the Evaluation Criteria. Award will be made to the responsible Quoter(s) whose quote(s) represent the Best Value to the Government. The evaluation process will be conducted in accordance with FAR 8.405-2(d). Evaluation factors are listed in descending order of importance.\n\nThe Government intends to evaluate proposals without discussions with Quoters (except clarifications as described in FAR 15.306(a)). Therefore, the Quoter's initial proposal must contain the Quoter's best terms. The Government reserves the right to conduct discussions if the Contracting Officer determines them to be necessary.",
    tabCategory: "evaluation",
    pageNumber: 5
  },
  {
    sectionId: "eval-criteria",
    title: "EVALUATION CRITERIA",
    content: "The Government will evaluate quotes based on the following evaluation factors:\n\n1. Technical Factor\n   - Technical Approach and Understanding\n   - Staffing Plan\n   - Corporate Experience\n   - Sample Task Orders\n\n2. Price Factor\n   - Reasonableness of proposed pricing\n   - Completeness of price quotation\n   - Total evaluated price",
    tabCategory: "evaluation",
    pageNumber: 5
  },
  {
    sectionId: "statement-of-work",
    title: "STATEMENT OF WORK",
    content: "The contractor shall provide expert technical services to support the development, maintenance, configuration, and monitoring of Office of Human Resources (OHR) public-facing websites, intranet sites, and web applications. The contractor shall develop and maintain content, applications, and systems using various web technologies and platforms to improve the user experience, content strategy, content management, and search functionality for sites hosted in the Acquia Cloud environment.\n\nThe contractor shall perform the following tasks:\n\n1. Website Development and Maintenance\n2. Content Development, Strategy, and Management\n3. Search Functionality Enhancement\n4. System Integration\n5. User Experience and Interface Design\n6. Security Compliance\n7. Documentation and Training\n8. Project Management",
    tabCategory: "pws",
    pageNumber: 8
  },
  {
    sectionId: "website-dev",
    title: "Website Development and Maintenance",
    content: "The contractor shall:\n\n1.1 Develop, maintain, and enhance CMS-based web platforms, including code, architecture, and infrastructure, with primary focus on Drupal 10.\n\n1.2 Migrate content from existing Drupal 7 sites to Drupal 10 as needed.\n\n1.3 Implement features and functionality to enhance user experience, including responsive design, improved navigation, and interactive elements.\n\n1.4 Establish and implement deployment methodologies for code and configuration changes, including quality assurance procedures.\n\n1.5 Perform periodic maintenance activities including security updates, module updates, and patches.\n\n1.6 Implement custom modules as needed to support specialized website functionality.",
    tabCategory: "pws",
    pageNumber: 8
  },
  {
    sectionId: "content-dev",
    title: "Content Development, Strategy, and Management",
    content: "The contractor shall:\n\n2.1 Create and maintain an effective content strategy for OHR's digital presence.\n\n2.2 Develop and maintain content types, taxonomies, and web form solutions.\n\n2.3 Design and implement content workflows, including review and approval processes.\n\n2.4 Integrate content from various sources and ensure consistent presentation.\n\n2.5 Implement and maintain content governance policies.\n\n2.6 Provide expertise in information architecture, content organization, and navigation design.",
    tabCategory: "pws",
    pageNumber: 9
  }
];

// Sample outline structure for the outline generation feature
export const documentOutline: OutlineItem[] = [
  {
    title: "1. Introduction",
    children: [
      { title: "1.1 Executive Summary" },
      { title: "1.2 Company Background" },
    ],
  },
  {
    title: "2. Technical Approach",
    children: [
      { title: "2.1 Understanding of Requirements" },
      { title: "2.2 Proposed Solution" },
      { 
        title: "2.3 Implementation Plan",
        children: [
          { title: "2.3.1 Timeline" },
          { title: "2.3.2 Milestones" },
        ]
      },
    ],
  },
  {
    title: "3. Management Approach",
    children: [
      { title: "3.1 Project Management" },
      { title: "3.2 Risk Management" },
    ],
  },
  {
    title: "4. Past Performance",
    children: [
      { title: "4.1 Relevant Experience" },
      { title: "4.2 Customer References" },
    ],
  },
];