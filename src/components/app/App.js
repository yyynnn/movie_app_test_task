import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../../store/store";
import Main from "../Main";
import List from "../List";
import Tickets from "../Tickets";
import AppHeader from "../AppHeader";
import { Health, Accident, Nearmiss, PossibleAccident } from "../health/indexHealth";
import MenuPanel from "../menuPanel/MenuPanel";
import Quality from "../quality/Quality";
import Environment from "../environment/Environment";
import Database from "../database/Database";

const store = configureStore();

function App() {
    return (
        <Router>
            <div className="App">
                <AppHeader />
                <Provider store={store}>
                    <Switch>
                        <Route exact path="/">
                            <Main />
                        </Route>
                        <Route exact path="/list">
                            <List />
                        </Route>
                        <Route exact path="/tickets">
                            <Tickets />
                        </Route>
                        <Route exact path="/database">
                            <Database />
                        </Route>
                        <Route exact path="/health">
                            <Health />
                        </Route>
                        <Route exact path="/quality">
                            <Quality />
                        </Route>
                        <Route exact path="/environment">
                            <Environment />
                        </Route>
                        <Route exact path="/accident">
                            <Accident />
                        </Route>
                        <Route exact path="/nearmiss">
                            <Nearmiss />
                        </Route>
                        <Route exact path="/possibleAccident">
                            <PossibleAccident />
                        </Route>

                        {/* <Redirect to="/404" /> */}
                    </Switch>
                    <MenuPanel />
                </Provider>
            </div>
        </Router>
    );
}

export default App;
