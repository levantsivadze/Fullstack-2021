import React, { useState } from 'react'

let counter = 0

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const average = (good - bad)/counter
  const positive = (counter ? (good * 100) / counter : 0) + " %"

  const handleGood = () => {
    counter = counter + 1;
    setGood(good + 1)
  }
  const handleNeutral = () => {
    counter = counter + 1;
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    counter = counter + 1;
    setBad(bad + 1)
  }

  

  return (
    <div>
      <Header text="Give Feedback"/>

      <Button handleClick={handleGood} text="Good"/>
      <Button handleClick={handleNeutral} text="Neutral"/>
      <Button handleClick={handleBad} text="Bad"/>

      <Header text="Statistics" />

      <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      counter={counter}
      average={average}
      positive={positive}
      />

    </div>
  )
}

const Button = ({handleClick, text}) => (
 <button onClick={handleClick}>{text}</button>
  )

const Header = ({text}) => <h1>{text}</h1>

const Statistics = ({good, neutral, bad, counter, average, positive}) => {

  return (
    !counter ? (
      <div>No feedback given</div>
    ): (
      <table>
        <tbody>
        <StatisticLine value={good} text = "Good" />
        <StatisticLine value={neutral} text = "Neutral" />
        <StatisticLine value={bad} text = "Bad" />
        <StatisticLine value={counter} text = "All" />
        <StatisticLine value={average} text = "Average" />
        <StatisticLine value={positive} text = "Positive" />
        </tbody>
      </table>
    )
  )
  }

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)


export default App