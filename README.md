# noteapp

## `settings.json`

The app currently does not have a UI to set the active vault.

You can set it using:
- `~/.config/Electron/settings.json` on Linux.
- `~/Library/Application Support/Electron/settings.json` on macOS.

```json
{
    "vault": {
        "lastActiveVaultId": "/home/aviau/vaultname"
    }
}
```
