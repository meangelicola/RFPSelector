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

// RFP content for US Department of Fun Administrative Support Services
export const rfpContent: DocumentSection[] = [
  // SECTION A - INTRODUCTION
  {
    sectionId: "intro-overview",
    title: "SECTION A - SOLICITATION OVERVIEW",
    content: "SOLICITATION NUMBER: USDOF-2025-ADMIN-0042\nISSUE DATE: MAY 15, 2025\nCLOSING DATE: JUNE 17, 2025, 5:00 PM EASTERN TIME\n\nSOLICITATION TYPE: REQUEST FOR PROPOSALS (RFP)\nCONTRACT TYPE: FIRM-FIXED PRICE WITH TIME AND MATERIALS CLIN\nPERIOD OF PERFORMANCE: BASE YEAR PLUS FOUR (4) OPTION YEARS\nSET-ASIDE: SMALL BUSINESS\nNAICS CODE: 561110 - OFFICE ADMINISTRATIVE SERVICES\nSIZE STANDARD: $8 MILLION",
    tabCategory: "fullDocument",
    pageNumber: 1
  },
  {
    sectionId: "intro-purpose",
    title: "A.1 PURPOSE",
    content: "The purpose of this solicitation is to acquire comprehensive administrative support services for the United States Department of Fun (USDOF) headquarters and regional offices. The selected contractor shall provide skilled administrative personnel to support the day-to-day operations of the USDOF's various divisions, programs, and special initiatives that promote recreational activities and entertainment opportunities for the American public.\n\nThese services are essential to the USDOF's mission of ensuring that citizens have access to high-quality recreational experiences, encouraging participation in diverse leisure activities, and supporting the nation's entertainment industry. The USDOF requires administrative support that enables the Department to operate efficiently and effectively in delivering its critical services to the American public.",
    tabCategory: "fullDocument",
    pageNumber: 1
  },
  {
    sectionId: "intro-background",
    title: "A.2 BACKGROUND",
    content: "The United States Department of Fun (USDOF) was established in 2023 to consolidate various federal recreational and entertainment programs previously managed across multiple agencies. The USDOF is responsible for developing and implementing national policies related to leisure activities, overseeing federal recreation areas, supporting public entertainment venues, and ensuring equitable access to recreational opportunities for all Americans.\n\nThe Department manages a diverse portfolio of programs including the National Recreation Areas System, the Arts and Entertainment Grant Program, the Public Leisure Innovation Initiative, and the Youth Recreation Corps. With headquarters in Washington, DC, and regional offices in six locations nationwide, the USDOF employs approximately 2,500 federal employees and requires extensive administrative support to fulfill its mission.\n\nThe Department's strategic plan for 2024-2029 emphasizes modernizing administrative processes, improving efficiency in operations, enhancing stakeholder engagement, and strengthening the Department's capacity to serve the public. The administrative support services acquired through this contract will directly contribute to achieving these strategic goals.",
    tabCategory: "fullDocument",
    pageNumber: 1
  },
  {
    sectionId: "intro-objectives",
    title: "A.3 OBJECTIVES",
    content: "The primary objectives of this procurement are to:\n\n1. Obtain high-quality, professional administrative support services for USDOF headquarters and regional offices.\n\n2. Enhance the efficiency and effectiveness of USDOF operations through improved administrative processes and support.\n\n3. Ensure continuity of administrative services across all USDOF locations and programs.\n\n4. Support the Department's mission to promote and enhance recreational opportunities for all Americans through efficient administrative operations.\n\n5. Implement modern administrative practices that leverage technology and innovative approaches.\n\n6. Provide flexible administrative support that can adapt to changing Departmental needs and priorities.",
    tabCategory: "fullDocument",
    pageNumber: 2
  },
  {
    sectionId: "intro-scope",
    title: "A.4 SCOPE",
    content: "This solicitation seeks comprehensive administrative support services for the USDOF headquarters and six (6) regional offices. The contract will include, but is not limited to, the following service areas:\n\n1. Executive administrative support\n2. Office management services\n3. Meeting and event coordination\n4. Document management and processing\n5. Travel arrangement and management\n6. Correspondence management\n7. Records management\n8. Data entry and information management\n9. Calendar and scheduling management\n10. Administrative process improvement\n\nThe USDOF anticipates awarding a single Indefinite Delivery/Indefinite Quantity (IDIQ) contract with Firm-Fixed Price (FFP) and Time and Materials (T&M) Contract Line Item Numbers (CLINs). The anticipated period of performance is a 12-month base period with four (4) 12-month option periods, for a total potential contract duration of five (5) years.",
    tabCategory: "fullDocument",
    pageNumber: 2
  },
  {
    sectionId: "intro-procurement-authority",
    title: "A.5 PROCUREMENT AUTHORITY",
    content: "This acquisition is being conducted under the authority of the Federal Acquisition Regulation (FAR) and is subject to all applicable federal procurement laws and regulations. This acquisition is being set aside for small businesses under NAICS Code 561110 - Office Administrative Services, with a size standard of $8 million in average annual receipts.\n\nThe Contracting Officer has determined that this acquisition is suitable for small business participation. The Government encourages participation by small businesses, veteran-owned small businesses, service-disabled veteran-owned small businesses, HUBZone small businesses, small disadvantaged businesses, and women-owned small businesses.",
    tabCategory: "fullDocument",
    pageNumber: 2
  },
  {
    sectionId: "intro-contract-type",
    title: "A.6 CONTRACT TYPE",
    content: "The resulting contract will be an Indefinite Delivery/Indefinite Quantity (IDIQ) contract with both Firm-Fixed Price (FFP) and Time and Materials (T&M) Contract Line Item Numbers (CLINs). The guaranteed minimum for this contract is $250,000, and the maximum ceiling value over the five-year period (base plus all option years) is $75,000,000.\n\nTask Orders will be issued on a Firm-Fixed Price or Time and Materials basis, as appropriate for the specific requirements. The Contracting Officer will determine the appropriate task order type based on the nature of the work and the level of risk associated with the requirement.",
    tabCategory: "fullDocument",
    pageNumber: 3
  },
  {
    sectionId: "intro-period-performance",
    title: "A.7 PERIOD OF PERFORMANCE",
    content: "The period of performance for this contract consists of a 12-month base period and four (4) 12-month option periods, as follows:\n\nBase Period: September 1, 2025 – August 31, 2026\nOption Period 1: September 1, 2026 – August 31, 2027\nOption Period 2: September 1, 2027 – August 31, 2028\nOption Period 3: September 1, 2028 – August 31, 2029\nOption Period 4: September 1, 2029 – August 31, 2030\n\nOption periods may be exercised at the Government's discretion in accordance with FAR 52.217-9, Option to Extend the Term of the Contract. The Government is under no obligation to exercise any option periods.",
    tabCategory: "fullDocument",
    pageNumber: 3
  },
  {
    sectionId: "intro-place-performance",
    title: "A.8 PLACE OF PERFORMANCE",
    content: "Services under this contract will be performed at the following USDOF locations:\n\n1. USDOF Headquarters\n   1700 Pennsylvania Avenue NW\n   Washington, DC 20006\n\n2. USDOF Northeast Regional Office\n   100 Federal Plaza\n   New York, NY 10278\n\n3. USDOF Southeast Regional Office\n   75 Spring Street SW\n   Atlanta, GA 30303\n\n4. USDOF Midwest Regional Office\n   230 South Dearborn Street\n   Chicago, IL 60604\n\n5. USDOF Southwest Regional Office\n   1100 Commerce Street\n   Dallas, TX 75242\n\n6. USDOF Mountain Regional Office\n   1961 Stout Street\n   Denver, CO 80294\n\n7. USDOF Pacific Regional Office\n   90 7th Street\n   San Francisco, CA 94103\n\nSome administrative support services may be performed remotely, subject to Government approval and in accordance with the specific requirements established in each Task Order.",
    tabCategory: "fullDocument",
    pageNumber: 3
  },
  {
    sectionId: "intro-security-requirements",
    title: "A.9 SECURITY REQUIREMENTS",
    content: "All contractor personnel performing under this contract must obtain and maintain a Moderate Risk background investigation in accordance with Homeland Security Presidential Directive-12 (HSPD-12) and USDOF security requirements.\n\nContractor personnel may not begin work until they have received a favorable preliminary security clearance determination. Final clearance must be obtained within 90 days of contract award. The contractor shall be responsible for ensuring that all personnel comply with USDOF security requirements and for processing security paperwork in a timely manner.\n\nThe contractor shall designate a Security Officer who will be responsible for ensuring that all security requirements are met and for serving as the primary point of contact for security-related matters. The contractor shall comply with all applicable federal and agency security regulations, policies, and procedures.",
    tabCategory: "fullDocument",
    pageNumber: 4
  },
  
  // SECTION C - PWS
  {
    sectionId: "pws-overview",
    title: "SECTION C - PERFORMANCE WORK STATEMENT",
    content: "The Contractor shall provide all necessary personnel, management, supervision, materials, equipment, and facilities (except as otherwise specified) to perform comprehensive administrative support services for the United States Department of Fun (USDOF). These services shall be performed in accordance with the highest professional standards and shall comply with all applicable laws, regulations, and policies.",
    tabCategory: "pws",
    pageNumber: 8
  },
  {
    sectionId: "pws-scope",
    title: "C.1 SCOPE",
    content: "The scope of this Performance Work Statement (PWS) encompasses a wide range of administrative support services required by the USDOF to fulfill its mission of promoting and enhancing recreational and entertainment opportunities for all Americans. The Contractor shall provide qualified personnel to support USDOF headquarters and regional offices in performing administrative functions that enable efficient and effective operations.\n\nThis PWS defines the minimum performance requirements for administrative support services. The Contractor shall provide innovative approaches and solutions that improve efficiency, reduce costs, and enhance the quality of administrative services provided to the USDOF.",
    tabCategory: "pws",
    pageNumber: 8
  },
  {
    sectionId: "pws-applicable-documents",
    title: "C.2 APPLICABLE DOCUMENTS",
    content: "The Contractor shall comply with all applicable Federal laws, regulations, Executive Orders, and USDOF policies and procedures, including but not limited to:\n\n1. Federal Acquisition Regulation (FAR)\n2. USDOF Administrative Procedures Manual\n3. USDOF Records Management Policy\n4. USDOF Information Technology Security Policy\n5. USDOF Privacy and Personally Identifiable Information (PII) Protection Policy\n6. USDOF Travel Policy\n7. USDOF Correspondence Manual\n8. USDOF Emergency Operations Plan\n9. USDOF Continuity of Operations Plan\n10. USDOF Human Resources Policies and Procedures\n\nThe Contracting Officer's Representative (COR) will provide the Contractor with copies of or access to all necessary documents upon contract award.",
    tabCategory: "pws",
    pageNumber: 8
  },
  {
    sectionId: "pws-definitions",
    title: "C.3 DEFINITIONS",
    content: "For the purposes of this PWS, the following definitions apply:\n\nCONTRACTING OFFICER (CO): The Government official with the authority to enter into, administer, and/or terminate contracts and make related determinations and findings.\n\nCONTRACTING OFFICER'S REPRESENTATIVE (COR): An individual designated by the CO to act as the CO's authorized representative to assist in the technical monitoring and administration of the contract.\n\nCORRESPONDENCE: All written communication, whether in electronic or paper format, including but not limited to letters, memoranda, reports, emails, and other documents.\n\nKEY PERSONNEL: Contractor personnel deemed essential to the performance of the contract.\n\nQUALITY ASSURANCE SURVEILLANCE PLAN (QASP): The Government's method for evaluating Contractor performance.\n\nQUALITY CONTROL PLAN (QCP): The Contractor's plan for ensuring quality performance and conformance with contract requirements.\n\nSERVICE LEVEL AGREEMENT (SLA): A commitment between the Contractor and the Government regarding the expected level of service to be delivered.",
    tabCategory: "pws",
    pageNumber: 9
  },
  {
    sectionId: "pws-exec-admin-support",
    title: "C.4 EXECUTIVE ADMINISTRATIVE SUPPORT",
    content: "The Contractor shall provide executive administrative support to USDOF senior leadership, including the Secretary, Deputy Secretary, Assistant Secretaries, and other senior officials. These services shall include, but are not limited to:\n\n4.1 Managing calendars and scheduling appointments, meetings, and events for senior executives.\n\n4.2 Coordinating and preparing materials for meetings, including agendas, background materials, and presentation slides.\n\n4.3 Taking and distributing meeting minutes and tracking action items to completion.\n\n4.4 Screening and prioritizing incoming telephone calls, correspondence, and other communications.\n\n4.5 Drafting, editing, and proofreading correspondence, reports, and other documents.\n\n4.6 Coordinating travel arrangements and preparing travel authorizations and expense reports.\n\n4.7 Managing visitor access and meeting logistics for senior executives.\n\n4.8 Maintaining electronic and paper filing systems for executive offices.\n\n4.9 Coordinating with other USDOF offices, federal agencies, and external stakeholders.\n\n4.10 Providing other administrative support as required to ensure the efficient operation of executive offices.",
    tabCategory: "pws",
    pageNumber: 9
  },
  {
    sectionId: "pws-office-management",
    title: "C.5 OFFICE MANAGEMENT SERVICES",
    content: "The Contractor shall provide comprehensive office management services to support USDOF operations. These services shall include, but are not limited to:\n\n5.1 Overseeing day-to-day office operations and implementing administrative procedures.\n\n5.2 Managing office supplies and equipment, including inventory management, ordering, and distribution.\n\n5.3 Coordinating facility maintenance requests and follow-up.\n\n5.4 Managing conference room and shared space scheduling.\n\n5.5 Coordinating with building management on facilities issues.\n\n5.6 Maintaining office equipment, including coordinating repairs and maintenance.\n\n5.7 Implementing and maintaining office filing systems, both electronic and physical.\n\n5.8 Coordinating office relocations and space planning activities.\n\n5.9 Managing telecommunications services, including telephone directories and service requests.\n\n5.10 Supporting emergency preparedness activities and maintaining emergency contact information.\n\n5.11 Providing reception services, including greeting visitors and managing visitor access.\n\n5.12 Processing and distributing mail and other correspondence.\n\n5.13 Maintaining office policies and procedures manuals.\n\n5.14 Implementing sustainable office practices in accordance with federal environmental policies.",
    tabCategory: "pws",
    pageNumber: 10
  },
  {
    sectionId: "pws-meeting-coordination",
    title: "C.6 MEETING AND EVENT COORDINATION",
    content: "The Contractor shall provide meeting and event coordination services for USDOF headquarters and regional offices. These services shall include, but are not limited to:\n\n6.1 Planning and coordinating internal meetings, including scheduling, room reservations, and equipment setup.\n\n6.2 Planning and coordinating external events, including stakeholder meetings, public forums, and conferences.\n\n6.3 Preparing and distributing meeting notices, agendas, and materials.\n\n6.4 Arranging for audio-visual equipment, teleconference and video conference services.\n\n6.5 Coordinating catering services when approved and authorized.\n\n6.6 Setting up meeting rooms, including arrangement of tables, chairs, and equipment.\n\n6.7 Greeting and checking in meeting participants and managing sign-in sheets.\n\n6.8 Taking meeting minutes and distributing them to participants.\n\n6.9 Tracking action items and following up on meeting outcomes.\n\n6.10 Coordinating travel and accommodation arrangements for meeting participants when required.\n\n6.11 Managing registration processes for larger events and conferences.\n\n6.12 Providing on-site support during meetings and events.\n\n6.13 Preparing after-action reports and lessons learned documentation.\n\n6.14 Ensuring compliance with federal regulations regarding meetings and events.",
    tabCategory: "pws",
    pageNumber: 11
  },
  {
    sectionId: "pws-document-management",
    title: "C.7 DOCUMENT MANAGEMENT AND PROCESSING",
    content: "The Contractor shall provide document management and processing services to support USDOF operations. These services shall include, but are not limited to:\n\n7.1 Creating, formatting, editing, and proofreading documents, including correspondence, reports, presentations, and forms.\n\n7.2 Processing incoming and outgoing correspondence in accordance with USDOF procedures.\n\n7.3 Maintaining electronic document management systems and file structures.\n\n7.4 Scanning paper documents and converting them to appropriate electronic formats.\n\n7.5 Creating and maintaining document templates and standardized formats.\n\n7.6 Indexing and archiving documents in accordance with records management requirements.\n\n7.7 Processing forms and applications, including review for completeness and accuracy.\n\n7.8 Preparing documents for executive signature and managing signature processes.\n\n7.9 Managing document version control and tracking document changes.\n\n7.10 Implementing and maintaining document naming conventions and metadata standards.\n\n7.11 Preparing and assembling briefing books and information packets.\n\n7.12 Managing sensitive and controlled documents in accordance with security requirements.\n\n7.13 Tracking document workflows and ensuring timely processing.\n\n7.14 Providing quality control for all document management activities.",
    tabCategory: "pws",
    pageNumber: 12
  },
  {
    sectionId: "pws-travel-management",
    title: "C.8 TRAVEL ARRANGEMENT AND MANAGEMENT",
    content: "The Contractor shall provide travel arrangement and management services for USDOF personnel. These services shall include, but are not limited to:\n\n8.1 Processing travel requests and preparing travel authorizations in the E-Gov Travel Service (ETS) system.\n\n8.2 Making transportation reservations, including air, rail, and rental car bookings.\n\n8.3 Making lodging reservations in accordance with federal per diem rates and policies.\n\n8.4 Preparing detailed travel itineraries for travelers.\n\n8.5 Coordinating international travel requirements, including passports, visas, and country clearances.\n\n8.6 Processing travel expense reports and vouchers in ETS.\n\n8.7 Reconciling travel credit card transactions.\n\n8.8 Tracking travel budgets and expenditures by office and program.\n\n8.9 Providing travel policy guidance to USDOF personnel.\n\n8.10 Resolving travel-related issues and discrepancies.\n\n8.11 Maintaining travel profiles for USDOF personnel.\n\n8.12 Coordinating group travel for conferences, training, and other events.\n\n8.13 Preparing quarterly and annual travel reports as required.\n\n8.14 Ensuring compliance with federal travel regulations and USDOF travel policies.",
    tabCategory: "pws",
    pageNumber: 13
  },
  {
    sectionId: "pws-correspondence",
    title: "C.9 CORRESPONDENCE MANAGEMENT",
    content: "The Contractor shall provide correspondence management services for USDOF headquarters and regional offices. These services shall include, but are not limited to:\n\n9.1 Receiving, sorting, and distributing incoming mail and correspondence.\n\n9.2 Processing and tracking incoming correspondence, including date stamping and logging.\n\n9.3 Drafting responses to routine correspondence in accordance with USDOF guidelines.\n\n9.4 Routing correspondence to appropriate offices for action or information.\n\n9.5 Tracking correspondence to ensure timely responses.\n\n9.6 Maintaining correspondence control logs and databases.\n\n9.7 Preparing outgoing correspondence for mailing or electronic distribution.\n\n9.8 Managing electronic mail distribution lists.\n\n9.9 Preparing standard and custom correspondence reports.\n\n9.10 Archiving correspondence in accordance with records management requirements.\n\n9.11 Managing electronic signature processes for correspondence.\n\n9.12 Ensuring compliance with USDOF correspondence policies and procedures.\n\n9.13 Managing controlled correspondence requiring special handling.\n\n9.14 Providing quality control for all correspondence to ensure accuracy and adherence to standards.",
    tabCategory: "pws",
    pageNumber: 14
  },
  {
    sectionId: "pws-records-management",
    title: "C.10 RECORDS MANAGEMENT",
    content: "The Contractor shall provide records management services in accordance with federal laws and regulations and USDOF policies. These services shall include, but are not limited to:\n\n10.1 Creating and maintaining file plans for electronic and paper records.\n\n10.2 Classifying records according to approved records schedules.\n\n10.3 Filing, retrieving, and re-filing records in electronic and paper systems.\n\n10.4 Implementing and maintaining records retention and disposition schedules.\n\n10.5 Transferring records to the Federal Records Center or National Archives as appropriate.\n\n10.6 Implementing litigation holds and ensuring compliance with legal requirements.\n\n10.7 Coordinating records management activities across USDOF offices.\n\n10.8 Training and assisting USDOF personnel in records management practices.\n\n10.9 Conducting periodic records inventories and audits.\n\n10.10 Preparing records management reports as required.\n\n10.11 Scanning and digitizing paper records in accordance with approved procedures.\n\n10.12 Managing vital records in accordance with USDOF continuity of operations requirements.\n\n10.13 Ensuring compliance with the Federal Records Act and related regulations.\n\n10.14 Coordinating with the USDOF Records Officer on records management policy and procedures.",
    tabCategory: "pws",
    pageNumber: 15
  },
  
  // SECTION L - INSTRUCTIONS TO OFFERORS
  {
    sectionId: "instructions-overview",
    title: "SECTION L - INSTRUCTIONS, CONDITIONS, AND NOTICES TO OFFERORS",
    content: "This section provides instructions for preparing and submitting proposals in response to this solicitation. Offerors are advised to read and follow these instructions carefully. Failure to follow these instructions may result in the proposal being determined unacceptable and eliminated from consideration.",
    tabCategory: "instructions",
    pageNumber: 25
  },
  {
    sectionId: "instructions-general",
    title: "L.1 GENERAL INSTRUCTIONS",
    content: "L.1.1 The Government intends to award a contract resulting from this solicitation to the responsible offeror whose proposal represents the best value to the Government, price and other factors considered.\n\nL.1.2 This procurement is being conducted under full and open competition procedures in accordance with the Federal Acquisition Regulation (FAR) Part 15.\n\nL.1.3 The Government reserves the right to make a single award, multiple awards, or no award as a result of this solicitation. The Government also reserves the right to accept proposals in whole or in part.\n\nL.1.4 Proposals must be valid for a minimum of 180 calendar days from the proposal due date.\n\nL.1.5 The Government may communicate with offerors at any time to clarify certain aspects of their proposals, to address minor or clerical errors, or to discuss technical concepts or approaches. Such communications shall not be used to cure material omissions or deficiencies in proposals.\n\nL.1.6 The Government reserves the right to conduct discussions with offerors in the competitive range if determined necessary by the Contracting Officer.\n\nL.1.7 All questions regarding this solicitation must be submitted in writing to the Contracting Officer no later than May 28, 2025. Responses to questions will be provided through an amendment to the solicitation and posted to SAM.gov.",
    tabCategory: "instructions",
    pageNumber: 25
  },
  {
    sectionId: "instructions-proposal-submission",
    title: "L.2 PROPOSAL SUBMISSION REQUIREMENTS",
    content: "L.2.1 Proposals must be received no later than June 17, 2025, 5:00 PM Eastern Time. Late proposals will be handled in accordance with FAR 15.208.\n\nL.2.2 Proposals shall be submitted electronically through the SAM.gov portal. Paper submissions will not be accepted.\n\nL.2.3 All electronic files must be in either Microsoft Office format (Word, Excel, PowerPoint) or Adobe PDF format. Compressed files (ZIP) are acceptable but must not be password protected.\n\nL.2.4 File Naming Convention: All electronic files must follow this naming convention: USDOF-2025-ADMIN-0042_CompanyName_Volume#_Section#.\n\nL.2.5 File Size Limitation: Individual files must not exceed 10 MB. If a file exceeds this limit, it should be broken into multiple parts clearly labeled (e.g., Part 1 of 3, Part 2 of 3, etc.).\n\nL.2.6 Page Size and Margins: All documents must be formatted for standard 8.5\" x 11\" paper with 1-inch margins on all sides.\n\nL.2.7 Font: All text must be in 12-point Times New Roman or 11-point Arial font. Tables, graphics, and charts may use a smaller font size but must be legible.\n\nL.2.8 Page Numbering: All pages must be numbered consecutively within each volume.\n\nL.2.9 Electronic Signatures: Electronic signatures are acceptable for all proposal documents.",
    tabCategory: "instructions",
    pageNumber: 26
  },
  {
    sectionId: "instructions-proposal-organization",
    title: "L.3 PROPOSAL ORGANIZATION",
    content: "Proposals shall be organized into four separate volumes as follows:\n\nVolume I: Technical Proposal\nVolume II: Management Proposal\nVolume III: Past Performance\nVolume IV: Price Proposal\n\nEach volume shall be submitted as a separate file or set of files. Offerors shall adhere to the page limitations specified for each volume. Pages in excess of the specified limitations will not be evaluated.",
    tabCategory: "instructions",
    pageNumber: 26
  },
  {
    sectionId: "instructions-vol1-technical",
    title: "L.4 VOLUME I: TECHNICAL PROPOSAL",
    content: "L.4.1 The Technical Proposal shall not exceed 40 pages, excluding the cover page, table of contents, and any required attachments specifically identified in this section.\n\nL.4.2 The Technical Proposal shall include the following sections:\n\nL.4.2.1 Technical Approach: The offeror shall describe its approach to performing the requirements specified in the Performance Work Statement (PWS). The offeror shall demonstrate a clear understanding of the requirements and provide a detailed explanation of how it will meet or exceed these requirements. The offeror shall address all tasks identified in the PWS and provide specific methodologies, techniques, and procedures for accomplishing each task.\n\nL.4.2.2 Quality Control Plan: The offeror shall provide a draft Quality Control Plan that describes its approach to ensuring the quality of services provided under the contract. The plan shall include methods for identifying and preventing deficiencies, procedures for inspecting and correcting work, and measures for ensuring continuous improvement.\n\nL.4.2.3 Transition Plan: The offeror shall provide a detailed transition plan that describes its approach to assuming full responsibility for contract performance with minimal disruption to USDOF operations. The plan shall address staffing, training, phase-in procedures, risk management, and communication strategies.\n\nL.4.2.4 Innovation and Process Improvement: The offeror shall describe any innovative approaches, methodologies, or technologies it proposes to implement to improve the efficiency and effectiveness of administrative support services. The offeror shall explain how these innovations will benefit the USDOF and enhance service delivery.",
    tabCategory: "instructions",
    pageNumber: 27
  },
  {
    sectionId: "instructions-vol2-management",
    title: "L.5 VOLUME II: MANAGEMENT PROPOSAL",
    content: "L.5.1 The Management Proposal shall not exceed 30 pages, excluding the cover page, table of contents, and resumes of key personnel.\n\nL.5.2 The Management Proposal shall include the following sections:\n\nL.5.2.1 Management Approach: The offeror shall describe its overall management approach for the contract, including organizational structure, lines of authority, communication channels, and decision-making processes. The offeror shall explain how its management approach will ensure effective and efficient performance of all contract requirements.\n\nL.5.2.2 Staffing Plan: The offeror shall provide a comprehensive staffing plan that describes its approach to recruiting, hiring, training, and retaining qualified personnel. The plan shall include a staffing matrix that identifies the number and types of personnel proposed for each task, their qualifications, and their availability. The offeror shall explain how its staffing approach will ensure adequate coverage at all USDOF locations.\n\nL.5.2.3 Key Personnel: The offeror shall identify all key personnel proposed for the contract and provide resumes demonstrating their qualifications, experience, and education. At a minimum, the following positions shall be designated as key personnel: Program Manager, Deputy Program Manager, Quality Control Manager, and Site Managers for each USDOF location. The offeror shall provide letters of commitment for all key personnel.\n\nL.5.2.4 Training and Development: The offeror shall describe its approach to training and developing personnel to ensure they possess the necessary skills and knowledge to perform the required services. The plan shall address initial training, ongoing professional development, and specialized training for specific tasks or functions.",
    tabCategory: "instructions",
    pageNumber: 28
  },
  {
    sectionId: "instructions-vol3-past-performance",
    title: "L.6 VOLUME III: PAST PERFORMANCE",
    content: "L.6.1 The Past Performance volume shall not exceed 15 pages, excluding the cover page, table of contents, and past performance questionnaires.\n\nL.6.2 The offeror shall provide information on a minimum of three (3) and a maximum of five (5) contracts or task orders that are similar in scope, complexity, and magnitude to the requirements of this solicitation. For each reference, the offeror shall provide:\n\nL.6.2.1 Contract number, type, and value\nL.6.2.2 Period of performance\nL.6.2.3 Customer name, address, and point of contact (including telephone number and email address)\nL.6.2.4 Description of the work performed and its relevance to the current requirement\nL.6.2.5 Performance metrics, awards, or other indicators of customer satisfaction\nL.6.2.6 Any performance problems encountered and corrective actions taken\n\nL.6.3 The offeror shall complete and submit a Past Performance Questionnaire (Attachment 2) for each reference. The offeror shall send the questionnaire to each reference for completion and submission directly to the Contracting Officer by the proposal due date.\n\nL.6.4 The Government reserves the right to contact the references provided by the offeror and to consider information from other sources, including its own records and experience with the offeror, in evaluating past performance.",
    tabCategory: "instructions",
    pageNumber: 29
  },
  {
    sectionId: "instructions-vol4-price",
    title: "L.7 VOLUME IV: PRICE PROPOSAL",
    content: "L.7.1 The Price Proposal shall not exceed 20 pages, excluding the cover page, table of contents, and completed pricing worksheets (Attachment 3).\n\nL.7.2 The offeror shall complete the Price Proposal Worksheet (Attachment 3) providing fully-loaded hourly rates for all labor categories for the base period and each option period. The worksheet must be submitted in its original Excel format with all formulas intact.\n\nL.7.3 The offeror shall provide a detailed breakdown of its proposed rates, including direct labor rates, indirect rates (fringe benefits, overhead, G&A), and profit. The offeror shall provide supporting documentation for all proposed rates, including payroll records, collective bargaining agreements, or other documentation as appropriate.\n\nL.7.4 The offeror shall describe its pricing methodology and explain any assumptions used in developing its price proposal.\n\nL.7.5 The offeror shall explain any discounts offered to the Government and the basis for those discounts.\n\nL.7.6 For Time and Materials labor categories, the offeror shall provide the following information:\n   L.7.6.1 A breakdown of the components of each fully-loaded hourly rate\n   L.7.6.2 The basis for the proposed direct labor rates\n   L.7.6.3 The escalation factors used for option periods\n\nL.7.7 The offeror shall acknowledge that its price proposal is predicated upon compliance with all terms and conditions of the solicitation without exception.\n\nL.7.8 The Government will evaluate price proposals for reasonableness and realism as described in Section M. Proposals that are unrealistically low or high may be considered indicative of a lack of understanding of the requirements and may be evaluated unfavorably.",
    tabCategory: "instructions",
    pageNumber: 30
  },
  {
    sectionId: "instructions-representations",
    title: "L.8 REPRESENTATIONS AND CERTIFICATIONS",
    content: "L.8.1 The offeror shall complete and submit the following representations and certifications:\n\nL.8.1.1 All applicable representations and certifications in the System for Award Management (SAM)\n\nL.8.1.2 FAR 52.204-8, Annual Representations and Certifications\n\nL.8.1.3 FAR 52.204-24, Representation Regarding Certain Telecommunications and Video Surveillance Services or Equipment\n\nL.8.1.4 FAR 52.209-7, Information Regarding Responsibility Matters\n\nL.8.1.5 FAR 52.209-11, Representation by Corporations Regarding Delinquent Tax Liability or a Felony Conviction under any Federal Law\n\nL.8.2 The offeror shall ensure that its representations and certifications in SAM are current, accurate, and complete as of the proposal submission date.\n\nL.8.3 Any representations and certifications not available in SAM must be submitted with the proposal.",
    tabCategory: "instructions",
    pageNumber: 31
  },
  
  // SECTION M - EVALUATION CRITERIA
  {
    sectionId: "eval-overview",
    title: "SECTION M - EVALUATION FACTORS FOR AWARD",
    content: "This section describes the factors and subfactors that will be used to evaluate proposals submitted in response to this solicitation. These factors and subfactors will serve as the standard against which all proposals will be evaluated and are designed to identify the significant matters in the proposals that will be considered in making an award decision.",
    tabCategory: "evaluation",
    pageNumber: 32
  },
  {
    sectionId: "eval-basis-award",
    title: "M.1 BASIS FOR AWARD",
    content: "M.1.1 The Government intends to award a contract resulting from this solicitation to the responsible offeror whose proposal represents the best value to the Government, considering price and non-price factors. The Government will employ a trade-off process to determine the proposal that provides the best value to the Government.\n\nM.1.2 The Government may award a contract without discussions with offerors. Therefore, offerors are encouraged to submit their best terms in their initial proposal submissions.\n\nM.1.3 The Government reserves the right to conduct discussions if the Contracting Officer determines them to be necessary. If discussions are conducted, the Government will request final proposal revisions at the conclusion of discussions.",
    tabCategory: "evaluation",
    pageNumber: 32
  },
  {
    sectionId: "eval-factors",
    title: "M.2 EVALUATION FACTORS",
    content: "Proposals will be evaluated based on the following factors:\n\nFactor 1: Technical Approach\nFactor 2: Management Approach\nFactor 3: Past Performance\nFactor 4: Price\n\nThe non-price factors, when combined, are significantly more important than price. Among the non-price factors, Technical Approach is the most important, followed by Management Approach and then Past Performance. As the non-price factors become more equal, price will become more important in the best value decision.",
    tabCategory: "evaluation",
    pageNumber: 32
  },
  {
    sectionId: "eval-factor1-technical",
    title: "M.3 FACTOR 1: TECHNICAL APPROACH",
    content: "The Technical Approach factor will be evaluated based on the following subfactors:\n\nM.3.1 Understanding of Requirements: The Government will evaluate the extent to which the offeror demonstrates a clear and comprehensive understanding of the requirements specified in the Performance Work Statement (PWS). The evaluation will consider the offeror's ability to identify critical issues, challenges, and risks associated with the requirements.\n\nM.3.2 Technical Solution: The Government will evaluate the soundness, effectiveness, efficiency, and feasibility of the offeror's approach to performing the requirements. The evaluation will consider the extent to which the proposed solution addresses all requirements in the PWS and the likelihood that the approach will result in successful contract performance.\n\nM.3.3 Quality Control: The Government will evaluate the offeror's approach to ensuring the quality of services provided under the contract. The evaluation will consider the effectiveness of the proposed quality control plan, including methods for identifying and preventing deficiencies, procedures for inspecting and correcting work, and measures for ensuring continuous improvement.\n\nM.3.4 Transition Plan: The Government will evaluate the offeror's approach to assuming full responsibility for contract performance with minimal disruption to USDOF operations. The evaluation will consider the comprehensiveness, realism, and effectiveness of the proposed transition plan, including staffing, training, phase-in procedures, risk management, and communication strategies.\n\nM.3.5 Innovation and Process Improvement: The Government will evaluate the offeror's proposed innovative approaches, methodologies, or technologies to improve the efficiency and effectiveness of administrative support services. The evaluation will consider the potential benefits to the USDOF and the feasibility of implementing the proposed innovations.",
    tabCategory: "evaluation",
    pageNumber: 33
  },
  {
    sectionId: "eval-factor2-management",
    title: "M.4 FACTOR 2: MANAGEMENT APPROACH",
    content: "The Management Approach factor will be evaluated based on the following subfactors:\n\nM.4.1 Management Plan: The Government will evaluate the offeror's overall management approach, including organizational structure, lines of authority, communication channels, and decision-making processes. The evaluation will consider the extent to which the management approach will ensure effective and efficient performance of all contract requirements.\n\nM.4.2 Staffing Plan: The Government will evaluate the offeror's approach to recruiting, hiring, training, and retaining qualified personnel. The evaluation will consider the adequacy of the proposed staffing levels, the qualifications and availability of proposed personnel, and the extent to which the staffing approach will ensure adequate coverage at all USDOF locations.\n\nM.4.3 Key Personnel: The Government will evaluate the qualifications, experience, and education of proposed key personnel. The evaluation will consider the extent to which key personnel possess the skills, knowledge, and expertise necessary to perform their assigned roles and responsibilities effectively.\n\nM.4.4 Training and Development: The Government will evaluate the offeror's approach to training and developing personnel. The evaluation will consider the comprehensiveness and effectiveness of the proposed training program, including initial training, ongoing professional development, and specialized training for specific tasks or functions.",
    tabCategory: "evaluation",
    pageNumber: 34
  },
  {
    sectionId: "eval-factor3-past-performance",
    title: "M.5 FACTOR 3: PAST PERFORMANCE",
    content: "M.5.1 The Government will evaluate the offeror's past performance to determine the probability of successful accomplishment of the required effort. The evaluation will consider the offeror's demonstrated record of contract compliance, customer satisfaction, and successful performance of contracts similar in scope, magnitude, and complexity to the current requirement.\n\nM.5.2 The Government will consider information provided by the offeror, past performance questionnaires, information available in Government databases, and information obtained from other sources. The evaluation will consider both the relevance of past performance references and the quality of performance on those contracts.\n\nM.5.3 The relevance of past performance will be assessed based on the similarity of scope, magnitude, and complexity to the current requirement. Contracts that are more similar to the current requirement will be given greater consideration in the evaluation.\n\nM.5.4 The quality of performance will be assessed based on the offeror's demonstrated ability to:\n   M.5.4.1 Perform in accordance with contract requirements\n   M.5.4.2 Manage and resolve problems effectively\n   M.5.4.3 Maintain positive customer relationships\n   M.5.4.4 Demonstrate cost control and schedule adherence\n   M.5.4.5 Apply technical expertise and innovative approaches\n\nM.5.5 The Government will assign one of the following ratings to the Past Performance factor:\n   - Exceptional: High confidence in successful performance\n   - Very Good: Significant confidence in successful performance\n   - Satisfactory: Reasonable confidence in successful performance\n   - Neutral: No confidence assessment available (lack of relevant past performance)\n   - Marginal: Low confidence in successful performance\n   - Unsatisfactory: No confidence in successful performance\n\nM.5.6 Offerors with no relevant past performance will receive a \"Neutral\" rating, which is neither favorable nor unfavorable.",
    tabCategory: "evaluation",
    pageNumber: 35
  },
  {
    sectionId: "eval-factor4-price",
    title: "M.6 FACTOR 4: PRICE",
    content: "M.6.1 The Government will evaluate price proposals for reasonableness and realism as follows:\n\nM.6.1.1 Price Reasonableness: The Government will evaluate whether the offeror's proposed prices are reasonable, i.e., not excessive compared to current market conditions or the Government's estimate. Techniques for determining price reasonableness may include comparison with other offers, comparison with the Independent Government Cost Estimate (IGCE), comparison with historical prices, and analysis of proposed cost elements.\n\nM.6.1.2 Price Realism: The Government will evaluate whether the offeror's proposed prices are realistic, i.e., not understated for the work to be performed. This analysis is not a cost realism analysis as described in FAR 15.404-1(d) but is an assessment of whether proposed prices are consistent with the offeror's technical approach and demonstrate a clear understanding of the requirements. Techniques for determining price realism may include comparison with the IGCE, verification of proposed labor rates against market data, and evaluation of proposed hours against the level of effort required.\n\nM.6.2 The Government will calculate the total evaluated price based on the offeror's proposed fully-loaded hourly rates applied to the estimated quantities of hours specified in the Price Proposal Worksheet (Attachment 3) for the base period and all option periods.\n\nM.6.3 The Government will evaluate price proposals to identify any unbalanced pricing. Unbalanced pricing exists when, despite an acceptable total evaluated price, the price of one or more contract line items is significantly overstated or understated. Proposals with unbalanced pricing may be rejected if the Contracting Officer determines that the lack of balance poses an unacceptable risk to the Government.\n\nM.6.4 The Government may reject any proposal that is materially unbalanced or unrealistically low such that it may reasonably conclude the offeror does not understand the requirement, has made a mistake, or will not be able to perform without an unacceptable risk to the Government.",
    tabCategory: "evaluation",
    pageNumber: 36
  },
  {
    sectionId: "eval-ratings",
    title: "M.7 EVALUATION RATINGS",
    content: "M.7.1 The Government will assign adjectival ratings to the Technical Approach and Management Approach factors using the following scale:\n\nOutstanding: Proposal exceeds requirements and indicates an exceptional approach and understanding of the requirements. Strengths far outweigh any weaknesses. Risk of unsuccessful performance is very low.\n\nGood: Proposal exceeds requirements and indicates a thorough approach and understanding of the requirements. Strengths outweigh weaknesses. Risk of unsuccessful performance is low.\n\nAcceptable: Proposal meets requirements and indicates an adequate approach and understanding of the requirements. Strengths and weaknesses are offsetting or will have little or no impact on contract performance. Risk of unsuccessful performance is no worse than moderate.\n\nMarginal: Proposal does not clearly meet requirements and has not demonstrated an adequate approach and understanding of the requirements. Weaknesses outweigh strengths. Risk of unsuccessful performance is high.\n\nUnacceptable: Proposal does not meet requirements and contains one or more deficiencies. Proposal is unawardable.\n\nM.7.2 For the Past Performance factor, the Government will assign ratings as described in Section M.5.5.\n\nM.7.3 Price will not receive an adjectival rating but will be evaluated for reasonableness and realism as described in Section M.6.",
    tabCategory: "evaluation",
    pageNumber: 37
  }
];

