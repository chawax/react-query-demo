import { Heading, HStack, Image, Tag, VStack } from '@chakra-ui/react';

import { Panda } from '../types/Panda';

export type PandaDetailsProps = {
  panda: Panda;
};

const PandaDetails = ({
  panda: { name, interests, image },
}: PandaDetailsProps) => {
  return (
    <VStack spacing={10}>
      <Heading as="h1" colorScheme="blue">
        {name}
      </Heading>
      {interests && (
        <HStack spacing={5}>
          {interests.map((item) => (
            <Tag key={item} colorScheme="blue">
              {item}
            </Tag>
          ))}
        </HStack>
      )}
      <Image src={image} alt={name} marginTop={10} maxHeight={200} />
    </VStack>
  );
};

export default PandaDetails;
