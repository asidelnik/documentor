import { LatLngLiteral } from 'leaflet';

export interface IMapSelectLatLng {
  lat?: number;
  lng?: number;
  radius: number;
  setCenter: (center: LatLngLiteral) => void;
}
