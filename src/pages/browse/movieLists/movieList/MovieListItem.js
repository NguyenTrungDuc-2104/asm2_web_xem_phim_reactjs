import { Fragment, useContext } from "react";
import { ShowMovieContext } from "../../../../store/ShowMovieProvider";
import styles from "./MovieListItem.module.css";

const MovieListItem = (props) => {
  const showMovieCtx = useContext(ShowMovieContext);

  //---truyền data movie mà người dùng nhấn vào tới context ShowMovieProvider---
  const showMovieHandler = () => {
    showMovieCtx.showMovieHandler(props.dataMovie);
  };

  const srcImg = `https://image.tmdb.org/t/p/w500${props.dataImg}`;
  // const srcImg = `https://image.tmdb.org/t/p/original${props.data}`;
  return (
    <Fragment>
      <img
        src={srcImg}
        alt="Image Movie"
        className={styles.img}
        onClick={showMovieHandler}
      />
    </Fragment>
  );
};
export default MovieListItem;
