import React,{useContext} from 'react'
import GithubContext from '../../Context/Github/GithubContext'

const Alert = () => {
  const githubContext = useContext(GithubContext);
  return (
    githubContext.alert !==null && (<div className={`alert alert-light`}>
          <i className='fas fa-info-circle' />
          {githubContext.alert}
    </div>)
  )
}
export default Alert