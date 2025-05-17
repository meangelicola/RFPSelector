import { FC, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { rfpContent, DocumentSection } from "@/data/rfp-document";

interface LineSelection {
  sectionId: string;
  lineIndex: number;
  text: string;
  isSelected: boolean;
}

interface EditModalProps {
  activeTab: string;
  setShowEditModal: (show: boolean) => void;
  selectedParagraphs: { [key: string]: boolean };
  setSelectedParagraphs: (paragraphs: { [key: string]: boolean }) => void;
  saveChanges: () => void;
}

const EditModal: FC<EditModalProps> = ({
  activeTab,
  setShowEditModal,
  selectedParagraphs,
  setSelectedParagraphs,
  saveChanges,
}) => {
  const [selectedLines, setSelectedLines] = useState<LineSelection[]>([]);
  
  const toggleLineSelection = (sectionId: string, lineIndex: number, text: string) => {
    setSelectedLines(prev => {
      // Check if this line is already selected
      const existingLineIndex = prev.findIndex(
        line => line.sectionId === sectionId && line.lineIndex === lineIndex
      );
      
      if (existingLineIndex >= 0) {
        // Remove the line if it's already selected
        return prev.filter((_, idx) => idx !== existingLineIndex);
      } else {
        // Add the line to selections
        return [...prev, { sectionId, lineIndex, text, isSelected: true }];
      }
    });
  };

  const isLineSelected = (sectionId: string, lineIndex: number) => {
    return selectedLines.some(
      line => line.sectionId === sectionId && line.lineIndex === lineIndex
    );
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const handleSave = () => {
    // Convert line selections to paragraph highlights for compatibility
    const paragraphSelections: { [key: string]: boolean } = {};
    
    // Mark sections as selected if any of their lines are selected
    selectedLines.forEach(line => {
      paragraphSelections[line.sectionId] = true;
    });
    
    setSelectedParagraphs(paragraphSelections);
    saveChanges();
    setShowEditModal(false);
  };

  // Get highlight classes based on tab category
  const getHighlightClass = (tabCategory: string) => {
    if (tabCategory === "instructions") return "highlight-instructions";
    if (tabCategory === "pws") return "highlight-pws";
    if (tabCategory === "evaluation") return "highlight-evaluation";
    return "";
  };

  // Filter content for the current tab
  const filteredContent = rfpContent.filter(
    (section) => section.tabCategory === activeTab
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Edit/Refine Document</h2>
            <p className="text-sm text-gray-600 mt-1">
              Click on individual lines to select them for your proposal
            </p>
          </div>
          <div className="text-sm bg-blue-50 px-3 py-1 rounded border border-blue-200">
            <span className="font-medium">{selectedLines.length}</span> line{selectedLines.length !== 1 ? 's' : ''} selected
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          <div className="space-y-8">
            {filteredContent.map((section) => (
              <div
                key={section.sectionId}
                className={cn(
                  "p-4 border rounded transition-colors",
                  getHighlightClass(section.tabCategory)
                )}
              >
                <h3 className="font-bold text-gray-900 mb-4 uppercase">{section.title}</h3>
                <div className="text-sm">
                  {section.content.split("\n").map((paragraph, pIdx) => (
                    <div key={`${section.sectionId}-p-${pIdx}`} className="mb-3">
                      {/* Split paragraphs into lines for line-by-line selection */}
                      {paragraph.split(". ").map((line, lIdx) => {
                        // Skip empty lines
                        if (!line.trim()) return null;
                        
                        // Add period back except for the last line if the paragraph doesn't end with a period
                        const displayLine = lIdx < paragraph.split(". ").length - 1 || paragraph.endsWith(".")
                          ? line + (lIdx < paragraph.split(". ").length - 1 ? "." : "")
                          : line;
                        
                        const lineKey = `${section.sectionId}-line-${pIdx}-${lIdx}`;
                        const lineId = pIdx * 1000 + lIdx;
                        const isSelected = isLineSelected(section.sectionId, lineId);
                        
                        return (
                          <div 
                            key={lineKey}
                            className={cn(
                              "line rounded mb-1 cursor-pointer px-2 py-1",
                              isSelected ? "selected bg-blue-200" : "hover:bg-gray-100"
                            )}
                            onClick={() => toggleLineSelection(section.sectionId, lineId, displayLine)}
                          >
                            {displayLine}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 flex justify-between">
          <div className="text-sm text-gray-600">
            Select specific lines by clicking on them. You can select lines from different sections.
          </div>
          <div className="space-x-3">
            <button
              className="px-4 py-2 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleSave}
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