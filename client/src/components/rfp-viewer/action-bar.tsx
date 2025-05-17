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
    <div className="bg-gray-100 border-b border-gray-200 px-6 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-sm text-gray-600 mr-4">IT Support Services RFP #HHS-2023-IT-0042</span>
        <span className="bg-gray-200 text-xs px-2 py-1 rounded">Draft</span>
      </div>
      <div className="flex items-center space-x-2">
        {activeTab !== "fullDocument" && (
          <button
            id="btn-edit-refine"
            className={`bg-white hover:bg-gray-50 text-government-blue border border-gray-300 px-4 py-2 rounded text-sm ${
              isEditMode ? "hidden" : ""
            }`}
            onClick={handleEditRefine}
          >
            <svg
              className="inline-block mr-2 h-4 w-4"
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
              <path d="m3 15 5 5L19 9" />
              <path d="M14 4.5 18.5 9" />
              <path d="m3 6 5 5" />
            </svg>
            Edit/Refine
          </button>
        )}
        {isEditMode && (
          <button
            id="btn-save-changes"
            className="bg-government-blue hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            onClick={handleSaveChanges}
          >
            <svg
              className="inline-block mr-2 h-4 w-4"
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
          className="bg-white hover:bg-gray-50 text-government-blue border border-gray-300 px-4 py-2 rounded text-sm"
          onClick={handleGenerateOutline}
        >
          <svg
            className="inline-block mr-2 h-4 w-4"
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
        <div className="border-l border-gray-300 h-6 mx-2"></div>
        <button className="text-gray-600 hover:text-government-blue p-2 rounded" title="Print">
          <svg
            className="h-5 w-5"
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
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
        </button>
        <button className="text-gray-600 hover:text-government-blue p-2 rounded" title="Download">
          <svg
            className="h-5 w-5"
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
        <button className="text-gray-600 hover:text-government-blue p-2 rounded" title="Share">
          <svg
            className="h-5 w-5"
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
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
