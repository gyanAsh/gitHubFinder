import React, { useState,useContext } from 'react'
import GithubContext from '../../Context/Github/GithubContext';

const Search =()=> {

    const [text, setText] = useState('');

    const githubContext = useContext(GithubContext);

    const onChange = (e) => {
        setText(e.target.value);
        githubContext.clearAlert();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            githubContext.setAlert("Please enter something");
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
            {githubContext.users.length>0 && <button className="btn btn-light btn-block" onClick={() => { githubContext.clearUsers(); githubContext.clearAlert()}}>Clear</button>}
      </div>
    )
}

export default Search;