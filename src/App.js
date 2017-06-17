import React, {Component} from "react";
import NavComponent from "./partials/NavComponent";

class App extends Component {
    render() {
        return (
            <div>
                <NavComponent/>
                {this.props.children}
            </div>
        )
    }
}

export default App;
