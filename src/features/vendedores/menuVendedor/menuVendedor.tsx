import { useState } from 'react';
import ModalAtivacaoVendedor from '../components/modalAtivacaoVendedor/modalAtivacaoVendedor';
import VendedorComponent from '../components/vendedorComponent/vendedorComponent';
import './menuVendedor.css';

export default function MenuVendedor() {
    const [modalAtivacao, setModalAtivacao] = useState<boolean>(false);


    return (
        <div className='menu-vendedor-page'>
            <h2>Vendedores</h2>

            <div className='vendedor-list'>
                <VendedorComponent 
                    ativacao={() => {
                        setModalAtivacao(true);
                    }}
                />
                <VendedorComponent 
                    ativacao={() => {
                        setModalAtivacao(true);
                    }}
                />
                <VendedorComponent 
                    ativacao={() => {
                        setModalAtivacao(true);
                    }}
                />
                <VendedorComponent 
                    ativacao={() => {
                        setModalAtivacao(true);
                    }}
                />
            </div>


            <button className='btn-novo'>Novo</button>

            {modalAtivacao && 
                <ModalAtivacaoVendedor 
                nomeVendedor='Nilza'
                ativacao={true}
            />
            }
        </div>
    )
}