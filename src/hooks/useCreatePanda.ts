import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import type { Panda } from '@/types/Panda';

const useCreatePanda = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (panda: Panda) =>
      axios
        .post('http://localhost:3004/pandas', {
          name: panda.name,
          interests: panda.interests,
          image: panda.image,
        })
        .then((response) => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pandas'],
      });
    },
  });
};

export default useCreatePanda;
