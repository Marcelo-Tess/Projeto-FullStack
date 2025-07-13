import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NaoImplementado = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds === 0) {
      navigate('/');
      return;
    }

    const timerId = setTimeout(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [seconds, navigate]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff0f0',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1>Funcionalidade não implementada</h1>
      <p>Estamos trabalhando nisso. Você será redirecionado para a página inicial em {seconds} segundo{seconds !== 1 ? 's' : ''}.</p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
        alt="Funcionalidade não implementada"
        style={{ width: '150px', marginTop: '20px' }}
      />
    </div>
  );
};

export default NaoImplementado;
