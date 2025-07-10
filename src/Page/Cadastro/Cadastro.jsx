import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa'; 
import backgroundImg from '../../assets/background_cadastro.png';
import './Cadastro.css';

const Cadastro = () => {
  const [etapaAtual, setEtapaAtual] = useState(1);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    emailConfirma: '',
    senha: '',
    senhaConfirma: '',
    rua: '',
    bairro: '',
    cep: '',
    complemento: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validarEtapa1 = () => {
    let novosErros = {};
    if (!formData.nome.trim()) novosErros.nome = 'Nome obrigatório';
    if (!formData.email.trim()) novosErros.email = 'Email obrigatório';
    if (!formData.emailConfirma.trim()) novosErros.emailConfirma = 'Confirme o email';
    else if (formData.email !== formData.emailConfirma) novosErros.emailConfirma = 'Emails não conferem';
    if (!formData.senha.trim()) novosErros.senha = 'Senha obrigatória';
    if (!formData.senhaConfirma.trim()) novosErros.senhaConfirma = 'Confirme a senha';
    else if (formData.senha !== formData.senhaConfirma) novosErros.senhaConfirma = 'Senhas não conferem';

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const validarEtapa2 = () => {
    let novosErros = {};
    if (!formData.rua.trim()) novosErros.rua = 'Rua obrigatória';
    if (!formData.bairro.trim()) novosErros.bairro = 'Bairro obrigatório';
    if (!formData.cep.trim()) novosErros.cep = 'CEP obrigatório';

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const proximaEtapa = () => {
    if (etapaAtual === 1) {
      if (validarEtapa1()) setEtapaAtual(2);
    } else if (etapaAtual === 2) {
      if (validarEtapa2()) {
        navigate('/cadastrofinalizado');
      }
    }
  };

  const etapaAnterior = () => {
    setEtapaAtual(prev => (prev > 1 ? prev - 1 : prev));
  };

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
        {}
        <div className="indicador-etapas">
          <div className={`etapa ${etapaAtual === 1 ? 'ativa' : ''}`}>
            <FaUser className="icone-etapa" />
            <div className="bolinha"></div>
          </div>
          <div className={`etapa ${etapaAtual === 2 ? 'ativa' : ''}`}>
            <FaMapMarkerAlt className="icone-etapa" />
            <div className="bolinha"></div>
          </div>
          <div className="linha-etapas"></div>
        </div>

        {}
        {etapaAtual === 1 && (
          <div className="etapa-formulario ativa">
            <input
              name="nome"
              type="text"
              placeholder="Nome Completo"
              value={formData.nome}
              onChange={handleChange}
            />
            {errors.nome && <p className="error">{errors.nome}</p>}

            <input
              name="email"
              type="email"
              placeholder="E-mail*"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              name="emailConfirma"
              type="email"
              placeholder="Confirmar E-mail*"
              value={formData.emailConfirma}
              onChange={handleChange}
            />
            {errors.emailConfirma && <p className="error">{errors.emailConfirma}</p>}

            <input
              name="senha"
              type="password"
              placeholder="Senha*"
              value={formData.senha}
              onChange={handleChange}
            />
            {errors.senha && <p className="error">{errors.senha}</p>}

            <input
              name="senhaConfirma"
              type="password"
              placeholder="Confirmar Senha*"
              value={formData.senhaConfirma}
              onChange={handleChange}
            />
            {errors.senhaConfirma && <p className="error">{errors.senhaConfirma}</p>}

            <div className="grupo-botoes">
              <div></div>
              <button onClick={proximaEtapa}>Próximo</button>
            </div>
          </div>
        )}

        {}
        {etapaAtual === 2 && (
          <div className="etapa-formulario ativa">
            <input
              name="rua"
              type="text"
              placeholder="Rua"
              value={formData.rua}
              onChange={handleChange}
            />
            {errors.rua && <p className="error">{errors.rua}</p>}

            <input
              name="bairro"
              type="text"
              placeholder="Bairro"
              value={formData.bairro}
              onChange={handleChange}
            />
            {errors.bairro && <p className="error">{errors.bairro}</p>}

            <input
              name="cep"
              type="text"
              placeholder="CEP"
              value={formData.cep}
              onChange={handleChange}
            />
            {errors.cep && <p className="error">{errors.cep}</p>}

            <input
              name="complemento"
              type="text"
              placeholder="Complemento"
              value={formData.complemento}
              onChange={handleChange}
            />

            <div className="grupo-botoes">
              <button className="botao-voltar" onClick={etapaAnterior}>Voltar</button>

              <p
                className="pular-etapa"
                onClick={() => navigate('/cadastrofinalizado')}
                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
              >
                Pular Etapa
              </p>

              <button onClick={proximaEtapa}>Finalizar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cadastro;
