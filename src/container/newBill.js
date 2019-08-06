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

    handlerClick = (id) => {
        const contactReceived = id;
        console.log(id);
        console.log('state',this.state);
        this.setState(prevState => {
            if(!prevState.contacts.find(element => contactReceived === element.id)){
            return {contacts: prevState.contacts.concat([contactReceived])}}
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