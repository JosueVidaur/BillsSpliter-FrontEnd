import React from 'react';
import CreateBill from './container/CreateBill';
import AllBills from './container/AllBills';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <Container>
      <div>
        <CreateBill />
        <AllBills />
      </div>
    </Container>
  );
}

export default App;
