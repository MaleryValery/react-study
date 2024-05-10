import { useParams } from 'react-router-dom';
import styles from './City.module.css';
import { useEffect } from 'react';
import { useCities } from '../contexts/CitiesContext';
import Spinner from './Spinner';
import BackButton from './BackButton';
import { formatDate } from '../utils/functions';

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    if (!id) return;
    getCity(id);
  }, [id, getCity]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCity?.emoji}</span> {currentCity?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCity?.cityName} on</h6>
        <p>{formatDate(currentCity?.date ?? '')}</p>
      </div>

      {currentCity?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCity.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCity?.cityName} on Wikipedia &rarr;
        </a>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
