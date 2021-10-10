import React from 'react';
import { Badge, Jumbotron } from 'reactstrap';
import { Panda } from '../../types/Panda';

export type PandaDetailsProps = {
  panda: Panda;
};

const PandaDetails = (props: PandaDetailsProps) => {
  return (
    <Jumbotron>
      <h1>{props.panda.name}</h1>
      {props.panda.interests && (
        <div>
          {props.panda.interests.map((item, index) => (
            <Badge key={index} pill color="danger" style={{ marginRight: 5 }}>
              {item}
            </Badge>
          ))}
        </div>
      )}
      <div style={{ marginTop: 10 }}>
        <img src={props.panda.image} alt={props.panda.name} />
      </div>
    </Jumbotron>
  );
};

export default PandaDetails;
