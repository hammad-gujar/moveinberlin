import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {StationDetailsComponent} from './components/station-details/station-details.component';
import {StationListComponent} from './components/station-list/station-list.component';

const routes: Routes = [
  {path: '', component: StationListComponent},
  {path: 'stationDetail/:stationId', component: StationDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
