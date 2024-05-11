import ItemProps from './items.types';

type NewItemType = Pick<
  ItemProps,
  'id' | 'description' | 'packed' | 'quantity'
>;

export default NewItemType;
