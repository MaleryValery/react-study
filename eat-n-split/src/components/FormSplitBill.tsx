import Button from './Button';

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Splip a bill with friend</h2>
      <label htmlFor="bill-value">💰 Bill value</label>
      <input id="bill-value" type="text" />
      <label htmlFor="your-expense">😬 Your expanse</label>
      <input id="your-expense" type="text" />
      <label htmlFor="friend-expense">😲 Friend expanse</label>
      <input id="friend-expense" type="text" />
      <label htmlFor="who-paying">🤑 Who is payning the bill</label>
      <select name="" id="who-paying">
        <option value="you">you</option>
        <option value="friend">friend</option>
      </select>
      <Button title="Split Bill" />
    </form>
  );
}

export default FormSplitBill;
