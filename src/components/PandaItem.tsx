import React from 'react';
import { Badge, ListGroupItem } from 'reactstrap';

export type PandaItemProps = {
  name: string;
  onPress(): void;
};

const styles = {
  badge: {
    marginRight: 20,
    padding: 10,
    borderRadius: 30,
    width: 30,
    height: 30,
  },
};

const PandaItem = (props: PandaItemProps) => (
  <ListGroupItem onClick={props.onPress}>
    <Badge color="primary" style={styles.badge}>
      {props.name.substring(0, 1)}
    </Badge>
    {props.name}
  </ListGroupItem>
);

export default PandaItem;
