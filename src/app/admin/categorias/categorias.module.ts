import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { AutocompleteCategoriasComponent } from './autocomplete-categorias/autocomplete-categorias.component';


@NgModule({
  declarations: [AutocompleteCategoriasComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    SharedModule
  ],
  exports: [
    AutocompleteCategoriasComponent
  ]
})
export class CategoriasModule { }
