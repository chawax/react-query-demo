import * as React from 'react';

import DisplayModeContext from '../context/DisplayModeContext';

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

const ChooseDisplayMode = ({ code, label }: ChooseDisplayModeProps) => {
  const { displayMode, toggleDisplayMode } =
    React.useContext(DisplayModeContext);

  const style: React.CSSProperties =
    displayMode === code
      ? (styles.enabled as React.CSSProperties)
      : (styles.disabled as React.CSSProperties);

  return (
    <span style={style} onClick={toggleDisplayMode}>
      {label}
    </span>
  );
};

export default ChooseDisplayMode;
