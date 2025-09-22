import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import RetanguloBack from '../../assets/RetanguloBack.png';
import LogoApple from '../../assets/LogoApple.png';
import LogoGoogle from '../../assets/LogoGoogle.png';
import LogoRoxo from '../../assets/LogoRoxo.png';
import './login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const { loginAction, error, loading } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginAction({
      data: {
        email: formData.email,
        senha: formData.senha
      }
    });
  };

  return (
    <div className="login-container">
      <div 
        className="login-background"
        style={{ backgroundImage: `url(${RetanguloBack})` }}
      >
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="logo-container">
            <img src={LogoRoxo} alt="Logo" className="logo" />
          </div>
          
          <input
            name="email"
            type="email"
            placeholder='Digite seu e-mail'
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
          />
          {error && <div className="error-message">{error}</div>}
          <div className="recuperarSenha">
            <a href="#">Esqueceu sua senha?</a>
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
          <div className="divider">
            <div className="LinkSign">
              <p>Não tem conta? <a href="/cadastro">Cadastre-se</a></p>
            </div>
            <div className="line-with-text">
              <hr />
              <span>ou</span>
              <hr />
            </div>
          </div>
          <div className="social-logins">
            <a href="/nao-implementado">
              <img src={LogoApple} alt="Logo Da Apple" />
            </a>
            <a href="nao-implementado">
              <img src={LogoGoogle} alt="Logo Da Google" />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}