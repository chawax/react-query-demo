import { useQuery } from '@tanstack/react-query';

import type { Panda } from '@/types/Panda';

const usePandas = () => {
  return useQuery<Array<Panda>, Error>({
    queryKey: ['pandas'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3004/pandas');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
  });
};

export default usePandas;
