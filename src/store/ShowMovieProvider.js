import { createContext, useState, useContext } from "react";
import { RequestAPIContext } from "../store/RequestAPIProvider";
import useHttp from "../hooks/useHttp";
//---tạo context---
const ShowMovieContext = createContext({
  showMovie: false,
  dataMovie: {},
  dataMovieRequest: {},
  dataMovieLoading: false,
  dataMovieError: null,
  showMovieHandler: () => {},
  resetShowMovieHandler: () => {},
});
//--------------------------------------------------------------------------------
const ShowMovieProvider = (props) => {
  const [showMovie, setShowMovie] = useState(false);
  const [idMovie, setIdMovie] = useState([]);
  const [dataMovie, setDataMovie] = useState({});
  const [dataMovieRequest, setDataMovieRequest] = useState({});
  const reqestCtx = useContext(RequestAPIContext);
  const {
    isLoading: dataMovieLoading,
    error: dataMovieError,
    sendRequest,
  } = useHttp();

  //---xử lý data movie mà người dùng nhấn chọn---
  const showMovieHandler = (data) => {
    //---check xem movie đó đã được chọn trước đó hay chưa---
    if (!idMovie.includes(data.id)) {
      setDataMovie(data);
      setIdMovie([data.id]);
      setShowMovie(true);
      //---xử lý data trả về từ API---
      const trasformData = (dataRequest) => {
        if (dataRequest.results.length > 0) {
          const dataFilter = dataRequest.results.find(
            (mov) => mov.type === "Trailer" && mov.site === "YouTube"
          )
            ? dataRequest.results.find(
                (mov) => mov.type === "Trailer" && mov.site === "YouTube"
              )
            : dataRequest.results.find(
                (mov) => mov.type === "Teaser" && mov.site === "YouTube"
              )
            ? dataRequest.results.find(
                (mov) => mov.type === "Teaser" && mov.site === "YouTube"
              )
            : dataRequest.results.find((mov) => mov.site === "YouTube");

          setDataMovieRequest(dataFilter);
        } else {
          setDataMovieRequest({});
        }
      };
      //---Request API---
      sendRequest(
        {
          url: `https://api.themoviedb.org/3/movie/${data.id}/videos?api_key=${reqestCtx.API_KEY}`,
        },
        trasformData
      );
    } else {
      setIdMovie([]);
      setDataMovie({});
      setDataMovieRequest({});
      setShowMovie(false);
    }
  };
  //---dùng để reset---
  const resetShowMovieHandler = () => {
    setIdMovie([]);
    setDataMovie({});
    setDataMovieRequest({});
    setShowMovie(false);
  };

  return (
    <ShowMovieContext.Provider
      value={{
        showMovie,
        dataMovie,
        dataMovieRequest,
        dataMovieLoading,
        dataMovieError,
        showMovieHandler,
        resetShowMovieHandler,
      }}
    >
      {props.children}
    </ShowMovieContext.Provider>
  );
};

export { ShowMovieContext, ShowMovieProvider };
