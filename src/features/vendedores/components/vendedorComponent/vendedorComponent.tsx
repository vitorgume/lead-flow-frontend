import './vendedorComponent.css';
import MenuTresPontos from '../../../../assets/menu-tres-pontos.png';
import ModalMenuVendedor from '../modalMenuVendedor/modalMenuVendedor';
import { useState } from 'react';

export default function VendedorComponent() {
    const [modalMenu, setModalMenu] = useState<boolean>(false);
    const [inativo, setInativo] = useState<boolean>(false);

    function ativacaoVendedor() {
        setInativo(!inativo);
    }

    return (
        <div className='vendedor-container'>
            <div className="vendedor-component">
                <button className='btn-menu' onClick={() => setModalMenu(!modalMenu)}><img src={MenuTresPontos} alt="Menu três pontos" /></button>
                <h3>Nilza</h3>
                <button className='btn-inativar' style={{backgroundColor: inativo ? '#4DAB54' : '#F35236'}} onClick={() => ativacaoVendedor()}>{inativo ? 'Ativo' : 'Inativo'}</button>
            </div>

            {modalMenu && 
                <ModalMenuVendedor/>
            }
            
        </div>
    )
}