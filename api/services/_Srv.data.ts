import { ArrayLocationsType } from './_Srv.types';
import TestData from './../data/locations.json';

// TEST - JSON DATA
/* 
  const arrayData: SelectedType[] = [];
  for(let i = 0; JSON_DATA.length > i; i++){
    const { id, latitude, longitude } = JSON_DATA[i];
    arrayData.push({id, latitude, longitude});
  }

 // const arrayData: ArrayDataType[] = JSON_DATA.map(({ id, latitude, longitude }) => ({ id, latitude, longitude }));
*/

export const JSON_DATA: Array<ArrayLocationsType> = TestData as Array<ArrayLocationsType>;
