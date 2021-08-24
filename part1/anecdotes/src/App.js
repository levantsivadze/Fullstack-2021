import React, { useState } from 'react'


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
]

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const AnecdoteOfTheDay = ({anecdote, vote, handleVote, handleSelect}) => {
  return (
   <div>
     <h2>Anecdote Of The Day</h2>
     <p>{anecdote}</p>
     <p>has {vote} votes</p>

     <Button handleClick={handleVote} text="Vote"/>
     <Button handleClick={handleSelect} text="Next Anecdote"/>

   </div>
  )
}

const BestAnecdote = ({bestAnecdote, maxVote}) => {
  return (
    <div>
      <h2>Anecdote with most Votes</h2>
      {maxVote ? (
        <div>
          <p>{bestAnecdote}</p>
          <p>Has {maxVote} Votes</p>
        </div>
      ) : (
        <p>No Votes Given</p>
      )}
    </div>

  )
}

function generateRandom (length) {
  return Math.floor(Math.random() * length)
}

const App = () => {
    
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const maxVote = Math.max(...points)
  const bestAnecdote = anecdotes[points.indexOf(maxVote)]

  const handleSelect = () => {
    let rand = generateRandom(anecdotes.length)
    while(rand === selected){
      rand = generateRandom(anecdotes.length)
    }
    setSelected(rand)
  }
  
  const handleVote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }
  
  return (
    <div>
      <AnecdoteOfTheDay 
      anecdote={anecdotes[selected]}
      vote={points[selected]}
      handleVote={handleVote}
      handleSelect={handleSelect}
      />
      <BestAnecdote bestAnecdote={bestAnecdote} maxVote={maxVote} />
    </div>
  )
}



export default App