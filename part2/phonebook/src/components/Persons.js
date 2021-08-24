import React from "react";
import Person from './Person'

const Persons = ({ persons, filter, handleDelete }) => {
  const results = !filter
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      {results.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Persons;
