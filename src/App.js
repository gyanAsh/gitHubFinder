import React,{useState,Fragment} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar'
import Users from './Components/Users/Users'
import User from './Components/Users/User'
import Search from './Components/Users/Search'
import Alert from './Components/Layout/Alert'
import About from './Components/Pages/About'
import axios from 'axios';
const App=()=> {

  const[users, setUsers] = useState([]);
  const[user, setUser] = useState({});
  const[loading, setLoading] = useState(false);
  const[alert, setAlertMsg] = useState(null);
  const[repos, setRepos] = useState([]);



  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data.items);
    setLoading(false);
  }

  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  }
  const getUserRepos = async (username) => {
   setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);
  }

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const setAlert = (msg) => {
    setAlertMsg(msg);
  }

  const clearAlert = () => setAlert(null);

    return (
      <Router>
      <div className="App">
        <Navbar title="Github Finder" icon="fa-regular fa-user" />
        <div className="container">
            <Alert alert={alert} />
            <Routes>
              <Route exact path='/' element={
                <Fragment>
                  <Search searchUsers={searchUsers}
                        clearUsers={clearUsers}
                        showClear={users.length > 0 ? true : false}
                        setAlert={setAlertMsg}
                        clearAlert={clearAlert}
                      />
                  <Users loading={loading} users={users}/>
                </Fragment>
              } />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/user/:loginname'
                element={<User getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos ={repos}
                  loading={loading}/>} />
            </Routes>
          
        </div>
        </div>
        </Router>
    );
}

export default App;
