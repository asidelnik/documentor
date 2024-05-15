export type LocationType = {
  type: string;
  coordinates: string[];
  heading: number;
};

type LatLng = {
  lat: number;
  lng: number;
};

export type LocationOption = {
  id: number;
  label: string;
  value: LatLng;
};
