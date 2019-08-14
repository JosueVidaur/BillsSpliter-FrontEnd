import React from 'react';
import { Label } from 'semantic-ui-react';

export default class Contact extends React.Component {
  sendContact() {
    this.props.handlerClick(this.props.user);
  }
  render() {
    return (
      <div style={{ width: '80%', margin: '5px' }}>
        <div style={{ width: '70%', display: 'inline-block' }}>
          <span>
            <Label style={{ fontSize: '16px', marginRight: '10px' }} circular>
              {this.props.user.firstName.charAt(0)}
            </Label>
          </span>
          <label style={{ fontWeight: 'bold', color: '#383428' }}>
            {this.props.user.firstName} {this.props.user.lastName}
          </label>
        </div>
        {this.props.editable ? (
          <button onClick={this.sendContact.bind(this)}>Add</button>
        ) : null}
      </div>
    );
  }
}
