import React from 'react';
import styles from "./Header.module.scss";
import { IoIosSearch } from "react-icons/io";
// import CharacterFilter from '../Filters/CharacterFilter';
import PropTypes from 'prop-types';

export default function Header({handleCharacterSearch}) {

  const debounceDelay = 1000;
  const debounce = (func,delay) => {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  const intiateSearch = (searchInput) => {
    handleCharacterSearch(searchInput.target.value);
  }

  const decouncedSearch = debounce(intiateSearch,debounceDelay);

// Prop types validation
Header.propTypes = {
  handleCharacterSearch: PropTypes.func.isRequired,
};

  return (
    <header className={styles.header}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-5">
            <h1 className="text-center text-primary text-lg-start mb-0 mb-2">
              Rick and Morty Characters
            </h1>
          </div>

          <div className="col-lg-5">
            <div className="d-flex align-items-center">
            <div className="input-group mr-4">
              <span className="input-group-text" id="basic-addon1"><IoIosSearch size={20} />
              </span>
              <input type="text" className="form-control"
                placeholder="Search by character name"
                aria-label="search"
                aria-describedby="basic-addon1"
                onInput={decouncedSearch} />
            </div>

            {/* <CharacterFilter /> */}
            </div>
           
          </div>
        </div>
      </div>
    </header>
  )
}

