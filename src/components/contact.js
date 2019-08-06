import React from "react"


export default class Contact extends React.Component {
    constructor(props) {
        super(props);
    }
    sendContact() {
        this.props.handlerClick(this.props.user)
    }
    render() {
        return (
            <div style={{width: "40%"}}>
                <label>{this.props.user.firstName} {this.props.user.lastName}</label>
                <button
                    onClick={this.sendContact.bind(this)}
                >
                Add
                </button>
            </div>
        )
    }



}


