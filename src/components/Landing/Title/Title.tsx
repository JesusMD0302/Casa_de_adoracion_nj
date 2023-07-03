function Title({ title }: { title: string }) {
  return (
    <h3 className="text-lg md:text-xl uppercase font-extrabold">
      {title} <div className="border-2 mt-2 rounded "></div>
    </h3>
  );
}

export default Title;
