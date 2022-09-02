import { useState } from 'react';

import axios from 'axios';

import { Panda } from '../types/Panda';

const useCreatePanda = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSucess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error>();

  const createPanda = async (panda: Panda) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setError(undefined);

    try {
      const response = await axios.post('http://localhost:3004/pandas', {
        name: panda.name,
        interests: panda.interests,
        image: panda.image,
      });
      setIsSuccess(true);
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
    createPanda,
  };
};

export default useCreatePanda;
