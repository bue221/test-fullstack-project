import React from "react";
import { UseControllerProps, useController } from "react-hook-form";

const InputField = ({
  label,
  name,
  control,
  inputProps,
}: UseControllerProps<any> & {
  label: string;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className="w-full">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>
      <input
        className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
          error ? "border-red-500" : ""
        } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
        id="grid-first-name"
        {...field}
        {...inputProps}
      />
      {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
    </div>
  );
};

export default InputField;
