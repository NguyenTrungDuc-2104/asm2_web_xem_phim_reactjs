import { useState, useContext } from "react";
import IconSearch from "../../browse/NavBanner/IconSearch";
import { SearchResultListContext } from "../../../store/SearchResultListProvider";
import { ShowMovieContext } from "../../../store/ShowMovieProvider";
import styles from "./SearchForm.module.css";

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchCtx = useContext(SearchResultListContext);
  const showMovieCtx = useContext(ShowMovieContext);
  //---change input---
  const onchangeHandler = (e) => {
    setSearchValue(e.target.value);
  };
  //---submit---
  const submitHandler = (e) => {
    e.preventDefault();
    searchCtx.searchHandler(searchValue);
    showMovieCtx.resetShowMovieHandler();
  };
  //---reset---
  const resetHandler = () => {
    setSearchValue("");
    searchCtx.searchHandler("");
    showMovieCtx.resetShowMovieHandler();
  };
  return (
    <form className={styles.formControl} onSubmit={submitHandler}>
      <div className={styles.input}>
        <input
          id="search"
          value={searchValue}
          onChange={onchangeHandler}
          placeholder="Enter name movie"
        />
        <label htmlFor="search">
          <IconSearch className={styles.icon} />
        </label>
      </div>
      <div className={styles.btn}>
        <button type="button" onClick={resetHandler}>
          RESET
        </button>
        <button type="submit">SEARCH</button>
      </div>
    </form>
  );
};
export default SearchForm;
