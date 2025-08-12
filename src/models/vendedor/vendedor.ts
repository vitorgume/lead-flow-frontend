import type Prioridade from "./prioridade";
import type Regiao from "./regiao";
import type Segmento from "./segmento";

export default interface Vendedor {
    id?: number | null;
    nome: string;
    telefone: string;
    inativo: boolean;
    segmentos: string[];
    regioes: string[];
    prioridade: Prioridade;
}