import { useEffect, useState } from 'react';

// TODO: improve typing
const modifierKeys = ['Control', 'Alt', 'Meta', 'Shift'];

/** Returns modifier + key combination pressed */
export function useKeyListener(): [string | undefined, string | undefined] {
  const [modifier, setModifier] = useState<string | undefined>();
  const [key, setKey] = useState<string | undefined>();

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (modifierKeys.includes(event.key)) {
        setModifier(event.key);
      }
      if (modifier && !modifierKeys.includes(event.key)) {
        setKey(event.key);
      }
    };
    const upHandler = (_event: KeyboardEvent) => {
      setModifier(undefined);
      setKey(undefined);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [modifier]);

  return [modifier, key];
}
