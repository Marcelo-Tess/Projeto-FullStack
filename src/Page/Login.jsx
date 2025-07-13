import Header from "../Components/Header/Header";
import RetanguloBack from '../assets/RetanguloBack.png'
import LogoApple from '../assets/LogoApple.png'
import LogoGoogle from '../assets/LogoGoogle.png'
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
        minHeight: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
      }}
      
    >
      <div classname='container'>
        {}
        <div className="login-form at">
          <div className='flex justify-center items-center p-5'>
            <img 
                  src={LogoRoxo} 
                  class='w-17 h-10'
                ></img>
          </div>
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
            <div>
              <div className="LinkSign">
              <p>Não tem conta? <a href="#">Cadastre-se</a></p>
            </div>
            <div class="flex items-center my-2">
              <hr class="flex-grow border-t border-black"></hr>
              <span class="text-xs px-2 text-black">ou</span>
              <hr class="flex-grow border-t border-black"></hr>
            </div>
            </div>
            <div className='flex justify-center items-center gap-5'>
              <a href="#">
                <img 
                  src={LogoApple} 
                  alt="Logo Da Apple" 
                  class="w-8"
                ></img>
              </a>
              <a href="#">
                <img 
                  src={LogoGoogle} 
                  alt="Logo Da Google" 
                  class="w-7"
                ></img>
              </a>
            </div>
        </div>
    </div>
</div>
</div>
    );
}
