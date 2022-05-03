import React, { FC, useEffect } from 'react';
import { Grid, Box, Button, MenuItem, TextField, Checkbox, FormControlLabel, InputAdornment } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { categorias } from '../../../../shared/models/IItem';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../store';
import {
  Conteudo,
  removerConteudo,
  adicionarConteudo,
  atualizarConteudo,
} from '../../../../store/slices/MultiFilmesSlice';

interface ICadastroFilmesProps {
  idConteudo: string | undefined;
  isEdit: boolean;
}

const Cadastro: FC<ICadastroFilmesProps> = ({idConteudo, isEdit}) => {
  
  const dispatch = useDispatch();
  const conteudoSelecionado = useSelector((state: State) =>
    state.listaFilmes.listagemConteudo.find((conteudo: Conteudo) => conteudo.id === idConteudo),
  );
  const { handleSubmit, control, reset } = useForm({
        mode: 'onSubmit',
      });
  const navigate = useNavigate();

  useEffect(() => {
    if (conteudoSelecionado) {
      reset(conteudoSelecionado);
    }
  }, [conteudoSelecionado as Conteudo]);

  const criarEditarConteudo = (data: Conteudo) => {
    if (isEdit) dispatch(atualizarConteudo(data));
    else dispatch(adicionarConteudo(data));
    navigate('/');
  };
  const excluir = () => {
    conteudoSelecionado && dispatch(removerConteudo(conteudoSelecionado?.id));
    navigate('/');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => {
        criarEditarConteudo(data as Conteudo);
      })}
      noValidate
      sx={{ mt: 1 }}
    >
      <Controller
        name="nome"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Box mb={4} height={80}>
            <TextField
              margin="normal"
              fullWidth
              id="nome"
              label="Nome filme/série"
              autoFocus
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              color='secondary'
            />
          </Box>
        )}
        rules={{
          required: 'Nome do filme é obrigatorio',
          pattern: { value: /^.{3,}$/, message: 'Nome do filme/série deve conter no mínimo 3 caracteres' },
        }}
      />
      <Controller
        name="genero"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Box height={100}>
            <TextField
              id="genero"
              select
              fullWidth
              label="Gênero"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              color='secondary'
            >
              {categorias.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  {option.key}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
        rules={{
          required: 'Gênero obrigatório',
        }}
      />
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <Grid item mb={4} xs={4} height={80}>
          <Controller
            name="duracao"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                InputProps={{ inputProps: { min: 0 }, endAdornment: <InputAdornment position="end">min</InputAdornment>,}}
                type={'number'}
                fullWidth
                label="Duração do filme"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                color='secondary'
              ></TextField>
            )}
            rules={{
              required: 'Tempo de duração do filme obrigatório',
              pattern: { value: /^[+]?\d+([.]\d+)?$/, message: 'Apenas números positivos' },
            }}
          />
        </Grid>
        <Grid item xs={2} height={80}>
          <Controller
            name="assistido"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                control={<Checkbox checked={value} onChange={onChange} name="Assistido" color='secondary'/>}
                label="Assistido"
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button type="submit" variant="outlined" fullWidth sx={{ mt: 3 }} color='secondary'>
            {isEdit ? 'Editar' : 'Criar'}
          </Button>
        </Grid>
        <Grid item xs={4}>
          {isEdit && (
            <Button onClick={excluir} variant="outlined" fullWidth sx={{ mt: 3 }} color='secondary'>
              Excluir
            </Button>
          )}
        </Grid>
        <Grid item xs={4}>
          <Button onClick={() => navigate('/')} variant="outlined" fullWidth sx={{ mt: 3 }} color='secondary'>
            Voltar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cadastro;