// Sample outline structure for the outline generation feature
export const documentOutline: OutlineItem[] = [
  {
    title: "1. Executive Summary",
    children: [
      { title: "1.1 Company Overview" },
      { title: "1.2 Understanding of Requirements" },
      { title: "1.3 Key Differentiators" }
    ],
  },
  {
    title: "2. Technical Approach",
    children: [
      { title: "2.1 Understanding of USDOF Mission and Requirements" },
      { title: "2.2 Administrative Support Methodology" },
      { 
        title: "2.3 Specific Approaches by Service Area",
        children: [
          { title: "2.3.1 Executive Administrative Support" },
          { title: "2.3.2 Office Management Services" },
          { title: "2.3.3 Meeting and Event Coordination" },
          { title: "2.3.4 Document Management and Processing" },
          { title: "2.3.5 Travel Arrangement and Management" },
          { title: "2.3.6 Correspondence Management" },
          { title: "2.3.7 Records Management" }
        ]
      },
      { title: "2.4 Quality Control Plan" },
      { title: "2.5 Innovative Solutions and Process Improvements" }
    ],
  },
  {
    title: "3. Management Approach",
    children: [
      { title: "3.1 Organizational Structure" },
      { title: "3.2 Program Management Office" },
      { title: "3.3 Key Personnel" },
      {
        title: "3.4 Staffing Plan",
        children: [
          { title: "3.4.1 Recruitment and Retention" },
          { title: "3.4.2 Staff Qualifications" },
          { title: "3.4.3 Training and Development" }
        ]
      },
      { title: "3.5 Transition Approach" },
      { title: "3.6 Risk Management" }
    ],
  },
  {
    title: "4. Past Performance",
    children: [
      { title: "4.1 Relevant Contract 1" },
      { title: "4.2 Relevant Contract 2" },
      { title: "4.3 Relevant Contract 3" },
      { title: "4.4 Performance Success Metrics" },
      { title: "4.5 Lessons Learned and Continuous Improvement" }
    ],
  },
  {
    title: "5. Price Proposal",
    children: [
      { title: "5.1 Pricing Methodology" },
      { title: "5.2 Labor Categories and Rates" },
      { title: "5.3 Volume Discounts" },
      { title: "5.4 Cost Savings Strategies" }
    ],
  }
];