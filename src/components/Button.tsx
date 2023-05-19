import { ReactElement } from "react";

function Button(props: {
  text?: String;
  className?: String;
  onClick?: () => void;
  children?: ReactElement;
}) {
  const className = props.className ?? "";

  return (
    <button
      className={`px-4 py-3 text-base md:px-2 md:py-1 rounded-sm border border-white transition-all ease-linear duration-200 md:text-sm hover:bg-white hover:text-logo active:scale-90 ${className}`}
      onClick={props.onClick}
    >
      {props.text}

      {props.children}
    </button>
  );
}

export default Button;
