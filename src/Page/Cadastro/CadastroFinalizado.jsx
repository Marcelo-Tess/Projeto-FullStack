import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CadastroFinalizado = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds === 0) {
      navigate('/');
      return;
    }

    const timerId = setTimeout(() => {
      setSeconds(seconds - 1);
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
        backgroundColor: '#f0f8ff',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1>Cadastro Finalizado!</h1>
      <p>Você será redirecionado para a página inicial em {seconds} segundo{seconds !== 1 ? 's' : ''}.</p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
        alt="Cadastro finalizado"
        style={{ width: '150px', marginTop: '20px' }}
      />
    </div>
  );
};

export default CadastroFinalizado;
