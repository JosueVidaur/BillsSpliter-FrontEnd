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

    handlerClick = (name)=> {
        const contactReceived = name;
        this.setState(prevState => {
            return {contacts: prevState.contacts.concat([contactReceived])}
        })
    }

    render() {
        return (
            <div>
                <div>
                    {Data.map(elem => <Contact key={elem.id} name={elem.name} handlerClick={this.handlerClick}/>)}
                </div>
                <CreateBill addedContacts={this.state.contacts}/>
            </div>
        )
    }
}

export default createBill