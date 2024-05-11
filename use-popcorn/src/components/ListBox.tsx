import { ReactNode, useState } from 'react';

type ListBoxProp = {
  children: ReactNode;
};

function ListBox({ children }: ListBoxProp) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        type="button"
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}

export default ListBox;
