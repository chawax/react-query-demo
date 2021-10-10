import type { ReactNode } from 'react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Router from './components/Router';
import { DisplayModeProvider } from './context/DisplayModeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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

function App() {
  return (
    <ReactQueryWrapper>
      <DisplayModeProvider>
        <Router />
      </DisplayModeProvider>
    </ReactQueryWrapper>
  );
}

export default App;
