import { FC } from "react";

interface OutlineItem {
  title: string;
  children?: OutlineItem[];
}

interface OutlineModalProps {
  setShowOutlineModal: (show: boolean) => void;
  outline: OutlineItem[];
}

const OutlineModal: FC<OutlineModalProps> = ({ setShowOutlineModal, outline }) => {
  const handleClose = () => {
    setShowOutlineModal(false);
  };

  // Sample outline data for demonstration
  const sampleOutline: OutlineItem[] = [
    {
      title: "1. Introduction",
      children: [
        { title: "1.1 Executive Summary" },
        { title: "1.2 Company Background" },
      ],
    },
    {
      title: "2. Technical Approach",
      children: [
        { title: "2.1 Understanding of Requirements" },
        { title: "2.2 Proposed Solution" },
        { 
          title: "2.3 Implementation Plan",
          children: [
            { title: "2.3.1 Timeline" },
            { title: "2.3.2 Milestones" },
          ]
        },
      ],
    },
    {
      title: "3. Management Approach",
      children: [
        { title: "3.1 Project Management" },
        { title: "3.2 Risk Management" },
      ],
    },
    {
      title: "4. Past Performance",
      children: [
        { title: "4.1 Relevant Experience" },
        { title: "4.2 Customer References" },
      ],
    },
  ];

  const displayOutline = outline.length > 0 ? outline : sampleOutline;

  const renderOutlineItem = (item: OutlineItem, level: number = 0) => {
    return (
      <div key={item.title} className="mb-2">
        <div 
          className={`py-1 px-2 hover:bg-blue-50 rounded flex items-center ${
            level === 0 ? "font-medium" : ""
          }`}
          style={{ paddingLeft: `${(level + 1) * 0.75}rem` }}
        >
          <svg 
            className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          {item.title}
        </div>
        {item.children && (
          <div className="ml-2">
            {item.children.map((child) => renderOutlineItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Generated Outline</h2>
            <p className="text-sm text-gray-600 mt-1">
              Based on your highlighted sections
            </p>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          <div className="mb-4 flex space-x-2">
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm flex items-center">
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
              Download as DOCX
            </button>
            <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-sm flex items-center">
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              Copy to Clipboard
            </button>
          </div>

          <div className="outline-container">
            {displayOutline.map((item) => renderOutlineItem(item))}
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button
            className="px-4 py-2 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutlineModal;