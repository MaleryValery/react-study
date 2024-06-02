import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  linkTo: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, linkTo, ...rest }: ButtonProps) {
  const className =
    'inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wider transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed disabled:hover:bg-yellow-400 sm:px-6 sm:py-4';

  if (linkTo) {
    return (
      <Link to={linkTo} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}

export default Button;
