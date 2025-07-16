import React, { useState, useEffect } from 'react';
import Logo from '../../assets/Logo.svg';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (user) setUsuario(user);
  }, []);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/');
  };

  return (
    <div className="bg-white shadow-md fixed w-full z-10">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 w-auto cursor-pointer" onClick={() => navigate('/')} />
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-gray-700 focus:outline-none">
            {menuAberto ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li><a href="/" className="text-gray-600 hover:text-red-600 hover:underline transition">Home</a></li>
          <li><a href="/cardapio" className="text-gray-600 hover:text-red-600 hover:underline transition">Cardápio</a></li>
          <li><a href="/nao-implementado" className="text-gray-600 hover:text-red-600 hover:underline transition">Estabelecimento</a></li>
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          {!usuario ? (
            <>
              <a href="/cadastro" className="text-gray-600 hover:text-red-600 transition">Registrar-se</a>
              <a href="/login" className="text-gray-600 hover:text-red-600 transition bg-gray-200 px-4 py-2 rounded-full flex items-center space-x-2">
                Login
              </a>
            </>
          ) : (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Avatar.Root className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer flex items-center justify-center">
                  <Avatar.Fallback delayMs={600} className="text-gray-700 text-xl">
                    {usuario.nome ? usuario.nome.charAt(0).toUpperCase() : <FaUserCircle />}
                  </Avatar.Fallback>
                </Avatar.Root>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content className="bg-white rounded shadow-md p-4 w-48 z-50">
                <div className="flex items-center space-x-2 mb-2">
                  <FaUserCircle className="text-gray-700 text-2xl" />
                  <div>
                    <p className="text-sm font-medium">{usuario.nome || 'Usuário'}</p>
                    <p className="text-xs text-gray-500 truncate">{usuario.email || 'email@dominio.com'}</p>
                  </div>
                </div>
                <DropdownMenu.Separator className="h-px bg-gray-200 my-2" />
                <DropdownMenu.Item onSelect={() => navigate('/nao-implementado')} className="text-sm py-1 cursor-pointer hover:bg-gray-100 rounded px-2">
                  Perfil
                </DropdownMenu.Item>
                <DropdownMenu.Item onSelect={handleLogout} className="text-sm py-1 cursor-pointer hover:bg-gray-100 rounded px-2 text-red-600">
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </div>
      </nav>

      {menuAberto && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-md">
          <ul className="space-y-4">
            <li><a href="/" className="block text-gray-700 hover:text-red-600">Home</a></li>
            <li><a href="/cardapio" className="block text-gray-700 hover:text-red-600">Cardápio</a></li>
            <li><a href="/nao-implementado" className="block text-gray-700 hover:text-red-600">Estabelecimento</a></li>
            {!usuario && (
              <>
                <li><a href="/cadastro" className="block text-gray-700 hover:text-red-600">Registrar-se</a></li>
                <li><a href="/login" className="block text-gray-700 hover:text-red-600">Login</a></li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;