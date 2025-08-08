import { useState } from 'react';
import CheckBoxPadrao from '../checkBoxPadrao/checkBoxPadrao';
import InputPadrao from '../inputPadrao/inputPadrao';
import './modalFormsVendedor.css';

interface ModalAtivacaoVendedorProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    edicao: boolean;
}

export default function ModalFormsVendedor({
    isOpen,
    onCancel,
    onConfirm,
    edicao
}: ModalAtivacaoVendedorProps) {
    const segmentosLista = [
        'Medicina e Saúde',
        'Boutique e Lojas',
        'Engenharia e Arquitetura',
        'Alimentos',
        'Celulares',
        'Outros'
    ];
    const regioesLista = [
        'Maringá',
        'Região de Maringá',
        'Outras'
    ];

    const [segmentosSel, setSegmentosSel] = useState<string[]>([]);
    const [regioesSel, setRegioesSel] = useState<string[]>([]);

    const toggleSegmento = (seg: string) => {
        setSegmentosSel(prev =>
            prev.includes(seg)
                ? prev.filter(s => s !== seg)
                : [...prev, seg]
        );
    };

    const toggleRegiao = (reg: string) => {
        setRegioesSel(prev =>
            prev.includes(reg)
                ? prev.filter(r => r !== reg)
                : [...prev, reg]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            segmentos: segmentosSel,
            regioes: regioesSel,
        });
        onConfirm();
    };

    if (!isOpen) return;

    return (
        <div className='modal-overlay'>
            <div className='modal-forms-vendedor'>
                <form
                    className='form-forms-modal-vendedor'
                    onSubmit={handleSubmit}
                >
                    <h2>Novo vendedor</h2>

                    <InputPadrao
                        label='Nome vendedor'
                        placeholder='Digite o nome'
                    />

                    <InputPadrao
                        label='Telefone'
                        placeholder='55 (44) 99999-9999'
                    />

                    <section className='section-segmento'>
                        <h3>Segmentos</h3>
                        <div className='segmentos-list'>
                            {segmentosLista.map(seg => (
                                <CheckBoxPadrao
                                    key={seg}
                                    label={seg}
                                    checked={segmentosSel.includes(seg)}
                                    onChange={() => toggleSegmento(seg)}
                                />
                            ))}
                        </div>
                    </section>

                    <section className='section-regioes'>
                        <h3>Regiões</h3>
                        {regioesLista.map(reg => (
                            <CheckBoxPadrao
                                key={reg}
                                label={reg}
                                checked={regioesSel.includes(reg)}
                                onChange={() => toggleRegiao(reg)}
                            />
                        ))}
                    </section>

                    <div className='botoes-forms-vendedor'>
                        <button
                            type='submit'
                            className='btn-padrao btn-chamativo'
                        >
                            Salvar
                        </button>
                        <button
                            type='button'
                            className='btn-padrao btn-nao-chamativo'
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}