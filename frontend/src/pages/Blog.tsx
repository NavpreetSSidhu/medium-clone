import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import Blogskeleton from "../components/Blogskeleton";
import AppBar from "../components/AppBar";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div>
            <Blogskeleton />
          </div>
        </div>
      </div>
    );
  }
  if (!blog) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div>
            <Blogskeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};

export default Blog;
