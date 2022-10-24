import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Box } from '../constans';
import PhonebookFrom from './PhonebookForm';
import Filter from './Filter';
import PhonebookList from './PhonebookList';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsLocalStorage = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsLocalStorage);

    if (!parsedContacts) {
      return;
    }
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const { name, number } = data;

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const visibleContacts = getFilteredContacts();

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

          <Filter value={filter} onChange={changeFilter} />
          {contacts.length <= 0 ? (
            <p>Add someone to your contacts</p>
          ) : (
            <PhonebookList
              contacts={visibleContacts}
              onDelContact={deleteContact}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
