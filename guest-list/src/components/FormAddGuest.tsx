import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { GuestProps } from './types';

type FormAddGuestProps = {
  onAddNewGuest: (guest: GuestProps) => void;
};

function FormAddGuest({ onAddNewGuest }: FormAddGuestProps) {
  const [guestName, setGuestName] = useState('');
  const [guesEmail, setGuestEmail] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current !== null) ref.current.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!guesEmail || !guestName) return;

    const newGuest = {
      name: guestName,
      email: guesEmail,
      invaite: false,
    };

    onAddNewGuest(newGuest);
    setGuestEmail('');
    setGuestName('');
    if (ref.current !== null) ref.current.focus();
  };

  return (
    <form
      className="form-add-guest"
      onSubmit={(e: FormEvent) => handleSubmit(e)}
    >
      <label htmlFor="name-guest"> name </label>
      <input
        id="name-guest"
        type="text"
        ref={ref}
        value={guestName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setGuestName(e.target.value)
        }
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') handleSubmit(e);
        }}
      />
      <label htmlFor="email-guest">email</label>
      <input
        id="email-guest"
        type="text"
        value={guesEmail}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setGuestEmail(e.target.value)
        }
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') handleSubmit(e);
        }}
      />
    </form>
  );
}

export default FormAddGuest;
