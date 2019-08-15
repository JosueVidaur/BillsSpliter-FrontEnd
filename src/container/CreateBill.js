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
      billAmount: '',
      contacts: []
    };
  }

  createBill = async event => {
    event.preventDefault();
    const customers = this.state.contacts.filter(
      contact => contact.added === true
    );
    await axios.post('http://localhost:8000/api/createBill/1', {
      place: this.state.place,
      totalAmount: this.state.billAmount,
      contacts: customers
    });
    this.props.onCloseCreateBill();
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

  async componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts = async () => {
    const { data } = await axios.get('http://localhost:8000/api/contacts/1');
    this.setState({
      contacts: data
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchContacts();
    }
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
