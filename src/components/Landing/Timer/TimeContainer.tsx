function TimeContainer(props: { time: number; title: string }) {
  return (
    <div className="relative flex flex-col justify-center items-center w-14 md:w-[4.5rem] py-1 md:py-2 rounded bg-gray-800 border-2 border-gray-600">
      <p className="absolute top-0 -translate-y-3/4 w-12 md:w-[3.7rem] py-1 border border-white rounded text-[10px] md:text-[11px] font-bold text-center text-black bg-white">
        {props.title.toUpperCase()}
      </p>
      <p className="font-bold text-lg md:text-xl text-center text-white">{props.time}</p>
    </div>
  );
}

export default TimeContainer;
