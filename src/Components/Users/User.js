import React, { useEffect,Fragment,useContext } from 'react';
import Spinner from '../Layout/Spinner';
import Repos from '../Repos/Repos'
import GithubContext from '../../Context/Github/GithubContext';
import { useParams,Link } from 'react-router-dom';

const User=()=> {
  let { loginname } = useParams();
  const githubContext = useContext(GithubContext);

  useEffect(() => {
        githubContext.getUser(loginname);
        githubContext.getUserRepos(loginname);
    //eslint-disable-next-line
  }, [])

      
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            company,
            hirable

        } = githubContext.user;
        
    if (githubContext.loading)
    return <Spinner />
  
    return (
      <Fragment>
        <Link to={'/'} className='btn btn-light'>Back to Search</Link>
        Hirable: {''}
        {hirable ? (<i className='text-success' >Yes</i>) :
          (<i className='text-danger' >No</i>)}
        <div className='card grid-2'>
          <div className='all-center'>
            <img src={avatar_url}
              alt="Profile pic"
              className='round-img'
              style={{ width: '150px' }} />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Biography</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username:</strong> {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company:</strong> {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Blog:</strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className='badge badge-primary'>Followers: {followers}</div>
          <div className='badge badge-success'>Following: {following}</div>
          <div className='badge badge-light'>Public Repos: {public_repos}</div>
          <div className='badge badge-dark'>Public Gists: {public_gists}</div>
        </div>
        <Repos />
      </Fragment>
    )
}


export default User;