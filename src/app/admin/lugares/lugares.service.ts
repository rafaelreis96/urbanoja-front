import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { Lugar } from '@shared/models/lugar.model';
import { Mensagem } from '@shared/models/mensagem.model';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {
  private readonly baseUrl = `${environment.apiUrl}/lugares`;

  constructor(private http: HttpClient) { }

  cadastrar(lugar: Lugar) : Observable<Mensagem> {
    return this.http.post<Mensagem>(`${this.baseUrl}`, lugar);
  }

  atualizar(id: number, lugar: Lugar) : Observable<Mensagem> {
    return this.http.put<Mensagem>(`${this.baseUrl}/${id}`, lugar);
  }

  obterPorId(id: number) : Observable<Lugar> {
    return this.http.delete<Lugar>(`${this.baseUrl}/${id}`);
  }

  obterListaPaginada(id: number) : Observable<Lugar> {
    return this.http.delete<Lugar>(`${this.baseUrl}/${id}`);
  }

  excluir(id: number) : Observable<Mensagem> {
    return this.http.delete<Mensagem>(`${this.baseUrl}/${id}`);
  }

}
