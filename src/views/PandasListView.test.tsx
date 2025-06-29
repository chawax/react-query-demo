import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { http } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import ChakraProvider from '@/components/ChakraProvider';
import '@/i18n';
import { server } from '@/mocks/node';
import pandas from '@/mocks/pandas.json';
import PandasListView from '@/views/PandasListView';

// Create a wrapper for React Query with retry mode disabled
// This is necessary to prevent the retry mechanism from interfering with tests
// and to ensure that the tests can handle errors gracefully

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const ReactQueryWrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <ReactQueryWrapper>
    <MemoryRouter>
      <ChakraProvider>{children}</ChakraProvider>
    </MemoryRouter>
  </ReactQueryWrapper>
);

describe('PandasListView', () => {
  afterEach(() => {
    queryClient.getQueryCache().clear();
  });

  test('should render a list of pandas', async () => {
    render(<PandasListView />, {
      wrapper: AllProviders,
    });

    // Should display a loading indicator

    const loadingElement = screen.getByRole('progressbar');
    expect(loadingElement).toBeInTheDocument();

    // The loading indicator should disappear

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
    expect(loadingElement).not.toBeInTheDocument();

    // Should display one list with a listitem for every panda

    const listElements = await screen.findAllByRole('list');
    expect(listElements.length).toBe(1);

    const itemElements = await screen.findAllByRole('listitem');
    expect(itemElements.length).toBe(pandas.length);
  });

  test('should fail to load pandas', async () => {
    // Override the GET request handler to simulate a failure
    server.use(
      http.get(
        'http://localhost:3004/pandas',
        () => {
          return new Response(null, { status: 500 });
        },
        { once: true },
      ),
    );

    render(<PandasListView />, {
      wrapper: AllProviders,
    });

    // Should display a loading indicator

    const loadingElement = screen.getByRole('progressbar');
    expect(loadingElement).toBeInTheDocument();

    // The loading indicator should disappear

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
    expect(loadingElement).not.toBeInTheDocument();

    // Should display an error message

    const errorElement = screen.getByText(
      /Request failed with status code 500/i,
    );
    expect(errorElement).toBeInTheDocument();
  });
});
