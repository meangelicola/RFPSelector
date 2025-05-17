import { FC, useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { rfpContent, DocumentSection } from "@/data/rfp-document";

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
  // Tab navigation within the edit modal
  const [selectedEditTab, setSelectedEditTab] = useState(activeTab === "fullDocument" ? "instructions" : activeTab);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selections, setSelections] = useState<CharacterSelection[]>([]);
  
  // Store previous tab for confirmation before switching
  const prevTabRef = useRef(selectedEditTab);
  // Refs for scrolling and content management
  const modalContentRef = useRef<HTMLDivElement>(null);
  
  // Get all document sections for the selected edit tab
  const filteredContent = rfpContent.filter(
    (section) => section.tabCategory === selectedEditTab
  );
  
  // Auto-scroll to first highlighted section when modal opens or tab changes
  useEffect(() => {
    const scrollToFirstHighlight = () => {
      if (modalContentRef.current) {
        setTimeout(() => {
          const highlightClass = `highlight-${selectedEditTab}`;
          const firstHighlight = modalContentRef.current?.querySelector(`.${highlightClass}`);
          
          if (firstHighlight) {
            firstHighlight.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }, 100); // Small delay to ensure DOM is updated
      }
    };
    
    scrollToFirstHighlight();
  }, [selectedEditTab]);
  
  // Show visual animation for selection
  const showSelectionAnimation = (rect: DOMRect) => {
    // Create animation element
    const animation = document.createElement('div');
    animation.className = 'selection-animation';
    animation.style.left = `${rect.left}px`;
    animation.style.top = `${rect.top}px`;
    animation.style.width = `${rect.width}px`;
    animation.style.height = `${rect.height}px`;
    
    // Add to document
    document.body.appendChild(animation);
    
    // Remove after animation completes
    setTimeout(() => {
      if (document.body.contains(animation)) {
        document.body.removeChild(animation);
      }
    }, 400); // Match the animation duration
  };
  
  // Handle character-level selection with improved visual feedback
  const handleTextSelection = () => {
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
    
    // Get the selected text
    const selectedText = selection.toString();
    if (!selectedText.trim()) return;
    
    // Find the content element to calculate offsets
    const contentElement = sectionDiv.querySelector('.section-content');
    if (!contentElement) return;
    
    // Create a new selection
    const newSelection: CharacterSelection = {
      sectionId,
      startIndex: getTextNodeOffset(range.startContainer, range.startOffset, contentElement),
      endIndex: getTextNodeOffset(range.endContainer, range.endOffset, contentElement),
      text: selectedText
    };
    
    // Add selection to the state
    setSelections(prev => [...prev, newSelection]);
    setHasUnsavedChanges(true);
    
    // Apply visual highlighting
    highlightSelection(range, selectedEditTab);
    
    // Show visual selection animation
    showSelectionAnimation(rect);
    
    // Clear the selection
    selection.removeAllRanges();
  };
  
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
  
  // Apply visual highlighting to selected text
  const highlightSelection = (range: Range, category: string) => {
    const span = document.createElement('span');
    span.className = `highlight-${category}`;
    try {
      range.surroundContents(span);
    } catch (e) {
      console.error('Cannot highlight selection:', e);
      // Handle complex selections that span multiple nodes
      handleComplexSelection(range, category);
    }
  };
  
  // Handle complex selections that span multiple nodes
  const handleComplexSelection = (range: Range, category: string) => {
    try {
      // Clone the range to avoid modifying the original
      const clonedRange = range.cloneRange();
      
      // Create a new range for each text node in the selection
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
        // Complex case - fragmenting selection not supported in this prototype
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
      if (window.confirm(`Would you like to save your changes to the ${tabNames[selectedEditTab]} section?`)) {
        // Save the current tab changes
        handleSaveTab();
      } else {
        // Discard changes
        resetTabChanges();
      }
    }
    
    // Switch to the new tab
    prevTabRef.current = selectedEditTab;
    setSelectedEditTab(newTab);
  };
  
  // Reset changes for the current tab
  const resetTabChanges = () => {
    // Reset selections for current tab
    setSelections(prev => prev.filter(s => {
      const section = rfpContent.find(sec => sec.sectionId === s.sectionId);
      return section?.tabCategory !== selectedEditTab;
    }));
    
    // Reset highlights in DOM
    document.querySelectorAll(`.highlight-${selectedEditTab}`).forEach(el => {
      const parent = el.parentNode;
      if (parent) {
        const text = el.textContent || '';
        const textNode = document.createTextNode(text);
        parent.replaceChild(textNode, el);
      }
    });
    
    setHasUnsavedChanges(false);
  };
  
  // Save changes for the current tab
  const handleSaveTab = () => {
    // Store selections for current tab
    setHasUnsavedChanges(false);
    
    // Display success message
    showSaveConfirmation(tabNames[selectedEditTab]);
  };
  
  const handleCancel = () => {
    // Confirm if there are unsaved changes
    if (hasUnsavedChanges) {
      if (!window.confirm("You have unsaved changes. Are you sure you want to exit without saving?")) {
        return;
      }
    }
    setShowEditModal(false);
  };

  const handleSave = () => {
    // Convert selections to paragraph highlights
    const paragraphSelections: { [key: string]: boolean } = {};
    
    // Mark sections with selections
    selections.forEach(selection => {
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
        
        // Update selections state (would need to match based on text content and position)
        // This is simplified for the prototype
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
              <p className="text-sm text-gray-600 mt-1">
                Select text to add to your proposal
              </p>
            </div>
            <div className="text-sm bg-blue-50 px-3 py-1 rounded border border-blue-200">
              <span className="font-medium">{selections.length}</span> selection{selections.length !== 1 ? 's' : ''} made
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

        {/* Section content with improved selection handling */}
        <div 
          ref={modalContentRef}
          className="overflow-y-auto flex-1 p-6 custom-scrollbar"
        >
          <div className="space-y-8">
            {filteredContent.map((section) => (
              <div
                key={section.sectionId}
                data-section-id={section.sectionId}
                className="p-4 border rounded"
              >
                <h3 className="font-bold text-gray-900 mb-4 uppercase">{section.title}</h3>
                <div 
                  className="text-sm section-content editable-document" 
                  onMouseUp={handleTextSelection}
                  onClick={handleHighlightClick}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  spellCheck={false}
                  onInput={(e) => e.preventDefault()} // Prevent actual editing
                >
                  {section.content.split("\n").map((paragraph, pIdx) => (
                    <div key={`${section.sectionId}-p-${pIdx}`} className="mb-3">
                      {paragraph}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with action buttons */}
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
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 border-2 border-red-500"
              onClick={handleSave}
              style={{ 
                boxShadow: "0 0 5px rgba(255, 0, 0, 0.5)",
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