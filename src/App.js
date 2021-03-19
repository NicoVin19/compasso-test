import React from 'react';
import axios from 'axios'; 
import {Link} from 'react-router-dom';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          user: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchRepos = this.searchRepos.bind(this);
        this.searchStarred = this.searchStarred.bind(this);
    
      }
      handleChange(e){
        this.setState(state => ({user: e.target.value}));
    
      }
      searchRepos(){
        axios.get(`https://api.github.com/users/${this.state.user}/repos`)
          .then(res => {
              const repos = res.data;
              const result = document.getElementById('result');
              result.textContent = '';
              if(repos.length > 0){
                const reposGrid = document.createElement('ul');
                for(let repository of repos){
                  const respositoryItem = document.createElement('li');
                  respositoryItem.innerHTML = `<a href="${repository.html_url}" target="_blank" rel="noopener noreferrer">${repository.html_url}</a>`;
                  reposGrid.append(respositoryItem);
                }
                result.append(reposGrid);
              } else {
                result.innerHTML = `<span>No Repositories</span>`;
              }
    
          })
          .catch(e => {
            const result = document.getElementById('result');
            result.innerHTML = `<span>No Data</spana>`;
          })
          
      }
      searchStarred(){
        axios.get(`https://api.github.com/users/${this.state.user}/starred`)
          .then(res => {
            const repos = res.data;
            const result = document.getElementById('result');
            result.textContent = '';
            if(repos.length > 0){
              console.log(repos);
              const reposGrid = document.createElement('ul');
              for(let repository of repos){
                const respositoryItem = document.createElement('li');
                respositoryItem.innerHTML = `<a href="https://gist.github.com/${repository.owner.login}" target="_blank" rel="noopener noreferrer">${repository.owner.login}</a>
                                            - 
                                            <a href="${repository.html_url}" target="_blank" rel="noopener noreferrer">${repository.html_url}</a>`;
                reposGrid.append(respositoryItem);
              }  
              result.append(reposGrid);
            } else {
              result.innerHTML = `<span>No Starred Repositories</span>`;
            }
          })
          .catch(e => {
              const result = document.getElementById('result');
              result.innerHTML = `<span>No Data</span>`;
            })
    
      }
      componentWillMount(){
        if(this.props.history.action==='POP') {
          this.props.location.state='';
          this.setState(state => ({user: ''}))
        } else {
          const persistentUser = this.props.location.state;
          this.setState(state => ({user: persistentUser.substring(1)}))
        }
    }
      render() {
        console.log(this.props);
        return(
        <div className="row m-2">
          <div className="col-4 offset-4">
            <h1 className="mb-2 text-warning">Search user:</h1>
            <input type='string' value={this.state.user} onChange={this.handleChange} className="form-control mb-2"></input>
            <div> 
              <button onClick={this.searchRepos} className="btn btn-warning m-2">Repositories</button>
              <button onClick={this.searchStarred} className="btn btn-warning m-2">Starred</button>            
            </div>
            <h2 className="text-danger">User detail &#8658; <Link to={`/${this.state.user}`} className="text-decoration-none">{this.state.user}</Link></h2>
            <div id="result" className="bg-light rounded-3">
    
            </div>
          </div>
        </div>
        );
      }
    };

export default App;
