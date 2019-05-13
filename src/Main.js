import React, { Component } from "react";
import { Route, HashRouter} from "react-router-dom";
import Home from "./components/home/Home";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Horas y temperaturas</h1>
                    <div className="content">
                        <div className="content">
                            <Route exact path="/" component={Home} />
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;