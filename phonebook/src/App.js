import React, { useState,useEffect } from 'react';
import Search from './Components/Search';
import PersonForm from './Components/PersonForm';
import PersonsList from './Components/PersonsList';
import Header from './Components/Header';
import Notification from './Components/Notification';
import personsService from './Services/notes';

const App = () => {
  useEffect(() => {
    personsService
        .getAll()
        .then(response => {
          setPersons(response);
          
        })
  },[]);

  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchValue, setSearchValue ] = useState('');
  const [message,setMessage] = useState('');
  const [state,setState] = useState('');


  const nameChange = (event) => {
    setNewName(event.target.value);
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const personsToShow = searchValue ? persons.filter(person =>  {
    return person.name.slice(0,searchValue.length).toLowerCase() === searchValue;
  }): persons;

  const searchContent = (event) => {
    setSearchValue(event.target.value);  
  }
  
  const addName = (event) => {
    event.preventDefault();
    let index = persons.map(person => {
      return person.name;
    }).indexOf(newName);

    if(index > -1) {
      let proceed = window.confirm(`${newName} is already added into phonebook,replace the older one with a new one?`);
      if(proceed) {
        let newObj = {
          name: newName,
          number: newNumber
        }
        personsService
          .update(persons[index].id,newObj)
          .then(response => {
            setPersons(persons.map(person => {
              return (person.name === newName ? response : person);
            }))
          })
          .catch((error) => {
            setMessage(`${newName} has already been removed from server`);
            setState('error');
            setTimeout(()=> {
              setMessage('');
              setState('');
            },5000);
          });
      }
    }
    else {
      const newObj = {
        name: newName,
        number: newNumber
      };
      personsService.create(newObj)
        .then((response) => {
          setPersons(persons.concat(response));
          setMessage(`Added ${response.name} successfully`);
          setState('success');
          setTimeout(()=> {
            setMessage('');
            setState('');
          },5000);
        })
    }
    setNewName('');
    setNewNumber('');
  }

  const deletePerson = ({name,id}) => {
    if(window.confirm(`Delete ${name}`)) {
      personsService
        .deletePerson(id)
        .then(() => {
            setPersons(persons.filter(person => {
              return person.name !== name;
            }));
        })
    }
      
  }

  return (
    <div>
      <Header text="Phonebook"/>
      <Notification message={message} state={state}/>
      <Search value={searchValue} handleChange={searchContent}/>
      <Header text="add a new"/>
      <PersonForm newName={newName} newNumber={newNumber} nameChange={nameChange} numberChange={numberChange} addName={addName}/>
      <Header text="Numbers"/>
      <PersonsList personsToShow={personsToShow} handleDelete={deletePerson}/>
    </div>
  )
}

export default App;
