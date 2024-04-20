import { useEffect, useRef, ReactNode} from "react";
const ClickOutsideDetector: React.FC<{children: ReactNode, onClickOutside: () => void}> = ({children, onClickOutside}) => {
	const containerRef = useRef(null);

	  const handleClickOutside = (event: Event) => {
	    if (containerRef.current && !containerRef.current.contains(event.target)) {
	      onClickOutside();
	    }
	  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

	return(
		<div ref={containerRef}>{children}</div>
	)
}
export default ClickOutsideDetector