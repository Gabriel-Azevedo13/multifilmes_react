import { Grid, TextField, InputAdornment } from '@mui/material';
import debounce from 'lodash.debounce';
import React, { FC } from 'react';
import { Search } from 'react-feather';
import { useSelector } from 'react-redux';
import { State } from '../../../../store';
import { Conteudo } from '../../../../store/slices/MultiFilmesSlice';

interface IFiltroProps {
  setListaFilmes: (lista: Conteudo[]) => void;
}

const Filtro: FC<IFiltroProps> = ({ setListaFilmes }) => {
  const listaFilmesAtual = useSelector((state: State) => state.listaFilmes.listagemConteudo);
  const [filtroAtual, setFiltroAtual] = React.useState('');

  const deboucedFiltroLista = React.useMemo(() => {
    return debounce((filtroLista) => {
      setFiltroAtual(filtroLista);
      setListaFilmes(
        listaFilmesAtual.filter(
          (conteudo) =>
            conteudo.nome.toUpperCase().includes(filtroLista.toUpperCase()) ||
            conteudo.genero.toUpperCase().includes(filtroLista.toUpperCase()),
        ),
      );
    }, 300);
  }, [listaFilmesAtual]);

  React.useEffect(() => {
    deboucedFiltroLista(filtroAtual);
  }, [listaFilmesAtual]);

  return (
    <Grid mt={5} direction="column" px={2} alignItems="end">
      <TextField
        id="input-with-icon-textfield"
        label="Filtro"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        variant="filled"
        onChange={(filtro) => deboucedFiltroLista(filtro.target.value)}
        color='secondary'
      />
    </Grid>
  );
};

export default Filtro;
