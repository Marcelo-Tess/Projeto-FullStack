import React from 'react'
import Cardapio from '../../Components/Cardapio/Cardapio'
import Header from '../../Components/Header/Header'
import Categories from '../../Components/Categoria/Categoria'
import foodImage from '../../assets/imageHeader.png'; 

const Home = () => {
  return (
    <>
   <Header/>
   <div className='flex flex-row py-5 justify-around'>
    
    {/* Texto e Botão */}
    <div className="flex-1 text-center lg:text-left justify-center">
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
   </div>
  
   <Cardapio/>
    </>
  )
}

export default Home