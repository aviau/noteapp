import { useContext, useEffect } from 'react';

import { SettingsContext } from '@/ui/foundation/SettingsProvider';
import { useCommands } from '@/ui/hooks';
import { GlobalStateContext } from '../GlobalStateProvider';

/**
 * Register commands globally in the app.
 */
export function GlobalCommands() {
  const { commandEventTarget } = useContext(GlobalStateContext);
  const { settings } = useContext(SettingsContext);

  useCommands(settings.commands);

  useEffect(() => {
    settings.commands.forEach((command) =>
      commandEventTarget.registerCommand(command)
    );
  }, [commandEventTarget, settings.commands]);

  return <></>;
}
