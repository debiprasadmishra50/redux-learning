import React from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const PageOne = () => {
    return (
        <h2>
            PageOne
            <Link to="/pagetwo">Go To PageTwo</Link>
        </h2>
    );
};
const PageTwo = () => {
    return (
        <h2>
            PageTwo
            <button>CLick ME</button>
            <Link to="/">Back to Home</Link>
            <br />
            <Link to="/pagethree">Page Three</Link>
        </h2>
    );
};

const App = () => {
    return (
        <div>
            <Router>
                <div>
                    <Route path="/" exact component={PageOne}></Route>
                    <Route path="/pagetwo" component={PageTwo}></Route>
                </div>
            </Router>
        </div>
    );
};

export default App;
