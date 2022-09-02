import { useState } from 'react';

import axios from 'axios';

const useDeletePanda = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSucess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error>();

  const deletePanda = async (key: string) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setError(undefined);

    try {
      const response = await axios.delete(
        `http://localhost:3004/pandas/${key}`,
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
    deletePanda,
  };
};

export default useDeletePanda;
