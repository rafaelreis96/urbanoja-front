
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AgmCoreModule } from '@agm/core';

import { environment } from './../../environments/environment';

import { CustomMatTableComponent } from './components/custom-mat-table/custom-mat-table.component';
import { ButtonNovoComponent } from './components/button-novo/button-novo.component';
import { ButtonSalvarComponent } from './components/button-salvar/button-salvar.component';
import { ButtonCancelarComponent } from './components/button-cancelar/button-cancelar.component';
import { EnderecoComponent } from './components/endereco/endereco.component';
import { SearchGmapComponent } from './components/search-gmap/search-gmap.component';
import { BoxUploadComponent } from './components/box-upload/box-upload.component';

const COMPONENTS = [
  CustomMatTableComponent,
  EnderecoComponent,
  SearchGmapComponent,
  ButtonNovoComponent,
  ButtonSalvarComponent,
  ButtonCancelarComponent,
  BoxUploadComponent
]

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.keyMaps,
      libraries: ['places']
    }),

  ],
  exports: [
    COMPONENTS,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
