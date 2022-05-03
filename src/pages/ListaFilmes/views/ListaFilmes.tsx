import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Listagem } from '../components/Listagem';
import { Header } from '../components/Header';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { CssBaseline } from '@mui/material';
import { Filtro } from '../components/Filtro';

const ListaFilmes: FC = () => {
  const [listaFilmes, setlistaFilmes] = React.useState(
    useSelector((state: State) => state.listaFilmes.listagemConteudo),
  );
  return (
    <>
    <CssBaseline />
      <Header />
      <Filtro setListaFilmes={(lista) => setlistaFilmes(lista)} />
      <Listagem listagem={listaFilmes}/> 
    </>
  );
};

export default ListaFilmes;
