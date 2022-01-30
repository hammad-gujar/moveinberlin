import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { StationListComponent } from './components/station-list/station-list.component';
import { StationDetailsComponent } from './components/station-details/station-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {SliderModule} from 'primeng/slider';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {Connection} from './helpers/connection';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    StationListComponent,
    StationDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    TableModule,
    ButtonModule,
    SliderModule,
    DialogModule,
    ContextMenuModule,
    DropdownModule,
    ToastModule,
    InputTextModule
  ],
  providers: [
    { provide: Connection }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
