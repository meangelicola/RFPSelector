import { useCallback } from 'react';

export const useSynchronizedHighlight = (
  setHoveredSection: (sectionId: string | null) => void
) => {
  const handleMouseEnter = useCallback(
    (sectionId: string) => {
      setHoveredSection(sectionId);
      
      // Find the corresponding element in the other view and scroll to it if needed
      const syncElement = document.activeElement?.closest('.sync-highlight') as HTMLElement | null;
      const currentView = syncElement?.getAttribute('data-section');
      const otherViewPrefix = currentView?.startsWith('pdf-') ? '' : 'pdf-';
      const targetElementId = `${otherViewPrefix}section-${sectionId}`;
      
      const targetElement = document.getElementById(targetElementId);
      if (targetElement) {
        // Check if element is out of view
        const container = targetElement.closest('.overflow-y-auto');
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const elementRect = targetElement.getBoundingClientRect();
          
          const isInView = 
            elementRect.top >= containerRect.top && 
            elementRect.bottom <= containerRect.bottom;
            
          if (!isInView) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
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