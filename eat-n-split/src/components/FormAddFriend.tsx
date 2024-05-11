import { ChangeEvent, SyntheticEvent, useState } from 'react';
import Button from './Button';
import { FriendProps } from '../types';

type FormAddFriendProps = {
  onAddFriend: (friend: FriendProps) => void;
};

function FormAddFriend({ onAddFriend }: FormAddFriendProps) {
  const [name, setName] = useState('');
  const [img, setImg] = useState('https://i.pravatar.cc/48');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImg(event.target.value);
  };

  const handleSubmit = (event?: SyntheticEvent) => {
    event?.preventDefault();
    if (!name || !img) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${img}?=${id}`,
      balance: 0,
      id,
    };
    onAddFriend(newFriend);
    setName('');
    setImg('https://i.pravatar.cc/48');
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="friend-name">👯‍♀️ Friend name</label>
      <input
        id="friend-name"
        type="text"
        value={name}
        onChange={handleNameChange}
      />
      <label htmlFor="image-url">🌄 Image Url</label>
      <input
        id="image-url"
        type="text"
        value={img}
        onChange={handleImgChange}
      />
      <Button title="Add" onClick={handleSubmit} />
    </form>
  );
}

export default FormAddFriend;
