export interface ILocation {
  type: string;
  coordinates: [number, number];
}

export interface ILocationTexts {
  country?: string;
  city?: string;
  address?: string;
}

// postalCode?: string; // Optional postal code for more precise filtering
// timezone?: string; // Optional timezone for time-based filtering
// region?: string;
