import React from 'react';
import AddTodo from '../components/AddTodo'
import Todos from '../components/Todos'
import Footer from '../components/Footer'
import { connect } from "react-redux";
import * as actionTypes from '../store/actions'
import {Todo} from "../interfaces";
import {CustomAction, State} from "../store/reducer";
import {Action} from "redux";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { BrowserRouter, Route, Link } from "react-router-dom";
import TodosActive from "../components/TodosActive";
import TodosComplited from "../components/TodosComplited";


interface AppProps {
  propsTodos: Array<Todo>;
  onAddedTodo(param: string): void;
  onRemovedTodo(param: string): void;
  onGetTodos(): void;
  onCheckedTodo(param: string, checked: any): void;
}

interface AppState {
  todos: Array<Todo>
}

class App extends React.Component<AppProps, AppState>{
  constructor(props: AppProps) {
    super(props);
    props.onGetTodos();
  }

  render(): React.ReactNode {
    const list = this.props.propsTodos.map((todo:Todo) => {
      return <Todos
        key={todo.id}
        name={todo.name}
        checked={todo.checked}
        clicked={() => this.props.onRemovedTodo(todo.id as string)}
        todoCompleted={() => this.props.onCheckedTodo((todo.id as string), todo.checked)}
      />
    });
    return (
      <BrowserRouter>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" color='error' gutterBottom={true} align='center'>todos</Typography>
          <div>
            <AddTodo todoAdd={this.props.onAddedTodo}/>
            <List>
              {list}
            </List>
          </div>
          <Footer />
        </Container>
        {/*<Route path='/' exact component={Todos}/>*/}
        {/*<Route path='/active' component={TodosActive}/>*/}
        {/*<Route path='/completed' component={TodosComplited}/>*/}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    propsTodos: state.todos
  }
};

const mapDispatchToProps = (dispatch: (param: CustomAction | Action) => void) => {
  return {
    onAddedTodo: (name: string) => dispatch({type: actionTypes.PUT_TODO, payload: {name}}),
    onRemovedTodo: (id: string) => dispatch({type: actionTypes.DELETE_TODO, payload: {id}}),
    onGetTodos: () => dispatch({type: actionTypes.GET_TODOS}),
    onCheckedTodo: (id: string, checked: boolean) => dispatch({type: actionTypes.CHECKED_TODO, payload: {id, checked}}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


