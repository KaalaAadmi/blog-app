import React from "react";
import styles from "../../styles/SearchBar.module.css";
import { IoClose } from "react-icons/io5";

const SearchBar = ({ value, handleSearchKey, clearSearch, formSubmit }) => (
  <div className={styles.searchBar__wrap}>
    <form onSubmit={formSubmit}>
      <input
        type="text"
        onChange={handleSearchKey}
        placeholder="Search By Category"
        value={value}
      />
      {value && <span onClick={clearSearch}><IoClose/></span>}
      <button>Go</button>
    </form>
  </div>
);

export default SearchBar;
