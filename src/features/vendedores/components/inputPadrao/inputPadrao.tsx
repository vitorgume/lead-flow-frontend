import './inputPadrao.css';

interface InputPadraoProps {
    label: string;
    placeholder: string;
}

export default function InputPadrao({label, placeholder}: InputPadraoProps) {

    return (
        <div className='input-padrao'>
            <label>{label}</label>
            <input type="text" placeholder={placeholder}/>
        </div>
    )
}