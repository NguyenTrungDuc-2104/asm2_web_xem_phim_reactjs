import React, { useContext } from "react";
import NavBanner from "./NavBanner/NavBanner";
import MovieLists from "./movieLists/MovieLists";
import { ShowMovieContext } from "../../store/ShowMovieProvider";
import MovieDeltail from "../movieDetail/MovieDeltail";

const Browse = () => {
  const showMovieCtx = useContext(ShowMovieContext);

  return (
    <React.Fragment>
      <NavBanner />
      <MovieLists />
      {showMovieCtx.showMovie && <MovieDeltail />}
    </React.Fragment>
  );
};
export default Browse;
