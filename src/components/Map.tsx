import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
  const { cities } = useCities();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (!lat || !lng) return;
    setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (!geolocationPosition) return;
    setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div
      role="button"
      className={styles.mapContainer}
      onKeyDown={() => {}}
      tabIndex={0}
    >
      {!geolocationPosition && (
        <Button typeBtn="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading..' : 'Use your positions'}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => {
          return (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: [number, number] }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e: any) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}

export default Map;
