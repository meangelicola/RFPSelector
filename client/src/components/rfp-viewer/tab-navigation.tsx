import { FC } from "react";
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "fullDocument", label: "Solicitation" },
    { id: "instructions", label: "Instructions to Offeror" },
    { id: "evaluation", label: "Evaluation Criteria" },
    { id: "pws", label: "Performance Work Statement" },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={cn(
              "px-5 py-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-200"
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
