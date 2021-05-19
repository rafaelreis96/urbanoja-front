/// <reference types="@types/googlemaps" />
import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

export interface PlaceMap {
  rua?: string;
  numero?: number;
  bairro?: string;
  lat?: number;
  lng?: number;
  cidade?: string;
  estado?: string;
}

@Component({
  selector: 'app-search-gmap',
  templateUrl: './search-gmap.component.html',
  styleUrls: ['./search-gmap.component.scss']
})
export class SearchGmapComponent implements OnInit {
  titulo = "Pesquisar no Maps";
  place: PlaceMap = {};
  enderecoFormatado: string;
  lat = 0;
  lng = 0;
  zoom = 15;
  geoCoder: any;

  @ViewChild('pesquisa') searchElement: ElementRef;

  constructor(private ngZone: NgZone, private mapsAPILoader: MapsAPILoader,) { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    this.mapsAPILoader.load().then(() => {
      this.localizacaoAtual();
      this.geoCoder = new google.maps.Geocoder;
    });
  }

  localizacaoAtual() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }, error => {
        alert("Não foi possivel encontrar sua localização!");
     });
    }else {
      alert("Navegador sem suporte para geolocalização!");
    }
  }

  enderecoAtual() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.encontrarEnderecoPorCoordenadas( this.lat = position.coords.latitude, this.lng = position.coords.longitude );
      }, error => {
         alert("Não foi possivel encontrar sua localização!")
      });
    }
  }

  encontrarEnderecoPorCoordenadas(latitude: number, longitude: number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        this.prepararDadosDeEndereco(results[0]);
        this.enderecoFormatado = results[0].formatted_address;
      } else {
        throw new Error(`Falha no geocoder! Erro: ${status}`);
      }
    });
  }

  pesquisarPlaces() {
    if(typeof google !== 'object') {
      return;
    }

    const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {
      componentRestrictions: {country: 'BR'},
      //types: ["address"]
    });

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run( () => {
        const place = autocomplete.getPlace();

        if(place) {
          //console.log(place);
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.prepararDadosDeEndereco(place);
        }
      });
    });
  }

  prepararDadosDeEndereco(place: any) {
    this.place.lat = place.geometry.location.lat();
    this.place.lng = place.geometry.location.lng();
    this.enderecoFormatado = place.formatted_address;

    if(place['address_components']) {
      place.address_components.forEach(address => {
        if(address.types.indexOf('route') !== -1){
          this.place.rua = address.long_name;
        } else if(address.types.indexOf('sublocality_level_1') !== -1) {
          this.place.bairro = address.long_name;
        } else if(address.types.indexOf('administrative_area_level_2') !== -1) {
          this.place.cidade = address.long_name;
        } else if(address.types.indexOf('administrative_area_level_1') !== -1) {
          this.place.estado = address.long_name;
        }
      });
    }

    //console.log(this.place)
  }

  markerDragEnd(event: google.maps.MouseEvent) {
    this.encontrarEnderecoPorCoordenadas(this.lat = event.latLng.lat(), this.lng = event.latLng.lng());
  }

  minhaLocalizacao() {
    this.localizacaoAtual();
    this.encontrarEnderecoPorCoordenadas(this.lat, this.lng);
  }

  cancelar() {
    this.place = null;
  }

}
