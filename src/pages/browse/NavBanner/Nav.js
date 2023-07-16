import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IconSearch from "./IconSearch";
import styles from "./Nav.module.css";

const Nav = () => {
  const [isScroll, setIsSroll] = useState(false);
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
