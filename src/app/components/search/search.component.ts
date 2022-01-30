import {StationsService} from './../../services/stations.service';
import {Component} from '@angular/core';
import {FilterService} from 'primeng/api';
import {Router} from '@angular/router';
import {Connection} from '../../helpers/connection';
import {Station} from '../../interfaces/station';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [FilterService]
})
export class SearchComponent {
  searchStations!: Station;
  filteredStations!: any;
  totalFavorites!: number;
  savedStationsQuery: Array<Station> = [];
  stationId!: string;
  status!: string;

  constructor(
    private stationsService: StationsService,
    private router: Router,
    private connection: Connection
  ) {}

 /**
  * Get the result of searched stations
  * @param  event
  * @returns void
  */
  public filterStation(event: any): void {
    this.status = this.connection.getStatus();
    if (this.status === 'ONLINE') {
      this.stationsService.searchStations(event.query)
        .then(stations => {
          this.prepareSearchResult(stations);
        });
    } else {
      const savedStations = JSON.parse(localStorage.getItem('moveInBerlinQueries') || '[]');
      this.prepareSearchResult(savedStations);
    }
  }

 /**
  * Navigate to station details
  * 
  * @param station
  * @returns void
  */
  public showStationDetails(station: Station): void {
    this.stationId = station.id;
    this.saveQuery(station);
    this.router.navigate(['/stationDetail/' + station.id]);
  }
  
 /**
  * Prepare searched query result
  * 
  * @param station
  * @returns script version
  */
  private prepareSearchResult(stations: any): void {
    const filtered: Array<any> = [];
    for (const key in stations) {
      if (stations.hasOwnProperty(key)) {
        filtered.push(stations[key]);
      }
    }
    this.filteredStations = filtered;
  }

 /**
  * Save the searched query
  * 
  * @param station
  * @returns void
  */
  private saveQuery(station: Station): void {
    if (this.stationId) {
      this.savedStationsQuery = [];
      this.savedStationsQuery = JSON.parse(localStorage.getItem('moveInBerlinQueries') || '[]');
      if (this.savedStationsQuery !== null) {
        this.savedStationsQuery = JSON.parse(localStorage.getItem('moveInBerlinQueries') || '[]');
      }
      if (this.findFavStationIndex() === -1) {
        this.savedStationsQuery.push({id: this.stationId, name: station.name});
        localStorage.setItem('moveInBerlinQueries', JSON.stringify(this.savedStationsQuery));
      }

    }
  }
  
 /**
  * Find the the index of favourite station in saved station
  * 
  * @param {station} Station
  * @returns script version
  */
  private findFavStationIndex(): any{
    if (!this.savedStationsQuery) {
      return null;
    }
    if (this.savedStationsQuery !== null) {
      return this.savedStationsQuery.findIndex(((obj: any) => obj.id === this.stationId));
    } else {
      return null;
    }
  }
}
