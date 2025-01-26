import L from 'leaflet';

export const markerIconText = (index: number) => {
  return new L.DivIcon({
    html:
      `<svg width="30" height="41" viewBox="0 0 30 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C6.7 0 0 6.7 0 15C0 27 15 41 15 41C15 41 30 27 30 15C30 6.7 23.3 0 15 0Z" fill="hsl(5, 83%, 45%)"/>
        <text x="15" y="18" text-anchor="middle" fill="white" font-size="16px" font-family="Roboto" font-weight="900" dy=".3em">${index}</text>
      </svg>`,
    className: '',
    iconSize: [30, 41],
    iconAnchor: [15, 41],
    popupAnchor: [0, -41],
  });
};