import { useEffect, useState } from 'react';

export function useKeyPress(
  modifier: string,
  key: string,
  onKeyPressed: () => void = () => {}
): boolean {
  const [modifierPressed, setModifierPressed] = useState(false);
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (event.key === modifier) {
        setModifierPressed(true);
      }
      if (modifierPressed && event.key === key) {
        setKeyPressed(true);
      }
    };
    const upHandler = (_event: KeyboardEvent) => {
      setModifierPressed(false);
      setKeyPressed(false);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [key, modifier, modifierPressed]);

  if (modifierPressed && keyPressed) {
    onKeyPressed();
  }

  return modifierPressed && keyPressed;
}
