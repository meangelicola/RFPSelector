import { FC, useState } from "react";
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
  const [localSelectedParagraphs, setLocalSelectedParagraphs] = useState<{ [key: string]: boolean }>(selectedParagraphs);

  const toggleSelect = (sectionId: string) => {
    setLocalSelectedParagraphs((prev) => {
      const newState = { ...prev };
      newState[sectionId] = !newState[sectionId];
      return newState;
    });
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const handleSave = () => {
    setSelectedParagraphs(localSelectedParagraphs);
    saveChanges();
    setShowEditModal(false);
  };

  // Filter content for the current tab
  const filteredContent = rfpContent.filter(
    (section) => section.tabCategory === activeTab
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit/Refine Document</h2>
          <p className="text-sm text-gray-600 mt-1">
            Click on sections to highlight them for inclusion in your proposal
          </p>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          <div className="space-y-6">
            {filteredContent.map((section) => (
              <div
                key={section.sectionId}
                className={`p-4 border rounded cursor-pointer transition-colors ${
                  localSelectedParagraphs[section.sectionId]
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => toggleSelect(section.sectionId)}
              >
                <h3 className="font-bold text-gray-900 mb-2">{section.title}</h3>
                <div className="text-sm text-gray-700">
                  {section.content.split("\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-2">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;