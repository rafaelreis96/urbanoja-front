import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { CategoriasModule } from './../categorias/categorias.module';

import { LugaresRoutingModule } from './lugares-routing.module';

import { NovoLugarComponent } from './novo-lugar/novo-lugar.component';
import { ListLugarComponent } from './list-lugar/list-lugar.component';

@NgModule({
  declarations: [NovoLugarComponent, ListLugarComponent],
  imports: [
    CommonModule,
    LugaresRoutingModule,
    SharedModule,
    CategoriasModule
  ]
})
export class LugaresModule { }
