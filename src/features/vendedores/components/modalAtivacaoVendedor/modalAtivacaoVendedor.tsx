import './modalAtivacaoVendedor.css';

interface ModalAtivacaoVendedorProps {
    nomeVendedor: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    delecao: boolean;
}

export default function ModalAtivacaoVendedor({
    nomeVendedor,
    isOpen,
    onCancel,
    onConfirm,
    delecao
}: ModalAtivacaoVendedorProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div
                className="modal-ativacao-vendedor"
                onClick={e => e.stopPropagation()}
            >
                {delecao ?
                    <div className="text-modal-ativacao">
                        <p>Deseja deletar </p>
                        <p className="nome-vendedor">{nomeVendedor}</p>
                        <p>?</p>
                    </div>
                    :
                    <div className="text-modal-ativacao">
                        <p>Deseja alterar o status de </p>
                        <p className="nome-vendedor">{nomeVendedor}</p>
                        <p>?</p>
                    </div>
                }


                <div className="botoes-modal-ativacao">
                    <button
                        className="btn-padrao btn-nao-chamativo"
                        onClick={onCancel}
                    >
                        Não
                    </button>
                    <button
                        className="btn-padrao btn-chamativo"
                        onClick={onConfirm}
                    >
                        Sim
                    </button>
                </div>
            </div>
        </div>
    );
}