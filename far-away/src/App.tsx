import { useState } from 'react';
import Form from './components/Form';
import Logo from './components/Logo';
import PackingList from './components/PackingList';
import Stats from './components/Stats';
import NewItemType from './types/newItem.types';

function App() {
  const [items, setItems] = useState<NewItemType[]>([]);

  function handleAddItems(item: NewItemType) {
    setItems((currentItems) => [...currentItems, item]);
  }

  function handleDeleteItem(id: number) {
    setItems((currentItems) => currentItems.filter((el) => el.id !== id));
  }

  function handleToddleItem(id: number) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        initialItems={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToddleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
