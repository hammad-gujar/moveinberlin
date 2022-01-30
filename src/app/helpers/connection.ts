import {Component, Injectable, OnInit} from '@angular/core';
import { ConnectionService } from 'ngx-connection-service';

@Injectable()
export class Connection {
  hasNetworkConnection!: boolean;
  hasInternetAccess!: boolean;
  status!: string;

  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe(currentState => {
      this.hasNetworkConnection = currentState.hasNetworkConnection;
      this.hasInternetAccess = currentState.hasInternetAccess;
      if (this.hasNetworkConnection) {
        this.status = 'ONLINE';
      } else {
        this.status = 'OFFLINE';
      }
    });
  }

  /**
  * Returns network connection status
  * 
  * @returns {boolean}
  */
  getStatus(): string {
    return this.status;
  }
}
