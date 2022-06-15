interface CoordinatesPointerType {
  latitude: number, 
  longitude: number
}

const checkIfTheSameCoordinates = ({latitude, longitude}: CoordinatesPointerType, currLat: number, currLng: number) => {
  return currLat === latitude && currLng === longitude; 
}
const checkIfTheExactDistance = (currDistance: number, distance: number, status: string) => currDistance <= distance && status === 'IN_SERVICE';

export { checkIfTheSameCoordinates, checkIfTheExactDistance }