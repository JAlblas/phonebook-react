import Person from "./Person";

const Phonebook = ({ persons, removeUser }) => {
    return (
        <div>
            {persons.map((person) => (
                <div>
                    <Person person={person} key={person.id} />
                    <button onClick={() => removeUser(person.id)}>Delete</button>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Phonebook