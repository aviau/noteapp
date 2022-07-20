import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

import { Hotkey } from '@/ui/foundation/SettingsProvider';
import { isKey, isModifier } from '@/ui/utilities';

/**
 * Listen for a hotkey pressed.
 *
 * @returns the hotkey listened
 */
export function useHotkeyListener(): Hotkey | null {
  const [modifiers, setModifiers] = useState<string[]>([]);
  const [key, setKey] = useState<string | undefined>();

  useEffect(() => {
    const downHandler = ({ key: eventKey }: KeyboardEvent) => {
      if (isModifier(eventKey) && !modifiers.includes(eventKey)) {
        setModifiers([...modifiers, eventKey]);
      }
      if (isKey(eventKey)) {
        setKey(eventKey);
      }
    };
    const upHandler = () => {
      setModifiers([]);
      setKey(undefined);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [modifiers]);

  return !isEmpty(modifiers) && key ? { modifiers, key } : null;
}
