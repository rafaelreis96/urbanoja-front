import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Categoria } from 'src/app/admin/categorias/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private readonly baseUrl = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) { }

  add(categoria: Object): Observable<Categoria> {
    return this.http.post<Categoria>(this.baseUrl, categoria);
  }

  update(categoriaId: number, categoria: Object): Observable<Categoria>  {
    return this.http.put<Categoria>(`${this.baseUrl}/${categoriaId}`, categoria);
  }

  getById(categoriaId: number): Observable<Categoria>  {
    return this.http.get<Categoria>(this.baseUrl);
  }

  getListPaginated() {
    return this.http.get(this.baseUrl);
  }

  filterByNome(nome: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}?nome_like=${nome}`);
  }

  delete(categoriaId: number): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.baseUrl}/${categoriaId}`);
  }


}
