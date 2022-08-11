import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, onFilterChange }) => {
  return (
    <>
    find countries <input value={filter} onChange={onFilterChange}/>
    </>
  )
}

const CountryView = ({ country }) => {
  return(
    <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <p><b>languages:</b></p>
        <ul>
          {Object.keys(country.languages).map(language => <li>{country.languages[language]}</li>)}
        </ul>
        <img src={country.flags.png} alt='Country flag'/>
      </div>
  )
}

const Country = ({ country }) => {
  const [showView, setShowView] = useState(false)

  const handleCountry = (country) => {
    if(showView){
      setShowView(false)
    }else{
      setShowView(true)
    }
  }

  return(
    <>
    {country.name.common}
    <button onClick={handleCountry}>Test</button><br/>
    {showView && (<CountryView country={country} />)}
    </>
  )
}

const Countries = ({ countries }) => {
  if(countries.length < 10 && countries.length > 1){
    return (
      <div>
        {countries.map(country => <Country country={country} />)}
      </div>
    )
  }else if(countries.length === 1){ 
    return (
      <CountryView country={countries[0]} />
    )
  }else {
    return <p>Too many matches, specify another filter</p>
  }
  
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=>{
        console.log('promise fullfield')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    const filteredCountries = countries.filter(country => (country.name.common).toLowerCase().includes(filter.toLowerCase()))
    setFilter(event.target.value)  
    setFilteredCountries(filteredCountries)
  }

  return (
    <div>
      <Filter filter={filter} onFilterChange={handleFilterChange}/>
      <Countries countries={filteredCountries}/>
    </div>

  )
}

export default App;
