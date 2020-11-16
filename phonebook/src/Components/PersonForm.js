import React from 'react';

const PersonForm = ({newName,newNumber,nameChange,numberChange,addName}) => {
    console.log("rendered person from");
    return(
        <form onSubmit={addName}>
            <div>
                Name: <input value={newName} onChange={nameChange}/>
            </div>
            <div>
                Number: <input value={newNumber} onChange={numberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
}

export default PersonForm;