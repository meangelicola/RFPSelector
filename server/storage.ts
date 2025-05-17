import { 
  users, 
  type User, 
  type InsertUser, 
  documentSections, 
  documentHighlights, 
  type DocumentSection, 
  type InsertDocumentSection, 
  type DocumentHighlight, 
  type InsertDocumentHighlight
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Document section operations
  getAllDocumentSections(): Promise<DocumentSection[]>;
  getDocumentSection(id: number): Promise<DocumentSection | undefined>;
  getDocumentSectionsByTab(tabCategory: string): Promise<DocumentSection[]>;
  createDocumentSection(section: InsertDocumentSection): Promise<DocumentSection>;
  updateDocumentSection(id: number, section: Partial<DocumentSection>): Promise<DocumentSection | undefined>;

  // Document highlight operations
  getAllDocumentHighlights(): Promise<DocumentHighlight[]>;
  getDocumentHighlight(id: number): Promise<DocumentHighlight | undefined>;
  getDocumentHighlightsByTab(tabCategory: string): Promise<DocumentHighlight[]>;
  createDocumentHighlight(highlight: InsertDocumentHighlight): Promise<DocumentHighlight>;
  updateDocumentHighlight(id: number, highlight: Partial<DocumentHighlight>): Promise<DocumentHighlight | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private docSections: Map<number, DocumentSection>;
  private docHighlights: Map<number, DocumentHighlight>;
  private userCurrentId: number;
  private sectionCurrentId: number;
  private highlightCurrentId: number;

  constructor() {
    this.users = new Map();
    this.docSections = new Map();
    this.docHighlights = new Map();
    this.userCurrentId = 1;
    this.sectionCurrentId = 1;
    this.highlightCurrentId = 1;

    // Initialize with some sample data
    this.initializeData();
  }

  private initializeData() {
    // Add sample document sections and highlights
    const sectionA: InsertDocumentSection = {
      sectionId: "a",
      title: "SECTION A - SOLICITATION/CONTRACT FORM",
      content: "SOLICITATION NO: HHS-2023-IT-0042\nDATE ISSUED: August 15, 2023\nISSUED BY: Department of Health and Human Services\nCONTRACT TYPE: Firm-Fixed Price\nNAICS CODE: 541513\nSET-ASIDE: Small Business",
      tabCategory: "fullDocument",
      pageNumber: 1,
      isHighlighted: false
    };
    this.createDocumentSection(sectionA);

    const sectionB: InsertDocumentSection = {
      sectionId: "b",
      title: "SECTION B - SUPPLIES OR SERVICES AND PRICES/COSTS",
      content: "B.1 GENERAL\nThe contractor shall provide all resources necessary to accomplish the tasks and deliverables described in this solicitation. The Government intends to award a Firm-Fixed Price contract resulting from this solicitation.\nB.2 CONTRACT LINE ITEMS\nCLIN 0001: IT Support Services Base Period\nCLIN 0002: IT Support Services Option Period 1\nCLIN 0003: IT Support Services Option Period 2",
      tabCategory: "fullDocument",
      pageNumber: 2,
      isHighlighted: false
    };
    this.createDocumentSection(sectionB);

    const sectionPWS: InsertDocumentSection = {
      sectionId: "pws",
      title: "PERFORMANCE WORK STATEMENT (PWS)",
      content: "1.0 PURPOSE\nThis Performance Work Statement (PWS) defines the performance requirements for IT Support Services for the Department of Health and Human Services.\n2.0 SCOPE\nThe contractor shall provide qualified personnel, management, materials, equipment, and services to perform IT support services as defined in this PWS.\n3.0 SPECIFIC TASKS\n3.1 Help Desk Support\nThe contractor shall provide Tier 1, 2, and 3 help desk support services to approximately 5,000 users across HHS facilities.\n3.2 Network Administration\nThe contractor shall manage and maintain network infrastructure including routers, switches, firewalls, and wireless access points.\n3.3 Cybersecurity Services\nThe contractor shall provide cybersecurity support including vulnerability assessments, security patch management, and incident response.",
      tabCategory: "pws",
      pageNumber: 3,
      isHighlighted: true
    };
    this.createDocumentSection(sectionPWS);

    const sectionEval: InsertDocumentSection = {
      sectionId: "evaluation",
      title: "SECTION M - EVALUATION CRITERIA",
      content: "M.1 EVALUATION APPROACH\nThe Government will award a contract resulting from this solicitation to the responsible offeror whose offer conforming to the solicitation represents the best value to the Government, price and other factors considered.\nM.2 EVALUATION FACTORS\nThe following evaluation factors will be used to evaluate proposals:\nFactor 1: Technical Approach (40%)\nFactor 2: Management Plan (25%)\nFactor 3: Corporate Experience (20%)\nFactor 4: Past Performance (15%)\nPrice will be evaluated for fairness and reasonableness but is not a weighted factor.",
      tabCategory: "evaluation",
      pageNumber: 4,
      isHighlighted: true
    };
    this.createDocumentSection(sectionEval);

    const sectionInstructions: InsertDocumentSection = {
      sectionId: "instructions",
      title: "SECTION L - INSTRUCTIONS TO OFFERORS",
      content: "L.1 GENERAL INSTRUCTIONS\nOfferors are expected to examine the entire solicitation document. Failure to do so will be at the offeror's risk.\nL.2 PROPOSAL SUBMISSION REQUIREMENTS\nProposals must be submitted electronically via the SAM.gov portal no later than September 15, 2023, at 5:00 PM Eastern Time.\nL.3 PROPOSAL FORMAT\nThe proposal shall consist of two separate volumes:\nVolume I: Technical Proposal\nVolume II: Price Proposal\nL.4 PROPOSAL CONTENT\nVolume I should address all technical evaluation factors and be limited to 50 pages excluding resumes and past performance information.\nVolume II shall include a complete pricing breakdown structure for all CLINs and periods of performance.",
      tabCategory: "instructions",
      pageNumber: 5,
      isHighlighted: true
    };
    this.createDocumentSection(sectionInstructions);

    // Add sample document highlights
    const pwsHighlights: InsertDocumentHighlight = {
      sectionId: "pws",
      tabCategory: "pws",
      highlightedParagraphs: ["pws-p-0", "pws-p-1", "pws-p-2"]
    };
    this.createDocumentHighlight(pwsHighlights);

    const evalHighlights: InsertDocumentHighlight = {
      sectionId: "evaluation",
      tabCategory: "evaluation",
      highlightedParagraphs: ["evaluation-p-0", "evaluation-p-1", "evaluation-p-2"]
    };
    this.createDocumentHighlight(evalHighlights);

    const instructionsHighlights: InsertDocumentHighlight = {
      sectionId: "instructions",
      tabCategory: "instructions",
      highlightedParagraphs: ["instructions-p-0", "instructions-p-1", "instructions-p-2", "instructions-p-3", "instructions-p-4"]
    };
    this.createDocumentHighlight(instructionsHighlights);
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Document section operations
  async getAllDocumentSections(): Promise<DocumentSection[]> {
    return Array.from(this.docSections.values());
  }

  async getDocumentSection(id: number): Promise<DocumentSection | undefined> {
    return this.docSections.get(id);
  }

  async getDocumentSectionsByTab(tabCategory: string): Promise<DocumentSection[]> {
    return Array.from(this.docSections.values()).filter(
      (section) => section.tabCategory === tabCategory
    );
  }

  async createDocumentSection(insertSection: InsertDocumentSection): Promise<DocumentSection> {
    const id = this.sectionCurrentId++;
    const section: DocumentSection = { ...insertSection, id };
    this.docSections.set(id, section);
    return section;
  }

  async updateDocumentSection(
    id: number,
    sectionUpdate: Partial<DocumentSection>
  ): Promise<DocumentSection | undefined> {
    const section = this.docSections.get(id);
    if (!section) return undefined;

    const updatedSection = { ...section, ...sectionUpdate };
    this.docSections.set(id, updatedSection);
    return updatedSection;
  }

  // Document highlight operations
  async getAllDocumentHighlights(): Promise<DocumentHighlight[]> {
    return Array.from(this.docHighlights.values());
  }

  async getDocumentHighlight(id: number): Promise<DocumentHighlight | undefined> {
    return this.docHighlights.get(id);
  }

  async getDocumentHighlightsByTab(tabCategory: string): Promise<DocumentHighlight[]> {
    return Array.from(this.docHighlights.values()).filter(
      (highlight) => highlight.tabCategory === tabCategory
    );
  }

  async createDocumentHighlight(insertHighlight: InsertDocumentHighlight): Promise<DocumentHighlight> {
    const id = this.highlightCurrentId++;
    const highlight: DocumentHighlight = { ...insertHighlight, id };
    this.docHighlights.set(id, highlight);
    return highlight;
  }

  async updateDocumentHighlight(
    id: number,
    highlightUpdate: Partial<DocumentHighlight>
  ): Promise<DocumentHighlight | undefined> {
    const highlight = this.docHighlights.get(id);
    if (!highlight) return undefined;

    const updatedHighlight = { ...highlight, ...highlightUpdate };
    this.docHighlights.set(id, updatedHighlight);
    return updatedHighlight;
  }
}

export const storage = new MemStorage();
