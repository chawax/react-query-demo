import { Alert as ChakraAlert } from '@chakra-ui/react';
import { LuTriangleAlert } from 'react-icons/lu';

type AlertProps = {
  message: string;
};

const Alert = ({ message }: AlertProps) => (
  <ChakraAlert.Root status="error">
    <LuTriangleAlert />
    <ChakraAlert.Description>{message}</ChakraAlert.Description>
  </ChakraAlert.Root>
);

export default Alert;
