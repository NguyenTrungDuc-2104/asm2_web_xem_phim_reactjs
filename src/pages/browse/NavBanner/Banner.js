import { Fragment, useState, useContext, useEffect } from "react";
import { RequestAPIContext } from "../../../store/RequestAPIProvider";
import useHttp from "../../../hooks/useHttp";
import styles from "./Banner.module.css";
import backdropImg from "../../../assets/backdrop.jpg";

const Banner = () => {
  const [bannerBackdrop, setBannerBackdrop] = useState(null);
  const [overView, setOverView] = useState("");
  const [nameMovie, setNameMovie] = useState("");
  const { requests } = useContext(RequestAPIContext);
  //---custom hook http---
  const {
    isLoading: bannerLoading,
    error: bannerRequestError,
    sendRequest: bannerRequest,
  } = useHttp();

  //--- lấy data từ API---
  useEffect(() => {
    const dataBanner = (data) => {
      const loadData =
        data.results[Math.floor(Math.random() * data.results.length)];
      //------
      setBannerBackdrop(loadData.backdrop_path);
      setNameMovie(loadData.name);
      //-- cut nếu overView quá dài
      // if (loadData.overview.length > 200) {
      //   const cutOverView = loadData.overview.slice(0, 300) + "...";
      //   setOverView(cutOverView);
      // } else {
      //   setOverView(loadData.overview);
      // }
      setOverView(loadData.overview);
    };
    //--- call API---
    bannerRequest(
      {
        url: `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`,
      },
      dataBanner
    );
  }, []);

  // check API trả về có backdrop hay không
  const backdrop = bannerBackdrop
    ? `https://image.tmdb.org/t/p/original${bannerBackdrop}`
    : backdropImg;

  const imgBanner = (
    <Fragment>
      {!bannerLoading && !bannerRequestError && (
        <img src={backdrop} alt="Banner image" className={styles.img} />
      )}
      {bannerLoading && <p className={styles.loading}>Loading...</p>}
      {!bannerLoading && bannerRequestError && (
        <p className={styles.error}>{bannerRequestError}</p>
      )}
    </Fragment>
  );

  return (
    <section className={styles.container}>
      {imgBanner}
      {!bannerLoading && !bannerRequestError && (
        <div className={styles.content}>
          <h1>{nameMovie}</h1>
          <div>
            <div className={styles.btn}>
              <button>Play</button>
              <button>My List</button>
            </div>
            <p className={styles.overview}>{overView}</p>
          </div>
        </div>
      )}
    </section>
  );
};
export default Banner;
