import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import IconSearch from "./IconSearch";
import { ShowMovieContext } from "../../../store/ShowMovieProvider";
import styles from "./Nav.module.css";

const Nav = () => {
  const [isScroll, setIsSroll] = useState(false);
  const showMovieCtx = useContext(ShowMovieContext);

  // đổi background nav khi cuộn trang
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 100) {
        setIsSroll(true);
      } else {
        setIsSroll(false);
      }
    };

    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  //----------reset show movie-----------------
  useEffect(() => {
    const hidenKeyESC = (e) => {
      if (e.key === "Escape") {
        showMovieCtx.resetShowMovieHandler();
      }
    };
    document.addEventListener("keydown", hidenKeyESC);

    return () => {
      document.removeEventListener("keydown", hidenKeyESC);
    };
  }, []);
  //-----------------------
  const scrollClasses = isScroll
    ? `${styles.nav} ${styles.navScroll}`
    : styles.nav;
  return (
    <nav className={scrollClasses}>
      <Link to="/" className={styles.link}>
        <h1>Movie App</h1>
      </Link>
      <Link to="/search" className={styles.link}>
        <IconSearch className={styles.icon} />
      </Link>
    </nav>
  );
};
export default Nav;
