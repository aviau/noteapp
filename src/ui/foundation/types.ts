import { Command } from './SettingsProvider/types';

export class CommandEventTarget extends EventTarget {
  commands: Map<string, Command> = new Map();

  public registerCommand(command: Command): void {
    if (command.callback) {
      this.commands.set(command.id, command);
    }
  }

  public execute(commandId: string): void {
    this.executeCommand(commandId);
    this.dispatchEvent(new CustomEvent(commandId));
  }

  private executeCommand(commandId: string): void {
    const command = this.commands.get(commandId);
    if (command && command.callback) {
      command.callback();
    }
  }
}
