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

  showAddContact = dimmer => () =>
    this.setState({ dimmer, openContactModal: true });
  closeAddContacts = () => this.setState({ openContactModal: false });

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

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
    console.log('modified', modifiedContact);
    console.log(this.state.contacts);
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
    console.log('oldContact', oldContacts);
  };

  render() {
    const { open, dimmer, dimmerAddContact, openContactModal } = this.state;
    return (
      <div>
        <Container textAlign='left'>
          {Data.map(elem => (
            <Contact
              editable={false}
              key={elem.id}
              user={elem}
              handlerClick={this.addContactToBill}
            />
          ))}
          <Modal
            dimmer={dimmerAddContact}
            open={openContactModal}
            onClose={this.closeAddContacts}
          >
            <Modal.Header>Add Contact</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.addNewContact}>
                <Form.Group widths='equal'>
                  <Form.Input label='First Name' placeholder='First Name' />
                  <Form.Input label='Last Name' placeholder='Last Name' />
                  <Form.Input label='Phone' placeholder='Phone Number' />
                  <Button size='small' color='blue'>
                    Add Contact
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Content>
          </Modal>
        </Container>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
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
        <Button onClick={this.show('blurring')}>New Bill</Button>
      </div>
    );
  }
}

export default CreateBill;
