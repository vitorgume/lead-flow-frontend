import './radioBoxPadrao.css';

interface RadioBoxPadrao {
    label: string;
    name: string;           
    checked: boolean;       
    onChange: () => void;
}

export default function RadioBoxPadrao({ label, name, checked, onChange }: RadioBoxPadrao) {
    return (
        <label className="radiobox-container">
            <input 
                type="radio" 
                name={name} 
                checked={checked}
                onChange={onChange} 
            />
            <span className="radiomark" />
            <span className="radiobox-label">{label}</span>
        </label>
    );
}