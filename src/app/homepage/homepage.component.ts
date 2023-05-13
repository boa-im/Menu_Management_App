import {Component} from '@angular/core';
import {DatabaseService} from "../../services/database.service";

declare var H: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  lat: any;
  lng: any;

  constructor(private database: DatabaseService) {
  }

  ngOnInit() {
    this.database.initDB();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = 43.479517542726434;
        this.lng = -80.51856194739065;
        console.info('lat : ' + this.lat);
        console.info('lng : ' + this.lng);
      }, (err)=>{
        alert(err);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  public btnShow_click() {
    document.getElementById('mapContainer')!.innerHTML = '';
    // Initialize the platform object:
    var platform = new H.service.Platform({
      'apikey': 'yuWAtVAG2I45P9m6F0_MYWMe8ZG_S7UujN54w0jwkgE'
    });
    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();
    var options = {
      zoom: 15,
      center: {
        lat: this.lat, lng: this.lng
      }
    };
    // Instantiate (and display) a map object:
    var map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.vector.normal.map,
      options
    );
    var icon = new H.map.Icon('assets/img/location.png', {size: {w: 40, h: 40}});
    var marker = new H.map.Marker({
      lat: this.lat, lng: this.lng
    }, {icon: icon});
    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
  }
}
