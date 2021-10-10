import { render, waitForElementToBeRemoved } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import type { ReactNode } from 'react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../../i18n';
import pandas from '../../mocks/pandas.json';
import PandasListView from './';

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

const axiosMock = new MockAdapter(axios);

describe('PandasListView', () => {
  afterEach(() => {
    axiosMock.reset();
    queryClient.getQueryCache().clear();
  });

  test('should render a list of pandas', async () => {
    axiosMock.onGet('http://localhost:3004/pandas').reply(200, pandas);

    const { getByText, findAllByRole } = render(
      <ReactQueryWrapper>
        <PandasListView />
      </ReactQueryWrapper>,
    );

    // Should display a loading indicator

    const loadingElement = getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();

    // The loading indicator should disappear

    await waitForElementToBeRemoved(() => getByText(/Loading.../i));
    expect(loadingElement).not.toBeInTheDocument();

    // Should display one list with a listitem for every panda

    const listElements = await findAllByRole('list');
    expect(listElements.length).toBe(1);

    const itemElements = await findAllByRole('listitem');
    expect(itemElements.length).toBe(pandas.length);
  });

  test('should fail to load pandas', async () => {
    axiosMock.onGet('http://localhost:3004/pandas').networkError();

    const { getByText } = render(
      <ReactQueryWrapper>
        <PandasListView />
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
