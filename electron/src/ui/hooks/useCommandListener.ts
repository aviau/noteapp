import { useContext, useEffect } from 'react';

import { GlobalStateContext } from '@/ui/foundation/GlobalStateProvider';

// TODO: add typing to command event name
export function useCommandListener(
  event: string,
  on: () => void,
  off: () => void = () => {}
): void {
  const { commandEventTarget } = useContext(GlobalStateContext);

  useEffect(() => {
    commandEventTarget.addEventListener(event, on);

    return () => {
      commandEventTarget.removeEventListener(event, off);
    };
  }, [commandEventTarget, on, off, event]);
}
