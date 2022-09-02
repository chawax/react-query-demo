import { useEffect, useState } from 'react';

import axios, { AxiosResponse } from 'axios';

import { Panda } from '../types/Panda';

const usePandas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Array<Panda>>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const loadPandas = async () => {
      setIsSuccess(false);
      setIsError(false);
      setIsLoading(true);
      setError(undefined);
      setData(undefined);
      try {
        const response: AxiosResponse = await axios.get(
          'http://localhost:3004/pandas',
        );
        setIsSuccess(true);
        setData(response.data);
      } catch (error) {
        setIsError(true);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPandas();
  }, []);

  return {
    isLoading,
    isSuccess,
    data,
    isError,
    error,
  };
};

export default usePandas;
