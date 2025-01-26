import { LatLngLiteral, LatLngTuple } from 'leaflet';


export interface ILocationMarkerProps {
  center: LatLngTuple | null;
  radius: number;
  setCenter: (center: LatLngLiteral) => void;
}
