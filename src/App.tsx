import type { ReactNode } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Router from '@/components/Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const ReactQueryWrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

const App = () => {
  return (
    <ReactQueryWrapper>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </ReactQueryWrapper>
  );
};

export default App;
