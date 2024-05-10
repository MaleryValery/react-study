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

export interface ICityFromGeo {
  latitude: number;
  lookupSource: string;
  longitude: number;
  localityLanguageRequested: string;
  continent: string;
  continentCode: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  city: string;
  locality: string;
  postcode: string;
  plusCode: string;
  localityInfo: {
    administrative: IAdministrative[];

    informative: IAdministrative[];
  };
}

interface IAdministrative {
  name?: string;
  description?: string;
  isoName?: string;
  order?: number;
  adminLevel?: number;
  isoCode?: string;
  wikidataId?: string;
  geonameId?: number;
}

export interface IUser {
  [key: string]: string;
}
