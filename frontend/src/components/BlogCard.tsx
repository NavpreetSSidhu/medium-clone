import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 p-4 w-screen max-w-screen-lg cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">
          {content.length >= 100
            ? `${content.slice(0, 100)}...`
            : `${content}...`}{" "}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minute(s)`}</div>
      </div>
    </Link>
  );
};

export default BlogCard;

export const Avatar = ({
  name,
  size = 20, // This will be in pixels
  text = "xs",
}: {
  name: string;
  size?: number;
  text?: string;
}) => {
  return (
    <div
      className="relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <span className={`text-${text} text-gray-600 dark:text-gray-300`}>
        {name[0].toUpperCase()}
      </span>
    </div>
  );
};

export const Circle = () => {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
};
