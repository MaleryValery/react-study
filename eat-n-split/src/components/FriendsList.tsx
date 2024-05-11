import { FriendProps } from '../types';
import Friend from './Friend';

type FriendsListProps = {
  list: FriendProps[];
  selectedFriend: FriendProps | undefined;
  onSelection: (friend: FriendProps) => void;
};

function FriendsList({ list, onSelection, selectedFriend }: FriendsListProps) {
  return (
    <ul>
      {list.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend!}
        />
      ))}
    </ul>
  );
}

export default FriendsList;
