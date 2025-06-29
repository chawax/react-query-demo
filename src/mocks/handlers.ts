import { http, HttpResponse } from 'msw';

import pandas from './pandas.json';

export const handlers = [
  http.get('http://localhost:3004/pandas', () => {
    return HttpResponse.json(pandas);
  }),

  http.get('http://localhost:3004/pandas/:key', ({ params }) => {
    const panda = pandas.find((p) => p.key === params.key);
    return HttpResponse.json(panda || { error: 'Panda not found' });
  }),
];
