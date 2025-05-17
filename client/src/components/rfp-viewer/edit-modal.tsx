import { FC, useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { rfpContent, DocumentSection } from "@/data/rfp-document";

// Define interface for character-level selection
interface CharacterSelection {
  sectionId: string;
  startIndex: number;
  endIndex: number;
  text: string;
}

interface EditModalProps {
  activeTab: string;
  setShowEditModal: (show: boolean) => void;
  selectedParagraphs: { [key: string]: boolean };
  setSelectedParagraphs: (paragraphs: { [key: string]: boolean }) => void;
  saveChanges: () => void;
}

// Tab names for user-friendly display
const tabNames: Record<string, string> = {
  'instructions': 'Instructions to Offeror',
  'evaluation': 'Evaluation Criteria',
  'pws': 'Performance Work Statement'
};

const EditModal: FC<EditModalProps> = ({
  activeTab,
  setShowEditModal,
  selectedParagraphs,
  setSelectedParagraphs,
  saveChanges,
}) => {
  // Initialize to the current active tab, defaulting to instructions if fullDocument is selected
  const [selectedEditTab, setSelectedEditTab] = useState(activeTab === "fullDocument" ? "instructions" : activeTab);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Store selections by tab to maintain separate highlighting state for each tab
  const [selectionsByTab, setSelectionsByTab] = useState<{
    [tab: string]: CharacterSelection[]
  }>({
    'instructions': [],
    'evaluation': [],
    'pws': []
  });
  
  // Refs for tracking and manipulating DOM elements
  const prevTabRef = useRef(selectedEditTab);
  const modalContentRef = useRef<HTMLDivElement>(null);
  
  // Include all RFP content in every tab
  // We'll show all sections but highlight only those relevant to the current tab
  const allContent = rfpContent;
  
  // Auto-scroll to first highlighted section when modal opens or tab changes
  useEffect(() => {
    const scrollToFirstHighlight = () => {
      if (modalContentRef.current) {
        // Find the first section that belongs to this tab
        const tabSections = rfpContent.filter(section => section.tabCategory === selectedEditTab);
        
        if (tabSections.length > 0) {
          const firstSectionId = tabSections[0].sectionId;
          const sectionElement = modalContentRef.current.querySelector(`#section-${firstSectionId}`);
          
          if (sectionElement) {
            // Scroll to the section element with a bit of offset for better visibility
            setTimeout(() => {
              sectionElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
              });
            }, 100);
          }
        }
      }
    };
    
    scrollToFirstHighlight();
  }, [selectedEditTab]);
  
  // Create visual animation for text selection that resembles word processor behavior
  const showSelectionAnimation = (rect: DOMRect) => {
    // Create animation element
    const animation = document.createElement('div');
    animation.className = 'selection-animation';
    animation.style.position = 'absolute';
    animation.style.left = `${rect.left}px`;
    animation.style.top = `${rect.top}px`;
    animation.style.width = `${rect.width}px`;
    animation.style.height = `${rect.height}px`;
    animation.style.backgroundColor = 'rgba(65, 105, 225, 0.2)';
    animation.style.border = '3px solid #007bff';
    animation.style.borderRadius = '2px';
    animation.style.pointerEvents = 'none';
    animation.style.zIndex = '9999';
    animation.style.boxShadow = '0 0 8px rgba(65, 105, 225, 0.4)';
    
    // Add to document
    document.body.appendChild(animation);
    
    // Animate with transition
    animation.animate([
      { opacity: 1, transform: 'scale(1.05)' },
      { opacity: 0.7, transform: 'scale(1.02)' },
      { opacity: 0, transform: 'scale(1)' }
    ], {
      duration: 500,
      easing: 'ease-out'
    }).onfinish = () => {
      if (document.body.contains(animation)) {
        document.body.removeChild(animation);
      }
    };
  };
  
  // Handle text highlighting like a physical highlighter
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    
    const range = selection.getRangeAt(0);
    
    // Get selection coordinates for visual feedback
    const rect = range.getBoundingClientRect();
    
    const startNode = range.startContainer;
    const startContainer = startNode.parentElement;
    
    if (!startContainer) return;
    
    // Extract section ID from the parent container
    const sectionDiv = startContainer.closest('[data-section-id]');
    if (!sectionDiv) return;
    
    const sectionId = sectionDiv.getAttribute('data-section-id');
    if (!sectionId) return;
    
    // Get the tab category from the parent container for proper color assignment
    const sectionTabCategory = sectionDiv.getAttribute('data-tab-category') || selectedEditTab;
    
    // Get the selected text
    const selectedText = selection.toString();
    if (!selectedText.trim()) return;
    
    // Find the content element to calculate offsets
    const contentElement = sectionDiv.querySelector('.section-content');
    if (!contentElement) return;
    
    // Create a new selection record 
    const newSelection: CharacterSelection = {
      sectionId,
      startIndex: getTextNodeOffset(range.startContainer, range.startOffset, contentElement),
      endIndex: getTextNodeOffset(range.endContainer, range.endOffset, contentElement),
      text: selectedText
    };
    
    // Track this selection in the appropriate tab's state
    setSelectionsByTab(prev => {
      // Get correct tab category to store this highlight under
      const tabKey = sectionTabCategory;
      
      return {
        ...prev,
        [tabKey]: [...prev[tabKey], newSelection]
      };
    });
    
    setHasUnsavedChanges(true);
    
    // Apply visual highlighting with the color for the section's original tab
    highlightSelection(range, sectionTabCategory);
    
    // Show visual selection animation like a real highlighter
    showSelectionAnimation(rect);
    
    // Clear the selection to prepare for the next highlighting action
    selection.removeAllRanges();
  }, [selectedEditTab]);
  
  // Calculate text node offset relative to content element
  const getTextNodeOffset = (
    node: Node, 
    offset: number, 
    contentElement: Element
  ) => {
    let totalOffset = offset;
    
    // Get all text nodes preceding this one in the same container
    const walker = document.createTreeWalker(
      contentElement,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    while (walker.nextNode()) {
      if (walker.currentNode === node) {
        break;
      }
      totalOffset += walker.currentNode.textContent?.length || 0;
    }
    
    return totalOffset;
  };
  
  // Apply visual highlighting to selected text like a physical highlighter
  const highlightSelection = (range: Range, category: string) => {
    const span = document.createElement('span');
    span.className = `custom-highlight-${category}`;
    
    try {
      // Apply the highlight
      range.surroundContents(span);
      
      // Apply a transition effect for the highlight
      span.style.transition = "background-color 0.3s ease";
      span.style.backgroundColor = "rgba(255, 255, 0, 0.6)";
      
      // Fade to the actual highlight color
      setTimeout(() => {
        span.style.backgroundColor = "";
      }, 300);
    } catch (e) {
      console.error('Cannot highlight selection:', e);
      handleComplexSelection(range, category);
    }
  };
  
  // Handle complex selections that span multiple nodes
  const handleComplexSelection = (range: Range, category: string) => {
    try {
      const startNode = range.startContainer;
      const endNode = range.endContainer;
      const startOffset = range.startOffset;
      const endOffset = range.endOffset;
      
      if (startNode === endNode && startNode.nodeType === Node.TEXT_NODE) {
        // Simple case: selection within a single text node
        const span = document.createElement('span');
        span.className = `highlight-${category}`;
        
        const newRange = document.createRange();
        newRange.setStart(startNode, startOffset);
        newRange.setEnd(startNode, endOffset);
        newRange.surroundContents(span);
      } else {
        console.log("Complex selection across multiple nodes not supported");
      }
    } catch (e) {
      console.error("Failed to handle complex selection:", e);
    }
  };
  
  // Show save confirmation notification
  const showSaveConfirmation = (tabName: string) => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.textContent = `Changes to ${tabName} saved successfully!`;
    
    document.body.appendChild(notification);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.add('fade');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 3000);
  };
  
  // Handle tab switching with confirmation for unsaved changes
  const handleTabSwitch = (newTab: string) => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(`Save your changes to the ${tabNames[selectedEditTab]} section?`);
      
      if (confirmed) {
        // Save the current tab changes
        handleSaveTab(selectedEditTab);
      } else {
        // Discard changes
        resetTabChanges(selectedEditTab);
      }
    }
    
    // Switch to the new tab
    prevTabRef.current = selectedEditTab;
    setSelectedEditTab(newTab);
    
    // Auto-scroll to first highlighted section after tab change
    setTimeout(() => {
      const firstHighlight = modalContentRef.current?.querySelector(`.highlight-${newTab}`);
      if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };
  
  // Reset changes for a specific tab
  const resetTabChanges = (tab: string) => {
    // Reset selections for current tab
    setSelectionsByTab(prev => ({
      ...prev,
      [tab]: []
    }));
    
    // Reset highlights in DOM
    document.querySelectorAll(`.highlight-${tab}`).forEach(el => {
      const parent = el.parentNode;
      if (parent) {
        const text = el.textContent || '';
        const textNode = document.createTextNode(text);
        parent.replaceChild(textNode, el);
      }
    });
    
    setHasUnsavedChanges(false);
  };
  
  // Save changes for the specified tab
  const handleSaveTab = (tab: string) => {
    // Store selections for tab
    setHasUnsavedChanges(false);
    
    // Display success message
    showSaveConfirmation(tabNames[tab]);
  };
  
  // Handle cancel button click
  const handleCancel = () => {
    // Confirm if there are unsaved changes
    if (hasUnsavedChanges) {
      const confirmed = window.confirm("You have unsaved changes. Are you sure you want to exit without saving?");
      if (!confirmed) {
        return;
      }
    }
    setShowEditModal(false);
  };

  // Handle save button click
  const handleSave = () => {
    // Convert all selections to paragraph highlights
    const paragraphSelections: { [key: string]: boolean } = {};
    
    // Combine selections from all tabs
    Object.values(selectionsByTab).flat().forEach(selection => {
      paragraphSelections[selection.sectionId] = true;
    });
    
    setSelectedParagraphs(paragraphSelections);
    saveChanges();
    setShowEditModal(false);
    
    // Success message
    showSaveConfirmation("All document sections");
  };

  // Remove highlighted text when clicking on it
  const handleHighlightClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains(`highlight-${selectedEditTab}`)) {
      const parent = target.parentNode;
      if (parent) {
        const text = target.textContent || '';
        const textNode = document.createTextNode(text);
        parent.replaceChild(textNode, target);
        setHasUnsavedChanges(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
        {/* Header with tabbed navigation */}
        <div className="border-b border-gray-200">
          <div className="flex px-6 py-3 justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Edit Selections</h2>
              <div className="text-sm text-gray-600 mt-1 flex items-center">
                <span className="mr-2">Use highlighter to select text:</span>
                <div className="flex items-center bg-yellow-100 border border-yellow-300 rounded px-3 py-1 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M9.3 12.4L9.28 20M14.7 12.4L14.72 20M20 8.34L16 4.4L7.6 14.4L8 20L16 20L16.4 14.4L20 8.34z"/>
                  </svg>
                  <span>Select text to highlight. Click highlighted text to remove.</span>
                </div>
              </div>
            </div>
            <div className="text-sm bg-blue-50 px-3 py-1 rounded border border-blue-200">
              <span className="font-medium">{selectionsByTab[selectedEditTab].length}</span> selection{selectionsByTab[selectedEditTab].length !== 1 ? 's' : ''} made
            </div>
          </div>
          
          {/* Edit tabs */}
          <div className="flex px-6">
            <button
              className={cn(
                "px-5 py-3 text-sm font-medium transition-colors tab-instructions",
                selectedEditTab === "instructions" ? "active-tab-instructions" : "text-gray-600"
              )}
              onClick={() => handleTabSwitch("instructions")}
            >
              Instructions to Offeror
            </button>
            <button
              className={cn(
                "px-5 py-3 text-sm font-medium transition-colors tab-evaluation",
                selectedEditTab === "evaluation" ? "active-tab-evaluation" : "text-gray-600"
              )}
              onClick={() => handleTabSwitch("evaluation")}
            >
              Evaluation Criteria
            </button>
            <button
              className={cn(
                "px-5 py-3 text-sm font-medium transition-colors tab-pws",
                selectedEditTab === "pws" ? "active-tab-pws" : "text-gray-600"
              )}
              onClick={() => handleTabSwitch("pws")}
            >
              Performance Work Statement
            </button>
          </div>
        </div>

        {/* Document content with character-level selection */}
        <div 
          ref={modalContentRef}
          className="overflow-y-auto flex-1 p-6 custom-scrollbar"
        >
          <div className="space-y-8">
            {rfpContent.map((section: DocumentSection) => {
              // Determine if this section belongs to the current tab
              const isCurrentTabSection = section.tabCategory === selectedEditTab;
              
              return (
                <div
                  key={section.sectionId}
                  data-section-id={section.sectionId}
                  data-tab-category={section.tabCategory}
                  className={`p-4 border rounded ${isCurrentTabSection ? 'border-2 border-gray-300' : 'border border-gray-200'}`}
                  id={`section-${section.sectionId}`}
                >
                  <h3 className={`font-bold mb-4 uppercase ${isCurrentTabSection ? 'text-gray-900' : 'text-gray-600'}`}>
                    {section.title}
                    {isCurrentTabSection && 
                      <span className="ml-2 text-xs font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Current Tab Section
                      </span>
                    }
                  </h3>
                  <div 
                    className="text-sm section-content editable-document" 
                    onMouseDown={(e) => {
                      // Set cursor to highlighter
                      const target = e.currentTarget;
                      target.style.cursor = 'url(data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%23ffff00" stroke-width="2"><path d="M9.3 12.4L9.28 20M14.7 12.4L14.72 20M20 8.34L16 4.4L7.6 14.4L8 20L16 20L16.4 14.4L20 8.34z"/></svg>), auto';
                    }}
                    onMouseUp={handleTextSelection}
                    onClick={handleHighlightClick}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    spellCheck={false}
                    onInput={(e) => e.preventDefault()} // Prevent actual editing
                    style={{
                      cursor: 'text',
                      caretColor: 'blue',
                      caretShape: 'bar'
                    }}
                  >
                    {section.content.split("\n").map((paragraph: string, pIdx: number) => (
                      <div key={`${section.sectionId}-p-${pIdx}`} className="mb-3">
                        {paragraph}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer with save and cancel buttons */}
        <div className="border-t border-gray-200 p-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Select specific text by highlighting it. Click on highlighted text to remove the highlight.
          </div>
          <div className="space-x-3">
            <button
              className="px-4 py-2 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 border-2 border-red-500 font-bold"
              onClick={handleSave}
              style={{ 
                boxShadow: "0 0 5px rgba(255, 0, 0, 0.5)",
                padding: "8px 16px",
              }}
            >
              Save Selections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;