// This file defines the data structure for the RFP document content
// It will hold the extracted text from the provided PDF

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  category: 'fullDocument' | 'instructions' | 'evaluation' | 'pws';
  pageNumber: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// Parse the provided RFP document content
export const rfpSections: DocumentSection[] = [
  {
    id: "section-1",
    title: "NOTICE TO VENDORS",
    content: "The objective of this acquisition is to award a Blanket Purchase Agreement (BPA) against the General Services Administration (GSA) Multiple Award Schedule (MAS), in accordance with Federal Acquisition Regulation (FAR) 8.405-2, for the services described in this RFQ and its attachments.\n\nThis requirement is for small businesses using NAICS 541511 – Custom Computer Programming Services, with a size standard of $34 million determined to represent the principal purpose of this requirement. In order to be considered for award, a vendor/Contractor Team Arrangement (CTA), collectively, will be required to cover the Special Item Number (SIN) (518210C) listed above awarded on their (or collectively on the CTA's) Schedule contract(s). Any quotes received from a vendor or CTA that does not cover the required SIN will be ineligible for award.",
    category: "fullDocument",
    pageNumber: 1
  },
  {
    id: "section-2",
    title: "BRIEF DESCRIPTION OF SERVICES",
    content: "In the HR Systems, Analytics, and Information Division (HR SAID), the Web and Information Management Branch (WIMB) maintains the NIH Office of Human Resources (OHR) website in Drupal. The branch needs experienced Drupal developers to help in the areas of website management, search, and content design. Engaging contractors who have experience in Drupal site development and content structure, specifically in an Acquia cloud environment is desired. Contractors who have experience in content editing, strategy, and architecture will help the branch deliver communication in a marketable way to our audiences.\n\nHR SAID has established a framework that 1) supports the development, maintenance and operations to support OHR Divisions' business needs for SharePoint Online and Power Platform; 2) migrate subsites to a SharePoint Online platform within the Office 365 environment; and 3) supports the creation of holistic digital experiences through the creation of digital solutions in such platforms as SharePoint, SharePoint Online and other web technologies/solutions.",
    category: "fullDocument",
    pageNumber: 1
  },
  {
    id: "section-3",
    title: "QUOTE PREPARATION INSTRUCTIONS",
    content: "The purpose of this section is to provide instructions on how to prepare the quote. The information must be presented in a practical straightforward manner, providing concise delineation of the Quoter's ability to meet the requirements.\n\nQuoters are expected to conform to RFQ provisions and its protocols in all respects. In particular, the quote must be prepared in accordance with the instructions provided and all items/areas cited as required must be addressed. The level of detail should be adequate and concise. The quote should be prepared logically and coherently. All pages of each part must be appropriately numbered and identified with the name of the Quoter, the date, and the RFQ number.",
    category: "instructions",
    pageNumber: 2
  },
  {
    id: "section-4",
    title: "EVALUATION CRITERIA",
    content: "The Government will evaluate quotes based on the following evaluation factors:\n\n1. Technical Factor\n   - Technical Approach and Understanding\n   - Staffing Plan\n   - Corporate Experience\n   - Sample Task Orders\n\n2. Price Factor\n   - Reasonableness of proposed pricing\n   - Completeness of price quotation\n   - Total evaluated price",
    category: "evaluation",
    pageNumber: 3
  },
  {
    id: "section-5",
    title: "STATEMENT OF WORK",
    content: "The contractor shall provide expert technical services to support the development, maintenance, configuration, and monitoring of Office of Human Resources (OHR) public-facing websites, intranet sites, and web applications. The contractor shall develop and maintain content, applications, and systems using various web technologies and platforms to improve the user experience, content strategy, content management, and search functionality for sites hosted in the Acquia Cloud environment.\n\nThe contractor shall perform the following tasks:\n\n1. Website Development and Maintenance\n2. Content Development, Strategy, and Management\n3. Search Functionality Enhancement\n4. System Integration\n5. User Experience and Interface Design\n6. Security Compliance\n7. Documentation and Training\n8. Project Management",
    category: "pws",
    pageNumber: 4
  },
  {
    id: "section-6",
    title: "Website Development and Maintenance",
    content: "The contractor shall:\n\n1.1 Develop, maintain, and enhance CMS-based web platforms, including code, architecture, and infrastructure, with primary focus on Drupal 10.\n\n1.2 Migrate content from existing Drupal 7 sites to Drupal 10 as needed.\n\n1.3 Implement features and functionality to enhance user experience, including responsive design, improved navigation, and interactive elements.\n\n1.4 Establish and implement deployment methodologies for code and configuration changes, including quality assurance procedures.",
    category: "pws",
    pageNumber: 5
  }
];

// RFP Document metadata
export const documentMetadata = {
  title: "Request for Quotation (RFQ) 89303024QIM000043",
  agency: "National Institutes of Health",
  office: "Office of Human Resources",
  issueDate: "2024-05-01",
  dueDate: "2024-06-01",
  totalPages: 10,
  fileName: "Attachment+D+-+Quotation+Preparation+Instructions (1).pdf"
};

// Structure for the outline generation feature
export interface OutlineItem {
  title: string;
  children?: OutlineItem[];
}

export const sampleOutline: OutlineItem[] = [
  {
    title: "1. Introduction",
    children: [
      { title: "1.1 Executive Summary" },
      { title: "1.2 Company Background" }
    ]
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
          { title: "2.3.2 Milestones" }
        ]
      }
    ]
  },
  {
    title: "3. Management Approach",
    children: [
      { title: "3.1 Project Management" },
      { title: "3.2 Risk Management" }
    ]
  },
  {
    title: "4. Past Performance",
    children: [
      { title: "4.1 Relevant Experience" },
      { title: "4.2 Customer References" }
    ]
  }
];