import './vendedorComponent.css';
import MenuTresPontos from '../../../../assets/menu-tres-pontos.png';
import ModalMenuVendedor from '../modalMenuVendedor/modalMenuVendedor';
import { useState } from 'react';

interface VendedorComponentProps {
    nome: string;
    inativo: boolean;
    onClickAtivar: (delecao: boolean) => void;
    onClickAtivarForms: (edicao: boolean) => void;
}

export default function VendedorComponent({ nome, inativo, onClickAtivar, onClickAtivarForms }: VendedorComponentProps) {

    const [modalMenu, setModalMenu] = useState(false);

    return (
        <div className='vendedor-container'>
            <div className="vendedor-component">
                <button
                    className='btn-menu'
                    onClick={() => setModalMenu(!modalMenu)}
                ><img src={MenuTresPontos} alt="Três pontos menu" /></button>

                <h3>{nome}</h3>
                <button
                    className='btn-inativar'
                    style={{ backgroundColor: inativo ? '#F35236' : '#4DAB54' }}
                    onClick={() => onClickAtivar(false)}
                >
                    {inativo ? 'Inativo' : 'Ativo'}
                </button>
            </div>

            {modalMenu && 
                <ModalMenuVendedor 
                    onClikDeletar={() => onClickAtivar(true)} 
                    onClickEditar={() => onClickAtivarForms(true)}
                />
            }
        </div>
    )
}