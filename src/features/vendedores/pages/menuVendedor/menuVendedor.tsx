import { useState } from 'react';
import ModalAtivacaoVendedor from '../../components/modalAtivacaoVendedor/modalAtivacaoVendedor';
import VendedorComponent from '../../components/vendedorComponent/vendedorComponent';
import './menuVendedor.css';
import ModalFormsVendedor from '../../components/modalFormsVendedor/modalFormsVendedor';

interface VendedorTeste {
  nome: string;
  inativo: boolean;
}

export default function MenuVendedor() {
    const [vendedores, setVendedores] = useState<VendedorTeste[]>([
        { nome: 'Ana', inativo: false },
        { nome: 'Bruno', inativo: true },
        { nome: 'Carlos', inativo: false },
        { nome: 'Nilza', inativo: true },
    ]);

    const [modalAtivacao, setModalAtivacao] = useState(false);
    const [selecionadoIdx, setSelecionadoIdx] = useState<number | null>(null);
    const [modalForms, setModalForms] = useState(false);
    const [delecao, setDelecao] = useState(false);
    const [edicao, setEdicao] = useState(false);


    const abrirModal = (idx: number, delecao: boolean) => {
        setSelecionadoIdx(idx);
        setModalAtivacao(true);
        setDelecao(delecao);
    };
    const fecharModalAtivacao = () => {
        setSelecionadoIdx(null);
        setModalAtivacao(false);
    };

    const abrirModalForms = (idx: number, edicao: boolean) => {
        setSelecionadoIdx(idx);
        setModalForms(true);
        setEdicao(edicao);
    };

    const fecharModalForms = () => {
        setSelecionadoIdx(null);
        setModalForms(false);
    }


    const confirmarToggle = () => {
        if (selecionadoIdx === null) return;
        setVendedores(prev => prev.map((v, i) =>
            i === selecionadoIdx ? { ...v, inativo: !v.inativo } : v
        ));
        fecharModalAtivacao();
    };

    return (
        <div className='menu-vendedor-page'>
            <h2>Vendedores</h2>

            <div className='vendedor-list'>
                {vendedores.map((v, idx) => (
                    <VendedorComponent
                        key={v.nome}
                        nome={v.nome}
                        inativo={v.inativo}
                        onClickAtivar={(delecao) => abrirModal(idx, delecao)}
                        onClickAtivarForms={(edicao) => abrirModalForms(idx, edicao)}

                    />
                ))}
            </div>

            <button className='btn-padrao btn-chamativo' onClick={() => setModalForms(true)}>Novo</button>


            <ModalAtivacaoVendedor
                nomeVendedor={selecionadoIdx !== null ? vendedores[selecionadoIdx].nome : ''}
                isOpen={modalAtivacao}
                onCancel={fecharModalAtivacao}
                onConfirm={confirmarToggle}
                delecao={delecao}
            />

            <ModalFormsVendedor
                isOpen={modalForms}
                onCancel={() => setModalForms(false)}
                onConfirm={() => setModalForms(false)}
                edicao={edicao}
            />
        </div>
    );
}