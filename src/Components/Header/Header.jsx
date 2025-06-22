// src/components/Header.jsx
import React from 'react'
import foodImage from '../../assets/imageHeader.png'; 
import Categories from '../Categoria/Categoria';
const Header = () => {
  return (
    <header className="w-full bg-white mt-20 py-10 px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
      {/* Texto e Botão */}
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Não é só comida,<br />
          é uma <span className="text-red-600">experiência</span>
        </h1>
        <button className="mt-6 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
          Fazer Pedido
        </button>
     <Categories />
      </div>

      {/* Imagem */}
      <div className="flex-1 flex justify-center">
        <img src={foodImage} alt="Comida variada" className="w-full max-w-md object-contain" />
      </div>
    </header>
  )
}

export default Header
