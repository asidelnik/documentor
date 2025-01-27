import c from './LocationFilterMap.module.scss';
import { MapContainer, TileLayer } from 'react-leaflet';
import { IMapSelectLatLng } from '../../../types/IMapSelectLatLng';
import { LatLngLiteral, LatLngTuple } from 'leaflet';
import { LocationMarker } from '../LocationMarker';
import MarkerIconUrl from '../../../assets/icons/location_on.svg';

export default function LocationFilterMap({ lat, lng, radius, setCenter }: IMapSelectLatLng) {
  const center: LatLngTuple | null = lat && lng ? [lat, lng] : null;

  function setCenterHandler(center: LatLngLiteral) {
    setCenter(center);
  }

  return (
    <div className={c.map}>
      <MapContainer
        center={[32.0853, 34.7818]}
        zoom={13}
        style={{ height: "100vh", width: "100%", cursor: `url("${MarkerIconUrl}"), pointer` }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        />
        <LocationMarker center={center} setCenter={setCenterHandler} radius={radius} />
      </MapContainer>
    </div>
  );
}