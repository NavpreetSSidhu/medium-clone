import React, { ChangeEvent, useState } from "react";
import AppBar from "./AppBar";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const Publish: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-full pt-8">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Text"
          />
          <TextEditor onChange={(e) => setContent(e.target.value)} />
          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              navigate(`/blog/${response.data.id}`);
            }}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;

const TextEditor = ({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className="mt-4">
      <div className="w-full mb-4 rounded-lg bg-gray-50">
        <div className="flex items-center justify-between border">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label htmlFor="editor" className="sr-only">
              Publish post
            </label>
            <textarea
              id="editor"
              rows={9}
              className="block w-full px-0 text-sm text-gray-800 bg-white border-0 px-2 focus:outline-none"
              placeholder="Write an article..."
              required
              onChange={onChange}
              defaultValue={""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
