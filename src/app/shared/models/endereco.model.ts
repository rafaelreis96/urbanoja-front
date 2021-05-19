import { Cidade } from './cidade.model';

export interface Endereco {
  rua: string;
  numero: number;
  bairro: string;
  cep: string;
  complemento: string;
  lat: number;
  lng: number;
  cidade: Cidade;
  formatado?: string;
}
