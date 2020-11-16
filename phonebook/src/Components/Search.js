import React from 'react';

const Search = ({handleChange,value}) => {
    console.log("rendered search");
    return(
        <div>
        filter shown with:<input value={value} onChange={handleChange}/>
      </div>
    )
}

export default Search;