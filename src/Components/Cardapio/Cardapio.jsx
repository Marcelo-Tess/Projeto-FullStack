import React, { useEffect, useState } from 'react';

const Cardapio = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('/produtos.json')
      .then(res => res.json())
      .then(data => setProdutos(data.produtos));
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen p-6">
      <h1 className="text-center text-2xl font-bold mb-6">Cardápio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center"
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-32 h-32 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {produto.nome}
            </h3>
            <span className="text-red-600 font-bold mb-2">
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </span>
            <button
              onClick={() => window.location.href = `/detalhes/${produto.id}`}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-full transition duration-200"
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cardapio;
