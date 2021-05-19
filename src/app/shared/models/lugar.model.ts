import { Endereco } from './endereco.model';

export interface Lugar {
  id?: number;
  nome: string;
  categoria: string;
  sobre?: string;
  celular?: number;
  telefone?: number;
  site?: string;
  facebook?: string;
  instagram?: string;
  endereco: Endereco;
}
