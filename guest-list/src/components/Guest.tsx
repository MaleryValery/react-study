import { useState } from 'react';
import Button from './UI/Button';
import { GuestCardProps, GuestProps } from './types';

function Guest({ guest, onAddInvaite }: GuestCardProps) {
  const { name, email, invaite } = guest;
  const [isInvaited, setIsInvaited] = useState(false);

  const handleAddInvaite = (curGuest: GuestProps) => {
    setIsInvaited(!isInvaited);
    const newGuest = { ...curGuest, invaite: !invaite };
    onAddInvaite(newGuest);
  };

  return (
    <li className="guest">
      <div className="guest-content">
        <p className="guest-name">{name}</p>
        <p className="guest-email">{email}</p>
      </div>
      <Button
        title={isInvaited ? '✅' : '+'}
        onClick={() => handleAddInvaite(guest)}
      />
    </li>
  );
}

export default Guest;
