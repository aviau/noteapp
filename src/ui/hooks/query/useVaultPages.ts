import { useQuery } from '@tanstack/react-query';
import { QueryKey } from './keys';

const getVaultPages = async (_vaultPath: string): Promise<string[]> => {
  return [
    'journals/day1.md',
    'pages/meetings/alex.md',
    'pages/meetings/fidji.md',
    'pages/how-to-take-nodes.md',
  ];
};

export function useVaultPages(vaultPath: string) {
  return useQuery([QueryKey.VAULT_PAGES, vaultPath], () =>
    getVaultPages(vaultPath)
  );
}
