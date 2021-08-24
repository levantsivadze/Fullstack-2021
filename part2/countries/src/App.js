import React, { useState, useEffect } from "react";
import CountrySearch from "./components/CountrySearch";
import Countries from './components/Countries'
import Country from './components/Country'
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const countriesToDisplay = filter && countries.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      );

  const handleFilterChange = (event) => setFilter(event.target.value);
  const showInfo = (countryName) => setFilter(countryName);

  return (
    <div>
      <CountrySearch filter={filter} onFilterChange={handleFilterChange} />

      {!countriesToDisplay ? null : countriesToDisplay.length === 1 ? (
        <Country country={countriesToDisplay[0]}/>
      ) : (

      
      <Countries 
        countries={countriesToDisplay ? countriesToDisplay : []} 
        showInfo={showInfo}/>
      )}
    </div>
  );
}

export default App;
