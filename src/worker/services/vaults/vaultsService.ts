import path from 'path';
import { Vault } from './vault';

// VaultServices is responsible for managing multiple Vaults.
export class VaultsService {
  private readonly vaults: Map<string, Vault>;

  constructor() {
    this.vaults = new Map<string, Vault>();
  }

  private absoluteVaultPath(vaultPath: string): string {
    return path.resolve(vaultPath);
  }

  getOrOpen(vaultPath: string): Vault {
    const absoluteVaultPath = this.absoluteVaultPath(vaultPath);
    const existingVault = this.vaults.get(absoluteVaultPath);
    if (existingVault) {
      return existingVault;
    }
    const newVault = new Vault(absoluteVaultPath);
    this.vaults.set(absoluteVaultPath, newVault);
    return newVault;
  }
}
