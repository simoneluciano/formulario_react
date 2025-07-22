import React, { useState } from 'react';
import praia from '../Imagens/praia.png';

function Formulario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [telefone, setTelefone] = useState('');
    
    const validarEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (senha !== confirmacaoSenha) {
            setErro('As senhas não coincidem');
            setSucesso('');
            return;
        }
        if (!nome || !email || !senha) {
            setErro("Todos os campos são obrigatórios.");
            setSucesso('');
            return;
        }
        const partesDoNome = nome.trim().split(' ').filter(p => p.length > 1);

        if (partesDoNome.length < 2) {
            setErro("Digite nome e sobrenome.");
            setSucesso('');
            return;
        }

        
        

        if (!validarEmail(email)) {
            setErro("Digite um e-mail válido.");
            setSucesso('');
            return;
        }


        if (senha.length < 6) {
            setErro("A senha deve ter pelo menos 6 caracteres.");
            setSucesso('');
            return;
        }

      
        setErro("");
        setSucesso("Cadastro enviado com sucesso!");
        console.log("Cadastro:", { nome, email, senha, telefone});

        try {
            const resposta = await fetch('http://localhost:3001/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, senha,telefone,}),
            });

            const data = await resposta.json();

            if (data.sucesso) {
                setSucesso('Cadastro realizado com sucesso!');
                setErro('');
                setNome('');
                setEmail('');
                setTelefone('');
                setSenha('');
                setConfirmacaoSenha('');
            } else {
                setErro('Erro ao cadastrar');
                setSucesso('');
            }
        } catch (error) {
            
        }
    };

    return (

        <div className='container'>
            <div className="imagem">
                <img src={praia} alt="Praia" />
                 
                <div className="texto-sobre-imagem">

                    <h2>Cadastre-se e concorra a uma viagem para a praia com tudo grátis!</h2>
                </div>
            </div>

            <div className='formulario'>
                <h1>Cadastro</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='nome'>Nome e Sobrenome</label>
                        <input
                            id='nome'
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    
                    <br />
                    <label htmlFor='email'>Email: </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                     
                    <br />
                    <label htmlFor='telefone'>Telefone: </label>
                        
                        <input
                            type="tel"
                            placeholder="(XX) XXXXX-XXXX"
                            value={telefone}
                         
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    <br />

                    <label htmlFor='senha'>Senha de login:</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                  
                    <br />
                    <label htmlFor='confirmar senha'>Confirmar Senha:</label>
                        <input
                            type="password"
                            value={confirmacaoSenha}
                            onChange={(e) => setConfirmacaoSenha(e.target.value)}
                        />
                   
                    <br />
                    <button type="submit">Enviar</button>
                </form>

                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}
            </div>
        </div>
    );
}


export default Formulario;
