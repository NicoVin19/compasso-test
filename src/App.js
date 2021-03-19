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
              const reposGrid = document.createElement('ul');
    
              for(let repository of repos){
                const respositoryItem = document.createElement('li');
                respositoryItem.innerHTML = `<a href="${repository.html_url}" target="_blank" rel="noopener noreferrer">${repository.html_url}</a>`;
                reposGrid.append(respositoryItem);
              }
              result.append(reposGrid);
    
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
            const reposGrid = document.createElement('ul');
            for(let repository of repos){
              const respositoryItem = document.createElement('li');
              respositoryItem.innerHTML = `<a href="https://gist.github.com/${repository.owner.login}" target="_blank" rel="noopener noreferrer">${repository.owner.login}</a>
                                           - 
                                           <a href="${repository.html_url}" target="_blank" rel="noopener noreferrer">${repository.html_url}</a>`;
              reposGrid.append(respositoryItem);
            }
            result.append(reposGrid);
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
          <div>
            <h1>Search user:</h1>
            <input type='string' value={this.state.user} onChange={this.handleChange}></input>
            <button onClick={this.searchRepos}>Repositories</button>
            <button onClick={this.searchStarred}>Starred</button>
            
              <h2>User detail: <Link to={`/${this.state.user}`}>{this.state.user}</Link></h2>
            
            <div id="result">
    
            </div>
          </div>
        );
      }
    };

export default App;
