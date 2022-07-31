import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { Panda } from '../types/Panda';

const usePandas = () => {
  return useQuery<Array<Panda>, Error>(['pandas'], () =>
    axios
      .get('http://localhost:3004/pandas')
      .then((response: AxiosResponse) => response.data),
  );
};

export default usePandas;
