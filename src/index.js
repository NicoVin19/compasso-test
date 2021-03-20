import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import User from './User';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


class Wrapper extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Router>
        <div className="bg-white vh-100 w-auto">
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

