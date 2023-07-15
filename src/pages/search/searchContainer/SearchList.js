import { useContext } from "react";
import { SearchResultListContext } from "../../../store/SearchResultListProvider";
import { ShowMovieContext } from "../../../store/ShowMovieProvider";
import styles from "./SearchList.module.css";

const SearcList = () => {
  const searchCtx = useContext(SearchResultListContext);
  const showMovieCtx = useContext(ShowMovieContext);
  //---truyền data movie người dùng nhập vào tới context ShowMovieProvider---
  const touchMovieHandler = (data) => {
    showMovieCtx.showMovieHandler(data);
  };

  //----------------------------------------------------------
  let content;
  if (searchCtx.dataSearch.length > 0) {
    if (!searchCtx.searchLoading && !searchCtx.searchError) {
      content = searchCtx.dataSearch.map((mov) => {
        const srcImg = `https://image.tmdb.org/t/p/w500${mov.poster_path}`;
        return (
          <li key={mov.id}>
            <img
              src={srcImg}
              alt={mov.original_title}
              className={styles.img}
              onClick={touchMovieHandler.bind(null, mov)}
            />
          </li>
        );
      });
    }
  } else {
    content = <p className={styles.noMovie}>No Movie</p>;
  }
  if (searchCtx.searchLoading && !searchCtx.searchError) {
    content = <p className={styles.loading}>Loading...</p>;
  }
  if (!searchCtx.searchLoading && searchCtx.searchError) {
    content = <p className={styles.error}>{searchCtx.searchError}</p>;
  }

  const classes = showMovieCtx.showMovie
    ? `${styles.listMovie} ${styles.showMov}`
    : styles.listMovie;

  //-----------------------------------------------------
  return (
    <div className={styles.container}>
      <p className={styles.header}>Search Result</p>
      <ul className={classes}>{content}</ul>
    </div>
  );
};

export default SearcList;
