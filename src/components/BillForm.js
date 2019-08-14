import React from 'react';
import BillUsers from './billUsers';
import { Button, Input } from 'semantic-ui-react';

class BillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: '',
      totalAmount: '',
      date: '',
      paid: false
    };
  }

  handlePlaceChange = event => {
    this.props.setPlace(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleBillAmountChange = event => {
    this.props.setBillAmount(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.props.createBill}>
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <Input
              style={{ marginLeft: '7%' }}
              type='text'
              name='place'
              value={this.props.place}
              placeholder='Place Name'
              onChange={this.handlePlaceChange}
              required
            />
            <Input
              style={{ marginLeft: '5%' }}
              type='number'
              min='1'
              name='totalAmount'
              value={this.props.billAmount}
              placeholder='Amount to pay'
              onChange={this.handleBillAmountChange}
              required
            />
          </div>
          <BillUsers
            billAmount={this.props.billAmount}
            onRemove={this.props.onRemove}
            handleOnChange={this.props.handleAmoutChange}
            users={this.props.addedContacts}
          />
          <Button type='button' color='black' onClick={this.props.close}>
            Cancel
          </Button>
          <Button positive icon='checkmark' labelPosition='right'>
            {this.props.isEdit ? 'Complete' : 'Create'}
          </Button>
        </form>
      </div>
    );
  }
}

export default BillForm;
