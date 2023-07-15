import React, { useContext } from "react";
import SearchForm from "./searchContainer/SearchForm";
import Nav from "../browse/NavBanner/Nav";
import SearcList from "./searchContainer/SearchList";
import { SearchResultListProvider } from "../../store/SearchResultListProvider";
import { ShowMovieContext } from "../../store/ShowMovieProvider";
import MovieDeltail from "../movieDetail/MovieDeltail";

const Search = () => {
  const showMovieCtx = useContext(ShowMovieContext);
  return (
    <SearchResultListProvider>
      <Nav />
      <SearchForm />
      <SearcList />
      {showMovieCtx.showMovie && <MovieDeltail />}
    </SearchResultListProvider>
  );
};

export default Search;
