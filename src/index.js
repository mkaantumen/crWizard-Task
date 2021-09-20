import React from "react";
import ReactDOM from "react-dom";
import { LoginPage } from "./screens/LoginPage";
import { connect } from "react-redux";
import { createStore } from "redux";
import { Provider } from  "react-redux";
import { reducer } from "./reducers/reduce";
import {ADD,getData} from "./actions/action";
import { BrowserRouter, Route, Switch } from "react-router-dom";


const App = () => {
    return (
    <div className="App">
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
    </div>
  );
}

const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}

export const store = createStore(reducer, persistedState)

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
     <BrowserRouter>
        <App />
     </BrowserRouter>
    </Provider>,
    rootElement
);

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps,{ADD,getData})(App);
