import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type LinkButtonProps = {
  children: ReactNode;
  linkTo: string;
};

function LinkButton({ children, linkTo }: LinkButtonProps) {
  const navigate = useNavigate();
  const className = 'text-sm hover:underline text-blue-500 hover:text-blue-600';

  if (linkTo === '-1') {
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  }
  return (
    <Link className={className} to={linkTo}>
      {children}
    </Link>
  );
}

export default LinkButton;
