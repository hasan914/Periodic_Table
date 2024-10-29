import React from 'react';
import { elements } from "../_data";

const SearchBar = ({ getElement, closeInfo }) => {

  const elementKeyUp = (e) => {
    var value = e.target.value;
    var searchResults = elements.filter((element) => {
      if (element["name"].toLowerCase().indexOf(value.toLowerCase()) === -1) {
        return false;
      } else return true;
    }).slice(0, 4);

    var searchResultsList = "";
    var elementAutoCompleteList = document.getElementById("element-autocomplete-list");

    if (value) {
      searchResults.forEach((element) => {
        searchResultsList += `<li onClick="${getElement(element)}">${element.name}</li>`;
      });
      elementAutoCompleteList.innerHTML = searchResultsList;
      elementAutoCompleteList.style.padding = "10px";

    } else {
      elementAutoCompleteList.innerHTML = "";
      elementAutoCompleteList.style.padding = "0px";
      closeInfo();
    }
  }
  
  const handleFocusChange = (isFocused) => {
    var elementAutoCompleteList = document.getElementById("element-autocomplete-list");
    if (!isFocused) {
      elementAutoCompleteList.innerHTML = "";
      elementAutoCompleteList.style.padding = "0px";
      // closeInfo();
    }
  };

  return (
    <>

      <div className="search-bar">
        <input type="text" id="element-autocomplete-input" className='search-bar-input' placeholder="Search an Element"
        onKeyUp={elementKeyUp} onBlur={() => handleFocusChange(false)} onFocus={() => handleFocusChange(true)}/>
        <i className="search-bar-icon fa-solid fa-magnifying-glass"></i>

        <ul id="element-autocomplete-list">
          
        </ul>
      </div>

    </>
  );
};

export default SearchBar;