import React from "react";

// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Router, Route, Switch } from "react-router-dom"; // to get access to history object

import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

import Header from "./Header";
import history from "./../../../history";

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={StreamList}></Route>
                        <Route
                            path="/streams/new"
                            component={StreamCreate}
                        ></Route>
                        <Route
                            path="/streams/edit/:id"
                            component={StreamEdit}
                        ></Route>
                        <Route
                            path="/streams/delete/:id"
                            component={StreamDelete}
                        ></Route>
                        <Route
                            path="/streams/:id"
                            component={StreamShow}
                        ></Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
