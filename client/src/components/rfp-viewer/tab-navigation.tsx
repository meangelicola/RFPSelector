import { FC } from "react";
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "fullDocument", label: "Solicitation", color: "blue" },
    { id: "instructions", label: "Instructions to Offeror", color: "instructions" },
    { id: "evaluation", label: "Evaluation Criteria", color: "evaluation" },
    { id: "pws", label: "Performance Work Statement", color: "pws" },
  ];

  // Generate tab styles based on active status and color
  const getTabStyles = (tabId: string, tabColor: string) => {
    // Default styles
    const baseStyles = "px-5 py-3 text-sm font-medium transition-colors";
    
    // For fullDocument tab
    if (tabId === "fullDocument") {
      return cn(
        baseStyles,
        activeTab === tabId
          ? "text-blue-600 border-b-4 border-blue-600"
          : "text-gray-600 hover:text-blue-600 hover:border-b-3 hover:border-blue-200"
      );
    }
    
    // For special colored tabs
    return cn(
      baseStyles,
      `tab-${tabColor}`,
      activeTab === tabId
        ? `active-tab-${tabColor}`
        : "text-gray-600"
    );
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={getTabStyles(tab.id, tab.color)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;