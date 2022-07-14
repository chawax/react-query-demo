import { Avatar, Box, HStack, Text } from '@chakra-ui/react';

export type PandaItemProps = {
  name: string;
  onPress: () => void;
};

const PandaItem = ({ name, onPress }: PandaItemProps) => (
  <Box width="inherit" onClick={onPress} role="listitem">
    <HStack spacing={10}>
      <Avatar bg="blue.500" size="sm" name={name.substring(0, 1)} />
      <Text>{name}</Text>
    </HStack>
  </Box>
);

export default PandaItem;
