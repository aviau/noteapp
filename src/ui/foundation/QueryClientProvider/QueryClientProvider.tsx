import {
  QueryClientProvider as TanstackQueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import React, { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export function QueryClientProvider({ children }: Props) {
  const [queryClient] = useState<QueryClient>(new QueryClient());

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}
