import { useState, useEffect } from "react";

import personService from './services/persons'

import Filter from './modules/Filter'
import Form from './modules/Form'
import Phonebook from "./modules/Phonebook";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personService.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addUser = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newUser = { name: newName, number: newNumber, id: persons.length + 1 };

      personService.create(newUser)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('');
          setNewNumber('');
        })
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const visiblePersons = newFilter.length !== 0 ? persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filterText={newFilter} />
      <h3>Add a new</h3>
      <Form
        addUser={addUser}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Phonebook persons={visiblePersons} />
    </div>
  );
};

export default App;
