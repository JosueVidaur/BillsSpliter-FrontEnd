import React from 'react';
import CreateBill from './CreateBill';
import RecentBills from './RecentBills';
import Contacts from './Contacts';
import { Container, Button } from 'semantic-ui-react';
import ShowAllBills from './ShowAllBills';

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
        <RecentBills />
        <Button
          size='huge'
          style={{ marginLeft: '40%', marginTop: '120px', marginRight: '30px' }}
          color='green'
          onClick={this.show('blurring')}
        >
          New Bill
        </Button>
        <Button size='huge' color='teal'>
          All Bills
        </Button>
      </Container>
      //<ShowAllBills />
    );
  }
}

export default Bills;
