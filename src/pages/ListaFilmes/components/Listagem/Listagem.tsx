import { Checkbox, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { Trash2 } from 'react-feather';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Conteudo, marcarAssistido, removerConteudo} from '../../../../store/slices/MultiFilmesSlice';

interface IListagemProps {
  listagem: Conteudo[];
}

const Listagem: FC<IListagemProps> = ({listagem}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return listagem.length ?(
    <>
    {Object.values(listagem).map((item) => (
        <Grid key={item.id} mt={5} container direction="row" justifyContent="space-around" alignItems="center">
          <Grid xs={7} pl={1}>
            <Grid direction="row" style={{ cursor: 'pointer' }} onClick={() => navigate(`/movies/edit/${item.id}`)}>
              <Typography
                variant="h5"
                style={
                  item.assistido ? { fontWeight: 'bold', textDecoration: 'line-through' } : { fontWeight: 'bold' }
                }
              >
                {item.nome}
              </Typography>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                {item.genero}
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={1}>
            <Trash2 style={{ cursor: 'pointer' }} onClick={() => dispatch(removerConteudo(item.id))} />
          </Grid>
          <Grid xs={3}>
            Assistido?
            <Checkbox
              checked={item.assistido}
              onChange={() => dispatch(marcarAssistido({ id: item.id, assistido: !item.assistido }))}
              color='secondary'
            />
          </Grid>
        </Grid>
      ))}
    </>
  ):(
    <Typography style={{ marginTop: '50px', color: 'grey' }} align="center" variant="h3">
      Lista vazia :(
    </Typography>
  );
};

export default Listagem;
