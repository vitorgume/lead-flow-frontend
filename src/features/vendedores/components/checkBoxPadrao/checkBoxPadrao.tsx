import './checkBoxPadrao.css';

interface CheckBoxPadraoProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function CheckBoxPadrao({ label, checked, onChange }: CheckBoxPadraoProps) {

    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="checkmark" />
            <span className="checkbox-label">{label}</span>
        </label>
    )
}