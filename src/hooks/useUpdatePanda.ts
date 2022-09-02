import { useState } from 'react';

import axios from 'axios';

import { Panda } from '../types/Panda';

const useUpdatePanda = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSucess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error>();

  const updatePanda = async (panda: Panda) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setError(undefined);

    try {
      const response = await axios.put(
        `http://localhost:3004/pandas/${panda.key}`,
        panda,
      );
      return response;
    } catch (error) {
      setIsError(true);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isSucess,
    isError,
    error,
    updatePanda,
  };
};

export default useUpdatePanda;
