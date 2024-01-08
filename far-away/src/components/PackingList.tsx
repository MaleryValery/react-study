import Item, { ItemProps } from './Item';

type PackingListProps = {
  initialItems: ItemProps[];
  onDeleteItem: (id: number) => void;
};

function PackingList({ initialItems, onDeleteItem }: PackingListProps) {
  return (
    <div className="list">
      <ul>
        {initialItems.map((el) => (
          <Item
            key={el.id}
            id={el.id}
            description={el.description}
            packed={el.packed}
            quantity={el.quantity}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default PackingList;
