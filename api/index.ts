import type { VercelRequest, VercelResponse } from '@vercel/node';

import { CoordinatesType } from './services/_Srv.types';
import { EntContainer } from './entities/EntContainer';
import EntDependency from './entities/EntDependency';

import { setTypeNumber, checkPrmIsNumber, checkPrmIsString } from './ApiValidator'

export default async (request: VercelRequest, response: VercelResponse) => {
  const { latitude = 0, longitude = 0, distance = 0, 
          engine = 'default' } = request.query; //default values 
  
  if(checkPrmIsNumber(latitude, longitude, distance) || checkPrmIsString(engine)){
    response.status(400).send('Bad request: 400 - check the URL_API values');
  } 

  const n_latitude = setTypeNumber(latitude),
        n_longitude = setTypeNumber(longitude),
        n_distance = setTypeNumber(distance),
        d_engine: string = String(engine);

  const data: CoordinatesType = { n_latitude, n_longitude, n_distance };

  //set engine resource by strategy
  const [ currentResource, currentMethod ] = EntContainer[d_engine];
  const currentInstance = new EntDependency(currentResource, data); //pass class and data 
  const result = await currentInstance[currentMethod](); //pass data to dinamyc function 

  response.status(200).json({
    body: result,
    query: request.query,
    cookies: request.cookies 
  })

  // response.status(200).send(`Hello from ${latitude + longitude + distance}!`);
};