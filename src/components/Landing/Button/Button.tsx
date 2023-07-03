import { ReactElement } from "react";

function Button({
  className = "",
  onClick,
  text,
  children,
  underline = false,
}: {
  text?: String;
  className?: String;
  onClick?: () => void;
  children?: ReactElement;
  underline?: boolean;
}) {
  if (underline) {
    return (
      <button
        className={`font-bold underline text-base md:text-lg ${className}`}
        onClick={onClick}
      >
        {text}
        {children}
      </button>
    );
  }
  return (
    <button
      className={`px-4 py-3 text-base md:px-2 md:py-1 rounded-sm border border-white transition-all ease-linear duration-200 md:text-lg hover:bg-white hover:text-logo active:scale-90 ${className}`}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
}

export default Button;
