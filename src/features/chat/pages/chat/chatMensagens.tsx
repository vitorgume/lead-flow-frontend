import './chatMensagens.css';
import logoLeadFlow from '../../../../assets/log-leadflow-black.svg';
import MensagemChat from '../../components/mensagemChat/mensagemChat';
import { useEffect, useState } from 'react';
import { consultarChat } from '../../chat.service';
import type Chat from '../../../../models/chat';
import { useParams } from 'react-router-dom';
import { formatDateTime, formatPhone, formatRegiao, formatSegmento } from '../../../../utils/formatters';
import type Mensagem from '../../../../models/mensagem';;

export default function ChatMensagens() {
    const { idChat } = useParams<{ idChat: string }>();
    const [chat, setChat] = useState<Chat>({} as Chat);

    const mapperAutor = (mensagem: Mensagem) => {
        return {
            nome: mensagem.responsavel === 'usuario' ? chat.cliente?.nome || 'Cliente' : 'Robô',
            tipo: mensagem.responsavel
        };
    };

    useEffect(() => {
        if (!idChat) return;
        consultarChat(idChat).then((response) => {
            if (response.erro) {
                console.error('Erro ao carregar chat:', response.erro);
                return;
            }

            console.log(response.dado);

            if (response.dado) setChat(response.dado);
        });
    }, [idChat]);

    return (
        <div className='chat-container'>
            {chat?.cliente && (
                <section className='info-cliente-container'>
                    <div className='info-cliente'>
                        <h1>{chat.cliente.nome || 'Cliente'}</h1>

                        <div className='info-cliente-dados'>
                            <p className='info-cliente-dados-titulo'>Dados: </p>
                            <p>{formatPhone(chat.cliente.telefone) || 'N/A'}</p>
                            <p>{formatRegiao(chat.cliente.regiao) || 'N/A'}</p>
                            <p>{formatSegmento(chat.cliente.segmento) || 'N/A'}</p>
                        </div>
                    </div>

                    <p>{formatDateTime(chat.dataCriacao) || 'N/A'}</p>
                </section>
            )}

            <section className='chat-mensagens-container'>
                <img src={logoLeadFlow} alt='Logo Lead Flow' />

                <div className='chat-mensagens-body'>
                    {chat.mensagensChat && chat.mensagensChat.map((mensagem, index, arr) => (
                        <MensagemChat
                            key={mensagem.id ?? `${mensagem.responsavel}-${mensagem.data}-${index}`}
                            autor={mapperAutor(mensagem)}
                            mensagem={mensagem.conteudo}
                            repetido={index > 0 && mensagem.responsavel === arr[index - 1].responsavel}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
