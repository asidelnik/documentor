import L from 'leaflet';

export const customMarkerIcon = (index: number) => {
  return new L.DivIcon({
    html: `
      <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="250" height="250">
        <circle cx="125" cy="125" r="100" fill="#db7900"/>
        <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="100px" font-family="Arial" dy=".3em">${index}</text>
      </svg>
      
    `,
    className: '',
    iconSize: [34, 41],
    iconAnchor: [14, 41],
    popupAnchor: [1, -34],
  });
};