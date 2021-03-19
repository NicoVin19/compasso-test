import React from 'react';
import axios from 'axios'; 
import {Link} from 'react-router-dom';


class User extends React.Component {
    constructor(props){
        super(props);

    }
    componentDidMount(){
        const userResult = document.getElementById('userResult');
        axios.get(`https://api.github.com/users${this.props.match.url}`)
          .then(res => {
            userResult.innerHTML = `<a href={"${res.data.html_url}"}>${res.data.html_url}</a>`
        })
          .catch(e => {
            userResult.innerHTML = `<h3>USER NOT FOUND</h3>`
          })
    }
    render() {
        let id = this.props.match.url;
        return(
            <div>
                <h1>User: {id}</h1>
                <div id="userResult"></div>
            </div>
        );
    }
};

export default User;
