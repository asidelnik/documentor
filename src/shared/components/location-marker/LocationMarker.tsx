import { useState } from 'react';
import { useMapEvents, Marker, Circle } from 'react-leaflet';
import { ILocationMarkerProps } from '../../../types/ILocationMarkerProps';
import { markerIcon } from '../../../utils/customIcons';

export function LocationMarker({ center, radius, setCenter }: ILocationMarkerProps) {
  const [innerCenter, setInnerCenter] = useState(center);

  useMapEvents({
    click(e) {
      setCenter(e.latlng);
      setInnerCenter([e.latlng.lat, e.latlng.lng]);
    },
  });
  return (
    innerCenter === null ? null : (
      <Circle center={innerCenter} pathOptions={{ fillColor: 'blue' }} radius={radius}>
        <Marker position={innerCenter} icon={markerIcon()}></Marker>
      </Circle>
    )
  )
}
