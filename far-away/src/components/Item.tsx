import ItemProps from '../types/items.types';

function Item({
  id,
  description,
  quantity,
  packed,
  onDeleteItem,
  onToggleItem,
}: ItemProps) {
  // function handleChange() {}

  return (
    <li id={`${id}`}>
      <input
        type="checkbox"
        checked={packed}
        onChange={() => onToggleItem(id)}
      />
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </span>
      <button type="button" onClick={() => onDeleteItem(id)}>
        ❌
      </button>
    </li>
  );
}

export default Item;
