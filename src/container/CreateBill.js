import React from 'react';
import Data from '../components/contactsData';
import BillForm from '../components/BillForm';
import Contact from '../components/contact';
import { Container } from 'semantic-ui-react';
import { Button, Modal } from 'semantic-ui-react';

class CreateBill extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      open: false
    };
  }

  componentDidMount() {
    this.setState({
      contacts: Data
    });
  }
  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

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
    const { open, dimmer } = this.state;
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
                addedContacts={this.state.contacts.filter(c => c.added)}
                handleAmoutChange={this.handleAmoutChange}
              />
            </div>
          </Modal.Content>
        </Modal>
        <Button onClick={this.show('blurring')} />
      </div>
    );
  }
}

export default CreateBill;
