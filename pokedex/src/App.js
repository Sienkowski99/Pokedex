import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Pokemon from './components/Pokemon'
import NotFound from './components/NotFound'
import Main from './components/Main'
import './App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import operations from './operations';

function App(props) {
  useEffect(()=>{
    props.fetchPokemonCards();
  },[])
  return (
    <BrowserRouter>
        {/* <Navbar/> */}
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/pokemon/:id" component={Pokemon}/>
          <Route exact path="/*" component={NotFound}/>
        </Switch>
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPokemonCards: () => dispatch(operations.fetchPokemonCards())
  }
}

export default connect(null, mapDispatchToProps)(App);
