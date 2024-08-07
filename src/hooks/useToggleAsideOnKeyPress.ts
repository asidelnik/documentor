import { useEffect } from 'react';

export default function useToggleAsideOnKeyPress(
  toggleAside: boolean,
  setToggleAside: (value: boolean) => void
) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'f' && document.activeElement?.tagName !== 'INPUT') {
        setToggleAside(!toggleAside);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [toggleAside, setToggleAside]);
}
