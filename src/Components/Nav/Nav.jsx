import React from 'react'
import Logo from '../../assets/Logo.svg'
const Nav = () => {
  return (
   <div className="bg-white shadow-md fixed w-full z-10">
     <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 w-auto cursor-pointer" />
        </div>
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="text-gray-600 hover:text-red-600 hover:underline transition duration-200 ">Home</a>
          </li>
          <li>
            <a href="/cardapio" className="text-gray-600 hover:text-red-600  hover:underline transition duration-200">Cardapio</a>
          </li>
          <li>
            <a href="/estabelicimento" className="text-gray-600 hover:text-red-600  hover:underline transition duration-200">Estabelecimento</a>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <a href="/carrinho" className="text-gray-600 hover:text-red-600 transition duration-200">
            <i className="fas fa-shopping-cart"></i> Carrinho
          </a>
          <a href="/login" className="text-gray-600 hover:text-red-600 transition duration-200 bg-gray-200 px-4 py-2 rounded-full flex items-center space-x-2">
            <i className="fas fa-user bg-black"></i> Login
          </a>
        </div>
     </nav>
    </div>
  )
}

export default Nav