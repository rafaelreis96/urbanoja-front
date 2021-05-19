export interface Cidade {
  id: number;
  nome: string;
  estado: {
    id: number;
    nome: string;
    sigla: string;
  }
}
