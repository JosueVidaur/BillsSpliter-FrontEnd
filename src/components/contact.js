import React from "react"

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
    }
    hola(event) {
        console.log(event.target.value);
        this.props.handlerClick(event.target.value)
    }
    render() {
        return (
            <div>
                <p>{this.props.name}</p>
                <button onClick={this.hola.bind(this)} value={this.props.name}>add</button>
            </div>
        )
    }
        
    
    
}


