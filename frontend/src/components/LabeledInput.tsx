import React, { ChangeEvent } from "react";

interface LabeledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput: React.FC<LabeledInputType> = ({
  label,
  placeholder,
  type,
  onChange,
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-900 text-black pt-4">
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
};

export default LabeledInput;
