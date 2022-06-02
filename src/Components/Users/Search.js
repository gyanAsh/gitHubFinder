import React, { useState } from 'react'
import PropTypes from 'prop-types';

const Search =({showClear,clearUsers,clearAlert,setAlert,searchUsers})=> {

    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
        clearAlert();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert("Please enter something", 'light');
          } else {
            searchUsers(text);
            setText('');
          }
        
    }

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" name="text" onChange={onChange} placeholder="Search Users..." value={text} />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {showClear &&<button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
      </div>
    )
}
Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
    clearAlert:PropTypes.func.isRequired
}
export default Search;