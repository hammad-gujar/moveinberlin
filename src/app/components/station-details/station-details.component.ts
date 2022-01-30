import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {StationsService} from '../../services/stations.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Connection} from '../../helpers/connection';
import {Station} from '../../interfaces/station';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class StationDetailsComponent implements OnInit {
  params: any;
  favourite = false;
  stationName!: string;
  stationId!: string;
  stationData: Array<any> = [];
  favStations: Array<any> = [];
  status!: string;

  constructor(
    private routeParams: ActivatedRoute,
    private stationsService: StationsService,
    private connection: Connection,
  ) {
  }

  ngOnInit(): void {
    this.params = this.routeParams.params
      .subscribe((params: Params) => {
        this.stationId = params.stationId;
        if (this.stationId) {
            this.getStopDetails();
        }
      });
  }
  
  /**
  * Prepare selected stop details
  * 
  * @returns void
  */
  getStopDetails(): void {
    this.favourite = false;
    this.status = this.connection.getStatus();
    this.stationId = this.routeParams.snapshot.paramMap.get('stationId') || '';
    if (this.stationId) {
      this.stationData = [];
      if (this.status === 'ONLINE') {
        this.stationsService.getStopData(this.stationId)
          .then(stopData => {
            this.prepareViewData(stopData);
          });
      } else {
        this.favStations = JSON.parse(localStorage.getItem('moveInBerlin') || '[]');
        this.prepareViewData(this.favStations[this.findFavStationIndex()]);
      }
    }
  }
  
  /**
  * Prepare the stop detials data to display
  * 
  * @param stopData
  * @returns void
  */
  private prepareViewData(stopData: any): void {
    for (const key in stopData) {
      if (stopData.hasOwnProperty(key)) {
        this.stationData.push(stopData[key]);
      }
    }
    if (this.stationData.length) {
      this.stationId = this.stationData[0].stop.id;
      this.checkFavorite();
    }
  }

  
  /**
  * Check if the station is favorite or not
  * 
  * @returns void
  */
  private checkFavorite(): void {
    this.favStations = JSON.parse(localStorage.getItem('moveInBerlin') || '[]');
    const index = this.findFavStationIndex();
    if (index >= 0
        && index !== null) {
        this.favourite = true;
    }
  }

  
  /**
  * Toggle the favorite option for the station
  * 
  * @returns void
  */
  public toggleFavorite(): void {
    this.favStations = [];
    if (this.favourite) {
      this.favourite = false;
      this.favStations = JSON.parse(localStorage.getItem('moveInBerlin') || '[]');
      this.favStations = this.removeStation();
      localStorage.setItem('moveInBerlin', JSON.stringify(this.favStations));
    } else {
      this.favourite = true;
      if (localStorage.getItem('moveInBerlin') !== ''
      && localStorage.getItem('moveInBerlin') !== null) {
        this.favStations = JSON.parse(localStorage.getItem('moveInBerlin') || '[]');
      }
      this.favStations.push(this.stationData);
      localStorage.setItem('moveInBerlin', JSON.stringify(this.favStations));
    }
  }

  
  /**
  * Remoove the station from favorite list
  * 
  * @returns any
  */
  public removeStation(): any {
    const index = this.findFavStationIndex();
    return [
      ...this.favStations.slice(0, index),
      ...this.favStations.slice(index + 1)
    ];
  }

  /**
  * Find the index of favorite station
  * 
  * @returns any
  */
  private findFavStationIndex(): any{
    if (!this.favStations) {
      return null;
    }
    if (this.favStations !== null) {
      return this.favStations.findIndex((obj => obj[0].stop.id === this.stationId));
    } else {
      return null;
    }
  }



}
