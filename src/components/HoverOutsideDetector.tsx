import { useEffect, useRef, ReactNode } from "react";
const HoverOutsideDetector: React.FC<{children: ReactNode, onHoverOutside: () => void}> = ({children, onHoverOutside}) => {
	const containerRef = useRef(null);

	  const handleHoverOutside = (event: Event) => {
	    if (containerRef.current && !containerRef.current.contains(event.target)) {
	      onHoverOutside();
	    }
	  };

  useEffect(() => {
    document.addEventListener('mouseover', handleHoverOutside);

    return () => {
      document.removeEventListener('mouseover', handleHoverOutside);
    };
  }, []);

	return(
		<div ref={containerRef}>{children}</div>
	)
}
export default HoverOutsideDetector