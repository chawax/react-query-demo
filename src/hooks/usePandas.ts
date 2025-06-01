import { useQuery } from '@tanstack/react-query';
import axios, { type AxiosResponse } from 'axios';

import type { Panda } from '@/types/Panda';

const usePandas = () => {
  return useQuery<Array<Panda>, Error>({
    queryKey: ['pandas'],
    queryFn: () =>
      axios
        .get('http://localhost:3004/pandas')
        .then((response: AxiosResponse) => response.data),
  });
};

export default usePandas;
