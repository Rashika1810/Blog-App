import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogCard from "./components/BlogCard";
import UserBlog from "./pages/UserBlog";
import AddBlogs from "./pages/AddBlogs";
import BlogDetails from "./pages/BlogDetails";
import BlogDetailsPage from "./pages/BlogDetailsPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/my-blogs" element={<UserBlog />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/add-blogs" element={<AddBlogs />} />
        <Route path="/one-blog-details/:id" element={<BlogDetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
