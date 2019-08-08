import React from 'react';
import AllBillsData from './AllBillsData';
import { Button } from 'semantic-ui-react';
import CreateBill from './CreateBill';

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
      <div>
        {this.state.bills.map(bill => {
          return (
            <div
              style={{
                float: 'left',
                width: '45%',
                height: '300px',
                padding: '0px 30px 30px',
                marginLeft: '5%',
                border: '1px solid rgb(204, 204, 204)',
                boxShadow: 'rgb(204, 204, 204) 2px 0px 2px',
                backgroundColor: 'rgb(248, 247, 243)'
              }}
            >
              <h1 style={{ textAlign: 'center' }}>{bill.place}</h1>
              <div
                style={{
                  display: 'inline-block',
                  webkitTextStroke: '0.1em',
                  fontSize: '16px',
                  width: '100%',
                  marginBottom: '20px',
                  borderBottom: '2px solid rgb(204, 204, 204)'
                }}
              >
                <spam>Total expend </spam>
                <spam style={{ float: 'right' }}> {bill.totalAmount}</spam>
              </div>
              {bill.customers.map(customer => {
                return (
                  <div
                    style={{
                      fontSize: '16px',
                      marginBottom: '20px'
                    }}
                  >
                    <spam>{customer.firstName} </spam>
                    <spam>{customer.lastName}</spam>
                    <spam style={{ float: 'right' }}>{customer.amount}</spam>
                  </div>
                );
              })}
              {!bill.completed ? (
                <div>
                  <CreateBill
                    dimmer={this.props.dimmer}
                    isOpen={this.props.isEditOpen}
                    onCloseCreateBill={this.props.onCloseEdit}
                  />
                  <Button
                    onClick={this.props.onEdit}
                    color='green'
                    size='small'
                  >
                    Edit Bill
                  </Button>
                </div>
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default AllBills;
