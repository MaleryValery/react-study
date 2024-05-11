import { useEffect } from 'react';

export function useKeybordKey(key: string, action: () => void) {
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [key, action]);

  return [];
}
