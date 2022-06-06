import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Router from './components/Router';
import { DisplayModeProvider } from './context/DisplayModeProvider';

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
      <DisplayModeProvider>
        <Router />
      </DisplayModeProvider>
    </ReactQueryWrapper>
  );
};

export default App;
