import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useAuth } from '../../Context/AuthProvider';
import useApi from '../../services/useApi';

const Detalhes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const api = useApi();
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/produtos.json')
      .then(res => res.json())
      .then(data => {
        const item = data.produtos.find(p => p.id === parseInt(id));
        setProduto(item);
      });
  }, [id]);

  const handleIncrement = () => setQuantidade(prev => prev + 1);
  const handleDecrement = () => setQuantidade(prev => (prev > 1 ? prev - 1 : 1));

  const handleComprar = async () => {
    // Se não estiver logado, redireciona para login
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      // Verifica se o usuário tem endereço cadastrado
      const response = await api.get('/api/enderecos');
      const enderecos = response.data.data || [];
      
      if (enderecos.length === 0) {
        // Não tem endereço, vai para cadastrar endereço
        navigate('/cadastro-endereco');
      } else {
        // Tem endereço, vai para finalizar pedido
        navigate('/finalizar-pedido', { 
          state: { 
            produto: { ...produto, quantidade },
            endereco: enderecos[0] // usa o primeiro endereço
          }
        });
      }
    } catch (error) {
      console.error('Erro ao verificar endereços:', error);
      // Em caso de erro, assume que não tem endereço
      navigate('/cadastro-endereco');
    } finally {
      setLoading(false);
    }
  };

  if (!produto) return <p className="text-center mt-10">Carregando produto...</p>;

  return (
    <div className=' min-h-screen flex justify-center items-center'>
    <div className="max-w-4xl mt-20 mx-auto px-4 py-10 bg-white rounded-lg shadow-md grid md:grid-cols-2 gap-10">
      <img
        src={produto.imagem}
        alt={produto.nome}
        className="w-full h-auto object-contain rounded-lg"
      />

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{produto.nome}</h1>
          <p className="text-gray-600 mb-6">{produto.descricao}</p>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 text-white text-center bg-red-500 rounded hover:bg-red-600"
            >
              −
            </button>
            <span className="text-xl font-semibold">{quantidade}</span>
            <button
              onClick={handleIncrement}
              className="w-8 h-8 text-white text-center bg-green-500 rounded hover:bg-green-600"
            >
              +
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-red-600">
              R${(produto.preco * quantidade).toFixed(2).replace('.', ',')}
            </span>
            <Button 
              bgcolor="rgb(185, 28, 28)" 
              textcolor="#fff" 
              onClick={handleComprar}
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Comprar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Detalhes;
