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

  deleteBill = async event => {
    await axios.delete(`http://localhost:8000/api/bills/${event.target.name}`);
    this.fetchData();
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.fetchData();
    }
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
    await this.fetchData();
  }

  fetchData = async () => {
    const { data } = await axios.get('http://localhost:8000/api/user/bills/1');
    this.setState({
      bills: data
    });
  };

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
                backgroundColor: 'rgb(248, 247, 243)',
                marginBottom: '20px',
                position: 'relative'
              }}
            >
              <h1 style={{ textAlign: 'center' }}>{bill.place}</h1>
              <div
                style={{
                  display: 'inline-block',
                  WebkitTextStroke: '0.1em',
                  fontSize: '16px',
                  width: '100%',
                  marginBottom: '20px',
                  borderBottom: '2px solid rgb(204, 204, 204)'
                }}
              >
                <p
                  style={{
                    color: '#6d6d6d',
                    WebkitTextStroke: 'thin',
                    textAlign: 'center'
                  }}
                >
                  {new Date(bill.createdAt).toLocaleDateString()}
                </p>
                <span>Total expend </span>
                <span style={{ float: 'right' }}> {bill.totalAmount}</span>
              </div>
              {bill.customers.map(customer => {
                return (
                  <div
                    style={{
                      fontSize: '16px',
                      marginBottom: '20px'
                    }}
                  >
                    <span>{customer.firstName} </span>
                    <span>{customer.lastName}</span>
                    <span style={{ float: 'right' }}>
                      {Number((customer.amount / 100) * bill.totalAmount)}
                    </span>
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
              <Button
                style={{ position: 'absolute', bottom: '20px', right: '20px' }}
                onClick={this.deleteBill}
                name={bill.id}
                color='red'
                size='small'
              >
                Delete
              </Button>
            </div>
          );
        })}
        {this.state.currentBill ? (
          <EditBill
            afterUpdate={this.fetchData}
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
