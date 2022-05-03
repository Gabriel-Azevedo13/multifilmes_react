import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { State } from '../../../store';
import { Conteudo } from '../../../store/slices/MultiFilmesSlice';
import Cadastro from '../components/Cadastro/CadastroFilmes';
import { Header } from '../components/Header';

const CadastroFilmes: FC = () => {
  const lista = useSelector((state: State) => state.listaFilmes.listagemConteudo);
  const { idConteudo } = useParams();
  const isEdit = !!idConteudo && lista.filter((conteudo: Conteudo) => conteudo.id === idConteudo).length > 0;

  return (
    <>
      <Header isEdit={isEdit}/>
      <Cadastro idConteudo={idConteudo} isEdit={isEdit}/>
    </>
  );
};

export default CadastroFilmes;
