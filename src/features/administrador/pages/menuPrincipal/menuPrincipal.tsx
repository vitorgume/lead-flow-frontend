import { useState } from 'react';
import NavigateMenu from '../../components/navigateMenu/navigateMenu';
import MenuVendedor from '../../../vendedores/pages/menuVendedor/menuVendedor';
import './menuPrincipal.css';
import Dashboard from '../dashboard/dashboard';

export default function MenuPrincipal() {
    const [menuVendedor, setMenuVendedor] = useState(false);
    const [menuDashboard, setMenuDashboard] = useState(true);

    function ativarMenuDashboard() {
        setMenuVendedor(false);
        setMenuDashboard(true);
    }

    function ativarMenuVendedor() {
        setMenuDashboard(false);
        setMenuVendedor(true);
    }

    return (
        <div className='menu-principal-page'>
            <NavigateMenu
                setMenuVendedor={() => ativarMenuVendedor()}
                estadoMenuVendedor={menuVendedor}
                setEstadoMenuDashboard={() => ativarMenuDashboard()}
                estadoDashboard={menuDashboard}
            />

            <div>
                {menuVendedor && 
                    <MenuVendedor/>
                }

                {menuDashboard &&
                    <Dashboard />
                }                
            </div>
        </div>
    )
}