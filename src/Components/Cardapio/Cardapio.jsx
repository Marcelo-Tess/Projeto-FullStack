import React, { useEffect, useState } from 'react';
import Filtro from '../Filtro/Filtro';

const Cardapio = () => {
  const [produtos, setProdutos] = useState([]);
  const [itemsFiltrado, setItemsFiltrado] = useState([]);

  useEffect(() => {
    fetch('/produtos.json')
      .then(res => res.json())
      .then(data => {
        setProdutos(data.produtos);
        setItemsFiltrado(data.produtos);
      });
  }, []);

  const filtroPorHamburgueres = () => {
    const hamburgueres = produtos.filter(produto => produto.categoria === 'Hamburguer');
    setItemsFiltrado(hamburgueres);
  };

  const filtroPorPizza = () => {
    const pizzas = produtos.filter(produto => produto.categoria === 'Pizza');
    setItemsFiltrado(pizzas);
  };

  const milkShake = () => {
    const milkShakes = produtos.filter(produto => produto.categoria === 'Milkshake');
    setItemsFiltrado(milkShakes);
  };

  const hotDogs = () => {
    const hotDogs = produtos.filter(produto => produto.categoria === 'Hotdog');
    setItemsFiltrado(hotDogs);
  };

  return (
    <div className="bg-gray-200 min-h-screen p-6">
      <h1 className="text-center text-2xl font-bold mb-6">Cardápio</h1>

      <Filtro
        filtroPorHamburgueres={filtroPorHamburgueres}
        filtroPorPizza={filtroPorPizza}
        milkShake={milkShake}
        hotDogs={hotDogs}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {itemsFiltrado.length > 0 ? (
          itemsFiltrado.map((produto) => (
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
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">Indisponível no momento</p>
        )}
      </div>
    </div>
  );
};

export default Cardapio;
