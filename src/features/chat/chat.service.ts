import api from '../../utils/axios';
import type Response from "../../models/response";
import type Chat from '../../models/chat';

export function consultarChat(idChat: string): Promise<Response<Chat>> {
    return api.get<Response<Chat>>(`/chats/${idChat}`)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar chat:", err);
            return {
                dado: {} as Chat,
                erro: err
            }
        })
}