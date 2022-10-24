import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Box } from '../constans';
import PhonebookFrom from './PhonebookForm';
import Filter from './Filter';
import PhonebookList from './PhonebookList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContact = this.state.contacts;
    const prevContact = prevState.contacts;

    if (nextContact !== prevContact) {
      localStorage.setItem('contacts', JSON.stringify(nextContact));
    }
  }

  addContact = data => {
    const { name, number } = data;
    const { contacts } = this.state;

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { value } = this.state;
    const addContact = this.addContact;
    const visibleContacts = this.getFilteredContacts();

    return (
      <Box as="main">
        <Box as="section" display="flex" justifyContent="center" py={4}>
          <Box
            as="div"
            width={600}
            bg="backgroundSecondary"
            borderRadius="normal"
            boxShadow="normal"
            p={4}
          >
            <PhonebookFrom onSubmit={addContact} />

            <Filter value={value} onChange={this.changeFilter} />
            {this.state.contacts.length <= 0 ? (
              <p>Add someone to your contacts</p>
            ) : (
              <PhonebookList
                contacts={visibleContacts}
                onDelContact={this.deleteContact}
              />
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}
export default App;
