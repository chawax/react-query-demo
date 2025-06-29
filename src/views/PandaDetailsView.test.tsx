import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import ChakraProvider from '@/components/ChakraProvider';
import '@/i18n';
import { server } from '@/mocks/node';
import pandas from '@/mocks/pandas.json';
import PandaDetailsView from '@/views/PandaDetailsView';

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
    <MemoryRouter initialEntries={['/pandas/1']} initialIndex={0}>
      <ChakraProvider>{children}</ChakraProvider>
    </MemoryRouter>
  </ReactQueryWrapper>
);

// const axiosMock = new MockAdapter(axios);

describe('PandaDetailsView', () => {
  afterEach(() => {
    // axiosMock.reset();
    queryClient.getQueryCache().clear();
  });

  test('should render the details of the panda', async () => {
    // axiosMock.onGet('http://localhost:3004/pandas/1').reply(200, pandas[0]);

    // To test this component we need to simulate the call of a route /pandas/1

    render(
      <Routes>
        <Route path="/pandas/:id" element={<PandaDetailsView />} />
      </Routes>,
      { wrapper: AllProviders },
    );

    // Should display a loading indicator

    const loadingElement = screen.getByRole('progressbar');
    expect(loadingElement).toBeInTheDocument();

    // The loading indicator should disappear

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
    expect(loadingElement).not.toBeInTheDocument();

    // Should display the details on the panda

    expect(screen.getByText(/Yuan Meng/)).toBeInTheDocument();
    expect(screen.getByText(/yoga/)).toBeInTheDocument();
    expect(screen.getByText(/bambou/)).toBeInTheDocument();

    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute('src')).toEqual(pandas[0].image);

    const buttonElements = screen.getAllByRole('button');
    expect(buttonElements.length).toEqual(3);

    expect(screen.getByText(/Fermer/)).toBeInTheDocument();
    expect(screen.getByText(/Modifier le panda/)).toBeInTheDocument();
    expect(screen.getByText(/Supprimer le panda/)).toBeInTheDocument();
  });

  test('should fail to load the details of the panda', async () => {
    // axiosMock.onGet('http://localhost:3004/pandas/1').networkError();

    // Override the GET request handler to simulate a failure
    server.use(
      http.get(
        'http://localhost:3004/pandas/:id',
        () => {
          return new Response(null, { status: 500 });
        },
        { once: true },
      ),
    );

    // Pour tester ce composant on doit simuler l'appel d'une route /pandas/1
    // To test this component we need to simulate the call of a route /pandas/1

    render(
      <Routes>
        <Route path="/pandas/:id" element={<PandaDetailsView />} />
      </Routes>,
      {
        wrapper: AllProviders,
      },
    );

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
