import React from 'react';
import CreateBill from './CreateBill';
import AllBills from './AllBills';
import Contacts from './Contacts';
import { Container, Button } from 'semantic-ui-react';

class Bills extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  show = dimmer => () => this.setState({ dimmer, isOpen: true });
  close = () => this.setState({ isOpen: false });

  render() {
    const { isOpen, dimmer } = this.state;
    return (
      <Container>
        <Contacts />
        <CreateBill
          isOpen={isOpen}
          dimmer={dimmer}
          onCloseCreateBill={this.close}
        />
        <AllBills />
        <Button onClick={this.show('blurring')}>New Bill</Button>
      </Container>
    );
  }
}

export default Bills;
