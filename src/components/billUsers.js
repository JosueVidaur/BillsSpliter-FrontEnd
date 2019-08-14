import React from 'react';
import { Button, Input, Label } from 'semantic-ui-react';

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
    const amount = Number(this.props.billAmount) * Number(user.amount / 100);
    return Math.round(amount * 100) / 100;
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
    return (100 - maxAmount).toFixed(2);
  };

  render() {
    return (
      <div>
        {this.props.users.map(user => (
          <div style={{ marginBottom: '10px' }}>
            <Label
              size='large'
              color='white'
              key={user.id}
              style={{ display: 'inline-block', width: '35%' }}
            >
              {user.firstName} {user.lastName}
            </Label>
            <Input
              style={{ width: '25%', marginLeft: '5%' }}
              label={{ basic: true, content: '%' }}
              labelPosition='right'
              size='mini'
              type='number'
              min='0'
              max={this.personalPercent(user.id)}
              step='1'
              onChange={this.sendAmount}
              value={user.amount}
              placeholder='Personal Amount'
              id={user.id}
            />
            <label style={{ margin: '2px' }} id={user.id}>
              {this.personalAmount(user)}
            </label>
            <Button
              style={{ float: 'right' }}
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
