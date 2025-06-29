import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Panda } from '@/types/Panda';

const useUpdatePanda = () => {
  const queryCache = useQueryClient();
  return useMutation({
    mutationFn: async (panda: Panda) => {
      const response = await fetch(
        `http://localhost:3004/pandas/${panda.key}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(panda),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryCache.invalidateQueries({
        queryKey: ['pandas'],
      });
    },
  });
};

export default useUpdatePanda;
