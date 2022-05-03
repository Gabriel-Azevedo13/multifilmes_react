import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import CadastroFilmes from '../../pages/CadastroFilmes/views/CadastroFilmes';
import ListaFilmes from '../../pages/ListaFilmes/views/ListaFilmes';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ListaFilmes />} />
      <Route path="multifilmes_react" element={<ListaFilmes />} />
      <Route path="movies/add" element={<CadastroFilmes />} />
      <Route path="multifilmes_react/movies/add" element={<CadastroFilmes />} />
      <Route path="movies/edit/:idConteudo" element={<CadastroFilmes />} />
    </Routes>
  );
};

export default Router;
