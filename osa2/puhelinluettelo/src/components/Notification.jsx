const Notification = ({ message, messageColor }) => {
    const messageStyle = {
        color: `${messageColor}`,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

    if (message === null) {
        return null
    }
    return (
        <div style={messageStyle}>
            {message}
        </div>
    )   
    
}

export default Notification