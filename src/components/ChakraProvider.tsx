import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

const Provider = (props: React.PropsWithChildren) => {
  return (
    <ChakraProvider value={defaultSystem}>{props.children}</ChakraProvider>
  );
};

export default Provider;
