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

  handleAmoutChange = modifiedContact => {
    let oldContacts = this.state.bill.customers;
    oldContacts = oldContacts.map(contact => {
      if (contact.id == modifiedContact.id) {
        contact = modifiedContact;
        contact.added = true;
      }
      return contact;
    });
  };

  addContactToBill = user => {
    let currentCustomers = this.state.bill.customers;
    if (!currentCustomers.find(customer => customer.id === user.id)) {
      currentCustomers.push(user);
    }
    this.setState({
      customers: currentCustomers
    });
  };

  setBillAmount = amount => {
    this.setState({
      totalAmount: amount
    });
  };

  removeContactFromBill = user => {
    console.log('borrarUser', user);
    let currentCustomers = this.state.bill.customers;
    currentCustomers = currentCustomers.filter(customer => {
      if (!(customer.id === user.id)) {
        return customer;
      }
      this.setState({
        customers: currentCustomers
      });
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
