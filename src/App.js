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
            respositoryItem.innerHTML = `<a href="${repository.html_url}" target="_blank" rel="noopener noreferrer" class="text-dark text-decoration-none fw-normal">${repository.html_url}</a>`;
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
          const reposGrid = document.createElement('ul');
          for(let repository of repos){
            const respositoryItem = document.createElement('li');
            respositoryItem.innerHTML = `<a href="https://gist.github.com/${repository.owner.login}" target="_blank" rel="noopener noreferrer" class="text-dark text-decoration-none fw-normal">${repository.owner.login}</a>
                                            - 
                                            <a href="${repository.html_url}" target="_blank" rel="noopener noreferrer" class="text-dark text-decoration-none fw-normal">${repository.html_url}</a>`;
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
    return(
      <div className="row pt-4">
        <div className="col-10 offset-1 col-lg-6 offset-lg-3 bg-dark rounded-3 px-2">
          <h1 className="m-2 text-warning fw-light">Search user:</h1>
          <div className="col-10">
            <input type='string' value={this.state.user} onChange={this.handleChange} className="form-control m-2"></input>
          </div>
          <div> 
            <button onClick={this.searchRepos} className="btn btn-warning m-2">Repositories</button>
            <button onClick={this.searchStarred} className="btn btn-warning m-2">Starred</button>            
          </div>
          <h3 className="text-danger m-2 fw-normal">User detail &#8658; <Link to={`/${this.state.user}`} className="text-light text-decoration-none">{this.state.user}</Link></h3>
          <div id="result" className="bg-light rounded-3 m-2">
    
          </div>
        </div>
      </div>
    );
  }
};

export default App;
