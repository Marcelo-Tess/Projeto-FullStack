import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detalhes = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);

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

  if (!produto) return <p className="text-center mt-10">Carregando produto...</p>;

  return (
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
              className="w-8 h-8 text-white bg-red-500 rounded hover:bg-red-600"
            >
              −
            </button>
            <span className="text-xl font-semibold">{quantidade}</span>
            <button
              onClick={handleIncrement}
              className="w-8 h-8 text-white bg-green-500 rounded hover:bg-green-600"
            >
              +
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-red-600">
              R${(produto.preco * quantidade).toFixed(2).replace('.', ',')}
            </span>
            <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-full transition duration-200">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalhes;
