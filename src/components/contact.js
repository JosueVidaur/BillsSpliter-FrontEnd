import React from 'react';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
  }
  sendContact() {
    this.props.handlerClick(this.props.user);
  }
  render() {
    return (
      <div style={{ width: '90%', margin: '5px' }}>
        <div style={{ width: '70%', display: 'inline-block' }}>
          <label>
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
