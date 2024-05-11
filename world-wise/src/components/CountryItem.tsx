import styles from './CountryItem.module.css';

function CountryItem({ country, emoji }: { country: string; emoji: string }) {
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
