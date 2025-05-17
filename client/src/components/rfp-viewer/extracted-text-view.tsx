import { FC } from "react";
import { cn } from "@/lib/utils";
import { rfpContent, DocumentSection } from "@/data/rfp-document";
import { useSynchronizedHighlight } from "@/hooks/use-synchronized-highlight";

interface ExtractedTextViewProps {
  activeTab: string;
  hoveredSection: string | null;
  setHoveredSection: (section: string | null) => void;
  highlightedSections: { [key: string]: boolean };
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

  const isHighlighted = (section: DocumentSection) => {
    if (activeTab === "fullDocument") return false;
    return highlightedSections[section.sectionId] || false;
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
        <div className="flex items-center">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-3.5 w-3.5 text-blue-600 rounded" />
            <span className="ml-2 text-xs font-medium">Highlight shall/will/must</span>
          </label>
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
              <p className="text-sm font-medium">RFQ 89303024QIM000043</p>
              <p className="text-sm">Attachment D</p>
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
                isHighlighted(section) && "bg-blue-50",
                isHovered(section) && "bg-blue-100"
              )}
              data-section={section.sectionId}
              onMouseEnter={() => handleMouseEnter(section.sectionId)}
              onMouseLeave={handleMouseLeave}
            >
              <h3 className="font-bold text-gray-900 mb-2 uppercase">{section.title}</h3>
              {section.content.split("\n").map((paragraph, idx) => (
                <p key={`${section.sectionId}-p-${idx}`} className="mb-3 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtractedTextView;
