import React, { useState,useContext } from 'react'
import GithubContext from '../../Context/Github/GithubContext';
import AlertContext from '../../Context/Alert/AlertContext'

const Search =()=> {

    const [text, setText] = useState('');

    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const onChange = (e) => {
        setText(e.target.value);
        alertContext.clearAlert();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            alertContext.setAlert("Please enter something");
          } else {
            githubContext.searchUsers(text);
            setText('');
          }
        
    }

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" name="text" onChange={onChange} placeholder="Search Users..." value={text} />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {githubContext.users.length>0 && <button className="btn btn-light btn-block" onClick={() => { githubContext.clearUsers(); alertContext.clearAlert()}}>Clear</button>}
      </div>
    )
}

export default Search;