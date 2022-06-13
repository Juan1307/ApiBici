import client from './../connect/DbConnect';

import { CoordinatesType, ArrayLocationsType, ArrayDistanceLocationsType } from './../services/_Srv.types';
import { JSON_DATA } from './../services/_Srv.data';

import type { SrvEngineType } from './EntContainer';
import { SrvDefault, SrvGoogle, SrvLibrary  } from './EntContainer';

export interface EntDependencyInterface {
  getDistanceDefault: () => ArrayDistanceLocationsType[],
  getDistanceLibrary: () => ArrayDistanceLocationsType[],
  getDistanceGoogle: () => ArrayDistanceLocationsType[]
}

class Stations {
  public async getStationsFromJson() {
    return JSON_DATA;
  }

  public async getStationsFromDatabase() {
    const { rows } = await client.query("SELECT * FROM tbl_stations");
    return rows as ArrayLocationsType[];
  }
}

class EntDependency extends Stations implements EntDependencyInterface {

  protected currentStations: ArrayLocationsType[] = [];
  private instance: SrvEngineType | any; // oops any dont here, but ts-heck dont read typeof class
  private data: CoordinatesType;

  constructor (instance: SrvEngineType, data: CoordinatesType) {
    super();
    this.instance = instance; //set dinamyc class
    this.data = data;
  }

  public async getStationsFromAdapter(adapter = false) {
    this.currentStations = (adapter) ? await this.getStationsFromDatabase():
                                       await this.getStationsFromJson();
  }

  public getDistanceDefault() {
    const currentSrv: SrvDefault = new this.instance(this.data); //by SrvDefault.ts
    return currentSrv.getDistanceEntry(this.currentStations);
  }

  public getDistanceLibrary() {
    const currentSrv: SrvLibrary = new this.instance(this.data); //by SrvLibrary.ts
    return currentSrv.getDistanceEntry(this.currentStations);
  }

  public getDistanceGoogle(){
    const currentSrv: SrvGoogle = new this.instance(this.data); //by SrvGoogle.ts
    return currentSrv.getDistanceEntry(this.currentStations);
  }
}

export default EntDependency;