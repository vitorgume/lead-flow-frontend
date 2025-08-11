import type Login from '../../models/login';
import type Response from '../../models/response';
import api from '../../utils/axios';

export function logar(telefone: string, senha: string): Promise<Response<Login>> {
    return api.post<Response<Login>>('/login', {telefone, senha})
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao logar administrador:", err);
            return {
                dado: {} as Login,
                erro: err
            }
        });
}