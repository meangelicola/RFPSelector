import { FC } from "react";

const DocumentHeader: FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <svg
            className="h-8 w-8 text-blue-600 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          <div>
            <h1 className="font-medium text-lg text-gray-800">Information Technology (IT)</h1>
            <div className="flex items-center">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full mr-2">Finalized</span>
              <span className="text-xs text-gray-500">RFQ 89303024QIM000043</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button className="text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded text-sm flex items-center border border-gray-300">
          <svg
            className="mr-1.5 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
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
          Download
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm">
          Generate Proposal
        </button>
      </div>
    </header>
  );
};

export default DocumentHeader;