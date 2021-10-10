import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Panda } from '../../types/Panda';
import PandaItem from './PandaItem';

export type PandasListProps = {
  /**
   * Liste des pandas
   */
  pandas: Panda[];

  /**
   * Evénement déclenché lorsqu'on clique sur un panda dans la liste
   * @param id identifiant du panda
   */
  onPress(id: string): void;
};

const PandasList: React.FC<PandasListProps> = (props: PandasListProps) => {
  const { pandas } = props;
  return (
    <ListGroup>
      {pandas.length > 0 ? (
        pandas.map((panda: Panda) => (
          <PandaItem
            key={panda.key}
            name={panda.name}
            onPress={() => props.onPress(panda.key!)}
          />
        ))
      ) : (
        <ListGroupItem>Aucun panda n'a été trouvé !</ListGroupItem>
      )}
    </ListGroup>
  );
};

export default PandasList;
