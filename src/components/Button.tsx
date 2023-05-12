function Button(props: { text: String; className?: String }) {
  const className = props.className ?? "";

  return (
    <button
      className={`px-2 py-1 rounded-sm border border-white transition-all ease-linear duration-200 text-sm hover:bg-white hover:text-logo active:scale-90 ${className}`}
    >
      {props.text}
    </button>
  );
}

export default Button;
