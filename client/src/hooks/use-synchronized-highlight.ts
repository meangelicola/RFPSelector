import { useCallback } from "react";

export const useSynchronizedHighlight = (
  setHoveredSection: (section: string | null) => void
) => {
  const handleMouseEnter = useCallback(
    (sectionId: string) => {
      setHoveredSection(sectionId);
    },
    [setHoveredSection]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredSection(null);
  }, [setHoveredSection]);

  return {
    handleMouseEnter,
    handleMouseLeave,
  };
};
