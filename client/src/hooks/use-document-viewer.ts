import { useState, useCallback, useMemo } from "react";
import { rfpContent, documentOutline } from "@/data/rfp-document";

export const useDocumentViewer = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("fullDocument");
  
  // State for edit mode
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  
  // State for PDF navigation
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 5; // Assuming 5 pages for this mock RFP
  
  // State for section highlighting
  const [highlightedSections, setHighlightedSections] = useState<{ [key: string]: boolean }>({});
  
  // State for hovered section
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  
  // State for modals
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showOutlineModal, setShowOutlineModal] = useState<boolean>(false);
  
  // State for zoom level
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  
  // State for selected paragraphs in edit mode
  const [selectedParagraphs, setSelectedParagraphs] = useState<{ [key: string]: boolean }>({});
  
  // Initialize highlighting when active tab changes
  useMemo(() => {
    if (activeTab === "fullDocument") {
      setHighlightedSections({});
      return;
    }
    
    // Find sections that match the active tab
    const sectionsToHighlight = rfpContent.filter(
      (section) => section.tabCategory === activeTab
    );
    
    // Create a new highlighted sections object
    const newHighlightedSections: { [key: string]: boolean } = {};
    sectionsToHighlight.forEach((section) => {
      newHighlightedSections[section.sectionId] = true;
    });
    
    setHighlightedSections(newHighlightedSections);
    
    // Also initialize paragraph highlighting
    const newSelectedParagraphs: { [key: string]: boolean } = {};
    sectionsToHighlight.forEach((section) => {
      const paragraphs = section.content.split("\n");
      paragraphs.forEach((_, index) => {
        const paragraphId = `${section.sectionId}-p-${index}`;
        newSelectedParagraphs[paragraphId] = true;
      });
    });
    
    setSelectedParagraphs(newSelectedParagraphs);
    
    // Scroll to the first highlighted section
    if (sectionsToHighlight.length > 0) {
      const firstSection = sectionsToHighlight[0];
      setCurrentPage(firstSection.pageNumber);
    }
  }, [activeTab]);
  
  // Save changes function
  const saveChanges = useCallback(() => {
    // In a real app, this would call an API to save the changes
    setIsEditMode(false);
    
    // For now, we'll just close the modal
    setShowEditModal(false);
  }, []);
  
  // Generate outline function
  const generateOutline = useCallback(() => {
    // In a real app, this would generate an outline from the document
    // For now, we'll just show the predefined outline
    setShowOutlineModal(true);
  }, []);
  
  // Access to the document outline
  const outline = documentOutline;
  
  return {
    activeTab,
    setActiveTab,
    isEditMode,
    setIsEditMode,
    currentPage,
    setCurrentPage,
    totalPages,
    highlightedSections,
    setHighlightedSections,
    hoveredSection,
    setHoveredSection,
    showEditModal,
    setShowEditModal,
    showOutlineModal,
    setShowOutlineModal,
    zoomLevel,
    setZoomLevel,
    saveChanges,
    generateOutline,
    selectedParagraphs,
    setSelectedParagraphs,
    outline
  };
};
