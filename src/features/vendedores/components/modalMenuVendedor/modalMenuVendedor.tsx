import './modalMenuVendedor.css';
import DeletarVendedor from '../../../../assets/deletar-vendedor.png';
import EditarVendedor from '../../../../assets/editar-vendedor.png';


export default function ModalMenuVendedor() {

    function deletarVendedor() {

    }

    function editarVendedor() {
        
    }

    return (
        <div className='modal-menu-vendedor'>
            <button className='btn-menu-modal' onClick={() => deletarVendedor()}><img src={DeletarVendedor} alt="Imagem deletar" /></button>
            <button className='btn-menu-modal' onClick={() => editarVendedor()} ><img src={EditarVendedor} alt="Imagem editar" /></button>
        </div>
    )
}
