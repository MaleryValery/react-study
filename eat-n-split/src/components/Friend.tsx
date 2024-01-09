import Button from './Button';

type FriendProp = {
  name: string;
  image: string;
  balance: number;
};

function Friend({ name, image, balance }: FriendProp) {
  return (
    <li>
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
      <Button title="Select" />
    </li>
  );
}

export default Friend;
