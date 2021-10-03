import './App.css';
import {Route, Switch } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';
import About from './About';
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={apiResponse:""}
  }

  callAPI(){
    fetch("http://localhost:9000/testAPI")
    .then(res => res.text())
    .then(res => this.setState({apiResponse: res}))
  }
  componentDidMount(){
    //this.callAPI();
  }
  render(){
    return (
      <div>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/shop" component={Shop} />
          <Route path="/about" component={About} />
        </Switch>
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
