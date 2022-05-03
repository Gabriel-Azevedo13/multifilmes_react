import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

interface MultiFilmesState {
  listagemConteudo: Conteudo[];
}

export interface Conteudo {
  id: string;
  nome: string;
  genero: string;
  duracao: number;
  assistido: boolean;
}

const initialState: MultiFilmesState = {
  listagemConteudo: JSON.parse(localStorage.getItem('listaFilmes') as unknown as string) || [],
};

const atualizarLocalStorage = (listaFilmes: Conteudo[]) => {
  localStorage.setItem('listaFilmes', JSON.stringify(listaFilmes));
};

export const listagemConteudoSlice = createSlice({
  name: 'listagemConteudoSlice',
  initialState,
  reducers: {
    marcarAssistido: (state, action: PayloadAction<{ id: string; assistido: boolean }>) => {
      state.listagemConteudo[state.listagemConteudo.findIndex((conteudo) => conteudo.id === action.payload.id)].assistido =
        action.payload.assistido;
      atualizarLocalStorage(state.listagemConteudo);
    },
    atualizarConteudo: (state, action: PayloadAction<Conteudo>) => {
      state.listagemConteudo[state.listagemConteudo.findIndex((conteudo) => conteudo.id === action.payload.id)] =
      action.payload;
      atualizarLocalStorage(state.listagemConteudo);
      toast.success('Filme/Série atualizado com sucesso!');
    },
    adicionarTempoDuracao: (state, action: PayloadAction<Conteudo>) => {
      state.listagemConteudo[state.listagemConteudo.findIndex((conteudo) => conteudo.id === action.payload.id)].duracao =
        +state.listagemConteudo[state.listagemConteudo.findIndex((conteudo) => conteudo.id === action.payload.id)].duracao + 1;
      atualizarLocalStorage(state.listagemConteudo);
    },
    adicionarConteudo: (state, action: PayloadAction<Conteudo>) => {
      action.payload.id = uuidv4();
      state.listagemConteudo.push(action.payload);
      atualizarLocalStorage(state.listagemConteudo);
      toast.success('Filme/Série adicionado com sucesso!');
    },
    removerTempoDuracao: (state, action: PayloadAction<Conteudo>) => {
      state.listagemConteudo[state.listagemConteudo.findIndex((conteudo) => conteudo.id === action.payload.id)].duracao > 1
        ? (state.listagemConteudo[state.listagemConteudo.findIndex((conteudo) => conteudo.id === action.payload.id)
          ].duracao =state.listagemConteudo[state.listagemConteudo.findIndex((conteudo) => conteudo.id === action.payload.id)].duracao - 1)
        : state.listagemConteudo.splice(state.listagemConteudo.map((x) => {return x.id;}).indexOf(action.payload.id),1,);
      atualizarLocalStorage(state.listagemConteudo);
    },
    removerConteudo: (state, action: PayloadAction<string>) => {
      const index = state.listagemConteudo.map((x) => {return x.id;}).indexOf(action.payload);
      state.listagemConteudo.splice(index, 1);
      atualizarLocalStorage(state.listagemConteudo);
      toast.error('Filme/Série removido com sucesso!');
    },
  },
});

export const {
  marcarAssistido,
  atualizarConteudo,
  adicionarTempoDuracao,
  adicionarConteudo,
  removerTempoDuracao,
  removerConteudo,
} = listagemConteudoSlice.actions;

export default listagemConteudoSlice.reducer;
