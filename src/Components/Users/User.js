import React, { Component,Fragment } from 'react';
import Spinner from '../Layout/Spinner';
import Repos from '../Repos/Repos'
import PropTypes from 'prop-types'
import { useParams,Link } from 'react-router-dom';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class User extends Component {
    
    componentDidMount() {
        let { login } = this.props.params;
        this.props.getUser(login);
        this.props.getUserRepos(login);
     }
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    }
    render() {
      
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

        } = this.props.user;
        
      const { loading } = this.props;
      if(loading) return <Spinner/>
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
        <Repos repos={this.props.repos}/>
      </Fragment>
    )
  }
}



export default withParams(User)