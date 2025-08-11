import './inputPadrao.css';

interface InputPadraoProps {
    label: string;
    placeholder: string;
    onChange: (value: string) => void;
}

export default function InputPadrao({label, placeholder, onChange}: InputPadraoProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className='input-padrao'>
            <label>{label}</label>
            <input 
                type="text" 
                placeholder={placeholder}
                onChange={handleChange}    
            />
        </div>
    )
}