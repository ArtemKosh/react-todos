import React from 'react';
import AddTodo from '../../components/AddTodo'
import Todos from '../../components/Todos'
import Footer from '../../components/Footer'
import {connect} from "react-redux";
import * as actionTypes from '../../redux/todo/actions/actions'
import {Todo} from "../../interfaces";
import {CustomAction} from "../../redux/todo/reducers/reducer";
import {Action} from "redux";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {BrowserRouter, Route} from "react-router-dom";
import {State} from '../../redux/store';

interface AppProps {
  propsTodos: Array<Todo>;
  onAddedTodo(param: string): void;
  onGetTodos(): void;
}

class App extends React.Component<AppProps>{
  constructor(props: AppProps) {
    super(props);
    props.onGetTodos();
  }

  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" color='error' gutterBottom={true} align='center'>todos</Typography>
          <div>
            <AddTodo todoAdd={this.props.onAddedTodo}/>
            <Route path='/' exact component={Todos}/>
            <Route path='/active' component={Todos}/>
            <Route path='/completed' component={Todos}/>
          </div>
          <Footer />
        </Container>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    propsTodos: state.todos.entities
  }
};

const mapDispatchToProps = (dispatch: (param: CustomAction | Action) => void) => {
  return {
    onAddedTodo: (name: string) => dispatch({type: actionTypes.PUT_TODO, payload: {name}}),
    onGetTodos: () => dispatch({type: actionTypes.GET_TODOS}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

