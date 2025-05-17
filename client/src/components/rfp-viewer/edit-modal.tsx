import { FC, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { rfpContent } from "@/data/rfp-document";

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
  const [localSelectedParagraphs, setLocalSelectedParagraphs] = useState<{
    [key: string]: boolean;
  }>(selectedParagraphs);

  const handleToggleHighlight = (paragraphId: string) => {
    setLocalSelectedParagraphs((prev) => ({
      ...prev,
      [paragraphId]: !prev[paragraphId],
    }));
  };

  const handleApplyChanges = () => {
    setSelectedParagraphs(localSelectedParagraphs);
    saveChanges();
    setShowEditModal(false);
  };

  const handleResetHighlights = () => {
    // Reset to default highlighting for the current tab
    const defaultHighlights: { [key: string]: boolean } = {};
    
    // Find sections for current tab
    const sectionForTab = rfpContent.filter(section => 
      section.tabCategory === activeTab
    );
    
    // Set default highlighting for paragraphs in those sections
    sectionForTab.forEach(section => {
      const paragraphs = section.content.split("\n");
      paragraphs.forEach((_, index) => {
        const paragraphId = `${section.sectionId}-p-${index}`;
        defaultHighlights[paragraphId] = true;
      });
    });
    
    setLocalSelectedParagraphs(defaultHighlights);
  };

  // Get active tab label for display
  const getActiveTabLabel = () => {
    switch (activeTab) {
      case "instructions":
        return "Instructions to Offeror";
      case "evaluation":
        return "Evaluation Criteria";
      case "pws":
        return "Performance Work Statement";
      default:
        return "Full Document";
    }
  };

  // Get content for current tab
  const tabContent = rfpContent.filter(
    (section) => section.tabCategory === activeTab
  );

  return (
    <Dialog open={true} onOpenChange={() => setShowEditModal(false)}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-government-blue">
            Edit Highlighting
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            Currently editing: <span className="font-semibold">{getActiveTabLabel()}</span>
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Click on text to toggle highlighting. Changes will affect both text and PDF views.
          </p>

          <div className="border border-gray-300 rounded p-4 max-h-96 overflow-y-auto mb-4">
            <div className="space-y-2 text-sm">
              {tabContent.map((section) => (
                <div key={`edit-section-${section.sectionId}`} className="mb-4">
                  <h4 className="font-semibold mb-2">{section.title}</h4>
                  {section.content.split("\n").map((paragraph, idx) => {
                    const paragraphId = `${section.sectionId}-p-${idx}`;
                    return (
                      <p
                        key={paragraphId}
                        className={`p-1 cursor-pointer hover:bg-gray-100 ${
                          localSelectedParagraphs[paragraphId]
                            ? "bg-highlight-purple"
                            : ""
                        }`}
                        onClick={() => handleToggleHighlight(paragraphId)}
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleResetHighlights}
            className="border border-gray-300 text-gray-700"
          >
            Reset to Default
          </Button>
          <Button 
            onClick={handleApplyChanges}
            className="bg-government-blue text-white hover:bg-blue-700"
          >
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
