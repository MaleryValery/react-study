import { ReactNode } from 'react';

type NavProps = {
  children: ReactNode;
};

function Nav({ children }: NavProps) {
  return <nav className="nav-bar">{children}</nav>;
}

export default Nav;
