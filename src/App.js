import React,{Component,Fragment} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar'
import Users from './Components/Users/Users'
import User from './Components/Users/User'
import Search from './Components/Users/Search'
import Alert from './Components/Layout/Alert'
import About from './Components/Pages/About'
import axios from 'axios';
class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos:[]
  }



  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false });
  }

  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ user: res.data, loading: false });
  }
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ repos: res.data, loading: false });
  }

  clearUsers = () => {
    this.setState({users: [],loading: false});
  }

  setAlert = (msg, type) => {
    this.setState({alert:{msg,type}})
  }
  clearAlert=()=>this.setState({alert:null})

  render() {
    const { users,user,repos, loading } = this.state;
    return (
      <Router>
      <div className="App">
        <Navbar title="Github Finder" icon="fa-regular fa-user" />
        <div className="container">
            <Alert alert={this.state.alert} />
            <Routes>
              <Route exact path='/' element={
                <Fragment>
                  <Search searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users.length > 0 ? true : false}
                        setAlert={this.setAlert}
                        clearAlert={this.clearAlert}
                      />
                  <Users loading={loading} users={users}/>
                </Fragment>
              } />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/user/:loginname'
                element={<User getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user={user}
                  repos ={repos}
                  loading={loading}/>} />
            </Routes>
          
        </div>
        </div>
        </Router>
    );
  }
}

export default App;
