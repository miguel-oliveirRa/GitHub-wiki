import { useCallback, useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import Button from '../components/Button';
import api from '../services/api'
import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState()
  const [repos, setRepos] = useState([])

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${ currentRepo }`)
    
    try {
      if(data.id){
        const isExist = repos.find(repo => repo.id === data.id)
  
        if(!isExist){
          setRepos(prev => [...prev, data])
          setCurrentRepo('')
          return
        }

        if(isExist){
          throw new Error('Repositório já existente encontrado!')
        }
      }
    } catch (error) {
      alert(error.message)
    }
    
  }

  const handleRemove = useCallback((id) => {
    setRepos(prev => prev.filter(rmRepo => rmRepo.id !== id ))
  },[])

  return (
    <Container>
        <img src={ gitLogo } width={ 72 } height={ 72 } alt='github-logo' />
        <Input  value={ currentRepo } onChange={ e => setCurrentRepo(e.target.value) } />
        <Button  onClick={ handleSearchRepo } />
        { repos.map(repo => <ItemRepo handleRemoveRepo={ handleRemove } key={ repo.id } repo={ repo } />) }
    </Container>
  );
}

export default App;
