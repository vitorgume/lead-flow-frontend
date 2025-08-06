import VendedorComponent from '../components/vendedorComponent/vendedorComponent';
import './menuVendedor.css';

export default function MenuVendedor() {
    return (
        <div className='menu-vendedor-page'>
            <h2>Vendedores</h2>

            <div className='vendedor-list'>
                <VendedorComponent />
                <VendedorComponent />
                <VendedorComponent />
                <VendedorComponent />
            </div>


            <button className='btn-novo'>Novo</button>
        </div>
    )
}