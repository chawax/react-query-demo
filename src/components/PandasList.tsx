import { Flex, Text, VStack } from '@chakra-ui/react';

import { Panda } from '../types/Panda';
import PandaItem from './PandaItem';

export type PandasListProps = {
  /**
   * List of pandas
   */
  pandas: Panda[];

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
