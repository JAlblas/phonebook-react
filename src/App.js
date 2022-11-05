import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import personService from './services/persons'

import Filter from './modules/Filter'
import Form from './modules/Form'
import Phonebook from "./modules/Phonebook";
import Notification from "./modules/Notification";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    personService.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addUser = (event) => {
    event.preventDefault();

    let existingUser = persons.find(person => person.name === newName)
    if (existingUser) {
      if (window.confirm("Contact exists. Do you want to edit phone number?")) {
        const updatedUser = { ...existingUser, number: newNumber }
        personService.update(existingUser.id, updatedUser)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingUser.id ? person : returnedPerson))
            setNewName('');
            setNewNumber('');
            setMessageType('success');
            setMessage(
              `Telephone number sucesfully added!`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessageType('error');
            setMessage(
              `Telephone number not edited due to an error!`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)

          })
      }
    } else {
      const newUser = { name: newName, number: newNumber, id: uuidv4() };

      personService.create(newUser)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('');
          setNewNumber('');
          setMessageType('success');
          setMessage(
            `Telephone number added!`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessageType('error');
          setMessage(
            `Telephone number not added due to an error!`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  };

  const removeUser = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      personService.remove(id)
        .then(removedUser => {
          setPersons(persons.filter(p => p.id !== id))
          setMessageType('success');
          setMessage(
            `Telephone number succesfully removed!`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessageType('error');
          setMessage(
            `The person with id: '${id}' was not deleted from server due to an error!`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

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
      <h1>Phonebook</h1>

      <Notification message={message} type={messageType} />
      <h2>Add a new</h2>
      <Form
        addUser={addUser}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <br />
      <Filter handleFilterChange={handleFilterChange} filterText={newFilter} />
      <h3>Numbers</h3>
      <Phonebook
        persons={visiblePersons}
        removeUser={removeUser} />
    </div>
  );
};

export default App;
