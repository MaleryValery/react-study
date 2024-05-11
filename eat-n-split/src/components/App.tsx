import { useState } from 'react';
import Button from './Button';
import FormAddFriend from './FormAddFriend';
import FormSplitBill from './FormSplitBill';
import FriendsList from './FriendsList';
import initialFriends from '../constants';
import { FriendProps } from '../types';

function App() {
  const [isShow, setIsShow] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState<FriendProps>();

  const handleSplittBill = (value: number) => {
    setFriends((friendsArr) =>
      friendsArr.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  };

  const handleToggle = () => {
    setIsShow((show) => !show);
  };

  const handleSelection = (friend: FriendProps) => {
    setSelectedFriend((curFriend) =>
      curFriend?.id === friend.id ? undefined : friend
    );
    setIsShow(false);
  };

  const handleAddFriend = (friend: FriendProps) => {
    setFriends((list) => [...list, friend]);
    setIsShow(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          list={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend!}
        />
        <Button
          title={isShow ? 'Close' : 'Add Friend'}
          onClick={handleToggle}
        />
        {isShow && <FormAddFriend onAddFriend={handleAddFriend} />}
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplittBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

export default App;
