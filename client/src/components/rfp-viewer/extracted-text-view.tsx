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

  return (
    <div className="w-1/2 border-r border-gray-300 flex flex-col">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex justify-between items-center">
        <span className="font-medium text-sm">Extracted Text</span>
        <div className="flex items-center space-x-2">
          <button
            className="text-gray-600 hover:text-government-blue p-1 rounded"
            title="Copy All"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          <button
            className="text-gray-600 hover:text-government-blue p-1 rounded"
            title="Search"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          </button>
        </div>
      </div>
      <div
        id="extracted-text-content"
        className="flex-1 overflow-y-auto p-6 font-code text-sm custom-scrollbar"
      >
        <div className="space-y-4">
          {rfpContent.map((section) => (
            <div
              key={section.sectionId}
              id={`section-${section.sectionId}`}
              className={cn(
                "sync-highlight p-2 transition-colors duration-200",
                isHighlighted(section) && "bg-highlight-purple",
                isHovered(section) && "bg-highlight-purple bg-opacity-50"
              )}
              data-section={section.sectionId}
              onMouseEnter={() => handleMouseEnter(section.sectionId)}
              onMouseLeave={handleMouseLeave}
            >
              <h3 className="font-bold mb-2">{section.title}</h3>
              {section.content.split("\n").map((paragraph, idx) => (
                <p key={`${section.sectionId}-p-${idx}`} className="mb-2">
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
