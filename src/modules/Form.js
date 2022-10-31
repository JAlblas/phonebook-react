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

export default Form;