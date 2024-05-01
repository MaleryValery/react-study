import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Form.module.css';
import Button from './Button';
import Message from './Message';
import Spinner from './Spinner';
import BackButton from './BackButton';
import { ICityFromGeo } from '../types';
import { formatDate, convertToEmoji } from '../utils/functions';

import { useUrlPosition } from '../hooks/useUrlPosition';

function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [geoError, setGeoError] = useState('');
  const navigate = useNavigate();

  const urlForCity = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeo(true);
        setGeoError('');
        const response = await fetch(urlForCity);
        const data: ICityFromGeo = await response.json();
        if (!data.countryName)
          throw new Error(
            'I guess this is not discovered place, you can click on another place 🧭'
          );
        console.log('🚀 ~ fetchCityData ~ data:', data);
        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        if (error instanceof Error) setGeoError(error.message);
      } finally {
        setIsLoadingGeo(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeo) return <Spinner />;
  if (geoError) return <Message message={geoError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDate(new Date(e.target.value))
          }
          value={formatDate(date.toDateString())}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => {}} typeBtn="primary">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
