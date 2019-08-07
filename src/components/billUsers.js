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

  personalAmount = user => {
    console.log('llamado');
    return Number(this.props.billAmount) * Number(user.amount);
  };

  removeContact = event => {
    const user = this.props.users.find(
      user => user.id.toString() == event.target.value
    );
    this.props.onRemove(user);
  };

  personalPercent = userId => {
    let maxAmount = 0;
    const otherUsers = this.props.users.filter(user => user.id !== userId);
    otherUsers.map(user => (maxAmount = Number(user.amount) + maxAmount));
    console.log('maximo', (1 - maxAmount).toFixed(2));
    return (1 - maxAmount).toFixed(2);
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
              type='number'
              min='0'
              max={this.personalPercent(user.id)}
              step='0.1'
              onChange={this.sendAmount}
              value={user.amount}
              placeholder='Personal Amount'
              id={user.id}
            />
            <label id={user.id}>{this.personalAmount(user)}</label>
            <Button
              size='mini'
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
