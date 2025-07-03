import React, { useState } from 'react';
import Logo from '../../assets/Logo.svg';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className="bg-white shadow-md fixed w-full z-10">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 w-auto cursor-pointer" />
        </div>

        {/* Ícone do menu (mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-gray-700 focus:outline-none">
            {menuAberto ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="/" className="text-gray-600 hover:text-red-600 hover:underline transition duration-200">Home</a>
          </li>
          <li>
            <a href="/cardapio" className="text-gray-600 hover:text-red-600 hover:underline transition duration-200">Cardápio</a>
          </li>
          <li>
            <a href="/estabelicimento" className="text-gray-600 hover:text-red-600 hover:underline transition duration-200">Estabelecimento</a>
          </li>
        </ul>

        {/* Ações Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="/carrinho" className="text-gray-600 hover:text-red-600 transition duration-200">
            <i className="fas fa-shopping-cart"></i> Carrinho
          </a>
          <a href="/login" className="text-gray-600 hover:text-red-600 transition duration-200 bg-gray-200 px-4 py-2 rounded-full flex items-center space-x-2">
            <i className="fas fa-user"></i> Login
          </a>
        </div>
      </nav>

      {/* Menu Mobile Dropdown */}
      {menuAberto && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-md">
          <ul className="space-y-4">
            <li>
              <a href="/" className="block text-gray-700 hover:text-red-600">Home</a>
            </li>
            <li>
              <a href="/cardapio" className="block text-gray-700 hover:text-red-600">Cardápio</a>
            </li>
            <li>
              <a href="/estabelicimento" className="block text-gray-700 hover:text-red-600">Estabelecimento</a>
            </li>
            <li>
              <a href="/carrinho" className="block text-gray-700 hover:text-red-600">Carrinho</a>
            </li>
            <li>
              <a href="/login" className="block text-gray-700 hover:text-red-600">Login</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
