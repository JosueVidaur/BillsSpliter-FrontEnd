import React from "react"
import { Button } from 'grommet'


export default class Contact extends React.Component {
    constructor(props) {
        super(props);
    }
    sendContact() {
        this.props.handlerClick(this.props.user)
    }
    render() {
        return (
            <div>
                <p>{this.props.user.firstName} {this.props.user.lastName}</p>
                <Button
                    label="Add"
                    onClick={this.sendContact.bind(this)}
                />
            </div>
        )
    }



}


