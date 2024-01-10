import { MouseEvent, SyntheticEvent } from 'react';

type ButtonProps<T> = {
  title: string;
  onClick: (event?: MouseEvent | SyntheticEvent, data?: T) => void;
};

function Button<T>({ title, onClick }: ButtonProps<T>) {
  return (
    <button type="button" className="button" onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
