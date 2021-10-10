import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { Panda } from '../../types/Panda';

const usePandaDetails = (key: string) => {
  return useQuery<Panda, Error>(['pandas', key], () =>
    axios
      .get(`http://localhost:3004/pandas/${key}`)
      .then((response: AxiosResponse) => response.data),
  );
};

export default usePandaDetails;
