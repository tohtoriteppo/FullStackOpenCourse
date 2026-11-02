import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const updateAverage = (value) => {
    const updatedAverage = (value+(good-bad))/(all+1)
    setAverage(updatedAverage)
  }
  const updatePositive = (value) => {
    const updatedPositive = ((good + value) / (all+1))*100
    setPositive(updatedPositive)
  }

  const handleGoodFeedback = () => {
    updateAverage(1)
    updatePositive(1)
    setGood(good+1)
    setAll(all+1)
  }
  const handleNeutralFeedback = () => {
    updateAverage(0)
    updatePositive(0)
    setNeutral(neutral+1)
    setAll(all+1)
  }
  const handleBadFeedback = () => {
    updatePositive(0)
    updateAverage(-1)
    setBad(bad+1)
    setAll(all+1)
  }

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
      <p>All: {all}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}%</p>
    </div>
  )
}

export default App