import { FC, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { rfpContent, DocumentSection } from "@/data/rfp-document";
import { useSynchronizedHighlight } from "@/hooks/use-synchronized-highlight";

interface ExtractedTextViewProps {
  activeTab: string;
  hoveredSection: string | null;
  setHoveredSection: (section: string | null) => void;
  highlightedSections: { [key: string]: boolean };
}

interface LineSelection {
  sectionId: string;
  lineIndex: number;
  text: string;
  isSelected: boolean;
}

const ExtractedTextView: FC<ExtractedTextViewProps> = ({
  activeTab,
  hoveredSection,
  setHoveredSection,
  highlightedSections,
}) => {
  const { handleMouseEnter, handleMouseLeave } = useSynchronizedHighlight(
    setHoveredSection
  );
  
  // Track line-by-line selection
  const [selectedLines, setSelectedLines] = useState<LineSelection[]>([]);
  const [editMode, setEditMode] = useState(false);

  const toggleLineSelection = (sectionId: string, lineIndex: number, text: string) => {
    if (!editMode) return;
    
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

  const getHighlightClass = (section: DocumentSection) => {
    // In full document view, use appropriate color for each section type
    if (activeTab === "fullDocument") {
      if (section.tabCategory === "instructions") return "highlight-instructions";
      if (section.tabCategory === "pws") return "highlight-pws";
      if (section.tabCategory === "evaluation") return "highlight-evaluation";
      return "";
    }
    
    // Otherwise, only highlight if section matches current tab category
    if (section.tabCategory === activeTab) {
      if (activeTab === "instructions") return "highlight-instructions";
      if (activeTab === "pws") return "highlight-pws";
      if (activeTab === "evaluation") return "highlight-evaluation";
    }
    
    return "";
  };

  const isHighlighted = (section: DocumentSection) => {
    if (activeTab === "fullDocument") {
      // In full document view, sections are highlighted based on their category
      return section.tabCategory === "instructions" || 
             section.tabCategory === "pws" || 
             section.tabCategory === "evaluation";
    }
    
    // In specific tabs, only highlight if section matches the tab
    return section.tabCategory === activeTab;
  };

  const isHovered = (section: DocumentSection) => {
    return hoveredSection === section.sectionId;
  };

  // Show only sections that match the active tab or show all if on fullDocument
  const filteredContent = activeTab === "fullDocument" 
    ? rfpContent 
    : rfpContent.filter(section => section.tabCategory === activeTab || section.tabCategory === "fullDocument");

  return (
    <div className="w-1/2 border-r border-gray-200 flex flex-col">
      <div className="bg-white px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700">Extracted Text</span>
          <div className="flex ml-4 bg-gray-100 rounded overflow-hidden">
            <button className="text-gray-600 hover:bg-gray-200 px-2 py-1 text-xs">
              Plain Text
            </button>
            <button className="text-gray-600 hover:bg-gray-200 px-2 py-1 text-xs border-l border-gray-200">
              Structured
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setEditMode(!editMode)}
            className={`text-xs px-3 py-1 rounded transition-colors ${
              editMode 
                ? "bg-blue-600 text-white border-2 border-red-500 shadow-red" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-red-500 shadow-red"
            }`}
            style={{ 
              boxShadow: "0 0 5px rgba(255, 0, 0, 0.5)",
            }}
          >
            {editMode ? "Exit Edit Mode" : "Edit Mode"}
          </button>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search in text" 
              className="text-xs border border-gray-300 rounded-full pl-7 pr-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-44"
            />
            <svg
              className="h-3.5 w-3.5 text-gray-400 absolute left-2.5 top-1.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <button
            className="text-gray-600 hover:text-blue-600 p-1 rounded"
            title="Copy All"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-3.5 w-3.5 text-blue-600 rounded" />
            <span className="ml-2 text-xs font-medium">Highlight shall/will/must</span>
          </label>
          
          {editMode && (
            <span className="text-xs text-blue-600 font-medium">
              {selectedLines.length} line{selectedLines.length !== 1 ? 's' : ''} selected
            </span>
          )}
        </div>
      </div>
      
      <div
        id="extracted-text-content"
        className="flex-1 overflow-y-auto px-6 py-4 font-sans text-sm custom-scrollbar"
      >
        <div className="mt-2">
          <p className="font-medium text-gray-900 mb-3">Start of document</p>
          {activeTab === "fullDocument" && (
            <div className="mb-4">
              <p className="text-sm font-medium">USDOF-2025-ADMIN-0042</p>
              <p className="text-sm">Administrative Support Services</p>
            </div>
          )}
        </div>
        
        <div className="space-y-5">
          {filteredContent.map((section) => (
            <div
              key={section.sectionId}
              id={`section-${section.sectionId}`}
              className={cn(
                "sync-highlight py-1 px-2 -mx-2 transition-colors duration-150 rounded",
                getHighlightClass(section),
                isHighlighted(section) && !getHighlightClass(section) && "bg-blue-50",
                isHovered(section) && "bg-blue-100"
              )}
              data-section={section.sectionId}
              onMouseEnter={() => handleMouseEnter(section.sectionId)}
              onMouseLeave={handleMouseLeave}
            >
              <h3 className="font-bold text-gray-900 mb-2 uppercase">{section.title}</h3>
              <div className="editable-content">
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
                      const isSelected = isLineSelected(section.sectionId, pIdx * 1000 + lIdx);
                      
                      return (
                        <div 
                          key={lineKey}
                          className={cn(
                            "line rounded mb-1",
                            editMode && "cursor-pointer",
                            isSelected && "selected"
                          )}
                          onClick={() => toggleLineSelection(section.sectionId, pIdx * 1000 + lIdx, displayLine)}
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
    </div>
  );
};

export default ExtractedTextView;