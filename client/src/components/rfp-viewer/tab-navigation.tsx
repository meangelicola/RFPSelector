import { FC } from "react";
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "fullDocument", label: "View Full Document" },
    { id: "instructions", label: "Instructions to Offeror" },
    { id: "evaluation", label: "Evaluation Criteria" },
    { id: "pws", label: "Performance Work Statement" },
  ];

  return (
    <div className="bg-white border-b border-gray-200 font-roboto">
      <div className="flex px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={cn(
              "px-6 py-4 font-medium",
              activeTab === tab.id
                ? "text-government-blue border-b-2 border-government-blue"
                : "text-gray-500 hover:text-government-blue"
            )}
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
