import React from 'react';
import Contact from '../components/contact';
import axios from 'axios';
import { Container, Button, Form, Modal } from 'semantic-ui-react';

class Contacts extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      openContactModal: false,
      contacts: []
    };
  }

  deleteContact = async event => {
    const contactId = event.target.name
      ? event.target.name
      : event.target.parentElement.name;
    await axios.delete(`http://localhost:8000/api/contacts/${contactId}`);
    this.fetchContacts();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  addNewContact = async event => {
    await axios.post('http://localhost:8000/api/contacts/1', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone
    });
    this.setState({
      openContactModal: false
    });
    this.fetchContacts();
  };

  async componentDidMount() {
    this.fetchContacts();
  }

  async fetchContacts() {
    const { data } = await axios.get('http://localhost:8000/api/contacts/1');
    this.setState({
      contacts: data
    });
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
          {this.state.contacts.map(elem => (
            <div style={{ display: '-webkit-inline-box', width: '100%' }}>
              <Contact editable={false} key={elem.id} user={elem} />
              {elem.id === 1 ? (
                ''
              ) : (
                <Button
                  name={elem.id}
                  circular
                  color='red'
                  icon='delete'
                  size='mini'
                  style={{
                    marginTop: '10px',
                    color: 'white',
                    display: 'inline-block'
                  }}
                  onClick={this.deleteContact}
                />
              )}
            </div>
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
                <Form.Input
                  name='firstName'
                  label='First Name'
                  onChange={this.handleChange}
                  placeholder='First Name'
                  value={this.state.firstName}
                  required
                />
                <Form.Input
                  name='lastName'
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  label='Last Name'
                  placeholder='Last Name'
                  required
                />
                <Form.Input
                  name='phone'
                  value={this.state.phone}
                  onChange={this.handleChange}
                  label='Phone'
                  placeholder='Phone Number'
                  required
                />
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
