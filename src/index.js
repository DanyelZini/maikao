import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Menu from './Menu';
import Login from './Login';
import Usuario from './Usuarios'
import UsuariosTabela from './UsuariosTabela';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="carrinho" element={<App />} />
        <Route path="perfil" element={<Login />} />
        <Route path='usuarios' element={<Usuario/>} />
        <Route path='usuariostabela' element={<UsuariosTabela/>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);