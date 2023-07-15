import { useContext } from "react";
import MovieList from "./movieList/MovieList";
import { RequestAPIContext } from "../../../store/RequestAPIProvider";
import { ShowMovieContext } from "../../../store/ShowMovieProvider";
import styles from "./MovieLists.module.css";
const MovieLists = () => {
  const requestsCtx = useContext(RequestAPIContext);
  const showMovieCtx = useContext(ShowMovieContext);

  //----------khi người dùng nhấn xem thông tin movie thì thay đổi margin để danh sách movie dưới cùng không bị che-------------
  const classes = showMovieCtx.showMovie
    ? `${styles.container} ${styles.showMov}`
    : styles.container;

  return (
    <div className={classes}>
      <div className={`${styles.content} ${styles.poster}`}>
        <MovieList
          requestMovie={requestsCtx.requests.fetchNetflixOriginals}
          type="poster"
        />
      </div>

      <div className={styles.content}>
        <h2>Xu Hướng</h2>
        <MovieList
          requestMovie={requestsCtx.requests.fetchTrending}
          type="backdrop"
        />
      </div>

      <div className={styles.content}>
        <h2>Xếp hạng cao</h2>
        <MovieList
          requestMovie={requestsCtx.requests.fetchTopRated}
          type="backdrop"
        />
      </div>

      <div className={styles.content}>
        <h2>Hành động</h2>
        <MovieList
          requestMovie={requestsCtx.requests.fetchActionMovies}
          type="backdrop"
        />
      </div>

      <div className={styles.content}>
        <h2>Hài</h2>
        <MovieList
          requestMovie={requestsCtx.requests.fetchComedyMovies}
          type="backdrop"
        />
      </div>

      <div className={styles.content}>
        <h2>Kinh dị</h2>
        <MovieList
          requestMovie={requestsCtx.requests.fetchHorrorMovies}
          type="backdrop"
        />
      </div>

      <div className={styles.content}>
        <h2>Lãng mạn</h2>
        <MovieList
          requestMovie={requestsCtx.requests.fetchRomanceMovies}
          type="backdrop"
        />
      </div>

      <div className={styles.content}>
        <h2>Tài liệu</h2>
        <MovieList
          requestMovie={requestsCtx.requests.fetchDocumentaries}
          type="backdrop"
        />
      </div>
    </div>
  );
};
export default MovieLists;
