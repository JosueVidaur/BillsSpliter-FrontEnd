import React from 'react';
import Contact from './contact';
import BillForm from '../components/BillForm';
import axios from 'axios';
import { Modal } from 'semantic-ui-react';

class EditBill extends React.Component {
  constructor() {
    super();
    this.state = {
      bill: {
        place: '',
        id: 0,
        totalAmount: 0,
        customers: []
      },
      contacts: []
    };
  }

  updateBill = async event => {
    event.preventDefault();
    const updateObj = {
      place: this.state.bill.place,
      totalAmount: this.state.bill.totalAmount,
      completed: true,
      contacts: this.state.bill.customers
    };
    await axios.put(
      'http://localhost:8000/api/bills/' + this.props.billId,
      updateObj
    );
    await this.props.afterUpdate();
    this.props.onEditClose();
  };

  setPlace = place => {
    const currentBill = this.state.bill;
    currentBill.place = place;
    this.setState({
      bill: currentBill
    });
  };

  handleAmoutChange = modifiedContactAmount => {
    let currentCustomers = this.state.bill.customers;
    let currentBill = this.state.bill;
    currentCustomers = currentCustomers.map(customer => {
      if (customer.id === modifiedContactAmount.id) {
        customer.amount = modifiedContactAmount.amount;
      }
      return customer;
    });
    currentBill.customers = currentCustomers;
    this.setState({
      bill: currentBill
    });
  };

  addContactToBill = user => {
    let currentCustomers = this.state.bill.customers;
    if (!currentCustomers.find(customer => customer.id === user.id)) {
      user.amount = 0;
      currentCustomers.push(user);
    }
    let currentBill = this.state.bill;
    currentBill.customers = currentCustomers;
    this.setState({
      bill: currentBill
    });
  };

  setBillAmount = amount => {
    let currentBill = this.state.bill;
    currentBill.totalAmount = amount;
    this.setState({
      bill: currentBill
    });
  };

  removeContactFromBill = user => {
    let currentCustomers = this.state.bill.customers;
    let currentBill = this.state.bill;
    currentCustomers = currentCustomers.filter(
      customer => customer.id !== user.id
    );
    currentBill.customers = currentCustomers;
    currentBill.customers.amount = 0;
    this.setState({
      bill: currentBill
    });
  };

  fetchData = async () => {
    const currentBill = await axios.get(
      'http://localhost:8000/api/bills/' + this.props.billId
    );
    const { data } = await axios.get('http://localhost:8000/api/contacts/1');
    this.setState({
      contacts: data,
      bill: currentBill.data
    });
  };

  async componentDidMount() {
    this.fetchData();
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.billId !== this.props.billId) {
      this.fetchData();
    }
  }
  render() {
    return (
      <Modal
        dimmer={this.props.dimmer}
        open={this.props.isEditOpen}
        onClose={this.props.onEditClose}
      >
        <Modal.Header>Edit Bill</Modal.Header>
        <Modal.Content style={{ display: 'flex' }}>
          <div style={{ width: '40%' }}>
            {this.state.contacts.map(elem => (
              <Contact
                editable={true}
                key={elem.id}
                user={elem}
                handlerClick={this.addContactToBill}
              />
            ))}
          </div>
          <div style={{ width: '50%' }}>
            <BillForm
              place={this.state.bill.place}
              isEdit={this.props.isEditOpen}
              setPlace={this.setPlace}
              createBill={this.updateBill}
              billAmount={this.state.bill.totalAmount}
              setBillAmount={this.setBillAmount}
              onRemove={this.removeContactFromBill}
              addedContacts={this.state.bill.customers}
              handleAmoutChange={this.handleAmoutChange}
              close={this.props.onEditClose}
            />
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}
export default EditBill;
