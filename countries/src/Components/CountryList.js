import React,{useState} from 'react';
import CountryInfo from './CountryInfo';

const CountryList = ({countries}) => {
    const [country,setCountry] = useState({});
    const [CountryList,setCountries] = useState(countries);
    const [flag,setFlag] = useState(false);

    const showDetails = (country) => {
        setFlag(!flag);
        setCountry(country);
        setCountries([]);
    }
    return(
        <>
        {
            CountryList.length > 1 ?
            CountryList.map(country => {
                return (
                    <div key={country.name}>
                        <li>{country.name}
                        <button onClick={() => showDetails(country)}>
                            show
                        </button>
                        </li>
                    </div>
                )
            })
            : (CountryList.length === 1 ?  <CountryInfo country={CountryList[0]}/> : '')
        }
        {flag ? <CountryInfo country={country}/>: ''}
        </>
    )
}

export default CountryList;