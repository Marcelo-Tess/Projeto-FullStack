import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import useApi from '../../services/useApi';
import Button from '../../Components/Button/Button';
import './finalizar-pedido.css';

const FinalizarPedido = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const api = useApi();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('pix');
  const [observacoes, setObservacoes] = useState('');

  // Dados vindo da página anterior
  const produto = location.state?.produto;
  const endereco = location.state?.endereco;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const pedidoData = {
        produto_id: produto.id,
        quantidade: produto.quantidade,
        preco_unitario: produto.preco,
        preco_total: produto.preco * produto.quantidade,
        endereco_id: endereco.id || null,
        endereco: endereco,
        forma_pagamento: formaPagamento,
        observacoes: observacoes,
        status: 'pendente'
      };

      await api.post('/api/pedidos', pedidoData);
      
      // Redireciona para página de sucesso
      navigate('/pedido-finalizado', { 
        state: { 
          pedido: pedidoData,
          produto,
          endereco
        }
      });
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      setError('Erro ao finalizar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!produto || !endereco) {
    navigate('/');
    return null;
  }

  const total = produto.preco * produto.quantidade;
  const taxaEntrega = 5.00; // Taxa fixa de entrega
  const totalFinal = total + taxaEntrega;

  return (
    <div className="finalizar-pedido-container">
      <div className="finalizar-pedido-content">
        <h1>Finalizar Pedido</h1>
        
        <div className="pedido-summary">
          <div className="produto-info">
            <h3>Produto</h3>
            <div className="produto-detalhes">
              <img src={produto.imagem} alt={produto.nome} className="produto-imagem" />
              <div className="produto-texto">
                <h4>{produto.nome}</h4>
                <p>{produto.descricao}</p>
                <p>Quantidade: {produto.quantidade}</p>
                <p className="preco">R$ {produto.preco.toFixed(2).replace('.', ',')} cada</p>
              </div>
            </div>
          </div>

          <div className="endereco-info">
            <h3>Endereço de Entrega</h3>
            <div className="endereco-detalhes">
              <p>{endereco.logradouro}, {endereco.numero}</p>
              {endereco.complemento && <p>{endereco.complemento}</p>}
              <p>{endereco.bairro}, {endereco.cidade} - {endereco.estado}</p>
              <p>CEP: {endereco.cep}</p>
              {endereco.referencia && <p>Referência: {endereco.referencia}</p>}
            </div>
          </div>

          <div className="pagamento-info">
            <h3>Forma de Pagamento</h3>
            <div className="pagamento-opcoes">
              <label className="pagamento-option">
                <input
                  type="radio"
                  name="pagamento"
                  value="pix"
                  checked={formaPagamento === 'pix'}
                  onChange={(e) => setFormaPagamento(e.target.value)}
                />
                <span>PIX</span>
              </label>
              <label className="pagamento-option">
                <input
                  type="radio"
                  name="pagamento"
                  value="dinheiro"
                  checked={formaPagamento === 'dinheiro'}
                  onChange={(e) => setFormaPagamento(e.target.value)}
                />
                <span>Dinheiro</span>
              </label>
              <label className="pagamento-option">
                <input
                  type="radio"
                  name="pagamento"
                  value="cartao"
                  checked={formaPagamento === 'cartao'}
                  onChange={(e) => setFormaPagamento(e.target.value)}
                />
                <span>Cartão</span>
              </label>
            </div>
          </div>

          <div className="observacoes-info">
            <h3>Observações</h3>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Alguma observação especial para o pedido?"
              rows={3}
            />
          </div>
        </div>

        <div className="resumo-pedido">
          <h3>Resumo do Pedido</h3>
          <div className="resumo-linhas">
            <div className="resumo-linha">
              <span>Subtotal ({produto.quantidade} item{produto.quantidade > 1 ? 's' : ''})</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="resumo-linha">
              <span>Taxa de entrega</span>
              <span>R$ {taxaEntrega.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="resumo-linha total">
              <span>Total</span>
              <span>R$ {totalFinal.toFixed(2).replace('.', ',')}</span>
            </div>
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
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Finalizando...' : 'Finalizar Pedido'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalizarPedido;
