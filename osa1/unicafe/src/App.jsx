import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  if(props.all > 0)
  {
    return (
      <div>
        <h2>Statistics:</h2>
        <table>
          <tbody>
            <StatisticLine text="Good" value={props.good}/>
            <StatisticLine text="Neutral" value={props.neutral}/>
            <StatisticLine text="Bad" value={props.bad}/>
            <StatisticLine text="All" value={props.all}/>
            <StatisticLine text="Average" value={props.average}/>
            <StatisticLine text="Positive" value={props.positive}/>
          </tbody>
        </table>
      </div>
    )
  }
  else
  {
    return (
      <div>
        <h2>Statistics:</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  // Update average -> good - value = 1, neutral = 0, bad = -1
  const updateAverage = (value) => {
    const updatedAverage = (value+(good-bad))/(all+1)
    setAverage(updatedAverage)
  }
  // Update positive %, if positive feedback -> value = 1, otherwise 0
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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App