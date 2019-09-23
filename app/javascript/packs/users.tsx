import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class UserAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginname: '',
            password: '',
        };
    } 

    handleLoginnameChange = (e) => {
        this.setState({ loginname: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleClick = () => {
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

        fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                user: {
                    loginname: this.state.loginname,
                    password: this.state.password
                }
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf,
            }})
            .then(res => {
                window.location.reload(false);
            })
            .catch(error => {
                console.error(error);
            })
    }

    render() {
        return (
            <div>
                <p>loginname:<input type="text" value={this.state.loginname} onChange={this.handleLoginnameChange} /></p>
                <p>password:<input type="password" value={this.state.password} onChange={this.handlePasswordChange} /></p>
                <button onClick={this.handleClick}>Entry</button>
            </div>
        );
    }
}

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            users: [],
        };
    }

    componentDidMount() {
        fetch('/api/users')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    users: json,
                })
            });
    }

    render() {
        let { isLoaded, users } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>
        }
        else {
            return (
                <div className="user">
                    <UserAdd />
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {user.loginname}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <UserList />,
        document.body.appendChild(document.createElement('div')),
    )
})
  