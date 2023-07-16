import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
