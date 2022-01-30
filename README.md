# Small Project to Search the Transport Connections on Searched Station
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.
The project search and displays the transport connections i.e. train, bus, tram etc from the searched station.
 - It is using an [api](https://v5.vbb.transport.rest/) to get connections details from the searched station.
 - For the UI, [PrimeNG](https://v5.vbb.transport.rest/) is used.
 - The application keeps the track of searched stations.
 - Connection information is displayed which contains the direction, planned time, arrival time, and the medium of transport. It also displays the warnings which are associated witht the journey. 
 - It also have the function to favorite the stations.
 - Favorite station are displayed in a sortable list view.
 - The project also works in ofline mode with some limitations.
 - If the internet connection is not working, it displays the list of favorite sations and gives the results of searched stations. It displays the source and destination information of the trains. 


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


