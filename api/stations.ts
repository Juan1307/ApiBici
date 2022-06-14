import type { VercelRequest, VercelResponse } from '@vercel/node';

import { CoordinatesType } from './services/_Srv.types';
import { EntContainer } from './entities/EntContainer';
import EntDependency from './entities/EntDependency';

import { setTypeNumber, checkPrmIsNumber, checkPrmIsString } from './ApiValidator'

export default async (request: VercelRequest, response: VercelResponse) => {
  const { latitude = 0, longitude = 0, distance = 0, 
          engine = 'default' } = request.query; //default values 
  
  if(checkPrmIsNumber(latitude, longitude, distance) || checkPrmIsString(engine)){
    response.status(400).send('Bad request: 400 - Please Check the URL API values');
  } 

  const n_latitude = setTypeNumber(latitude),
        n_longitude = setTypeNumber(longitude),
        n_distance = setTypeNumber(distance),
        d_engine = String(engine);

  const data: CoordinatesType = { n_latitude, n_longitude, n_distance };

  //set engine resource by strategy
  const [ currentResource, currentMethod ] = EntContainer[d_engine];
  const currentInstance = new EntDependency(currentResource, data); //pass class and data 
  await currentInstance.getStationsFromAdapter(); //you can config to db or json true = bd , false = json

  const result = currentInstance[currentMethod](); //execute dinamyc function

  response.status(200).json({ data: result, total: result.length, engine: d_engine });
};