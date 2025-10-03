import type Cliente from "./cliente";
import type Mensagem from "./mensagem";

export default interface Chat {
    id: string;
    dataCriacao: string;
    cliente: Cliente;
    mensagensChat: Mensagem[];
}