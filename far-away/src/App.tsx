import { useState } from 'react';
import Form from './components/Form';
import Logo from './components/Logo';
import PackingList from './components/PackingList';
import Stats from './components/Stats';
import { ItemProps } from './components/Item';

function App() {
  const [items, setItems] = useState<ItemProps[]>([]);

  function handleAddItems(item: ItemProps) {
    setItems((currentItems) => [...currentItems, item]);
  }

  function handleDeleteItem(id: number) {
    setItems((currentItems) => currentItems.filter((el) => el.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList initialItems={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

export default App;
