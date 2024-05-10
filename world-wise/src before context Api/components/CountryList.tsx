import { ICity, ICountry } from '../types';
import CountryItem from './CountryItem';

import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

interface ICountryList {
  cities: ICity[];
  isLoading: boolean;
}

function CountryList({ cities, isLoading }: ICountryList) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;

  const countries = cities.reduce((arr: ICountry[], city) => {
    if (!arr.map((el: ICountry) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country: ICountry) => (
        <CountryItem
          key={country.country}
          country={country.country}
          emoji={country.emoji}
        />
      ))}
    </ul>
  );
}

export default CountryList;
