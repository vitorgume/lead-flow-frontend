import './modalMenuVendedor.css';
import DeletarVendedor from '../../../../assets/deletar-vendedor.png';
import EditarVendedor from '../../../../assets/editar-vendedor.png';

interface ModalMenuVendedorProps {
    onClikDeletar: () => void;
    onClickEditar: () => void;
}

export default function ModalMenuVendedor({ onClikDeletar, onClickEditar }: ModalMenuVendedorProps) {
    return (
        <div className='modal-menu-vendedor'>
            <button className='btn-menu-modal-deletar' onClick={() => onClikDeletar()}><img src={DeletarVendedor} alt="Imagem deletar" /></button>
            <button className='btn-menu-modal-editar' onClick={() => onClickEditar()} ><img src={EditarVendedor} alt="Imagem editar" /></button>
        </div>
    )
}
