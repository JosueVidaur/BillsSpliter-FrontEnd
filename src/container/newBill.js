import React from 'react'
import Data from '../components/contactsData'
import CreateBill from '../components/createBill'
import Contact from '../components/contact'

class createBill extends React.Component {
    constructor() {
        super()
        this.state = {
            contacts: []
        }
    }

    handlerClick = (user) => {
        console.log('setState',user.id)
        console.log('state',this.state);
        this.setState(prevState => {
            if(!prevState.contacts.find(element => user.id === element.id)){
            return {contacts: prevState.contacts.concat([user])}}
        })
    }

    render() {
        return (
            <div>
                <div>
                    {Data.map(elem => <Contact key={elem.id} user={elem} handlerClick={this.handlerClick}/>)}
                </div>
                <CreateBill addedContacts={this.state.contacts}/>
            </div>
        )
    }
}

export default createBill