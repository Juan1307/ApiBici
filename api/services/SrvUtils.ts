interface CoordinatesPointerType {
  latitude: number, 
  longitude: number
}

const checkIfTheSameCoordinates = ({latitude, longitude}: CoordinatesPointerType, currLat: number, currLng: number) => {
  return currLat === latitude && currLng === longitude; 
}
const checkIfTheExactDistance = (currDistance: number, distance: number) => currDistance <= distance;

export { checkIfTheSameCoordinates, checkIfTheExactDistance }