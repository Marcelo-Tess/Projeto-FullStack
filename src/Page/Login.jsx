import Header from "../Components/Header/Header";
import RetanguloBack from '../assets/RetanguloBack.png'
import LogoRoxo from '../assets/LogoRoxo.png'
import React, { useState } from 'react';
import './login.css';

export default function Login(){

    return(
<div>
  <Header />
  <div
      style={{
        backgroundImage: `url(${RetanguloBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
      
    >
      <div classname='container'>
        {}
        <div className="login-form at">
            <input
              name="login"
              type="text"
              placeholder="Email ou Usuário"
            />
            <input
              name="senha"
              type="password"
              placeholder="Senha"
            />
            <div className="recuperarSenha">
              <a href="#">Esqueceu sua senha?</a>
            </div>
          <button onClick={"#"}>Entrar</button>
            <div className="LinkSign">
              <p>Não tem conta? <a href="#">Cadastra-se</a></p>
            </div>
        </div>
    </div>
</div>
</div>
    );
}
