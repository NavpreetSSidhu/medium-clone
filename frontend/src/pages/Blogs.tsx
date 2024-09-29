import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import Blogskeleton from "../components/Blogskeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div>
            <Blogskeleton />
            <Blogskeleton />
            <Blogskeleton />
            <Blogskeleton />
            <Blogskeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Johnny Sins"}
              title={blog.title}
              content={blog.content}
              publishedDate="2nd Feb, 2024"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
