function Title({ title, color }: { title: string, color?: string }) {
  return (
    <h3 className={`text-lg md:text-xl uppercase font-extrabold ${color && `text-${color}`}`}>
      {title} <div className={`border-2 mt-2 rounded ${color && `border-${color}`}`}></div>
    </h3>
  );
}

export default Title;
