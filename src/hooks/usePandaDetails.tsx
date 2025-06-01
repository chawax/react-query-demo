import { useQuery } from '@tanstack/react-query';
import axios, { type AxiosResponse } from 'axios';

import type { Panda } from '@/types/Panda';

const usePandaDetails = (key: string) => {
  return useQuery<Panda, Error>({
    queryKey: ['pandas', key],
    queryFn: () =>
      axios
        .get(`http://localhost:3004/pandas/${key}`)
        .then((response: AxiosResponse) => response.data),
  });
};

export default usePandaDetails;
