import DocumentHeader from "@/components/rfp-viewer/document-header";
import TabNavigation from "@/components/rfp-viewer/tab-navigation";
import ActionBar from "@/components/rfp-viewer/action-bar";
import ExtractedTextView from "@/components/rfp-viewer/extracted-text-view";
import PdfView from "@/components/rfp-viewer/pdf-view";
import EditModal from "@/components/rfp-viewer/edit-modal";
import OutlineModal from "@/components/rfp-viewer/outline-modal";
import { useDocumentViewer } from "@/hooks/use-document-viewer";

const Home = () => {
  const {
    activeTab,
    setActiveTab,
    isEditMode,
    setIsEditMode,
    currentPage,
    setCurrentPage,
    totalPages,
    highlightedSections,
    setHighlightedSections,
    hoveredSection,
    setHoveredSection,
    showEditModal,
    setShowEditModal,
    showOutlineModal,
    setShowOutlineModal,
    zoomLevel,
    setZoomLevel,
    saveChanges,
    generateOutline,
    selectedParagraphs,
    setSelectedParagraphs,
    outline
  } = useDocumentViewer();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DocumentHeader />
      
      <TabNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
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
          selectedParagraphs={selectedParagraphs}
          setSelectedParagraphs={setSelectedParagraphs}
          saveChanges={saveChanges}
        />
      )}
      
      {showOutlineModal && (
        <OutlineModal 
          setShowOutlineModal={setShowOutlineModal}
          outline={outline}
        />
      )}
    </div>
  );
};

export default Home;
