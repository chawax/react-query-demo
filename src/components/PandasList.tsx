import { Flex, Text, VStack } from '@chakra-ui/react';

import PandaItem from '@/components/PandaItem';
import type { Panda } from '@/types/Panda';

export type PandasListProps = {
  /**
   * List of pandas
   */
  pandas: Array<Panda>;

  /**
   * A panda was pressed in the list
   * @param id id of the panda
   */
  onPress: (id: string) => void;
};

const PandasList = ({ pandas, onPress }: PandasListProps) => {
  return (
    <Flex width="full" role="list">
      <VStack width="inherit">
        {pandas.length > 0 ? (
          pandas.map((panda: Panda) => (
            <PandaItem
              key={panda.key}
              name={panda.name}
              onPress={() => onPress(panda.key!)}
            />
          ))
        ) : (
          <Text>Aucun panda n'a été trouvé !</Text>
        )}
      </VStack>
    </Flex>
  );
};

export default PandasList;
