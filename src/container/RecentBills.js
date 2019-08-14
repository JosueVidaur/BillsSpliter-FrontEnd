import React from 'react';
import AllBills from './AllBills';

class RecentBills extends React.Component {
  render() {
    return (
      <div
        style={{
          width: '60%',
          display: 'inline-block',
          verticalAlign: 'top',
          backgroundColor: 'rgb(255, 255, 255)',
          padding: '0px 30px 50px 0px',
          marginRight: '50px',
          boxShadow: 'rgb(204, 204, 204) 2px 0px 2px',
          border: ' 1px solid #ccc'
        }}
      >
        <div
          style={{
            padding: '15px',
            marginBottom: '30px'
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              color: '#282929',
              marginLeft: '30px',
              borderBottom: '2px solid rgb(204, 204, 204)'
            }}
          >
            Your Bills
          </h1>
          <AllBills />
        </div>
      </div>
    );
  }
}

export default RecentBills;
