import { IVideo } from '../../types/IVideo';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { customMarkerIcon } from '../../utils/customMarkerIcon';

interface IEventMap {
  videos: IVideo[];
}

export default function EventMap({ videos }: IEventMap) {
  if (!videos || videos.length <= 0) return null;
  return (
    <>
      <h3>Event map</h3>
      <MapContainer
        bounds={videos.map(video => [video.startLocation.coordinates[0], video.startLocation.coordinates[1]])}
        style={{ width: '100%', height: '600px' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        />
        {videos.map((video: IVideo, index: number) => (
          <Marker
            key={video._id}
            icon={customMarkerIcon(index + 1)}
            position={[video.startLocation.coordinates[0], video.startLocation.coordinates[1]]}>
            <Popup>
              {video.startLocation.type}
            </Popup>
          </Marker>
        ))}
        <Polyline
          positions={videos.map(video => [video.startLocation.coordinates[0], video.startLocation.coordinates[1]])}
          pathOptions={{ color: 'hsl(0, 0%, 30%)', weight: 5 }}
        />
      </MapContainer>
    </>
  )
}