import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Panda } from '../types/Panda';

const useCreatePanda = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (panda: Panda) =>
      axios
        .post('http://localhost:3004/pandas', {
          name: panda.name,
          interests: panda.interests,
          image: panda.image,
        })
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['pandas']);
      },
    },
  );
};

export default useCreatePanda;
