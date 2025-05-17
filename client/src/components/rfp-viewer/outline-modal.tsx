import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OutlineItem {
  title: string;
  children?: OutlineItem[];
}

interface OutlineModalProps {
  setShowOutlineModal: (show: boolean) => void;
  outline: OutlineItem[];
}

const OutlineModal: FC<OutlineModalProps> = ({ setShowOutlineModal, outline }) => {
  const renderOutlineItems = (items: OutlineItem[], level = 0) => {
    return (
      <ul className={level === 0 ? "space-y-2" : "ml-6 mt-1 text-sm font-normal"}>
        {items.map((item, index) => (
          <li 
            key={`outline-${level}-${index}`} 
            className={level === 0 ? "font-semibold mt-2" : ""}
          >
            {item.title}
            {item.children && renderOutlineItems(item.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  const handleExportOutline = () => {
    // In a real app, this would export the outline as a PDF
    console.log("Exporting outline");
    
    // For this prototype, we'll just show a success message
    alert("Outline exported successfully!");
  };

  return (
    <Dialog open={true} onOpenChange={() => setShowOutlineModal(false)}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-government-blue">
            Document Outline
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-4">Generated outline of the RFP document:</p>
          
          <div className="border border-gray-300 rounded p-4 max-h-96 overflow-y-auto mb-4">
            {renderOutlineItems(outline)}
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleExportOutline}
            className="border border-gray-300 text-gray-700 flex items-center"
          >
            <svg
              className="mr-2 h-4 w-4"
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
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M16 13v-1h-8v1" />
              <path d="M16 17v-1h-8v1" />
              <path d="M10 9h-2" />
            </svg>
            Export as PDF
          </Button>
          <Button 
            onClick={() => setShowOutlineModal(false)}
            className="bg-government-blue text-white hover:bg-blue-700"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OutlineModal;
