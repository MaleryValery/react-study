import initialFriends from '../constants';
import Friend from './Friend';

function FriendsList() {
  return (
    <ul>
      {initialFriends.map((friend) => (
        <Friend
          key={friend.id}
          name={friend.name}
          image={friend.image}
          balance={friend.balance}
        />
      ))}
    </ul>
  );
}

export default FriendsList;
