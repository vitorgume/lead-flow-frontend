import { useState } from 'react';
import InputPadrao from '../../../vendedores/components/inputPadrao/inputPadrao';
import './login.css';
import { logar } from '../../administrador.service';
import Loading from '../../../../utils/loading/loading';
import { useNavigate } from 'react-router-dom';
import { notificarErro } from '../../../../utils/notificacao';

export default function Login() {
    const [telefone, setTelefone] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [chaveSecreta, setChaveSecreta] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    async function logarAdministrador() {
        localStorage.setItem('chave-secreta', chaveSecreta);

        try {
            setLoading(true);
            const responseLogin = await logar(telefone, senha);

            if (responseLogin.dado) {
                localStorage.setItem('token', responseLogin.dado.token);
                localStorage.setItem('id-usuario', responseLogin.dado.idUsuario);

                navigate('/menu');
            } else {
                notificarErro('Credenciais incorretas. Tente novamente.');
            }
        } catch (error) {
            notificarErro("Não foi possível conectar. Verifique sua internet.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='login-page' onSubmit={logarAdministrador}>
            {loading ?
                <Loading message='Autenticando' />
                :
                <div className='login-container'>
                    <h2>Login</h2>

                    <form className='form-login'>
                        <InputPadrao
                            label="Telefone"
                            placeholder="Digite seu telefone"
                            onChange={setTelefone}
                            value={telefone}

                        />

                        <InputPadrao
                            label="Senha"
                            placeholder="Digite sua senha"
                            onChange={setSenha}
                            value={senha}
                        />

                        <InputPadrao
                            label="Chave secreta"
                            placeholder="Digite a chave secreta"
                            onChange={setChaveSecreta}
                            value={chaveSecreta}
                        />

                        <button type="submit" className='btn-padrao btn-chamativo'>Entrar</button>
                    </form>
                </div>
            }

        </div>
    )
}