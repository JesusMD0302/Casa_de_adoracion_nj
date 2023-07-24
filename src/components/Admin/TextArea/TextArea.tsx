import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  alterLabel?: string;
  errors?: any;
  errorMessage?: string;
}

export default function TextArea({
  label,
  alterLabel,
  className,
  errors,
  errorMessage = "Campo no valido",
  ...props
}: TextAreaProps) {
  if (alterLabel) {
    return (
      <>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-700 font-bold">{label}</span>
          </label>
          <textarea
            {...props}
            className={`textarea textarea-bordered resize-none ${className}`}
          ></textarea>
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
        <textarea
          {...props}
          className={`textarea textarea-bordered resize-none ${className}`}
        ></textarea>
      </div>
      {errors && (
        <span className="w-full px-3 py-2 bg-red-300 text-red-950 rounded-md">
          {errorMessage}
          <br />
          {JSON.stringify(errors)}
        </span>
      )}
    </>
  );
}
