import { Avatar, Box, HStack, Text } from '@chakra-ui/react';

export type PandaItemProps = {
  name: string;
  onPress: () => void;
};

const PandaItem = ({ name, onPress }: PandaItemProps) => (
  <Box width="inherit" onClick={onPress} role="listitem">
    <HStack gap={10}>
      <Avatar.Root>
        <Avatar.Fallback>{name.substring(0, 1)}</Avatar.Fallback>
      </Avatar.Root>
      <Text>{name}</Text>
    </HStack>
  </Box>
);

export default PandaItem;
