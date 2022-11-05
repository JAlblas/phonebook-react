const Notification = ({ message, type }) => {
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const succesStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }

    if (type === 'success') {
        return (
            <div style={succesStyle}>
                {message}
            </div>
        )
    } else if (type === 'error') {
        return (
            <div style={errorStyle}>
                {message}
            </div>
        )
    }
}

export default Notification

