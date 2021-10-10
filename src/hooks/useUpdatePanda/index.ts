import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Panda } from '../../types/Panda';

const useUpdatePanda = () => {
  const queryCache = useQueryClient();
  return useMutation(
    (panda: Panda) =>
      axios
        .put(`http://localhost:3004/pandas/${panda.key}`, panda)
        .then((response) => response.data),
    {
      onSuccess: (result) => {
        queryCache.invalidateQueries('pandas');
      },
    },
  );
};

export default useUpdatePanda;
