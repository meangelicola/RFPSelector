import { FC, useEffect, useState } from "react";
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
  
  // Group sections by page number
  const [pageContentMap, setPageContentMap] = useState<{[key: number]: DocumentSection[]}>({});

  useEffect(() => {
    // Create a map of all pages and their content
    const pageMap: {[key: number]: DocumentSection[]} = {};
    
    // Get all unique page numbers
    const pageNumbers = Array.from(new Set(rfpContent.map(section => section.pageNumber)));
    
    // Sort page numbers
    pageNumbers.sort((a, b) => a - b);
    
    // Group sections by page
    pageNumbers.forEach(pageNum => {
      pageMap[pageNum] = rfpContent.filter(section => section.pageNumber === pageNum);
    });
    
    setPageContentMap(pageMap);
  }, [rfpContent]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      
      // Scroll to the top of the page
      const pdfContent = document.getElementById('pdf-view-content');
      if (pdfContent) {
        pdfContent.scrollTop = 0;
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      
      // Scroll to the top of the page
      const pdfContent = document.getElementById('pdf-view-content');
      if (pdfContent) {
        pdfContent.scrollTop = 0;
      }
    }
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageNum = parseInt(e.target.value);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
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

  const getHighlightClass = (section: DocumentSection) => {
    // If we're in full document view, use appropriate color for each section type
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

  // Get all pages for continuous scrolling
  const allPages = Object.keys(pageContentMap).map(Number);

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
          <div className="flex items-center border border-gray-300 rounded overflow-hidden mr-2">
            <button
              className="text-gray-600 hover:bg-gray-100 px-2 py-1.5"
              title="Previous"
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
            <div className="px-3 py-1 text-sm border-x border-gray-300 flex items-center">
              <span className="mr-1">Page</span>
              <input 
                type="text" 
                value={currentPage}
                onChange={handlePageChange}
                className="w-8 text-center border border-gray-300 rounded"
              />
              <span className="mx-1">of</span>
              <span>{totalPages}</span>
            </div>
            <button
              className="text-gray-600 hover:bg-gray-100 px-2 py-1.5"
              title="Next"
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
          </div>
          
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
          {/* Render all pages for continuous scrolling */}
          {allPages.map(pageNum => (
            <div 
              key={`page-${pageNum}`}
              id={`pdf-page-${pageNum}`}
              className="pdf-page w-full max-w-4xl px-10 py-8 mx-6 mb-8 bg-white shadow-md relative page-break-container"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top center" }}
            >
              {/* Page header for first page */}
              {pageNum === 1 && (
                <>
                  <div className="absolute top-2 right-2 text-xs text-gray-500">
                    US Department of Fun
                  </div>
                  
                  <div className="text-right mb-8">
                    <p className="text-xs">USDOF-2025-ADMIN-0042</p>
                    <p className="text-xs">Administrative Support Services</p>
                  </div>

                  <div className="text-center uppercase font-bold mb-8">
                    <h1 className="text-xl mb-2">REQUEST FOR PROPOSALS</h1>
                  </div>
                </>
              )}

              {/* Page content - all sections for this page */}
              {pageContentMap[pageNum]?.map((section) => (
                <div
                  key={`pdf-${section.sectionId}`}
                  id={`pdf-section-${section.sectionId}`}
                  className={cn(
                    "mb-8 sync-highlight p-2 -mx-2 rounded",
                    getHighlightClass(section),
                    isHighlighted(section) && !getHighlightClass(section) && "bg-blue-50",
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

              {/* Page footer with page number */}
              <div className="text-center mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500">
                <p>Page {pageNum} of {totalPages}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PdfView;