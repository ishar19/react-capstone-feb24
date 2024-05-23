import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Genre from "./pages/Genre";
import Info from "./pages/Info";
import Movies from "./pages/Movies";
import NotFound from "./pages/404";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/info" element={<Info />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
