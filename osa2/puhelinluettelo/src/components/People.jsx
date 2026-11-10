const People = ({filtered, handleButtonClick}) => {
  return(
    <div>
      {filtered.map(person =>
        <p key={person.name}>{person.name} {person.number} <button onClick={() => handleButtonClick(person.id)}>Delete</button></p>
      )}
    </div>
  )
}
export default People