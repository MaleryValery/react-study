import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { INITIAL_STATE, MAX_QUANTITY } from '../constants/const';
import NewItemType from '../types/newItem.types';

type FormProps = {
  onAddItems: (item: NewItemType) => void;
};

function Form({ onAddItems }: FormProps) {
  const [description, setDescription] = useState(INITIAL_STATE.description);
  const [quantity, setQuantyity] = useState(INITIAL_STATE.quantity);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }
  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setQuantyity(Number(event.target.value));
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription(INITIAL_STATE.description);
    setQuantyity(INITIAL_STATE.quantity);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?👀</h3>
      <select onChange={handleSelectChange} value={quantity}>
        {Array.from({ length: MAX_QUANTITY }, (_, i) => i + 1).map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="add item"
        value={description}
        onChange={handleInputChange}
      />
      <button type="submit" disabled={!description}>
        Add
      </button>
    </form>
  );
}

export default Form;
