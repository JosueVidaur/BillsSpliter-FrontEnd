import React from 'react';
import BillUsers from './billUsers';
import { Button } from 'semantic-ui-react';

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
            onChange={this.handlePlaceChange}
          />
          <input
            type='number'
            min='0'
            name='totalAmount'
            value={this.state.totalAmount}
            placeholder='Amount to pay'
            onChange={this.handleBillAmountChange}
          />
          <BillUsers
            billAmount={this.props.billAmount}
            onRemove={this.props.onRemove}
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

export default BillForm;
