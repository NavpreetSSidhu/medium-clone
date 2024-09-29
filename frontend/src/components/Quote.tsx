import React from "react";

const Quote: React.FC = () => {
  return (
    <div className="h-screen bg-slate-200 flex justify-center flex-col">
      <div className="flex justify-center ">
        <div className="max-w-lg">
          <div className="text-3xl font-bold">
            "The customer service I receieved was exceptional. The support team
            wen above and beyond to address my concerns"
          </div>
          <div className="max-w-md  text-xl font-semibold mt-4">
            Julies Winfield
          </div>
          <div className="max-w-md  text-sm font-light text-slate-400">
            CEO | ACME CORP
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
