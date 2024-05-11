type ItemProps = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
};

export default ItemProps;
