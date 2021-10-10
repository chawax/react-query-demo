import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const useDeletePanda = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (key: string) =>
      axios
        .delete(`http://localhost:3004/pandas/${key}`)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('pandas');
      },
    },
  );
};

export default useDeletePanda;
