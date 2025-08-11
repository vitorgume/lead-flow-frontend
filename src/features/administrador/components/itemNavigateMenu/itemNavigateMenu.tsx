import './itemNavigateMenu.css';

interface ItemNavigateMenu {
    icone: string;
    nome: string;
    onClick: () => void;
    estado: boolean;
}

export default function ItemNavigateMenu({icone, nome, onClick, estado}: ItemNavigateMenu) {

    return (
        <div className={`item-navigate-container ${estado ? 'active-item-navigate' : ''}`} onClick={onClick}>
            <img src={icone} alt="Icone do item de navegação" />
            <span>{nome}</span>
        </div>
    )
}