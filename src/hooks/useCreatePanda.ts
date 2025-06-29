import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Panda } from '@/types/Panda';

const useCreatePanda = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (panda: Panda) => {
      const response = await fetch('http://localhost:3004/pandas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: panda.name,
          interests: panda.interests,
          image: panda.image,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pandas'],
      });
    },
  });
};

export default useCreatePanda;
