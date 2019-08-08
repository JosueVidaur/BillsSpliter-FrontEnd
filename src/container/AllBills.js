import React from 'react';
import AllBillsData from './AllBillsData';

class AllBills extends React.Component {
  constructor() {
    super();
    this.state = {
      bills: [{ customers: [] }]
    };
  }

  componentDidMount() {
    this.setState({
      bills: AllBillsData
    });
  }

  render() {
    return (
      <div style={{ display: 'inline-block', width: '50%' }}>
        {this.state.bills.map(bill => {
          return (
            <div>
              <h1>{bill.place}</h1>
              <h2>{bill.totalAmount}</h2>
              {bill.customers.map(customer => {
                return (
                  <div>
                    <p>{customer.firstName}</p>
                    <p>{customer.lastName}</p>
                    <p>{customer.amount}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default AllBills;
