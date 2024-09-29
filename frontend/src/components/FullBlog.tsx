import { Blog } from "../hooks";
import AppBar from "./AppBar";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-4">
              Posted on 14 December 2023
            </div>
            <div className="pt-2">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-500 text-lg">Author</div>
            <div className="flex">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar name={blog.author.name || "Johnny Sins"} size={30} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Johnny Sins"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random Catch Phrase about the author capabilities and charm
                  yada
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
