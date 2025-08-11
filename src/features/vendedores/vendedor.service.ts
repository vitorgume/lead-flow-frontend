import api from '../../utils/axios';
import type Vendedor from "../../models/vendedor/vendedor";
import type Response from "../../models/response";

export function listarTodosVendedores(): Promise<Response<Vendedor[]>> {
    return api.get<Response<Vendedor[]>>("/vendedores")
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar vendedores:", err);
            return {
                dado: {} as Vendedor[],
                erro: err
            }
        })
}

export function alterarStatusVendedor(novosDados: Vendedor): Promise<Response<Vendedor>> {
    return api.put<Response<Vendedor>>(`/vendedores/${novosDados.id}`, novosDados)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao alterar status vendedor:", err);
            return {
                dado: {} as Vendedor,
                erro: err
            }
        })
}  

export function deletarVendedor(idVendedor: number): void {
    api.delete<Response<Vendedor>>(`/vendedores/${idVendedor}`)
        .catch(err => {
            console.error("Erro ao deletar vendedor:", err);
        })
}


export function criarVendedor(novoVendedor: Vendedor): Promise<Response<Vendedor>> {
    return api.post<Response<Vendedor>>(`/vendedores`, novoVendedor)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao criar vendedor:", err);
            return {
                dado: {} as Vendedor,
                erro: err
            }
        })
}
