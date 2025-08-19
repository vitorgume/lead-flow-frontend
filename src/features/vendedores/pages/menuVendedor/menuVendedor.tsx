import { useEffect, useState } from 'react';
import ModalAtivacaoVendedor from '../../components/modalAtivacaoVendedor/modalAtivacaoVendedor';
import VendedorComponent from '../../components/vendedorComponent/vendedorComponent';
import './menuVendedor.css';
import ModalFormsVendedor from '../../components/modalFormsVendedor/modalFormsVendedor';
import { alterarVendedor, criarVendedor, deletarVendedor, listarTodosVendedores } from '../../vendedor.service';
import type Vendedor from '../../../../models/vendedor/vendedor';
import { notificarErro, notificarSucesso } from '../../../../utils/notificacao';
import Loading from '../../../../utils/loading/loading';

export default function MenuVendedor() {
    const [vendedores, setVendedores] = useState<Vendedor[] | []>([]);

    const [modalAtivacao, setModalAtivacao] = useState<boolean>(false);
    const [selecionadoIdx, setSelecionadoIdx] = useState<number | null>(null);
    const [modalForms, setModalForms] = useState<boolean>(false);
    const [delecao, setDelecao] = useState<boolean>(false);
    const [edicao, setEdicao] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


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

    const confirmarToggle = async () => {
        if (selecionadoIdx === null) return;

        if (delecao) {
            try {
                if (vendedores[selecionadoIdx].id)
                    await deletarVendedor(vendedores[selecionadoIdx].id);

                setVendedores(prev => prev.filter((z, i) => i !== selecionadoIdx));
                fecharModalAtivacao();

            } catch (error) {
                notificarErro('Erro ao deletar vendedor.')
            }

        } else {
            try {

                const novosDados: Vendedor = {
                    id: vendedores[selecionadoIdx].id,
                    nome: vendedores[selecionadoIdx].nome,
                    inativo: !vendedores[selecionadoIdx].inativo,
                    segmentos: vendedores[selecionadoIdx].segmentos,
                    regioes: vendedores[selecionadoIdx].regioes,
                    prioridade: vendedores[selecionadoIdx].prioridade,
                    telefone: vendedores[selecionadoIdx].telefone
                }

                const response = await alterarVendedor(novosDados);

                if (response.dado) {

                    setVendedores(prev => prev.map((v, i) =>
                        i === selecionadoIdx ? { ...v, inativo: !v.inativo } : v
                    ));

                    fecharModalAtivacao();
                }

            } catch (error) {
                notificarErro('Erro ao alterar status do vendedor.')
            }
        }
    };

    const confirmFormsVendedor = async (novoVendedor: Vendedor) => {

        if (edicao) {
            try {
                const novoVendedorResponse = await alterarVendedor(novoVendedor);

                if (novoVendedorResponse.dado) {
                    setVendedores(prev => prev.map((v, i) =>
                        i === selecionadoIdx ? { ...v, ...novoVendedorResponse.dado } : v
                    ));
                }
            } catch (err) {
                console.error('Erro ao criar vendedor: ', err);
                notificarErro('Problema ao editar vendedor.');
            } finally {
                notificarSucesso('Vendedor editado com sucesso.')
                setModalForms(false);
            }
        } else {
            try {
                const novoVendedorResponse = await criarVendedor(novoVendedor);

                if (novoVendedorResponse.dado) {
                    setVendedores(prev => [...prev, novoVendedorResponse.dado as Vendedor]);
                }
            } catch (err) {
                console.error('Erro ao criar vendedor: ', err);
                notificarErro('Problema ao cadastrar novo vendedor.');
            } finally {
                notificarSucesso('Vendedor cadastrado com sucesso.')
                setModalForms(false);
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        async function carregarVendedores() {
            const response = await listarTodosVendedores();

            if (response.dado)
                setVendedores(response.dado);

            setLoading(false);
        }

        carregarVendedores();
    }, []);


    return (
        <div className={`menu-vendedor-page-main ${loading ? 'is-loading' : ''}`}>
            {loading ? <Loading message='Carregando vendedores' />
                :
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

                    <button className='btn-padrao btn-chamativo' onClick={() => {
                        setSelecionadoIdx(null);
                        setEdicao(false);        
                        setModalForms(true);
                    }}>Novo</button>


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
                        onConfirm={(novoVendedor: Vendedor) => confirmFormsVendedor(novoVendedor)}
                        edicao={edicao}
                        vendedor={selecionadoIdx !== null ? vendedores[selecionadoIdx] : {} as Vendedor}
                    />
                </div>
            }
        </div>
    );
}