import { ReactNode } from 'react';

function MainSection({ children }: { children: ReactNode }) {
  return <div className="main">{children}</div>;
}

export default MainSection;
