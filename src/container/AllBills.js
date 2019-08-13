import React from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import EditBill from '../components/EditBill';

class AllBills extends React.Component {
  constructor() {
    super();
    this.state = {
      bills: [{ customers: [] }],
      isEditOpen: false,
      currentBill: 0
    };
  }

  onEditOpen = (dimmer, id) => () => {
    this.setState({
      dimmer,
      isEditOpen: true,
      currentBill: id
    });
  };

  onEditClose = () => {
    this.setState({
      isEditOpen: false
    });
  };
  async componentDidMount() {
    const { data } = await axios.get('http://localhost:8000/api/user/bills/1');
    this.setState({
      bills: data
    });
  }

  render() {
    const dimmer = this.state;
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
                backgroundColor: 'rgb(248, 247, 243)',
                marginBottom: '20px',
                position: 'relative'
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
                    <spam style={{ float: 'right' }}>
                      {Number(customer.amount * bill.totalAmount)}
                    </spam>
                  </div>
                );
              })}
              {!bill.completed ? (
                <div>
                  <Button
                    style={{ position: 'absolute', bottom: '20px' }}
                    onClick={this.onEditOpen('blurring', bill.id)}
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
        {this.state.currentBill ? (
          <EditBill
            billId={this.state.currentBill}
            isEditOpen={this.state.isEditOpen}
            onEditClose={this.onEditClose}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default AllBills;
