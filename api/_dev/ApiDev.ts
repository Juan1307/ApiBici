import SrvDefault from './../services/SrvDefault';
import { JSON_DATA } from './../services/_Srv.data';

const data = { n_latitude: 20.66769,
               n_longitude: -103.368252,
               n_distance: 200 //distance
             };

const intance = new SrvDefault(data);
const nearStations = intance.getDistanceEntry(JSON_DATA);

console.log(nearStations);