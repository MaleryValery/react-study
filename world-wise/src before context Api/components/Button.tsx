import { ReactNode, SyntheticEvent } from 'react';
import styles from './Button.module.css';

interface IButton {
  children: ReactNode;
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
  typeBtn: string;
}
function Button({ children, onClick, typeBtn }: IButton) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[typeBtn]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
