import React from "react";
import Quote from "../components/Quote";
import Auth from "../components/Auth";

const Signup: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Auth type="signup" />
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default Signup;
