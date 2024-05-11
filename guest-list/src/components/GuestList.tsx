import Guest from './Guest';
import { GuestListProps } from './types';

function GuestList({ list, onAddInvaite }: GuestListProps) {
  return (
    <ul className="guest-list">
      {list.map((guest) => (
        <Guest key={guest.name} guest={guest} onAddInvaite={onAddInvaite} />
      ))}
    </ul>
  );
}

export default GuestList;
