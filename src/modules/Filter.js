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

export default Filter;