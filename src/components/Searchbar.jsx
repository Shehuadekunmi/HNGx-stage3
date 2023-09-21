// SearchBar.js
import React, { useState } from 'react';
import { Images } from '../components/Images'
const SearchBar = () => {

  const [searchQuery, setSearchQuery] = useState([]);
  
 const handleSearch = (e) =>{
  const searchValue = e.target.value;
  const newFilter = Images.filter((image) =>{
    return image.tag.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
  });
  if (searchValue === ''){
    setSearchQuery([]);
  } else{
    setSearchQuery(newFilter)
  }
 }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search gallery by tags..."
        onChange={handleSearch}
        className='bar'
      />
      {
        searchQuery.length != 0 && (
          <div className='d-flex flex-colum gap-3' >
{ searchQuery.map((data) => {
  return (
    <div key={data.id} className='d-fle align-items-center gap-3'>
      <p>{data.tag}</p>
     <div className="imgg"> <img src={data.thumb} alt=""   /> </div>
    </div>
  )
})}
          </div>
        )
      }
    </div>
  );
};

export default SearchBar;
