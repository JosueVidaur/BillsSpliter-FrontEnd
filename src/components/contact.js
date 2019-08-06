import React from "react"

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
    }
    sendContact(event) {
        this.props.handlerClick(event.target.value)
    }
    render() {
        return (
            <div>
                <p>{this.props.user.firstName} {this.props.user.lastName}</p>
                <button onClick={this.sendContact.bind(this)} value={this.props.user.id} >add</button>
            </div>
        )
    }
        
    
    
}


