import { Component, OnInit } from '@angular/core';
import {Station} from '../../interfaces/station';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {

  favStations: Array<Station> = [];
  constructor() { }

  ngOnInit(): void {
    const savedStations = JSON.parse(localStorage.getItem('moveInBerlin') || '[]');
    for (const key in savedStations) {
      if (savedStations.hasOwnProperty(key)) {
        this.favStations.push(savedStations[key]);
      }
    }
  }
}
