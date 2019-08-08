import React from 'react';
import Data from '../components/contactsData';
import BillForm from '../components/BillForm';
import Contact from '../components/contact';
import { Modal } from 'semantic-ui-react';

class CreateBill extends React.Component {
  constructor() {
    super();
    this.state = {
      billAmount: 0,
      contacts: []
    };
  }

  addNewContact;

  setBillAmount = amount => {
    this.setState({
      billAmount: amount
    });
  };

  componentDidMount() {
    this.setState({
      contacts: Data
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
              {Data.map(elem => (
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
                billAmount={this.state.billAmount}
                setBillAmount={this.setBillAmount}
                onRemove={this.removeContactFromBill}
                addedContacts={this.state.contacts.filter(c => c.added)}
                handleAmoutChange={this.handleAmoutChange}
              />
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default CreateBill;
