import React from "react";
import Main from "./components/main";
import List from "./components/list";
import { Route, Switch, Redirect } from "react-router-dom";
import configureStore from "./store/store";
import { Provider } from "react-redux";
const store = configureStore();

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Switch>
                    <Route path="/list" component={List} />
                    <Route path="/" exact component={Main} />

                    <Redirect to="/404" />
                </Switch>
            </Provider>
        </div>
    );
}

export default App;
