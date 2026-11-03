import Part from './Part'

const Content = (props) => {
  return (
    <>
        {props.parts.map(part => 
            <Part text={part.name} amount={part.exercises} key={part.id}/>
        )}
    </>
  )
}

export default Content