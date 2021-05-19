import { Pagination } from './../../shared/components/custom-mat-table/custom-mat-table.model';

export interface Categoria {
  id?: number;
  nome: string;
  descricao?: string;
  subactegorias?: Subcategoria[];
}

export interface Subcategoria {
  id?: number;
  nome: string;
}

export interface ListPaginatedCategoria {
  data: Categoria[];
  pagination: Pagination;
}
