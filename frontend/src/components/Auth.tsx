import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LabeledInput from "./LabeledInput";
import { SigUpInput } from "@nav_pb03/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [signUpInputs, setSignUpInputs] = useState<SigUpInput>({
    name: "",
    email: "",
    password: "",
  });

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/${type}`,
        signUpInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an Account</div>
            <div className="text-slate-400">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signup" ? "/signin" : "/signup"}
              >
                {type === "signup" ? "Sign In" : "Sign Up"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabeledInput
                label={"Name"}
                placeholder={"Navpreet Singh"}
                onChange={(e) => {
                  setSignUpInputs((c) => ({
                    ...c,
                    name: e.target.value,
                  }));
                }}
                type={"text"}
              />
            ) : null}
            <LabeledInput
              label={"Email"}
              placeholder={"navsingh@yopmail.com"}
              onChange={(e) => {
                setSignUpInputs((c) => ({
                  ...c,
                  email: e.target.value,
                }));
              }}
              type={"email"}
            />
            <LabeledInput
              label={"Password"}
              placeholder={"123456"}
              onChange={(e) => {
                setSignUpInputs({
                  ...signUpInputs,
                  password: e.target.value,
                });
              }}
              type={"password"}
            />
            <button
              type="button"
              onClick={sendRequest}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-8"
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
