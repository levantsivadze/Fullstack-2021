import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import numberService from "./services/persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    numberService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      alert("Please fill in the fields");
      return;
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson && existingPerson.number === newNumber) {
      alert(`${newName} is already added to phone-book`);
      setNewName("");
      setNewNumber("");
      return;
    }

    if (existingPerson && existingPerson.number !== newNumber) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phone-book, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...existingPerson, number: newNumber };
        const id = existingPerson.id;

        console.log("changedPerson: ", changedPerson);

        numberService
          .update(id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
            setSuccessMessage(`Updated ${changedPerson.name}'s Number`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            if (error.response) {
              console.log("catch.if statement");
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              setErrorMessage(
                `Information of ${changedPerson.name} has already been removed from server`
              );
              setPersons(persons.filter((person) => person.id !== id));
              setNewName("");
              setNewNumber("");

              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            } else if (error.request) {
              console.log("catch.else.if statement");
              console.log(error.request);

              setErrorMessage("No response was received from server");
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
        return;
      } else {
        return;
      }
    }

    const newPerson = { name: newName, number: newNumber };

    numberService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setSuccessMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
        setNewName("");
        setNewNumber("");
        setFilter("");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this person?")) {
      numberService
        .remove(id)
        .then(() => {
          setSuccessMessage(
            `Deleted ${persons.find((person) => person.id === id).name}`
          );
          setPersons(persons.filter((person) => person.id !== id));
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        })
        .catch((error) => alert(error));
    } else {
      return;
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phone-book</h2>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        onFormSubmit={handleSubmit}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
