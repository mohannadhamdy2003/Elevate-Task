import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DetailedPost from "./pages/DetailedPost";
import Posts from "./Components/Posts";
import CreatePost from "./pages/CreatePost";
import { Toaster } from "sonner";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "bg-black text-white border border-gray-800",
        }}
      />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Posts />} />
          <Route path="/:id" element={<DetailedPost />} />
          <Route path="/newpost" element={<CreatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
