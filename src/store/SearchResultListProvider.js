import { createContext, useContext, useState } from "react";
import useHttp from "../hooks/useHttp";
import { RequestAPIContext } from "./RequestAPIProvider";

//--------------------tạo context-----------------------
const SearchResultListContext = createContext({
  searchLoading: false,
  searchError: null,
  dataSearch: [],
  searchHandler: () => {},
});
//------------------------------------------------------------------
const SearchResultListProvider = (props) => {
  const {
    isLoading: searchLoading,
    error: searchError,
    sendRequest: searchRepuest,
  } = useHttp();
  const [dataSearch, setDataSearch] = useState([]);
  const repuestCtx = useContext(RequestAPIContext);
  //----------------------------------------------
  const searchHandler = (query) => {
    //---xử lý data trả về từ API---
    const transformData = (data) => {
      // console.log(data.results);
      const dataFilter = data.results.filter(
        (item) => item.poster_path !== null
      );
      setDataSearch(dataFilter);
    };
    //---check input người dùng nhập vào có phải chuỗi rỗng không---
    if (query.trim().length > 0) {
      searchRepuest(
        {
          url: `https://api.themoviedb.org/3${repuestCtx.requests.fetchSearch}&query=${query}`,
        },
        transformData
      );
    } else {
      setDataSearch("");
    }
  };

  return (
    <SearchResultListContext.Provider
      value={{
        searchLoading,
        searchError,
        dataSearch,
        searchHandler,
      }}
    >
      {props.children}
    </SearchResultListContext.Provider>
  );
};

export { SearchResultListProvider, SearchResultListContext };
