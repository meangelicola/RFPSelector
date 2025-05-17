import { FC } from "react";

const DocumentHeader: FC = () => {
  return (
    <header className="bg-government-navy text-white py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <svg 
          className="h-12 w-12 mr-4" 
          viewBox="0 0 100 100" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="48" fill="#1a365d" stroke="#ffffff" strokeWidth="1" />
          <circle cx="50" cy="50" r="40" fill="#4299e1" />
          <path d="M30,40 L70,40 L70,70 L30,70 Z" fill="#ffffff" />
          <path d="M35,45 L65,45 L65,65 L35,65 Z" fill="#1a365d" />
          <text x="50" y="30" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">HHS</text>
          <text x="50" y="90" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="8">OFFICIAL SEAL</text>
        </svg>
        
        <div>
          <h1 className="font-roboto text-xl font-bold">Health and Human Services</h1>
          <h2 className="text-sm opacity-80">RFP Document Viewer</h2>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-government-red hover:bg-red-700 text-white px-4 py-2 rounded text-sm flex items-center">
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
          Export
        </button>
        <button className="bg-government-lightBlue hover:bg-blue-600 text-white px-4 py-2 rounded text-sm flex items-center">
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
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          John Doe
        </button>
      </div>
    </header>
  );
};

export default DocumentHeader;
