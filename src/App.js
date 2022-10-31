import { useState } from "react";

const Filter = ({ handleFilterChange, filterText }) => {
  return (
    <div>
      <form>
        Filter persons with:
        <br />
        <input type="text" value={filterText} onChange={handleFilterChange} />
      </form>
    </div>
  );
};

const Form = ({
  addUser,
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber
}) => {
  return (
    <form onSubmit={addUser}>
      <div>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Phonebook = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person person={person} id={person.name} />
      ))}
    </div>
  );
};

const Person = ({ person }) => {
  return (
    <p>
      {person.name} - {person.number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newFilter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addUser = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newUser = { name: newName, number: newNumber };
      setPersons(persons.concat(newUser));
    }

    setNewName("");
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

  const visiblePersons = newFilter.length !== 0 ? persons.filter((person) => person.name === newFilter) : persons;

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
