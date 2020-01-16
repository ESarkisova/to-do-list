import React from 'react';
import './App.sass';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Header from "./components/Header/Header";
import Alert from "./components/Alert/Alert";
import {AlertState} from "./context/alert/AlertState";
import {DbState} from "./context/database/DbState";

function App() {
  return (
      <DbState>
          <AlertState>
            <BrowserRouter>
                <div className="container">
                    <div className="jumbotron p-0">
                        <Header/>
                        <Alert />
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </AlertState>
      </DbState>
  );
}

export default App;
