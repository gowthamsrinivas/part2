import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Search from './Components/Search';
import CountryList from './Components/CountryList';


const App = () => {
  useEffect(() => {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data);
        })
  },[]);

  const [countries,setCountries] = useState([]);
  const [ searchValue, setSearchValue ] = useState('');

  const searchContent = (event) => {
    setSearchValue(event.target.value);  
  }

  const countriesToShow = countries.filter(countryInfo => {
    return searchValue && countryInfo.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  });

  return (
    <>
      <Search value={searchValue} handleChange={searchContent}/>
      {
        countriesToShow.length > 10 ? 
        '<div>Too many matches,specify another filter</div>'
        :<CountryList countries={countriesToShow}/>
      }
    </>
  );
}

export default App;
