import React from 'react';

function BillUsers(props) {
  const billUsers = props.users.map(user => (
    <p key={user.id}>{user.firstName}</p>
  ));
  return <div>{billUsers}</div>;
}

export default BillUsers;
