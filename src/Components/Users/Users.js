import React, { Component } from 'react';
import UserItem from './UserItem'

class Users extends Component {
    state = {
        users: [
            {
                id: "1",
                login: 'mojombo',
                avatarUrl: "https://avatars0.githubusercontent.com/u/1?v=4",
                htmlUrl: "https://github.com/mojombo"
            },
            { 
                id: "2",
                login: 'defunkt',
                avatarUrl: "https://avatars0.githubusercontent.com/u/2?v=4",
                htmlUrl: "https://github.com/defunkt"
            }    
        ]
    }
    render() {
        return (
            <div style={userStyle}>
                {this.state.users.map(user => (
                    <UserItem key={user.id} user={user}/>
                ))}
            </div>
        )
    }
}
const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap:'1rem'
}
export default Users;