import React from 'react'

function BillUsers(props) {
    console.log(props)
    const billUsers = props.users.map(user => <p>{user}</p>)
    return (
        <div>
            {billUsers}
        </div>
        )
    
}

export default BillUsers