import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING,
    SET_ALERT,
    REMOVE_ALERT
} from '../Types'

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert:null
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);
    
    //Search users
    const searchUsers = async (text) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
      }
    //Get User
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // setUser(res.data);
        dispatch({
            type: GET_USER,
            payload: res.data
        });
      }

    //Get Repos
    const getUserRepos = async (username) => {
        setLoading();
         const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: GET_REPOS,
            payload:res.data
         })
       }

    //Clear Users
    const clearUsers = () => {
        dispatch({type: CLEAR_USERS});
    }

    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    //Set Alert
    const setAlert = (msg) => {
        dispatch({type:SET_ALERT, payload:msg});
    }

    //Clear Alert
    const clearAlert = () => dispatch({ type:REMOVE_ALERT });

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            alert:state.alert,
            searchUsers,
            getUser,
            getUserRepos,
            clearUsers,
            setAlert,
            clearAlert
        }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;