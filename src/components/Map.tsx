import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { Marker, Popup, TileLayer } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cities } = useCities();
  const navigate = useNavigate();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const [mapPosition, setMapPosition] = useState<[number, number]>([Number(lat), Number(lng)]);
  return (
    <div role="button" className={styles.mapContainer} onKeyDown={() => {}} tabIndex={0}>
      <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => {
          return (
            <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
