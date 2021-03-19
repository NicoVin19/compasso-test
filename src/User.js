import React from 'react';
import axios from 'axios'; 
import {Link} from 'react-router-dom';


class User extends React.Component {
    constructor(props){
        super(props);

    }
    componentDidMount(){
        const userResult = document.getElementById('userResult');
        const username = this.props.match.url
        const data = username.substring(1)
        axios.get(`https://api.github.com/users/${data}`)
          .then(res => {
            userResult.innerHTML = `<a href={"${res.data.html_url}"} target="_blank" rel="noopener noreferrer">${res.data.html_url}</a>`
        })
          .catch(e => {
            userResult.innerHTML = `<span>USER NOT FOUND</span>`
          })
    }

    render() {
        let id = this.props.match.url;
        return(
            <div>
                <Link to={{pathname:"/" , state: `${id}` }}>Back</Link>
                <h1>Github User: {id}</h1>
                <div id="userResult"></div>
            </div>
        );
    }
};

export default User;
