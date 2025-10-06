import type Prioridade from "./prioridade";

export default interface Vendedor {
    id?: number | null;
    nome: string;
    telefone: string;
    inativo: boolean;
    segmentos: string[];
    regioes: string[];
    prioridade: Prioridade;
}