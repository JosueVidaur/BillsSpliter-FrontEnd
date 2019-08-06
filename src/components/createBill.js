import React from 'react';
import BillUsers from './billUsers';

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

  handlerSubmit = () => {
    const currentDate = new Date().getDate();
    this.setState({
      date: currentDate
    });
  };
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
          <BillUsers users={this.props.addedContacts} />
          <button>Create Bill</button>
        </form>
      </div>
    );
  }
}

export default CreateBill;
