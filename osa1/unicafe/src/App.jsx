import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {setGood(good+1)}
  const handleNeutralFeedback = () => {setNeutral(neutral+1)}
  const handleBadFeedback = () => {setBad(bad+1)}

  return (
    <div>
      <h2>Give Feedback:</h2>
      <Button onClick={handleGoodFeedback} text='Good' />
      <Button onClick={handleNeutralFeedback} text='Neutral' />
      <Button onClick={handleBadFeedback} text='Bad' />
      <h2>Feedback amounts:</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

export default App