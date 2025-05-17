import { FC, useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { rfpContent, DocumentSection } from "@/data/rfp-document";

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
  // Tab state - initialize to current tab or instructions if on full document
  const [selectedEditTab, setSelectedEditTab] = useState(
    activeTab === "fullDocument" ? "instructions" : activeTab
  );
  
  // Track changes that need to be saved
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Refs for DOM manipulation
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isHighlightingRef = useRef(false);
  
  // Initialize showing the current tab sections
  useEffect(() => {
    const tabSections = rfpContent.filter(section => 
      section.tabCategory === selectedEditTab
    );
    
    // Scroll to first section of selected tab
    if (tabSections.length > 0 && contentRef.current) {
      const firstSection = document.getElementById(`edit-section-${tabSections[0].sectionId}`);
      if (firstSection) {
        setTimeout(() => {
          firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [selectedEditTab]);
  
  // Handle tab switch with save confirmation
  const handleTabSwitch = (newTab: string) => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        `Save changes to ${tabNames[selectedEditTab]} section?`
      );
      
      if (confirmed) {
        saveTabChanges(selectedEditTab);
      }
    }
    
    setSelectedEditTab(newTab);
  };
  
  // Save changes for the current tab
  const saveTabChanges = (tab: string) => {
    showSaveNotification(`Changes to ${tabNames[tab]} saved successfully!`);
    setHasUnsavedChanges(false);
  };
  
  // Save all changes and close modal
  const handleSave = () => {
    // Collect all highlighted sections from the DOM
    const highlightedSections: {[sectionId: string]: boolean} = {};
    
    // Find all highlighted elements in the document
    document.querySelectorAll('.highlight-instructions, .highlight-evaluation, .highlight-pws')
      .forEach(el => {
        const sectionId = el.getAttribute('data-section-id');
        if (sectionId) {
          highlightedSections[sectionId] = true;
        }
      });
    
    // Update the main application state
    setSelectedParagraphs(highlightedSections);
    saveChanges();
    
    // Show success notification
    showSaveNotification("All changes saved successfully!");
    
    // Close the modal
    setShowEditModal(false);
  };
  
  // Handle cancel with confirmation
  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm("You have unsaved changes. Close without saving?");
      if (!confirmed) return;
    }
    
    setShowEditModal(false);
  };
  
  // Show save notification
  const showSaveNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 3000);
  };
  
  // Start highlighter mode on mouse down
  const startHighlighting = (e: React.MouseEvent) => {
    isHighlightingRef.current = true;
    
    // Add highlighter cursor to the entire document during highlighting
    document.body.classList.add('highlighter-cursor');
    
    // Show instructions about highlighting
    const target = e.currentTarget as HTMLElement;
    if (target) {
      target.title = "Drag to highlight text";
    }
  };
  
  // Handle text highlighting on mouse up
  const stopHighlighting = (e: React.MouseEvent) => {
    if (!isHighlightingRef.current) return;
    
    // Get the current selection
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      isHighlightingRef.current = false;
      document.body.classList.remove('highlighter-cursor');
      return;
    }
    
    const range = selection.getRangeAt(0);
    
    // Get coordinates for the animation
    const rect = range.getBoundingClientRect();
    
    // Get the section this belongs to
    const target = e.currentTarget as HTMLElement;
    const sectionId = target.dataset.sectionId || "";
    const tabCategory = target.dataset.tabCategory || selectedEditTab;
    
    // Create a highlight span
    const span = document.createElement('span');
    span.className = `highlight-${tabCategory}`;
    span.dataset.sectionId = sectionId;
    
    try {
      // Apply the highlight
      range.surroundContents(span);
      
      // Show an animation to simulate a highlighter
      showHighlighterAnimation(rect);
      
      // Mark as having changes
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error("Failed to highlight text:", error);
    }
    
    // Clear the selection
    selection.removeAllRanges();
    
    // End highlighting mode
    isHighlightingRef.current = false;
    document.body.classList.remove('highlighter-cursor');
  };
  
  // Show highlighter animation effect
  const showHighlighterAnimation = (rect: DOMRect) => {
    const animation = document.createElement('div');
    animation.className = 'selection-animation';
    animation.style.left = `${rect.left}px`;
    animation.style.top = `${rect.top}px`;
    animation.style.width = `${rect.width}px`;
    animation.style.height = `${rect.height}px`;
    
    document.body.appendChild(animation);
    
    // Remove after animation completes
    setTimeout(() => {
      if (document.body.contains(animation)) {
        document.body.removeChild(animation);
      }
    }, 400);
  };
  
  // Remove highlight when clicking on highlighted text
  const handleHighlightClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    if (target.classList && 
        (target.classList.contains('highlight-instructions') || 
         target.classList.contains('highlight-evaluation') || 
         target.classList.contains('highlight-pws'))) {
      
      const parent = target.parentNode;
      if (parent) {
        // Replace highlight with plain text
        const text = target.textContent || '';
        const textNode = document.createTextNode(text);
        parent.replaceChild(textNode, target);
        
        // Mark as having changes
        setHasUnsavedChanges(true);
      }
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Header with instructions and tabs */}
        <div className="border-b border-gray-200">
          <div className="flex px-6 py-3 justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Edit Selections</h2>
              <div className="text-sm text-gray-600 mt-1 flex items-center">
                <div className="flex items-center bg-yellow-100 border border-yellow-300 rounded px-3 py-1 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="yellow" stroke="#ff9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M9.3 12.4L9.28 20M14.7 12.4L14.72 20M20 8.34L16 4.4L7.6 14.4L8 20L16 20L16.4 14.4L20 8.34z"/>
                  </svg>
                  <span>Drag to highlight text. Click on highlighted text to remove.</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tab navigation */}
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

        {/* Document content area - showing ALL sections */}
        <div 
          ref={contentRef}
          className="overflow-y-auto flex-1 p-6 custom-scrollbar"
        >
          <div className="space-y-8">
            {/* Show ALL RFP content, regardless of tab */}
            {rfpContent.map((section) => {
              // Check if section belongs to current tab
              const isCurrentTabSection = section.tabCategory === selectedEditTab;
              
              return (
                <div
                  key={section.sectionId}
                  id={`edit-section-${section.sectionId}`}
                  className={cn(
                    "p-4 border rounded",
                    isCurrentTabSection 
                      ? "border-2 border-gray-300" 
                      : "border border-gray-200 opacity-90"
                  )}
                >
                  <h3 className={`font-bold mb-2 uppercase ${isCurrentTabSection ? 'text-gray-900' : 'text-gray-600'}`}>
                    {section.title}
                    {isCurrentTabSection && 
                      <span className="ml-2 text-xs font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Current Tab Section
                      </span>
                    }
                  </h3>
                  
                  {/* Editable content with highlighter */}
                  <div 
                    className="text-sm editable-document mt-4" 
                    onMouseDown={startHighlighting}
                    onMouseUp={stopHighlighting}
                    onClick={handleHighlightClick}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    spellCheck="false"
                    onInput={(e) => e.preventDefault()} // Prevent actual editing
                    data-section-id={section.sectionId}
                    data-tab-category={section.tabCategory}
                  >
                    {section.content.split("\n").map((paragraph, pIdx) => (
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

        {/* Footer with action buttons */}
        <div className="border-t border-gray-200 p-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="yellow" stroke="#ff9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1">
              <path d="M9.3 12.4L9.28 20M14.7 12.4L14.72 20M20 8.34L16 4.4L7.6 14.4L8 20L16 20L16.4 14.4L20 8.34z"/>
            </svg>
            Use the highlighter to select text. Click highlighted text to remove it.
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