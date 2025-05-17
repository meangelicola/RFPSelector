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
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-medium text-sm">PDF View</span>
          <span className="ml-4 text-xs text-gray-600">
            Page <span id="current-page">{currentPage}</span> of{" "}
            <span id="total-pages">{totalPages}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="text-gray-600 hover:text-government-blue p-1 rounded"
            title="Previous Page"
            onClick={handlePreviousPage}
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
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="text-gray-600 hover:text-government-blue p-1 rounded"
            title="Next Page"
            onClick={handleNextPage}
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
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <div className="border-l border-gray-300 h-6 mx-1"></div>
          <button
            className="text-gray-600 hover:text-government-blue p-1 rounded"
            title="Zoom Out"
            onClick={handleZoomOut}
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
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <button
            className="text-gray-600 hover:text-government-blue p-1 rounded"
            title="Zoom In"
            onClick={handleZoomIn}
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
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="pdf-view-content"
        className="flex-1 bg-gray-200 overflow-y-auto p-6 custom-scrollbar"
      >
        <div id="pdf-pages-container" className="flex flex-col items-center">
          <div
            className="pdf-page w-full max-w-3xl p-10 mb-4 bg-white"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top center" }}
          >
            {currentPage === 1 && (
              <>
                <div className="flex items-center justify-between mb-10">
                  <svg 
                    className="h-24 w-24" 
                    viewBox="0 0 100 100" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="50" cy="50" r="48" fill="#1a365d" stroke="#ffffff" strokeWidth="1" />
                    <circle cx="50" cy="50" r="40" fill="#4299e1" />
                    <path d="M30,40 L70,40 L70,70 L30,70 Z" fill="#ffffff" />
                    <path d="M35,45 L65,45 L65,65 L35,65 Z" fill="#1a365d" />
                    <text x="50" y="30" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">HHS</text>
                    <text x="50" y="90" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="8">OFFICIAL SEAL</text>
                  </svg>
                  <div className="text-right">
                    <p className="text-sm">Solicitation Number: HHS-2023-IT-0042</p>
                    <p className="text-sm">Date: August 15, 2023</p>
                  </div>
                </div>

                <div className="text-center mb-10">
                  <h1 className="text-2xl font-bold">REQUEST FOR PROPOSAL</h1>
                  <h2 className="text-xl mt-2">IT Support Services</h2>
                  <p className="mt-4">Department of Health and Human Services</p>
                  <p>Office of the Chief Information Officer</p>
                </div>
              </>
            )}

            {pdfPagesContent.map((section) => (
              <div
                key={`pdf-${section.sectionId}`}
                id={`pdf-section-${section.sectionId}`}
                className={cn(
                  "mb-8 sync-highlight",
                  isHighlighted(section) && "bg-highlight-purple",
                  isHovered(section) && "bg-highlight-purple bg-opacity-50"
                )}
                data-section={section.sectionId}
                onMouseEnter={() => handleMouseEnter(section.sectionId)}
                onMouseLeave={handleMouseLeave}
              >
                <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-1 mb-4">
                  {section.title}
                </h3>
                <div className="pdf-content">
                  <div>
                    {section.content.split("\n").map((paragraph, idx) => (
                      <p
                        key={`${section.sectionId}-pdf-p-${idx}`}
                        className="mb-2"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center mt-8 pt-4 border-t border-gray-300 text-xs text-gray-600">
              <p>Department of Health and Human Services | IT Support Services RFP</p>
              <p>Page {currentPage} of {totalPages}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfView;
