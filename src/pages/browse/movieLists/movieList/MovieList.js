import { useEffect, useState } from "react";
import MovieListItem from "./MovieListItem";
import useHttp from "../../../../hooks/useHttp";
import styles from "./MovieList.module.css";

const MovieList = ({ requestMovie, type }) => {
  const [dataMovie, setDataMovie] = useState([]);
  const { isLoading, error, sendRequest: requestDataMovie } = useHttp();

  //--- lấy data từ API trả về ---
  useEffect(() => {
    const transformData = (data) => {
      // console.log(data.results);
      const filterData = data.results.filter(
        (item) => item.backdrop_path !== null && item.poster_path !== null
      );
      setDataMovie(filterData);
    };
    requestDataMovie(
      { url: `https://api.themoviedb.org/3${requestMovie}` },
      transformData
    );
  }, []);

  //--------check du lieu de render------
  let content;

  if (dataMovie.length > 0 && !isLoading && !error) {
    if (type === "backdrop") {
      content = dataMovie.map((mov) => {
        return (
          <MovieListItem
            key={mov.id}
            dataImg={mov.backdrop_path}
            dataMovie={mov}
          />
        );
      });
    } else if (type === "poster") {
      content = dataMovie.map((mov) => {
        return (
          <MovieListItem
            key={mov.id}
            dataImg={mov.poster_path}
            dataMovie={mov}
          />
        );
      });
    }
  }
  if (isLoading && !error) {
    content = <p className={styles.loading}>Loading...</p>;
  }
  if (!isLoading && error) {
    content = <p className={styles.error}>{error}</p>;
  }

  //-----check de them class-----

  const classes = type === "backdrop" ? styles.backdrop : styles.poster;

  return <div className={`${styles.container} ${classes}`}>{content}</div>;
};
export default MovieList;
