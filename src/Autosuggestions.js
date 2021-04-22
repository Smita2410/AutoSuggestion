import React, { useEffect, useState } from "react";
import fetchSearchResult from "./services/searchService";

const Autosuggestions = () => {
  const [searchTerm, setSearchterm] = useState("");
  const [val, setVal] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestions, setSelectedSuggestion] = useState(0);

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const handleOnchange = (e) => {
    setVal(e.target.value);
    let debouncedSearch = debounce(() => setSearchterm(e.target.value), 3000);
    debouncedSearch();
    setShowSuggestions(true);
    setSelectedSuggestion(0);
  };

  const handleOnClick = (e) => {
    setSearchterm(e.currentTarget.innerText);
    setSearchResult([]);
    setShowSuggestions(false);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setSelectedSuggestion(0);
      setSearchterm(searchResult[selectedSuggestions].name);
      setShowSuggestions(false);
    } else if (e.keyCode === 38) {
      if (selectedSuggestions === 0) return;
      setSelectedSuggestion(selectedSuggestions - 1);
    } else if (e.keyCode === 40) {
      if (selectedSuggestions === searchResult.length - 1) {
        return;
      }
      setSelectedSuggestion(selectedSuggestions + 1);
    }
  };

  const fetchData = async (searchTerm) => {
    if(searchTerm!==''){
        const res = await fetchSearchResult(searchTerm);
        if (res && res.results && res.results.length !== 0) {
          setSearchResult(res.results);
        }
    }
  };

  const renderSuggestions = () => {
    return (
      <ul className="suggestionList">
        {searchResult.map((item, id) => {
          let classname;
          if (id === selectedSuggestions) {
            classname = "selected";
          }
          return (
            <li
              className={classname}
              key={item.id}
              onClick={(e) => handleOnClick(e)}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <>
      <input
        className="input-field"
        value={val}
        type="text"
        onChange={(e) => handleOnchange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        placeholder="Search..."
      />
      {showSuggestions && val!== '' && renderSuggestions()}
    </>
  );
};

export default Autosuggestions;
