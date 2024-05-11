import { useState } from 'react';
import Form from './Form';
import Logo from './Logo';
import PackingList from './PackingList';
import Stats from './Stats';
import NewItemType from '../types/newItem.types';
import Modal from './Modal';

function App() {
  const [items, setItems] = useState<NewItemType[]>([]);
  const [isModal, setIsModal] = useState(false);

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

  function handleShowModal() {
    setIsModal(true);
  }

  function handleClearList() {
    setItems([]);
    setIsModal(false);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        initialItems={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToddleItem}
        onShowModal={handleShowModal}
      />
      <Stats items={items} />
      <Modal
        isHiden={isModal}
        onConfirm={handleClearList}
        onCancel={() => setIsModal(false)}
      />
    </div>
  );
}

export default App;
