import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  return (
    <div
      role="button"
      className={styles.mapContainer}
      onClick={() => navigate('form')}
      onKeyDown={() => {}}
      tabIndex={0}
    >
      <h1>
        {lat}
        {lng}
      </h1>
      <button
        type="button"
        onClick={() => setSearchParams({ lat: '23', lng: '34' })}
      >
        back
      </button>
    </div>
  );
}

export default Map;
