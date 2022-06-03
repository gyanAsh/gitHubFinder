import React,{Fragment} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar'
import Users from './Components/Users/Users'
import User from './Components/Users/User'
import Search from './Components/Users/Search'
import Alert from './Components/Layout/Alert'
import About from './Components/Pages/About'
import PageNotFound from './Components/Pages/PageNotFound'
import GithubState from './Context/Github/GithubState'
import AlertState from './Context/Alert/AlertState';
const App=()=> {

  return (
    <GithubState>
      <AlertState>
      <Router>
      <div className="App">
        <Navbar title="Github Finder" icon="fa-regular fa-user" />
        <div className="container">
            <Alert/>
            <Routes>
              <Route exact path='/' element={
                <Fragment>
                  <Search/>
                  <Users/>
                </Fragment>
              } />
              <Route exact path='/about' element={<About />} />
                <Route exact path='/user/:loginname' element={<User />} />
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
          
        </div>
        </div>
        </Router>
        </AlertState>
      </GithubState>
    );
}

export default App;
