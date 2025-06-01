import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';

import ChakraProvider from '@/components/ChakraProvider';
import '@/i18n';
import pandas from '@/mocks/pandas.json';
import PandasListView from '@/views/PandasListView';

const axiosMock = new MockAdapter(axios);

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
    axiosMock.reset();
    queryClient.getQueryCache().clear();
  });

  test('should render a list of pandas', async () => {
    axiosMock.onGet('http://localhost:3004/pandas').reply(200, pandas);

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
    axiosMock.onGet('http://localhost:3004/pandas').networkError();

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

    const errorElement = screen.getByText(/Network Error/i);
    expect(errorElement).toBeInTheDocument();
  });
});
