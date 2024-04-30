import { Link } from 'react-router-dom';
import { ICity } from '../types';
import styles from './CityItem.module.css';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function CityItem({ city }: { city: ICity }) {
  const querySrting = `${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`;

  return (
    <li>
      <Link className={styles.cityItem} to={`${querySrting}`}>
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button type="button" className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
