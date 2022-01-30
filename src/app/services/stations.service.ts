import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Station} from '../interfaces/station';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  private url = 'https://v5.vbb.transport.rest';
  constructor(
    private http: HttpClient
  ) {
  }

 /**
  * Get the list of search related stations
  * 
  * @param query
  * @returns Station
  */
  async searchStations(query: string ): Promise<Station> {
    return await this.http.get<Station>(
      this.url + '/stations?query=' + query + '&limit=10')
    .toPromise();
  }

 /**
  * Get the data of station
  * 
  * @param stopId
  * @returns Station
  */
  async getStopData(stopId: string): Promise<Station> {
    return await this.http.get<Station>(
      this.url + '/stops/' + stopId +
      '/departures?suburban=true&subway=true&tram=true&bus=true&ferry=true&express=true&regional=true'
    )
    .toPromise();
  }


}
