import { render, waitForElementToBeRemoved } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import type { ReactNode } from 'react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Router } from 'react-router-dom';
import '../../i18n';
import pandas from '../../mocks/pandas.json';
import PandaDetailsView from './';

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

    const history = createMemoryHistory({
      initialEntries: ['/pandas/1'],
    });
    const { getByText, getByRole, getAllByRole } = render(
      <ReactQueryWrapper>
        <Router history={history}>
          <Route path="/pandas/:id" component={PandaDetailsView} />
        </Router>
      </ReactQueryWrapper>,
    );

    // Should display a loading indicator

    const loadingElement = getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();

    // The loading indicator should disappear

    await waitForElementToBeRemoved(() => getByText(/Loading.../i));
    expect(loadingElement).not.toBeInTheDocument();

    // Should display the details on the panda

    expect(getByText(/Yuan Meng/)).toBeInTheDocument();
    expect(getByText(/yoga/)).toBeInTheDocument();
    expect(getByText(/bambou/)).toBeInTheDocument();

    const imageElement = getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute('src')).toEqual(pandas[0].image);

    const buttonElements = getAllByRole('button');
    expect(buttonElements.length).toEqual(3);

    expect(getByText(/Fermer/)).toBeInTheDocument();
    expect(getByText(/Modifier le panda/)).toBeInTheDocument();
    expect(getByText(/Supprimer le panda/)).toBeInTheDocument();
  });

  test('should fail to load the details of the panda', async () => {
    axiosMock.onGet('http://localhost:3004/pandas/1').networkError();

    // Pour tester ce composant on doit simuler l'appel d'une route /pandas/1

    const history = createMemoryHistory({
      initialEntries: ['/pandas/1'],
    });
    const { getByText } = render(
      <ReactQueryWrapper>
        <Router history={history}>
          <Route path="/pandas/:id" component={PandaDetailsView} />
        </Router>
      </ReactQueryWrapper>,
    );

    // Should display a loading indicator

    const loadingElement = getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();

    // The loading indicator should disappear

    await waitForElementToBeRemoved(() => getByText(/Loading.../i));
    expect(loadingElement).not.toBeInTheDocument();

    // Should display an error message

    const errorElement = getByText(/Network Error/i);
    expect(errorElement).toBeInTheDocument();
  });
});
