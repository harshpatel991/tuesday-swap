import React, {Component} from "react";

class CardIcon extends Component {

    colors = ["#34495e", "#e45656", "#f39c12", "#2ecc71", "#3498db", "#9b59b6"];

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="code-icon" style={{"background-color" : this.hash(this.props.name)}}>
                {this.props.name}
            </div>
        )
    }

    hash(input) {
        var hash = 0, i, chr;
        if (input.length === 0) return hash;
        for (i = 0; i < input.length; i++) {
            chr   = input.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }

        return this.colors[this.mod(hash, this.colors.length)];
    }

    mod(n, m) {
        return ((n % m) + m) % m;
    }
}
export default CardIcon;