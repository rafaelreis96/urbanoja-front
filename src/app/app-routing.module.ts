import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'categorias', loadChildren: () => import('./admin/categorias/categorias.module').then(m => m.CategoriasModule) },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
