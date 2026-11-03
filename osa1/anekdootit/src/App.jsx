import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Anecdote = ({ title, text, voteAmount }) => 
{
  return (
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
      <p>has {voteAmount} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [highest, setHighest] = useState(0);

  const handleNextClick = () => {
    let randomNum = Math.floor(Math.random()*anecdotes.length)
    while(randomNum == selected)
    {
      randomNum = Math.floor(Math.random()*anecdotes.length)
    }
    setSelected(randomNum);
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    if(newVotes[selected] > newVotes[highest])
    {
      setHighest(selected)
    }
    setVotes(newVotes)
  }

  return (
    <div>
      <Anecdote title="Anecdote of the day" text={anecdotes[selected]} voteAmount={votes[selected]}/>
      <Button onClick={handleNextClick} text='next anecdote' />
      <Button onClick={handleVoteClick} text='vote' />
      <Anecdote title="Anecdote with most votes" text={anecdotes[highest]} voteAmount={votes[highest]}/>
    </div>
  )
}

export default App