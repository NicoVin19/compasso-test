import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from './User';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';


class Wrapper extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Router>
        <div>

          <Switch>
            <Route path="/:id" component={User} />
            <Route path="/" exact component={App} />

          </Switch>
        </div>
      </Router>
    );
  }
};

ReactDOM.render(<Wrapper />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

