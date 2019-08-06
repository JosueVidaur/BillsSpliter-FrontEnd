import React from 'react';
import Data from '../components/contactsData';
import CreateBill from '../components/createBill';
import Contact from '../components/contact';
import { Container } from 'semantic-ui-react';
import { Button, Modal } from 'semantic-ui-react';

class createBill extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      open: false
    };
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  handlerClick = user => {
    console.log('setState', user.id);
    console.log('state', this.state);
    this.setState(prevState => {
      if (!prevState.contacts.find(element => user.id === element.id)) {
        return { contacts: prevState.contacts.concat([user]) };
      }
    });
  };

  render() {
    const { open, dimmer } = this.state;
    return (
      <div>
        <Container textAlign='left'>
          {Data.map(elem => (
            <Contact
              key={elem.id}
              user={elem}
              handlerClick={this.handlerClick}
            />
          ))}
        </Container>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>New Bill</Modal.Header>
          <Modal.Content style={{ display: 'flex' }} contacts>
            <div style={{ width: '30%' }}>
              {Data.map(elem => (
                <Contact
                  key={elem.id}
                  user={elem}
                  handlerClick={this.handlerClick}
                />
              ))}
            </div>
            <div>
              <CreateBill addedContacts={this.state.contacts} />
              <Button color='black' onClick={this.close}>
                Cancel
              </Button>
              <Button
                positive
                icon='checkmark'
                labelPosition='right'
                onClick={this.close}
              >
                Create
              </Button>
            </div>
          </Modal.Content>
        </Modal>
        <Button onClick={this.show('blurring')} />
      </div>
    );
  }
}

export default createBill;
