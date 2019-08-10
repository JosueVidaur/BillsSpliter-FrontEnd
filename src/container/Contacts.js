import React from 'react';
import Contact from '../components/contact';
import ContactsData from '../components/contactsData';
import { Container, Button, Form, Modal } from 'semantic-ui-react';

class Contacts extends React.Component {
  constructor() {
    super();
    this.state = {
      openContactModal: false
    };
  }
  showAddContact = dimmer => () => {
    this.setState({ dimmer, openContactModal: true });
  };
  closeAddContact = () => this.setState({ openContactModal: false });

  render() {
    const { dimmer, openContactModal } = this.state;
    return (
      <div
        style={{
          width: '30%',
          display: 'inline-block',
          verticalAlign: 'top',
          border: ' 1px solid #ccc',
          heigth: '100%',
          backgroundColor: '#fff',
          padding: '0 30px 30px 30px',
          marginRight: '50px',
          boxShadow: '#ccc 2px 0px 2px',
          float: 'left'
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
          {ContactsData.map(elem => (
            <Contact editable={false} key={elem.id} user={elem} />
          ))}
        </Container>

        <Button
          onClick={this.showAddContact('blurring')}
          style={{ marginTop: '20px' }}
          color='green'
        >
          Add New Contact
        </Button>
        <Modal
          dimmer={dimmer}
          open={openContactModal}
          onClose={this.closeAddContact}
        >
          <Modal.Header>Add New Contact</Modal.Header>
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
      </div>
    );
  }
}

export default Contacts;
