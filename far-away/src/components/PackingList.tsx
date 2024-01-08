import { ChangeEvent, useState } from 'react';
import { ACTIONS_OPTIONS, SORTING_SETINGS } from '../constants/const';
import NewItemType from '../types/newItem.types';
import Item from './Item';

type PackingListProps = {
  initialItems: NewItemType[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onClearList: () => void;
};

function PackingList({
  initialItems,
  onDeleteItem,
  onToggleItem,
  onClearList,
}: PackingListProps) {
  const [sort, setSort] = useState('input');

  let sortedItems: NewItemType[] = initialItems;

  if (sort === SORTING_SETINGS.descriptions)
    sortedItems = initialItems
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sort === SORTING_SETINGS.packed)
    sortedItems = initialItems
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setSort(event.target.value);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((el) => (
          <Item
            key={el.id}
            id={el.id}
            description={el.description}
            packed={el.packed}
            quantity={el.quantity}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sort} onChange={handleChange}>
          {ACTIONS_OPTIONS.map((item) => (
            <option value={item.type} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={onClearList}>
          Clear list
        </button>
      </div>
    </div>
  );
}

export default PackingList;
