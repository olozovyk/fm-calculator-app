import { useEffect, useState } from 'react';

const keys = ['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

function useFocusVisible() {
  const [isFocusVisible, setIsFocusVisible] = useState<boolean>(false);

  const onKeyDown = (e: KeyboardEvent) => {
    if (keys.includes(e.key)) {
      setIsFocusVisible(true);
    }
  };

  const onMouseClick = () => {
    setIsFocusVisible(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onMouseClick);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onMouseClick);
    };
  }, []);

  return isFocusVisible;
}

export default useFocusVisible;
