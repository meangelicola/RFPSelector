import { FC } from "react";

interface ActionBarProps {
  activeTab: string;
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
  setShowEditModal: (show: boolean) => void;
  setShowOutlineModal: (show: boolean) => void;
  saveChanges: () => void;
}

const ActionBar: FC<ActionBarProps> = ({
  activeTab,
  isEditMode,
  setIsEditMode,
  setShowEditModal,
  setShowOutlineModal,
  saveChanges,
}) => {
  const handleEditRefine = () => {
    setIsEditMode(true);
    setShowEditModal(true);
  };

  const handleSaveChanges = () => {
    saveChanges();
    setIsEditMode(false);
  };

  const handleGenerateOutline = () => {
    setShowOutlineModal(true);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-sm text-gray-600 mr-4">File: Attachment+D+-+Quotation+Preparation+Instructions (1).pdf</span>
        <button className="flex items-center text-blue-600 text-sm font-medium">
          <svg 
            className="w-4 h-4 mr-1.5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
          Highlights
        </button>
      </div>
      <div className="flex items-center space-x-3">
        {activeTab !== "fullDocument" && (
          <button
            id="btn-edit-refine"
            className={`text-gray-700 hover:bg-gray-50 border-2 border-red-500 px-3 py-1.5 rounded text-sm flex items-center font-bold ${
              isEditMode ? "hidden" : ""
            }`}
            onClick={handleEditRefine}
            style={{ 
              boxShadow: "0 0 5px rgba(255, 0, 0, 0.5)",
              padding: "8px 16px"
            }}
          >
            <svg
              className="mr-1.5 h-4 w-4"
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
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Selections
          </button>
        )}
        {isEditMode && (
          <button
            id="btn-save-changes"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm flex items-center font-bold border-2 border-red-500"
            onClick={handleSaveChanges}
            style={{ 
              boxShadow: "0 0 5px rgba(255, 0, 0, 0.5)",
              padding: "8px 16px"
            }}
          >
            <svg
              className="mr-1.5 h-4 w-4"
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
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save Changes
          </button>
        )}
        <button
          id="btn-generate-outline"
          className="text-gray-700 hover:bg-gray-50 border border-gray-300 px-3 py-1.5 rounded text-sm flex items-center"
          onClick={handleGenerateOutline}
        >
          <svg
            className="mr-1.5 h-4 w-4"
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
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          Generate Outline
        </button>
        
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <button className="text-gray-600 hover:bg-gray-100 px-2 py-1.5" title="Previous">
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
          <div className="px-3 py-1 text-sm border-x border-gray-300">
            Page <span className="font-medium">1</span> of <span>10</span>
          </div>
          <button className="text-gray-600 hover:bg-gray-100 px-2 py-1.5" title="Next">
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
      </div>
    </div>
  );
};

export default ActionBar;