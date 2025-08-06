import './modalAtivacaoVendedor.css';

interface ModalAtivacaoVendedorProps {
    nomeVendedor: string;
    ativacao: boolean;
}

export default function ModalAtivacaoVendedor({ nomeVendedor, ativacao }: ModalAtivacaoVendedorProps) {
    return (
        <div className='modal-ativacao-vendedor'>
            <div className='text-modal-ativacao'>
                <p>Deseja {ativacao ? 'ativar' : 'desativar'}</p>
                <p className='nome-vendedor'>{nomeVendedor}</p>
                <p>?</p>
            </div>

            <div className='botoes-modal-ativacao'>
                <button className='btn-ativacao btn-chamativo'>Não</button>

                <button className='btn-ativacao btn-nao-chamativo'>Sim</button>
            </div>
        </div>
    )
}