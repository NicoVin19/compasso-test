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
            userResult.innerHTML = `<a href="${res.data.html_url}" target="_blank" rel="noopener noreferrer" class="text-dark text-decoration-none fw-normal">${res.data.html_url}</a>`
        })
          .catch(e => {
            userResult.innerHTML = `<p class="text-dark text-decoration-none fw-normal">USER NOT FOUND</p>`
          })
    }

    render() {
        let id = this.props.match.url;
        return(
            <div className="row pt-4">
                <div className="col-10 offset-1 col-lg-6 offset-lg-3 bg-dark rounded-3 px-2">
                    <h3 className="text-danger m-2 fw-normal">Github User: {id}</h3>
                    <div id="userResult" className="bg-light m-2 rounded-3">
                        
                    </div>
                    <Link to={{pathname:"/" , state: `${id}` }} className="btn btn-secondary m-2">Back</Link>

                </div>
            </div>
        );
    }
};

export default User;
