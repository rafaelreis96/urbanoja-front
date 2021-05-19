import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListLugarComponent } from './list-lugar/list-lugar.component';


const routes: Routes = [
  { path: '', component:  ListLugarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LugaresRoutingModule { }
