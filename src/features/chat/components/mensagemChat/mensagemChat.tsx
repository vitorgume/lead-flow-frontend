import type Autor from '../../../../models/autor';
import './mensagemChat.css';

interface MensagemChatProps {
    autor: Autor;
    mensagem: string;
    repetido: boolean;
}

export default function MensagemChat({ autor, mensagem, repetido }: MensagemChatProps) {
    return (
        <div className={`mensagem-container ${autor.tipo === 'usuario' ? '' : 'mensagem-container-agente'}`}>
            {!repetido && <p>{autor.nome}</p>}
            <div className={`mensagem-body ${autor.tipo === 'usuario' ? 'mensagem-body-usuario' : 'mensagem-body-agente'}`}>
                <p>{mensagem}</p>
            </div>
        </div>
    );
}