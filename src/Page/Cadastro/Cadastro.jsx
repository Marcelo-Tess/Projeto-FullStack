import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import backgroundImg from '../../assets/background_cadastro.png';
import useApi from '../../services/useApi';
import './Cadastro.css';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    emailConfirma: '',
    senha: '',
    senhaConfirma: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const api = useApi();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validarFormulario = () => {
    let novosErros = {};
    
    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome obrigatório';
    }
    
    if (!formData.email.trim()) {
      novosErros.email = 'Email obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      novosErros.email = 'Email inválido';
    }
    
    if (!formData.emailConfirma.trim()) {
      novosErros.emailConfirma = 'Confirme o email';
    } else if (formData.email !== formData.emailConfirma) {
      novosErros.emailConfirma = 'Emails não conferem';
    }
    
    if (!formData.senha.trim()) {
      novosErros.senha = 'Senha obrigatória';
    } else if (formData.senha.length < 6) {
      novosErros.senha = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    if (!formData.senhaConfirma.trim()) {
      novosErros.senhaConfirma = 'Confirme a senha';
    } else if (formData.senha !== formData.senhaConfirma) {
      novosErros.senhaConfirma = 'Senhas não conferem';
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const userData = {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha
      };

      const response = await api.post('/api/users/register', userData);
      
      console.log('Usuário criado com sucesso:', response.data);
      setSuccess(true);
      
      // Redireciona para login após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      
      if (error.response?.status === 409) {
        setErrors({ email: 'Email já está em uso' });
      } else if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.message || 'Dados inválidos';
        setErrors({ geral: errorMessage });
      } else {
        setErrors({ geral: 'Erro ao cadastrar usuário. Tente novamente.' });
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundImg})`,
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
        <div className="container">
          <div className="success-message">
            <h2>✅ Cadastro realizado com sucesso!</h2>
            <p>Redirecionando para o login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
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
      <div className="container">
        <div className="form-header">
          <FaUser className="icone-cadastro" />
          <h1>Cadastro de Usuário</h1>
          <p>Preencha os dados para criar sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="formulario-cadastro">
          {errors.geral && <p className="error-geral">{errors.geral}</p>}

          <input
            name="nome"
            type="text"
            placeholder="Nome Completo *"
            value={formData.nome}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.nome && <p className="error">{errors.nome}</p>}

          <input
            name="email"
            type="email"
            placeholder="E-mail *"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            name="emailConfirma"
            type="email"
            placeholder="Confirmar E-mail *"
            value={formData.emailConfirma}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.emailConfirma && <p className="error">{errors.emailConfirma}</p>}

          <input
            name="senha"
            type="password"
            placeholder="Senha * (mínimo 6 caracteres)"
            value={formData.senha}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.senha && <p className="error">{errors.senha}</p>}

          <input
            name="senhaConfirma"
            type="password"
            placeholder="Confirmar Senha *"
            value={formData.senhaConfirma}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.senhaConfirma && <p className="error">{errors.senhaConfirma}</p>}

          <div className="grupo-botoes">
            <button 
              type="button" 
              className="botao-voltar" 
              onClick={() => navigate('/login')}
              disabled={loading}
            >
              Voltar para Login
            </button>
            
            <button 
              type="submit" 
              className="botao-cadastrar"
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
