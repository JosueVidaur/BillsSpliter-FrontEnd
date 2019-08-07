import React from 'react';
import BillUsers from './billUsers';
import { Button } from 'semantic-ui-react';

class CreateBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: '',
      totalAmount: '',
      date: '',
      paid: false
    };
  }

  handlerChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handlerSubmit = () => {};
  render() {
    return (
      <div>
        <form onSubmit={this.handlerSubmit}>
          <input
            type='text'
            name='place'
            value={this.state.place}
            placeholder='Place Name'
            onChange={this.handlerChange}
          />
          <input
            type='text'
            name='totalAmount'
            value={this.state.totalAmount}
            placeholder='Amount to pay'
            onChange={this.handlerChange}
          />
          <BillUsers
            handleOnChange={this.props.handleAmoutChange}
            users={this.props.addedContacts}
          />
          <Button color='black' onClick={this.close}>
            Cancel
          </Button>
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            onClick={this.close}
          >
            Create
          </Button>
        </form>
      </div>
    );
  }
}

export default CreateBill;
