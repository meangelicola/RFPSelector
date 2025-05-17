import { useState, useCallback } from 'react';
import { rfpContent, documentOutline, OutlineItem } from '@/data/rfp-document';

export const useDocumentViewer = () => {
  const [highlightedSections, setHighlightedSections] = useState<{ [key: string]: boolean }>({});
  const [generatedOutline, setGeneratedOutline] = useState<OutlineItem[]>([]);
  
  // When the active tab changes, automatically highlight relevant sections
  const updateHighlightsForTab = useCallback((tabId: string) => {
    if (tabId === 'fullDocument') {
      // Clear all highlights for the full document view
      setHighlightedSections({});
      return;
    }
    
    // For specific tabs, automatically highlight the relevant sections
    const newHighlights: { [key: string]: boolean } = {};
    rfpContent.forEach(section => {
      if (section.tabCategory === tabId) {
        newHighlights[section.sectionId] = true;
      }
    });
    
    setHighlightedSections(newHighlights);
  }, []);
  
  // Generate an outline based on highlighted sections
  const generateOutline = useCallback(() => {
    // Get all highlighted sections
    const highlightedContent = rfpContent.filter(
      section => highlightedSections[section.sectionId]
    );
    
    // For this prototype, we'll just return the sample outline
    // In a real implementation, this would process the highlighted sections
    // to generate a meaningful outline
    setGeneratedOutline(documentOutline);
    
    return documentOutline;
  }, [highlightedSections]);
  
  // Save changes to highlighted sections
  const saveChanges = useCallback(() => {
    // In a real implementation, this would save the changes to a database
    // For now, we'll just log that changes were saved
    console.log('Changes saved:', highlightedSections);
    
    // Generate a new outline based on the saved highlights
    generateOutline();
  }, [highlightedSections, generateOutline]);
  
  return {
    highlightedSections,
    setHighlightedSections,
    updateHighlightsForTab,
    generateOutline,
    generatedOutline,
    saveChanges,
  };
};