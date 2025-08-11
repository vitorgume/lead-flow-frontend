import './inputNumberPadrao.css';

interface InputNumberPadraoProps {
  label: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  withCustomControls?: boolean;
}

export default function InputNumberPadrao({ 
  label, 
  value, 
  onChange, 
  placeholder = "Digite o valor",
  min,
  max,
  step = 1,
  withCustomControls = false
}: InputNumberPadraoProps) {
  
  const handleIncrement = () => {
    const currentValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    const newValue = currentValue + step;
    const maxValue = max !== undefined ? Math.min(newValue, max) : newValue;
    
    // Simula um evento de change
    const fakeEvent = {
      target: { value: maxValue.toString() }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(fakeEvent);
  };

  const handleDecrement = () => {
    const currentValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    const newValue = currentValue - step;
    const minValue = min !== undefined ? Math.max(newValue, min) : newValue;
    
    // Simula um evento de change
    const fakeEvent = {
      target: { value: minValue.toString() }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(fakeEvent);
  };

  if (withCustomControls) {
    return (
      <div className="input-number-container">
        <span className="input-label">{label}</span>
        <div className="input-number-with-controls">
          <input
            type="number"
            className="input-number"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
          />
          <div className="input-number-controls">
            <button 
              type="button" 
              className="input-number-btn"
              onClick={handleIncrement}
            >
              +
            </button>
            <button 
              type="button" 
              className="input-number-btn"
              onClick={handleDecrement}
            >
              -
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="input-number-container">
      <span className="input-label">{label}</span>
      <input
        type="number"
        className="input-number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}