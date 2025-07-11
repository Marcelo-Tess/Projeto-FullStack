import React from 'react'
import Logo from '../../assets/Logo.svg'
import LogoLogin from '../../assets/LogoLogin.png'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Nav = () => {
  const location = useLocation();
  const [changeColor, setChangeColor] = useState(false);
  useEffect(()=>{
    if(location.pathname === "/"){
      setChangeColor(false);
    }else if(location.pathname === "/login"){
      setChangeColor(true);
    }
  },[location.pathname]);
    
  return (
   <div className={ `shadow-md fixed w-full z-10 ${changeColor ? 'bg-[#2A2D61] text-white' : 'bg-white text-grey-600'}`}>
     <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={changeColor ? LogoLogin : Logo} alt="Logo" className="h-10 w-auto cursor-pointer" />
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-red-600 hover:underline transition duration-200 ">Home</Link>
          </li>
          <li>
            <Link to="/cardapio" className="hover:text-red-600  hover:underline transition duration-200">Cardapio</Link>
          </li>
          <li>
            <Link to="/estabelicimento" className="hover:text-red-600  hover:underline transition duration-200">Estabelecimento</Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <Link to="/carrinho" className="hover:text-red-600 transition duration-200">
            <i className="fas fa-shopping-cart"></i> Carrinho
          </Link>
          <Link to="/login" className={ `hover:text-red-600 transition duration-200 ${changeColor ? 'bg-[#FF0000]' : 'bg-gray-200'} px-4 py-2 rounded-full flex items-center space-x-2`}>
            <i className="fas fa-user bg-black"></i> Login
          </Link>
        </div>
     </nav>
    </div>
  )
}

export default Nav