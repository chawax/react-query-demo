import { Heading, HStack, Image, Tag, VStack } from '@chakra-ui/react';

import type { Panda } from '@/types/Panda';

export type PandaDetailsProps = {
  panda: Panda;
};

const PandaDetails = ({
  panda: { name, interests, image },
}: PandaDetailsProps) => {
  return (
    <VStack gap={10}>
      <Heading as="h1" colorScheme="blue">
        {name}
      </Heading>
      {interests && (
        <HStack gap={5}>
          {interests.map((item) => (
            <Tag.Root key={item} colorScheme="blue">
              <Tag.Label>{item}</Tag.Label>
            </Tag.Root>
          ))}
        </HStack>
      )}
      <Image src={image} alt={name} marginTop={10} maxHeight={200} />
    </VStack>
  );
};

export default PandaDetails;
