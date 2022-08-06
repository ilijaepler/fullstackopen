import { useState } from 'react'

const Header = ({ title }) => <h1>{ title }</h1>

const Button = ({ setStatistic, text }) => <button onClick={setStatistic}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{Math.round(value * 10) /10}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if((good + neutral + bad) === 0){
    return(
      <p>No feedback given</p>
    )
  } else {
    return(
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={good + neutral + bad} />
            <StatisticLine text='average' value={(good - bad)/(good + neutral + bad)} />
            <StatisticLine text='positive' value={((good)/(good + neutral + bad))*100} /> 
          </tbody>
        </table>
      </div>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodStatistic = () => {
    setGood(good + 1)
  }

  const handleNeutralStatistic = () => {
    setNeutral(neutral + 1)
  }

  const handleBadStatistic = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header title='give feedback' />

      <Button setStatistic={handleGoodStatistic} text='good'/>
      <Button setStatistic={handleNeutralStatistic} text='neutral'/>
      <Button setStatistic={handleBadStatistic} text='bad'/>

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App