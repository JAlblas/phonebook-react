import Person from "./Person";

const Phonebook = ({ persons }) => {
    return (
        <div>
            {persons.map((person) => (
                <Person person={person} key={person.id} />
            ))}
        </div>
    );
};

export default Phonebook