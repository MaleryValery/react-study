import NewItemType from '../types/newItem.types';

type StatProrps = {
  items: NewItemType[];
};

function Stats({ items }: StatProrps) {
  if (!items.length)
    return <footer className="stats">Start your packing 🚀</footer>;

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const persantage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      {persantage === 100
        ? 'Tou got evething and reagy to go ✈️'
        : `👜 You have ${numItems} items on your list, and you have packed ${numPacked}
      (${persantage >= 0 ? persantage : 0}%)`}
    </footer>
  );
}

export default Stats;
