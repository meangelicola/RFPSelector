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
  // State
  const [selectedEditTab, setSelectedEditTab] = useState(
    activeTab === "fullDocument" ? "instructions" : activeTab
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [currentHighlightedSections, setCurrentHighlightedSections] = useState<{[sectionId: string]: boolean}>({
    ...selectedParagraphs
  });
  
  // Refs
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Scroll to active tab section when tab changes
  useEffect(() => {
    const tabSections = rfpContent.filter(section => 
      section.tabCategory === selectedEditTab
    );
    
    if (tabSections.length > 0 && contentRef.current) {
      const firstSection = document.getElementById(`edit-section-${tabSections[0].sectionId}`);
      if (firstSection) {
        setTimeout(() => {
          firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [selectedEditTab]);
  
  // Handle tab switch
  const handleTabSwitch = (newTab: string) => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        `Save changes to ${tabNames[selectedEditTab]} section?`
      );
      
      if (confirmed) {
        // Save current changes
        setHasUnsavedChanges(false);
      }
    }
    
    setSelectedEditTab(newTab);
  };
  
  // Handle section highlighting
  const handleSectionHighlight = (sectionId: string, isHighlighted: boolean) => {
    setCurrentHighlightedSections(prev => ({
      ...prev,
      [sectionId]: isHighlighted
    }));
    
    setHasUnsavedChanges(true);
  };
  
  // Show success message
  const showSuccessMessage = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.add('opacity-0');
      notification.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 3000);
  };
  
  // Save all changes
  const handleSave = () => {
    setSelectedParagraphs(currentHighlightedSections);
    saveChanges();
    showSuccessMessage("Changes saved successfully!");
    setShowEditModal(false);
  };
  
  // Cancel without saving
  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm("You have unsaved changes. Are you sure you want to close?");
      if (!confirmed) return;
    }
    
    setShowEditModal(false);
  };
  
  // This simpler approach uses checkboxes for highlights rather than text selection
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Edit Selections</h2>
            <p className="text-sm text-gray-600 mt-1">
              Select sections to highlight in the document
            </p>
          </div>
          
          {/* Tabs */}
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
        
        {/* Content */}
        <div 
          ref={contentRef}
          className="overflow-y-auto flex-1 p-6 custom-scrollbar"
        >
          <div className="space-y-6">
            {rfpContent.map((section) => {
              const isCurrentTabSection = section.tabCategory === selectedEditTab;
              const isHighlighted = currentHighlightedSections[section.sectionId];
              const highlightClass = isHighlighted ? `highlight-${section.tabCategory}` : '';
              
              return (
                <div
                  key={section.sectionId}
                  id={`edit-section-${section.sectionId}`}
                  className={cn(
                    "border rounded p-4",
                    isCurrentTabSection ? "border-2 border-gray-300" : "border border-gray-200 opacity-90",
                    isHighlighted ? "bg-gray-50" : ""
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <input
                        type="checkbox"
                        id={`section-checkbox-${section.sectionId}`}
                        checked={isHighlighted || false}
                        onChange={(e) => handleSectionHighlight(section.sectionId, e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label 
                        htmlFor={`section-checkbox-${section.sectionId}`}
                        className={`font-bold mb-2 uppercase block ${isCurrentTabSection ? 'text-gray-900' : 'text-gray-600'}`}
                      >
                        {section.title}
                        {isCurrentTabSection && 
                          <span className="ml-2 text-xs font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Current Tab Section
                          </span>
                        }
                      </label>
                      
                      <div 
                        className={cn(
                          "text-sm mt-2",
                          isHighlighted ? `border-l-4 border-${section.tabCategory} pl-3` : ""
                        )}
                      >
                        {section.content.split("\n").map((paragraph, idx) => (
                          <p key={`${section.sectionId}-p-${idx}`} className="mb-2">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      
                      {isHighlighted && (
                        <div className="mt-2 text-xs">
                          <span className={`inline-block px-2 py-1 rounded highlight-${section.tabCategory}`}>
                            Highlighted ({section.tabCategory})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {Object.values(currentHighlightedSections).filter(Boolean).length} section(s) selected
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