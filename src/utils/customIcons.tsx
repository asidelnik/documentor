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

export const markerIcon = () => {
  return new L.DivIcon({
    html:
      `<svg width="36px" height="36px" viewBox="0 -960 960 960" fill="#d22314" xmlns="http://www.w3.org/2000/svg">
        <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"/>
      </svg>`,
    className: '',
    // iconSize: [30, 40],
    iconAnchor: [18, 18],
    popupAnchor: [0, -41],
  });
};