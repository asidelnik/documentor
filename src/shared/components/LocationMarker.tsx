import { useState } from 'react';
import { useMapEvents, CircleMarker, Marker } from 'react-leaflet';
import { ILocationMarkerProps } from '../../types/ILocationMarkerProps';
import { markerIcon } from '../../utils/customIcons';

export function LocationMarker({ center, radius, setCenter }: ILocationMarkerProps) {
  const [innerCenter, setInnerCenter] = useState(center);

  useMapEvents({
    click(e) {
      setCenter(e.latlng);
      setInnerCenter([e.latlng.lat, e.latlng.lng]);
    },
    // TODO - research why zoom makes the marker bigger?
    // zoomend(e) {
    //   console.log('zoomend', e);
    // }
  });
  return (
    innerCenter === null ? null : (
      <CircleMarker center={innerCenter} pathOptions={{ fillColor: 'blue' }} radius={radius}>
        <Marker position={innerCenter} icon={markerIcon()}></Marker>
      </CircleMarker>
    )
  )
}
