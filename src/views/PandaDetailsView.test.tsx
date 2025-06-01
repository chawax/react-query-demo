import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import '@/i18n';
import pandas from '@/mocks/pandas.json';
import PandaDetailsView from '@/views/PandaDetailsView';

// Création d'un wrapper pour React Query
// On désactive le mode retry

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

// Mock pour Axios

const axiosMock = new MockAdapter(axios);

describe('PandaDetailsView', () => {
  afterEach(() => {
    axiosMock.reset();
    queryClient.getQueryCache().clear();
  });

  test('should render the details of the panda', async () => {
    axiosMock.onGet('http://localhost:3004/pandas/1').reply(200, pandas[0]);

    // Pour tester ce composant on doit simuler l'appel d'une route /pandas/1

    render(
      <ReactQueryWrapper>
        <MemoryRouter initialEntries={['/pandas/1']} initialIndex={0}>
          <Routes>
            <Route path="/pandas/:id" element={<PandaDetailsView />} />
          </Routes>
        </MemoryRouter>
      </ReactQueryWrapper>,
    );

    // Should display a loading indicator

    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();

    // The loading indicator should disappear

    await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
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
    axiosMock.onGet('http://localhost:3004/pandas/1').networkError();

    // Pour tester ce composant on doit simuler l'appel d'une route /pandas/1

    render(
      <ReactQueryWrapper>
        <MemoryRouter initialEntries={['/pandas/1']} initialIndex={0}>
          <Routes>
            <Route path="/pandas/:id" element={<PandaDetailsView />} />
          </Routes>
        </MemoryRouter>
      </ReactQueryWrapper>,
    );

    // Should display a loading indicator

    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();

    // The loading indicator should disappear

    await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
    expect(loadingElement).not.toBeInTheDocument();

    // Should display an error message

    const errorElement = screen.getByText(/Network Error/i);
    expect(errorElement).toBeInTheDocument();
  });
});
