import React from 'react';
import ContactsData from './contactsData';
import Contact from './contact';
import BillForm from '../components/BillForm';
import { Modal } from 'semantic-ui-react';

class EditBill extends React.Component {
  constructor() {
    super();
    this.state = {
      bill: {}
    };
  }
  componentDidMount() {
    this.setState({
      bill: this.props.bill
    });
  }
  render() {
    return (
      <Modal
        dimmer={this.props.dimmer}
        open={this.props.isEditOpen}
        onClose={this.props.onEditClose}
      >
        <Modal.Content style={{ display: 'flex' }} contacts>
          <div style={{ width: '30%' }}>
            {ContactsData.map(elem => (
              <Contact
                editable={true}
                key={elem.id}
                user={elem}
                handlerClick={this.addContactToBill}
              />
            ))}
          </div>
          <BillForm
            billAmount={this.state.bill.billAmount}
            setBillAmount={this.setBillAmount}
            onRemove={this.removeContactFromBill}
            addedContacts={this.state.contacts.filter(c => c.added)}
            handleAmoutChange={this.handleAmoutChange}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default EditBill;
