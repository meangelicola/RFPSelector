import { FC } from "react";
import { cn } from "@/lib/utils";
import { rfpContent, DocumentSection } from "@/data/rfp-document";
import { useSynchronizedHighlight } from "@/hooks/use-synchronized-highlight";

interface PdfViewProps {
  activeTab: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  hoveredSection: string | null;
  setHoveredSection: (section: string | null) => void;
  highlightedSections: { [key: string]: boolean };
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
}

const PdfView: FC<PdfViewProps> = ({
  activeTab,
  currentPage,
  setCurrentPage,
  totalPages,
  hoveredSection,
  setHoveredSection,
  highlightedSections,
  zoomLevel,
  setZoomLevel,
}) => {
  const { handleMouseEnter, handleMouseLeave } = useSynchronizedHighlight(
    setHoveredSection
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  const isHighlighted = (section: DocumentSection) => {
    if (activeTab === "fullDocument") return false;
    return highlightedSections[section.sectionId] || false;
  };

  const isHovered = (section: DocumentSection) => {
    return hoveredSection === section.sectionId;
  };

  // Filter content for current page
  const pdfPagesContent = rfpContent.filter(
    (section) => section.pageNumber === currentPage
  );

  return (
    <div className="w-1/2 flex flex-col">
      <div className="bg-white px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-medium text-sm text-gray-700">PDF View</span>
          <button className="ml-4 text-blue-600 text-xs px-3 py-1 rounded border border-blue-600 flex items-center">
            <svg
              className="h-3.5 w-3.5 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Hide PDF Viewer
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <button
              className="text-gray-600 hover:bg-gray-100 p-1.5"
              title="Zoom Out"
              onClick={handleZoomOut}
            >
              <svg
                className="h-3.5 w-3.5"
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
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>
            <span className="border-x border-gray-300 px-2 flex items-center text-xs">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              className="text-gray-600 hover:bg-gray-100 p-1.5"
              title="Zoom In"
              onClick={handleZoomIn}
            >
              <svg
                className="h-3.5 w-3.5"
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
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div
        id="pdf-view-content"
        className="flex-1 bg-gray-100 overflow-y-auto custom-scrollbar"
      >
        <div id="pdf-pages-container" className="flex flex-col items-center py-6">
          <div
            className="pdf-page w-full max-w-4xl px-10 py-8 mx-6 mb-6 bg-white shadow-md relative"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top center" }}
          >
            {currentPage === 1 && (
              <>
                <div className="absolute top-2 right-2 text-xs text-gray-500">
                  Attachment D
                </div>
                
                <div className="text-right mb-8">
                  <p className="text-xs">RFQ 89303024QIM000043</p>
                  <p className="text-xs">Attachment D</p>
                </div>

                <div className="text-center uppercase font-bold mb-8">
                  <h1 className="text-xl mb-2">QUOTE PREPARATION INSTRUCTIONS</h1>
                </div>
              </>
            )}

            {pdfPagesContent.map((section) => (
              <div
                key={`pdf-${section.sectionId}`}
                id={`pdf-section-${section.sectionId}`}
                className={cn(
                  "mb-8 sync-highlight p-2 -mx-2 rounded",
                  isHighlighted(section) && "bg-blue-50",
                  isHovered(section) && "bg-blue-100"
                )}
                data-section={section.sectionId}
                onMouseEnter={() => handleMouseEnter(section.sectionId)}
                onMouseLeave={handleMouseLeave}
              >
                <h3 className="font-bold uppercase mb-4">
                  {section.title}
                </h3>
                <div className="pdf-content">
                  <div>
                    {section.content.split("\n").map((paragraph, idx) => (
                      <p
                        key={`${section.sectionId}-pdf-p-${idx}`}
                        className="mb-3"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500">
              <p>Page {currentPage} of {totalPages}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfView;
