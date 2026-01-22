import { useEffect, useState } from 'react';
import CheckBoxPadrao from '../checkBoxPadrao/checkBoxPadrao';
import InputPadrao from '../inputPadrao/inputPadrao';
import './modalFormsVendedor.css';
import type Vendedor from '../../../../models/vendedor/vendedor';
import RadioBoxPadrao from '../radioBoxPadrao/radioBoxPadrao';
import InputNumberPadrao from '../inputNumberPadrao/inputNumberPadrao';

interface ModalAtivacaoVendedorProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: (novoVendedor: Vendedor) => void;
    edicao: boolean;
    vendedor?: Vendedor;
}

export default function ModalFormsVendedor({
    isOpen,
    onCancel,
    onConfirm,
    edicao,
    vendedor
}: ModalAtivacaoVendedorProps) {
    const segmentosLista = [
        {
            label: 'Medicina e Saúde',
            value: 'MEDICINA_SAUDE'
        },
        {
            label: 'Boutique e Lojas',
            value: 'BOUTIQUE_LOJAS'
        },
        {
            label: 'Engenharia e Arquitetura',
            value: 'ENGENHARIA_ARQUITETURA'
        },
        {
            label: 'Alimentos',
            value: 'ALIMENTOS'
        },
        {
            label: 'Celulares',
            value: 'CELULARES'
        },
        {
            label: 'Outros',
            value: 'OUTROS'
        }
    ];
    const regioesLista = [
        {
            label: 'Maringá',
            value: 'MARINGA'
        },
        {
            label: 'Região de Maringá',
            value: 'REGIAO_MARINGA'
        },
        {
            label: 'Outras',
            value: 'OUTRA'
        }
    ];

    const [segmentosSel, setSegmentosSel] = useState<string[]>([]);

    const [regioesSel, setRegioesSel] = useState<string[]>([]);

    const [nome, setNome] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [prioridade, setPrioridade] = useState<boolean>(false);
    const [prioridadeValor, setPrioridadeValor] = useState<string>('');
    const [idVendedorCrm, setIdVendedorCrm] = useState<string>('');

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

        const novoVendedor: Vendedor = {
            id: edicao && vendedor?.id ? vendedor.id : undefined,
            nome,
            telefone,
            segmentos: segmentosSel,
            regioes: regioesSel,
            inativo: edicao ? !!vendedor?.inativo : false,
            prioridade: prioridade
                ? { valor: Number(prioridadeValor), prioritario: true }
                : null as any, 
            id_vendedor_crm: idVendedorCrm
        };

        onConfirm(novoVendedor);
    };

    useEffect(() => {
        if (!isOpen) return;

        if (edicao && vendedor) {
            setNome(vendedor.nome ?? '');
            setTelefone(vendedor.telefone ?? '');
            setSegmentosSel((vendedor.segmentos ?? []).map((s: any) => s?.value ?? s));
            setRegioesSel((vendedor.regioes ?? []).map((r: any) => r?.value ?? r));

            const pri = vendedor.prioridade ?? null;
            setPrioridade(!!pri?.prioritario);
            setPrioridadeValor(
                pri?.valor !== undefined && pri?.valor !== null ? String(pri.valor) : ''
            );
            setIdVendedorCrm(vendedor.id_vendedor_crm ?? '');
        } else {
            setNome('');
            setTelefone('');
            setSegmentosSel([]);
            setRegioesSel([]);
            setPrioridade(false);
            setPrioridadeValor('');
            setIdVendedorCrm('');
        }
    }, [isOpen, edicao, vendedor]);

    if (!isOpen) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-forms-vendedor'>
                <form className='form-forms-modal-vendedor' onSubmit={handleSubmit}>
                    <h2>Novo vendedor</h2>

                    <div className="form-scrollarea">
                        <InputPadrao
                            label='Nome vendedor'
                            placeholder='Digite o nome'
                            onChange={setNome}
                            value={nome}
                        />

                        <InputPadrao
                            label='Telefone'
                            placeholder='55 (44) 99999-9999'
                            onChange={setTelefone}
                            value={telefone}

                        />

                        <InputPadrao
                            label='ID Vendedor CRM'
                            placeholder='Digite o ID do vendedor no CRM'
                            onChange={setIdVendedorCrm}
                            value={idVendedorCrm}
                        />

                        <section className='section-segmento'>
                            <h3>Segmentos</h3>
                            <div className='segmentos-list'>
                                {segmentosLista.map(seg => (
                                    <CheckBoxPadrao
                                        key={seg.value}
                                        label={seg.label}
                                        checked={segmentosSel.includes(seg.value)}
                                        onChange={() => toggleSegmento(seg.value)}
                                    />
                                ))}
                            </div>
                        </section>

                        <section className='section-regioes'>
                            <h3>Regiões</h3>
                            {regioesLista.map(reg => (
                                <CheckBoxPadrao
                                    key={reg.value}
                                    label={reg.label}
                                    checked={regioesSel.includes(reg.value)}
                                    onChange={() => toggleRegiao(reg.value)}
                                />
                            ))}
                        </section>

                        <section className='section-prioridade'>
                            <h3>Prioridade</h3>

                            <div className='radio-boxes'>
                                <RadioBoxPadrao
                                    label='Sim'
                                    name='prioridade'
                                    checked={prioridade === true}
                                    onChange={() => setPrioridade(true)}
                                />
                                <RadioBoxPadrao
                                    label='Não'
                                    name='prioridade'
                                    checked={prioridade === false}
                                    onChange={() => setPrioridade(false)}
                                />
                            </div>

                            {prioridade && (
                                <InputNumberPadrao
                                    label="Grau de prioridade"
                                    value={prioridadeValor}
                                    onChange={(e) => setPrioridadeValor(e.target.value)}
                                    placeholder="Digite a prioridade"
                                    min={1}
                                    max={10}
                                    withCustomControls={true}
                                />
                            )}
                        </section>
                    </div>

                    <div className='botoes-forms-vendedor'>
                        <button type='submit' className='btn-padrao btn-chamativo'>Salvar</button>
                        <button type='button' className='btn-padrao btn-nao-chamativo' onClick={onCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}