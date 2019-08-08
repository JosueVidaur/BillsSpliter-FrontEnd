import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import AllBills from './AllBills';
import CreateBill from './CreateBill';

class ShowAllBills extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  show = dimmer => () => this.setState({ dimmer, isOpen: true });
  close = () => this.setState({ isOpen: false });

  render() {
    const dimmer = this.state;
    return (
      <Container>
        <AllBills />
        <CreateBill
          isOpen={this.state.isOpen}
          dimmer={dimmer}
          onCloseCreateBill={this.close}
        />
        <Button
          size='huge'
          style={{ marginLeft: '45%', marginTop: '120px' }}
          color='green'
          onClick={this.show('blurring')}
        >
          New Bill
        </Button>
      </Container>
    );
  }
}
export default ShowAllBills;
