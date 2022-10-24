import PropTypes from 'prop-types';
import React from 'react';
import { nanoid } from 'nanoid';
import { ContactTitle, FilterLabel, ContactInput } from './Filter.styled';

export default function Filter({ value, onChange }) {
  let inputFilter = nanoid();
  return (
    <>
      <ContactTitle>Contacts</ContactTitle>
      <FilterLabel htmlFor={inputFilter}></FilterLabel>
      <ContactInput
        id={inputFilter}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Find contacts by name"
      />
    </>
  );
}

Filter.protoTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
