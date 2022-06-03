import React,{useContext} from 'react';
import RepoItems from './RepoItem'
import GithubContext from '../../Context/Github/GithubContext'

const Repos = () => {
  const githubContext = useContext(GithubContext);
  return githubContext.repos.map(repo=> <RepoItems key={repo.id} repo = {repo}/>)
}

export default Repos;
