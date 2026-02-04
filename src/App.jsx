import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import DetailedPost from "./pages/DetailedPost.jsx";
import Posts from "./Components/Posts.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import { Toaster } from "sonner";

const App = () => {
  return (
    <HashRouter>
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
    </HashRouter>
  );
};

export default App;
