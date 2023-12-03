import React from 'react';
import styles from './Button.module.css';

const Button = (props: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  text:
    | string
    | number
    | boolean
    | React.ReactElement<string>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <button className={styles.btnPrimary} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
