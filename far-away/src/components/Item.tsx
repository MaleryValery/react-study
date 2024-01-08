export type ItemProps = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
  onDeleteItem: (id: number) => void;
};

function Item({ id, description, quantity, packed, onDeleteItem }: ItemProps) {
  return (
    <li id={`${id}`}>
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
