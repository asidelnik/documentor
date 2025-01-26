import { MapContainer, TileLayer } from 'react-leaflet';
import { IMapSelectLatLng } from '../../types/IMapSelectLatLng';
import { LatLngLiteral, LatLngTuple } from 'leaflet';
import { LocationMarker } from './LocationMarker';

export default function MapSelectLatLng({ lat, lng, radius, setCenter }: IMapSelectLatLng) {
  const center: LatLngTuple | null = lat && lng ? [lat, lng] : null;

  function setCenterHandler(center: LatLngLiteral) {
    console.log('setCenterHandler', center);
    setCenter(center);
  }

  return (
    <MapContainer center={[32.0853, 34.7818]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      />
      <LocationMarker center={center} setCenter={setCenterHandler} radius={radius} />
    </MapContainer>
  );
}