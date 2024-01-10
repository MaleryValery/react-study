import Button from './Button';
import { FriendProps } from '../types';

type FriendProp = {
  friend: FriendProps;
  selectedFriend: FriendProps;
  onSelection: (friend: FriendProps) => void;
};

function Friend({ friend, onSelection, selectedFriend }: FriendProp) {
  const { name, image, balance } = friend;
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={image} alt="friend" />
      {name}
      {balance < 0 && (
        <p className="red">
          You own {name} ${Math.abs(balance)}
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          Your friend {name} owns ${Math.abs(balance)}
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}
      <Button
        title={!isSelected ? 'Select' : 'Close'}
        onClick={() => onSelection(friend)}
      />
    </li>
  );
}

export default Friend;
