import LogoLeadFlow from '../../../../assets/Logo-lead-flow.png';
import IconeMenuNavigate from '../../../../assets/icon-item.png'
import ItemNavigateMenu from '../itemNavigateMenu/itemNavigateMenu';
import DashboardIcon from '../../../../assets/dashboard_11053695 1.png';
import './navigateMenu.css';

interface NavigateMenuProps {
    setMenuVendedor: () => void;
    setEstadoMenuDashboard: () => void;
    estadoMenuVendedor: boolean;
    estadoDashboard: boolean;
}

export default function NavigateMenu({setMenuVendedor, estadoMenuVendedor, setEstadoMenuDashboard, estadoDashboard}: NavigateMenuProps) {

    return (
        <div className='navigate-container'>
            <header className='header-navigate'>
                <img src={LogoLeadFlow} alt="" />
            </header>
            <hr />
            <nav className='lista-itens-navigates'>
                <ItemNavigateMenu
                    icone={DashboardIcon}
                    nome="Dashboard"
                    onClick={() => setEstadoMenuDashboard()}
                    estado={estadoDashboard}
                />

                <ItemNavigateMenu
                    icone={IconeMenuNavigate}
                    nome="Vendedores"
                    onClick={() => setMenuVendedor()}
                    estado={estadoMenuVendedor}
                />
            </nav>
        </div>
    )
}