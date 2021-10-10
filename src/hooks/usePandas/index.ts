import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { Panda } from '../../types/Panda';

const usePandas = () => {
  return useQuery<Panda[], Error>('pandas', () =>
    axios
      .get('http://localhost:3004/pandas')
      .then((response: AxiosResponse) => response.data),
  );
};

export default usePandas;
