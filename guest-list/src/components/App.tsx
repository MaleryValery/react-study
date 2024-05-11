import { useState } from 'react';
import Footer from './Footer';
import FormAddGuest from './FormAddGuest';
import GuestList from './GuestList';
import Header from './Header';
import { GuestProps } from './types';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [guestsList, setGuestsList] = useState<GuestProps[]>([]);

  const handlerToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddGuest = (newGuest: GuestProps) => {
    setGuestsList((list: GuestProps[]) => [...list, newGuest]);
  };

  const handleAddInvaite = (newInvaite: GuestProps) => {
    setGuestsList((list: GuestProps[]) =>
      list.map((el) =>
        el.name === newInvaite.name
          ? { ...el, invaite: newInvaite.invaite }
          : el
      )
    );
  };

  return (
    <div className="main-wrapper">
      <Header onToggleForm={handlerToggleForm} isFormShow={showForm} />
      {showForm && <FormAddGuest onAddNewGuest={handleAddGuest} />}
      <GuestList list={guestsList} onAddInvaite={handleAddInvaite} />
      <Footer invaiteList={guestsList} />
    </div>
  );
}

export default App;
