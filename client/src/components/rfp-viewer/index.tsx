import { FC, useState, useEffect } from 'react';
import DocumentHeader from './document-header';
import TabNavigation from './tab-navigation';
import ActionBar from './action-bar';
import ExtractedTextView from './extracted-text-view';
import PdfView from './pdf-view';
import EditModal from './edit-modal';
import OutlineModal from './outline-modal';
import { useSynchronizedHighlight } from '@/hooks/use-synchronized-highlight';
import { useDocumentViewer } from '@/hooks/use-document-viewer';
import { rfpContent } from '@/data/rfp-document';

const RfpViewer: FC = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('fullDocument');
  
  // PDF view state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  
  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOutlineModal, setShowOutlineModal] = useState(false);
  
  // Highlight state
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [highlightedSections, setHighlightedSections] = useState<{ [key: string]: boolean }>({});
  
  // Document functions
  const { saveChanges, updateHighlightsForTab, generatedOutline } = useDocumentViewer();
  
  // Update highlights when active tab changes
  useEffect(() => {
    updateHighlightsForTab(activeTab);
  }, [activeTab, updateHighlightsForTab]);
  
  // Calculate total pages based on the highest page number in content
  useEffect(() => {
    const maxPage = Math.max(...rfpContent.map(section => section.pageNumber));
    setTotalPages(maxPage);
  }, [rfpContent]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <DocumentHeader />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <ActionBar 
        activeTab={activeTab}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        setShowEditModal={setShowEditModal}
        setShowOutlineModal={setShowOutlineModal}
        saveChanges={saveChanges}
      />
      <div className="flex flex-1 overflow-hidden">
        <ExtractedTextView 
          activeTab={activeTab}
          hoveredSection={hoveredSection}
          setHoveredSection={setHoveredSection}
          highlightedSections={highlightedSections}
        />
        <PdfView 
          activeTab={activeTab}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          hoveredSection={hoveredSection}
          setHoveredSection={setHoveredSection}
          highlightedSections={highlightedSections}
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
        />
      </div>
      
      {showEditModal && (
        <EditModal 
          activeTab={activeTab}
          setShowEditModal={setShowEditModal}
          selectedParagraphs={highlightedSections}
          setSelectedParagraphs={setHighlightedSections}
          saveChanges={saveChanges}
        />
      )}
      
      {showOutlineModal && (
        <OutlineModal 
          setShowOutlineModal={setShowOutlineModal}
          outline={generatedOutline}
        />
      )}
    </div>
  );
};

export default RfpViewer;