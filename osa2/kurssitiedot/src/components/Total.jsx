const Total = ({parts}) => {
    let total = 0
    for(const part of parts)
    {
        total += part.exercises
    }
    return (
        <>
            <b>total of {total} exercises</b>
        </>
    )
}

export default Total