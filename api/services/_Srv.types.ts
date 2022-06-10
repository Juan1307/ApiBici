
export interface ArrayLocationsType {
  id: number,
  name: string,
  obcn: string,
  location: string,
  latitude: number,
  longitude: number,
  status: string
}

export interface ArrayDistanceLocationsType extends ArrayLocationsType {
  distance: number
}

export interface CoordinatesType {
  n_latitude: number,
  n_longitude: number,
  n_distance: number
} 