import {
  AlertDescription,
  AlertIcon,
  Alert as ChakraAlert,
} from '@chakra-ui/react';

type AlertProps = {
  message: string;
};

const Alert = ({ message }: AlertProps) => (
  <ChakraAlert status="error">
    <AlertIcon />
    <AlertDescription>{message}</AlertDescription>
  </ChakraAlert>
);

export default Alert;
