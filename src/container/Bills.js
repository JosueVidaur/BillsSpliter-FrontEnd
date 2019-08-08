import React from 'react';
import CreateBill from './CreateBill';
import AllBills from './AllBills';
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
        <div>
          <CreateBill
            isOpen={isOpen}
            dimmer={dimmer}
            onCloseCreateBill={this.close}
          />
          <AllBills />
          <Button onClick={this.show('blurring')}>New Bill</Button>
        </div>
      </Container>
    );
  }
}

export default Bills;
