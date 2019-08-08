import React from 'react';
import Data from '../components/contactsData';
import BillForm from '../components/BillForm';
import Contact from '../components/contact';
import { Container } from 'semantic-ui-react';
import { Button, Modal, Form } from 'semantic-ui-react';

class CreateBill extends React.Component {
  constructor() {
    super();
    this.state = {
      billAmount: 0,
      contacts: [],
      open: false,
      openContactModal: false
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

  showAddContact = dimmer => () => {
    this.setState({ dimmer, openContactModal: true });
  };
  closeAddContact = () => this.setState({ openContactModal: false });

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
    const { open, dimmer, dimmerAddContact, openContactModal } = this.state;
    return (
      <div
        style={{
          width: '30%',
          display: 'inline-block',
          verticalAlign: 'top',
          border: ' 1px solid #ccc',
          heigth: '100%',
          backgroundColor: '#fff',
          padding: '0 30px 50px 30px',
          marginRight: '50px',
          boxShadow: '#ccc 2px 0px 2px'
        }}
      >
        <div
          style={{
            padding: '15px',
            marginBottom: '30px',
            borderBottom: '2px solid #ccc'
          }}
        >
          <h1 style={{ textAlign: 'center', color: '#282929' }}>Contacts</h1>
        </div>
        <Container textAlign='left'>
          {Data.map(elem => (
            <Contact
              editable={false}
              key={elem.id}
              user={elem}
              handlerClick={this.addContactToBill}
            />
          ))}
        </Container>
        <Modal
          dimmer={dimmerAddContact}
          open={openContactModal}
          onClose={this.closeAddContact}
        >
          <Modal.Header>Add Contact</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.addNewContact}>
              <Form.Group widths='equal'>
                <Form.Input label='First Name' placeholder='First Name' />
                <Form.Input label='Last Name' placeholder='Last Name' />
                <Form.Input label='Phone' placeholder='Phone Number' />
              </Form.Group>
              <Button onClick={this.closeAddContact} color='black'>
                Cancel
              </Button>
              <Button size='small' color='blue'>
                Add Contact
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
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
        <Button onClick={this.showAddContact('blurring')} color='green'>
          Add New Contact
        </Button>
      </div>
    );
  }
}

export default CreateBill;
