import React from 'react';
import { Button } from 'semantic-ui-react';

class BillUsers extends React.Component {
  sendAmount = event => {
    const user = this.props.users.find(
      user => user.id.toString() == event.target.id
    );
    this.props.handleOnChange({
      ...user,
      amount: event.target.value
    });
  };

  removeContact = event => {
    const user = this.props.users.find(
      user => user.id.toString() == event.target.value
    );
    this.props.onRemove(user);
  };

  render() {
    return (
      <div>
        {this.props.users.map(user => (
          <div>
            <label key={user.id} style={{ display: 'inline-block' }}>
              {user.firstName} {user.lastName}
            </label>
            <input
              type='text'
              onChange={this.sendAmount}
              value={user.amount}
              placeholder='Personal Amount'
              id={user.id}
            />
            <Button
              color='red'
              type='button'
              value={user.id}
              onClick={this.removeContact}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    );
  }
}

export default BillUsers;
