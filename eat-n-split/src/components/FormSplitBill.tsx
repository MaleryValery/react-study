import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { FriendProps } from '../types';
import Button from './Button';

type FormSplitBillProps = {
  selectedFriend: FriendProps;
  onSplitBill: (value: number) => void;
};

function FormSplitBill({ selectedFriend, onSplitBill }: FormSplitBillProps) {
  const [bill, setBill] = useState<number>(0);
  const [paidByUser, setPaidByUser] = useState<number>(0);
  const [whoISpaying, setWhoISpaying] = useState('user');

  const paidByFriend = bill ? bill - paidByUser : 0;

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!bill) return;
    onSplitBill(whoISpaying === 'user' ? paidByFriend : -paidByUser);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Splip a bill with {selectedFriend.name}</h2>
      <label htmlFor="bill-value">💰 Bill value</label>
      <input
        id="bill-value"
        type="number"
        value={bill ?? ''}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setBill(Number(event.target.value))
        }
      />
      <label htmlFor="your-expense">😬 Your expanse</label>
      <input
        id="your-expense"
        type="number"
        max={bill ?? ''}
        value={paidByUser}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPaidByUser(
            bill !== null && Number(event.target.value) > bill
              ? paidByUser
              : Number(event.target.value)
          )
        }
      />
      <label htmlFor="friend-expense">{`😲 ${selectedFriend.name}'s expanse`}</label>
      <input id="friend-expense" type="number" disabled value={paidByFriend} />
      <label htmlFor="who-paying">🤑 Who is payning the bill</label>
      <select
        name=""
        id="who-paying"
        value={whoISpaying}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setWhoISpaying(event.target.value)
        }
      >
        <option value="user">you</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button title="Split Bill" onClick={handleSubmit} />
    </form>
  );
}

export default FormSplitBill;
