import React from 'react';
import ContactsData from './contactsData';
import Contact from './contact';
import BillForm from '../components/BillForm';
import AllBillsData from '../container/AllBillsData';
import { Modal } from 'semantic-ui-react';

class EditBill extends React.Component {
  constructor() {
    super();
    this.state = {
      bill: {
        id: 0,
        totalAmount: 0,
        customers: []
      }
    };
  }

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

  componentDidMount() {
    let currentBill = AllBillsData.find(bill => bill.id === this.props.billId);
    this.setState({
      bill: currentBill
    });
  }
  render() {
    return (
      <Modal
        dimmer={this.props.dimmer}
        open={this.props.isEditOpen}
        onClose={this.props.onEditClose}
      >
        <Modal.Content style={{ display: 'flex' }} contacts>
          <div style={{ width: '30%' }}>
            {ContactsData.map(elem => (
              <Contact
                editable={true}
                key={elem.id}
                user={elem}
                handlerClick={this.addContactToBill}
              />
            ))}
          </div>
          <BillForm
            billAmount={this.state.bill.totalAmount}
            setBillAmount={this.setBillAmount}
            onRemove={this.removeContactFromBill}
            addedContacts={this.state.bill.customers}
            handleAmoutChange={this.handleAmoutChange}
          />
        </Modal.Content>
      </Modal>
    );
  }
}
export default EditBill;
