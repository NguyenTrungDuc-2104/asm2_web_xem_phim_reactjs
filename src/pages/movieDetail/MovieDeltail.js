import { useContext, useEffect } from "react";
import { ShowMovieContext } from "../../store/ShowMovieProvider";
import { FaXmark } from "react-icons/fa6";
import styles from "./MovieDeltail.module.css";

const MovieDeltail = () => {
  const showMovieCtx = useContext(ShowMovieContext);

  //-------------hidden movie-------------
  useEffect(() => {
    const hidenMoiveByKey = (e) => {
      if (e.key === "Escape") {
        showMovieCtx.resetShowMovieHandler();
      }
    };
    document.addEventListener("keydown", hidenMoiveByKey);

    return () => {
      document.removeEventListener("keydown", hidenMoiveByKey);
    };
  }, []);
  //-----------------------------
  const hidenMovieHandler = () => {
    showMovieCtx.resetShowMovieHandler();
  };
  //---check hiển thị video hay backdrop---
  let video;
  if (showMovieCtx.dataMovieRequest.key && !showMovieCtx.dataMovieError) {
    video = (
      <iframe
        className={styles.movie}
        src={`https://www.youtube.com/embed/${showMovieCtx.dataMovieRequest.key}`}
      ></iframe>
    );
  } else {
    const srcImg = `https://image.tmdb.org/t/p/original${showMovieCtx.dataMovie.backdrop_path}`;
    video = (
      <img
        src={srcImg}
        alt={`${showMovieCtx.dataMovie.name}`}
        className={styles.movie}
      />
    );
  }
  //-------------------------------------------------------------------
  let content;
  if (!showMovieCtx.dataMovieLoading) {
    //---name movie---
    const nameMovie = showMovieCtx.dataMovie.name
      ? showMovieCtx.dataMovie.name
      : showMovieCtx.dataMovie.original_title;
    //---date----
    let date = false;
    if (showMovieCtx.dataMovie.release_date) {
      date = new Date(showMovieCtx.dataMovie.release_date);
    } else {
      date = false;
    }
    content = (
      <div className={styles.containerMov}>
        <div className={styles.icon_x}>
          <FaXmark onClick={hidenMovieHandler} />
        </div>
        <div className={styles.inforMov}>
          <h1>{nameMovie}</h1>
          <div>
            {date && (
              <h2>{`Release Date: ${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()}`}</h2>
            )}
            <h2>{`Vote: ${showMovieCtx.dataMovie.vote_average}`}</h2>
          </div>
          <p>{showMovieCtx.dataMovie.overview}</p>
        </div>
        <div>{video}</div>
      </div>
    );
  }
  if (showMovieCtx.dataMovieLoading && !showMovieCtx.dataMovieError) {
    content = <p className={styles.loading}>Loading...</p>;
  }
  return <div className={styles.container}>{content}</div>;
};

export default MovieDeltail;
