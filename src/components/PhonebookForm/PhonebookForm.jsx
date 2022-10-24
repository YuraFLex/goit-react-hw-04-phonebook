import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Form,
  FormTitle,
  FormLabel,
  FormText,
  FormInput,
  Button,
} from './PhonebookForm.styled';

export const PhonebookForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => setName(event.target.value);
  const handleNumberChange = event => setNumber(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>PhoneBook</FormTitle>
      <FormLabel>
        <FormText>Name</FormText>
        <FormInput
          onChange={handleNameChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Ivan Ivanov"
        />
      </FormLabel>
      <FormLabel>
        <FormText>Number</FormText>
        <FormInput
          onChange={handleNumberChange}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="123-45-67"
        />
      </FormLabel>
      <Button type="submit"> + Add contact</Button>
    </Form>
  );
};

PhonebookForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};

export default PhonebookForm;
