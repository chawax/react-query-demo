import { ChakraProvider } from '@chakra-ui/react';

import Router from './components/Router';

const App = () => {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
};

export default App;
