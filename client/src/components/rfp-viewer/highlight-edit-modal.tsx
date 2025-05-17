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
  const [selectedEditTab, setSelectedEditTab] = useState(
    activeTab === "fullDocument" ? "instructions" : activeTab
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Refs for DOM manipulation
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Track if we're in highlighting mode
  const [isHighlighting, setIsHighlighting] = useState(false);
  
  // Initialize with current highlighted sections
  useEffect(() => {
    // Highlight existing sections
    if (contentRef.current) {
      // Clear existing highlights first (to avoid duplicates)
      const highlights = contentRef.current.querySelectorAll('.highlight-instructions, .highlight-evaluation, .highlight-pws');
      highlights.forEach(el => {
        const parent = el.parentNode;
        if (parent) {
          const text = el.textContent || '';
          const textNode = document.createTextNode(text);
          parent.replaceChild(textNode, el);
        }
      });
      
      // Apply highlights based on selectedParagraphs
      Object.keys(selectedParagraphs).forEach(sectionId => {
        if (selectedParagraphs[sectionId]) {
          const section = rfpContent.find(s => s.sectionId === sectionId);
          if (section) {
            const sectionElement = document.getElementById(`edit-section-${sectionId}`);
            if (sectionElement) {
              const contentElement = sectionElement.querySelector('.editable-document');
              if (contentElement && contentElement.firstChild) {
                // Create highlight for first paragraph
                const firstParagraph = contentElement.firstChild as HTMLElement;
                if (firstParagraph && firstParagraph.textContent) {
                  // Get the text
                  const text = firstParagraph.textContent;
                  
                  // Create a highlight span
                  const span = document.createElement('span');
                  span.className = `highlight-${section.tabCategory}`;
                  span.dataset.sectionId = sectionId;
                  span.textContent = text;
                  
                  // Replace text with highlighted version
                  firstParagraph.textContent = '';
                  firstParagraph.appendChild(span);
                  
                  // Mark section as highlighted
                  markSectionHighlighted(sectionId);
                }
              }
            }
          }
        }
      });
    }
    
    // Scroll to first section of selected tab after a short delay
    setTimeout(() => {
      const tabSections = rfpContent.filter(section => 
        section.tabCategory === selectedEditTab
      );
      
      if (tabSections.length > 0 && contentRef.current) {
        const firstSection = document.getElementById(`edit-section-${tabSections[0].sectionId}`);
        if (firstSection) {
          firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
  }, [selectedEditTab, selectedParagraphs]);
  
  // Handle tab switch with save prompt if needed
  const handleTabSwitch = (newTab: string) => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        `Save changes to ${tabNames[selectedEditTab]} section?`
      );
      
      if (!confirmed) {
        // Discard changes
        setHasUnsavedChanges(false);
      }
    }
    
    setSelectedEditTab(newTab);
  };
  
  // Start text selection
  const startSelecting = (e: React.MouseEvent) => {
    // Change cursor to highlighter style
    document.body.classList.add('highlighter-cursor');
    setIsHighlighting(true);
  };
  
  // Apply highlight to selected text
  const applyHighlight = (e: React.MouseEvent) => {
    // Only proceed if we started highlighting
    if (!isHighlighting) return;
    
    // Get current selection
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.toString().trim() === '') {
      document.body.classList.remove('highlighter-cursor');
      setIsHighlighting(false);
      return;
    }
    
    // Get the section this text belongs to
    const target = e.currentTarget as HTMLElement;
    const sectionId = target.dataset.sectionId || "";
    
    try {
      // Get selected range
      const range = selection.getRangeAt(0);
      
      // Create span element with appropriate class for this tab
      const span = document.createElement('span');
      span.className = `highlight-${selectedEditTab}`;
      span.dataset.sectionId = sectionId;
      
      // Apply the highlight by surrounding the selected text
      range.surroundContents(span);
      
      // Show highlight animation
      const rect = range.getBoundingClientRect();
      addHighlightAnimation(rect);
      
      // Mark this section as highlighted
      markSectionHighlighted(sectionId);
      
      // Mark that we have unsaved changes
      setHasUnsavedChanges(true);
      
    } catch (error) {
      console.error('Failed to highlight selection:', error);
      
      // Try alternative approach for complex selections
      try {
        const text = selection.toString();
        const span = document.createElement('span');
        span.className = `highlight-${selectedEditTab}`;
        span.dataset.sectionId = sectionId;
        span.textContent = text;
        
        // Delete range contents and insert our span
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);
        
        // Mark section as highlighted
        markSectionHighlighted(sectionId);
        setHasUnsavedChanges(true);
        
      } catch (fallbackError) {
        console.error('Even fallback highlighting failed:', fallbackError);
      }
    }
    
    // Clear selection and reset highlighting state
    selection.removeAllRanges();
    document.body.classList.remove('highlighter-cursor');
    setIsHighlighting(false);
  };
  
  // Visual animation for highlighting
  const addHighlightAnimation = (rect: DOMRect) => {
    const animation = document.createElement('div');
    animation.className = 'selection-animation';
    animation.style.position = 'absolute';
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
    }, 500);
  };
  
  // Mark a section as highlighted for tracking
  const markSectionHighlighted = (sectionId: string) => {
    // Find the section in our data
    const section = rfpContent.find(s => s.sectionId === sectionId);
    if (!section) return;
    
    // Get its element 
    const sectionElement = document.getElementById(`edit-section-${sectionId}`);
    if (sectionElement) {
      // Visually mark the section card as highlighted
      sectionElement.classList.add('highlighted-section');
      
      // The actual highlighting is done at the text level
      // This just tracks which sections have highlights
    }
  };
  
  // Remove highlight when clicking on already highlighted text
  const handleHighlightClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check if we clicked on a highlight
    if (target.classList && 
        (target.classList.contains('highlight-instructions') || 
         target.classList.contains('highlight-evaluation') || 
         target.classList.contains('highlight-pws'))) {
      
      const sectionId = target.dataset.sectionId;
      const parent = target.parentNode;
      
      if (parent) {
        // Replace highlight with plain text
        const text = target.textContent || '';
        const textNode = document.createTextNode(text);
        parent.replaceChild(textNode, target);
        
        // Mark we have unsaved changes
        setHasUnsavedChanges(true);
      }
    }
  };
  
  // Cancel without saving
  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmed) return;
    }
    
    setShowEditModal(false);
  };
  
  // Save all changes
  const handleSave = () => {
    // Collect all highlighted sections
    const highlightedSections: {[sectionId: string]: boolean} = {};
    
    // Find all highlight elements in the modal
    if (contentRef.current) {
      const highlightElements = contentRef.current.querySelectorAll('.highlight-instructions, .highlight-evaluation, .highlight-pws');
      
      // Extract section IDs from data attributes
      highlightElements.forEach(el => {
        const sectionId = (el as HTMLElement).dataset.sectionId;
        if (sectionId) {
          highlightedSections[sectionId] = true;
        }
      });
    }
    
    // Update parent component with highlighted sections
    setSelectedParagraphs(highlightedSections);
    saveChanges();
    
    // Show success notification
    showNotification('Changes saved successfully!');
    
    // Close modal
    setShowEditModal(false);
  };
  
  // Show a notification message
  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '9999';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Fade out and remove
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
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Header */}
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

        {/* Document content */}
        <div 
          ref={contentRef}
          className="overflow-y-auto flex-1 p-6 custom-scrollbar"
        >
          <div className="space-y-8">
            {rfpContent.map((section) => {
              // Check if section belongs to current tab
              const isCurrentTabSection = section.tabCategory === selectedEditTab;
              const isHighlighted = selectedParagraphs[section.sectionId];
              
              return (
                <div
                  key={section.sectionId}
                  id={`edit-section-${section.sectionId}`}
                  className={cn(
                    "p-4 border rounded",
                    isCurrentTabSection 
                      ? "border-2 border-gray-300" 
                      : "border border-gray-200 opacity-90",
                    isHighlighted ? "highlighted-section" : ""
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
                  
                  {/* Interactive text content with highlighting */}
                  <div 
                    className="text-sm mt-4 editable-document" 
                    onMouseDown={startSelecting}
                    onMouseUp={applyHighlight}
                    onClick={handleHighlightClick}
                    data-section-id={section.sectionId}
                    data-tab-category={section.tabCategory}
                  >
                    {section.content.split("\n").map((paragraph, pIdx) => (
                      <p key={`${section.sectionId}-p-${pIdx}`} className="mb-3">
                        {paragraph}
                      </p>
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