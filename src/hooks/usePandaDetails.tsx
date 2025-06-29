import { useQuery } from '@tanstack/react-query';

import type { Panda } from '@/types/Panda';

const usePandaDetails = (key: string) => {
  return useQuery<Panda, Error>({
    queryKey: ['pandas', key],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3004/pandas/${key}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
  });
};

export default usePandaDetails;
