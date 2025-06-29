import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeletePanda = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (key: string) => {
      const response = await fetch(`http://localhost:3004/pandas/${key}`, {
        method: 'DELETE',
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

export default useDeletePanda;
