import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    getBlogs();
  }, [id]);

  const getBlogs = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setBlog(response.data.blog);
    // console.log(response.data.blog);
    setLoading(false);
  };

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blogs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setBlogs(response.data.blogs);
    setLoading(false);
  };

  return {
    loading,
    blogs,
  };
};
