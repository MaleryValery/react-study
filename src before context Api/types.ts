export interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: IPosition;
  id: string;
}

export interface IPosition {
  lat: number;
  lng: number;
}

export interface ICountry {
  country: string;
  emoji: string;
}
