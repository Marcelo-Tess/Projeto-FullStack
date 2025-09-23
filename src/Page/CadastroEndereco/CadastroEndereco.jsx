import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import Button from '../../Components/Button/Button';
import './cadastro-endereco.css';
import useApi from '../../services/useApi';

const CadastroEndereco = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const api = useApi();
  
  const [formData, setFormData] = useState({
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
 
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dados do produto vindo da página anterior
  const produto = location.state?.produto;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Token atual:', localStorage.getItem('site'));
      console.log('Dados do endereço:', formData);
      
      const response = await api.post('/api/enderecos/', formData);
      console.log('Resposta do cadastro:', response.data);
      
      // Após cadastrar endereço, vai para finalizar pedido
      navigate('/finalizar-pedido', { 
        state: { 
          produto,
          endereco: formData
        }
      });
    } catch (error) {
      console.error('Erro ao cadastrar endereço:', error);
      
      if (error.response?.status === 403) {
        setError('Token inválido. Faça login novamente.');
        // Limpa o token inválido e redireciona para login
        localStorage.removeItem('site');
        setTimeout(() => navigate('/login'), 2000);
      } else if (error.response?.status === 401) {
        setError('Não autorizado. Faça login novamente.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Erro ao cadastrar endereço. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="cadastro-endereco-container">
      <div className="cadastro-endereco-form">
        <h1>Cadastrar Endereço</h1>
        <p className="subtitle">Precisamos do seu endereço para entrega</p>
        
        {produto && (
          <div className="produto-info">
            <h3>Produto selecionado:</h3>
            <p>{produto.nome} - Quantidade: {produto.quantidade}</p>
            <p>Total: R$ {(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="logradouro">Rua *</label>
              <input
                type="text"
                id="logradouro"
                name="logradouro"
                value={formData.logradouro}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="numero">Número *</label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              id="complemento"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bairro">Bairro *</label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cidade">Cidade *</label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="estado">Estado *</label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cep">CEP *</label>
              <input
                type="text"
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="00000-000"
                required
              />
            </div>
          </div>

          

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <Button 
              type="button" 
              bgcolor="#6b7280" 
              textcolor="#fff" 
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
            <Button 
              type="submit" 
              bgcolor="rgb(185, 28, 28)" 
              textcolor="#fff"
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Continuar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroEndereco;
