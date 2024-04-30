import { useParams, useSearchParams } from 'react-router-dom';
import styles from './City.module.css';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import Spinner from './Spinner';
import BackButton from './BackButton';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(date ? new Date(date) : Date.now());

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  // TEMP DATA

  // const { cityName, emoji, date, notes } = currentCity;

  useEffect(() => {
    if (!id) return;
    getCity(id);
  }, [id]);

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
