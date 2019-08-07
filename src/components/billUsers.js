import React from 'react';

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
          </div>
        ))}
      </div>
    );
  }
}

export default BillUsers;
