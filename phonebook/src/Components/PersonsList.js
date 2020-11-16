import React from 'react';

const PersonsList = ({personsToShow,handleDelete}) => {
    return (
        <>
        {
            personsToShow.length ? personsToShow.map(person => {
                return(
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={()=>handleDelete(person)}>
                        delete
                    </button>
                </p>
                )
            }):''
        }
        </>
    );
}

export default PersonsList;