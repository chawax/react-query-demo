import React, { useContext } from 'react';
import DisplayModeContext from '../../context/DisplayModeContext';

const styles = {
  enabled: {
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  disabled: {
    cursor: 'pointer',
    fontWeight: 'normal',
  },
};

export type ChooseDisplayModeProps = {
  code: string;
  label: string;
};

const ChooseDisplayMode = (props: ChooseDisplayModeProps) => {
  const { displayMode, toggleDisplayMode } = useContext(DisplayModeContext);

  const style: React.CSSProperties =
    displayMode === props.code
      ? (styles.enabled as React.CSSProperties)
      : (styles.disabled as React.CSSProperties);

  return (
    <span style={style} onClick={toggleDisplayMode}>
      {props.label}
    </span>
  );
};

export default ChooseDisplayMode;
