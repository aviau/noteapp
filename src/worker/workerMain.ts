import Electron from 'electron';
import {
  IpcWorkerMessageType,
  IpcWorkerMessage,
  IpcWorkerResponse,
  IpcWorkerResponseOf,
} from '@/lib/ipc/ipcWorker';
import { assertUnreachable } from '@/lib/asserts';
import { IpcWorkerService } from './services/ipc';
import { ConfigurationService } from './services/configuration';
import { VaultsService } from './services/vaults';

export class WorkerMain {
  private readonly ipcWorkerService: IpcWorkerService;

  private readonly vaultsService: VaultsService;

  constructor(ipcRenderer: Electron.IpcRenderer) {
    this.ipcWorkerService = new IpcWorkerService(ipcRenderer);
    this.vaultsService = new VaultsService();
  }

  main(): void {
    try {
      this.startup();
    } catch (error) {
      this.ipcWorkerService.mainLog((error as any).message);
    }
  }

  private async startup(): Promise<void> {
    this.ipcWorkerService.mainLog('Started.');

    // ***************************
    // ** Prepare main services **
    // ***************************
    const configurationService = new ConfigurationService(
      await this.ipcWorkerService.mainUtilsGetUserDataPath()
    );
    this.ipcWorkerService.mainLog(
      `ConfigurationService loaded with vault at ${
        (await configurationService.getVaultConfiguration()).data
          .lastActiveVaultId
      }.`
    );

    // *************************
    // ** Start communication **
    // *************************
    this.ipcWorkerService.onWorkerMessage = async (
      message: IpcWorkerMessage
    ): Promise<IpcWorkerResponse> => {
      const messageType = message.type;
      switch (messageType) {
        // ***********
        // ** UTILS **
        // ***********
        case IpcWorkerMessageType.UTILS_PING: {
          this.ipcWorkerService.mainLog(`PING: ${message.data.message}`);
          const resp: IpcWorkerResponseOf<typeof messageType> = {
            message: 'workerpong',
          };
          return resp;
        }
        // *************
        // ** WINDOWS **
        // *************
        case IpcWorkerMessageType.WINDOWS_MINIMIZE: {
          this.ipcWorkerService.mainWindowsMinimize();
          const resp: IpcWorkerResponseOf<typeof messageType> = null;
          return resp;
        }
        case IpcWorkerMessageType.WINDOWS_MAXIMIZE: {
          this.ipcWorkerService.mainWindowsMaximize();
          const resp: IpcWorkerResponseOf<typeof messageType> = null;
          return resp;
        }
        case IpcWorkerMessageType.WINDOWS_QUIT: {
          this.ipcWorkerService.mainWindowsQuit();
          const resp: IpcWorkerResponseOf<typeof messageType> = null;
          return resp;
        }
        // *******************
        // ** CONFIGURATION **
        // *******************
        case IpcWorkerMessageType.CONFIGURATION_GET_LAST_ACTIVE_VAULT_ID: {
          const vaultConfig =
            await configurationService.getVaultConfiguration();
          const resp: IpcWorkerResponseOf<typeof messageType> = {
            vaultId: vaultConfig.data.lastActiveVaultId,
          };
          return resp;
        }
        // ***********
        // ** VAULT **
        // ***********
        case IpcWorkerMessageType.VAULT_GET_FILES: {
          const vault = this.vaultsService.getOrOpen(message.vaultId);
          const files = await vault.getFiles();
          const resp: IpcWorkerResponseOf<typeof messageType> = {
            files,
          };
          return resp;
        }
        // *************
        // ** DEFAULT **
        // *************
        default: {
          this.ipcWorkerService.mainLog(`Unhandled worker message: ${message}`);
          return assertUnreachable(messageType);
        }
      }
    };
    this.ipcWorkerService.start();
  }
}
