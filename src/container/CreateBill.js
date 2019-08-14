import React from 'react';
import axios from 'axios';
import BillForm from '../components/BillForm';
import Contact from '../components/contact';
import { Modal } from 'semantic-ui-react';

class CreateBill extends React.Component {
  constructor() {
    super();
    this.state = {
      place: '',
      billAmount: 0,
      contacts: []
    };
  }

  createBill = async event => {
    const customers = this.state.contacts.filter(
      contact => contact.added === true
    );
    await axios.post('http://localhost:8000/api/createBill/1', {
      place: this.state.place,
      totalAmount: this.state.billAmount,
      contacts: customers
    });
  };

  setPlace = place => {
    this.setState({
      place: place
    });
  };

  setBillAmount = amount => {
    this.setState({
      billAmount: amount
    });
  };
  /* */
  async componentDidMount() {
    const { data } = await axios.get('http://localhost:8000/api/contacts/1');
    this.setState({
      contacts: data
    });
  }

  removeContactFromBill = user => {
    let oldContacts = this.state.contacts;
    oldContacts = oldContacts.map(contact => {
      if (contact.id == user.id) {
        contact.amount = 0;
        contact.added = false;
      }
      return contact;
    });
    this.setState({
      contacts: oldContacts
    });
  };

  addContactToBill = user => {
    let oldContacts = this.state.contacts;
    oldContacts = oldContacts.map(contact => {
      if (contact.id == user.id) {
        contact.added = true;
        contact.amount = 0;
      }
      return contact;
    });
    this.setState({
      contacts: oldContacts
    });
  };

  handleAmoutChange = modifiedContact => {
    let oldContacts = this.state.contacts;
    oldContacts = oldContacts.map(contact => {
      if (contact.id == modifiedContact.id) {
        contact = modifiedContact;
        contact.added = true;
      }
      return contact;
    });
    this.setState({
      contacts: oldContacts
    });
  };

  render() {
    return (
      <div>
        <Modal
          dimmer={this.props.dimmer}
          open={this.props.isOpen}
          onClose={this.props.onCloseCreateBill}
        >
          <Modal.Header>New Bill</Modal.Header>
          <Modal.Content style={{ display: 'flex' }} contacts>
            <div style={{ width: '30%' }}>
              {this.state.contacts.map(elem => (
                <Contact
                  editable={true}
                  key={elem.id}
                  user={elem}
                  handlerClick={this.addContactToBill}
                />
              ))}
            </div>
            <div>
              <BillForm
                createBill={this.createBill}
                billAmount={this.state.billAmount}
                setBillAmount={this.setBillAmount}
                setPlace={this.setPlace}
                onRemove={this.removeContactFromBill}
                addedContacts={this.state.contacts.filter(c => c.added)}
                handleAmoutChange={this.handleAmoutChange}
                close={this.props.onCloseCreateBill}
              />
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default CreateBill;
