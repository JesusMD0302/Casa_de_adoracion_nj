import { InputHTMLAttributes, ClassAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    ClassAttributes<HTMLInputElement> {
  label: string;
  alterLabel?: string;
  errors?: any;
  errorMessage?: string;
}

export default function Input({
  label,
  alterLabel,
  errors,
  className,
  errorMessage = "Campo no valido",
  ...props
}: InputProps) {
  if (alterLabel) {
    return (
      <>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-700 font-bold">{label}</span>
          </label>
          <input
            {...props}
            className={`input input-bordered w-full ${className}`}
          />
          <label className="label">
            <span className="label-text font-bold-alt text-gray-400">
              {alterLabel}
            </span>
          </label>
        </div>
        {errors && (
          <span className="w-full px-3 py-2 bg-red-300 text-red-950 rounded-md">
            {errorMessage}
          </span>
        )}
      </>
    );
  }

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-gray-700 font-bold">{label}</span>
        </label>
        <input
          {...props}
          className={`input input-bordered w-full ${className}`}
        />
      </div>
      {errors && (
        <span className="w-full px-3 py-2 bg-red-300 text-red-950 rounded-md">
          {errorMessage}
        </span>
      )}
    </>
  );
}
