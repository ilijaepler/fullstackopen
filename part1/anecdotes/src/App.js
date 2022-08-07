import { useState } from 'react'

const Button = ({ handleAnecdotes, text }) => <button onClick={handleAnecdotes}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const votesList = new Array(anecdotes.length).fill(0)
   
  const [selected, setSelected] = useState({
    orderNumber: 0, votesList: votesList, indexMostVotes: 0
  })

  const handleAnecdotes = () => {
    const newSelected = {
      orderNumber: Math.floor(Math.random() * anecdotes.length),
      votesList: selected.votesList,
      indexMostVotes: selected.indexMostVotes
    }

    setSelected(newSelected)
  }

  const handleVotes = () => {
    const copyList = [...selected.votesList]
    copyList[selected.orderNumber]++
    
    const max = Math.max(...copyList);

    const index = copyList.indexOf(max);

    const newSelected = {
      orderNumber: selected.orderNumber,
      votesList: copyList,
      indexMostVotes: index
    }

    setSelected(newSelected)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected.orderNumber]}
      <br />
      <p>Has {selected.votesList[selected.orderNumber]} votes</p>
      <Button handleAnecdotes={handleVotes} text='vote' />
      <Button handleAnecdotes={handleAnecdotes} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      {anecdotes[selected.indexMostVotes]}
    </div>
    
  )
}

export default App