import Person from "./Person";

const Phonebook = ({ persons, removeUser }) => {
    return (
        <div>
            {persons.map((person) => (
                <div key={person.id}>
                    <Person person={person} />
                    <button onClick={() => removeUser(person.id, person.name)}>Delete</button>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Phonebook