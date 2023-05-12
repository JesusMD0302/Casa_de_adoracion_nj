function TimeContainer(props: { time: number; title: string }) {
  return (
    <div className="flex flex-col justify-center items-center w-16 py-1 bg-gray-800 border-2 border-gray-600 rounded-md">
      <p className="font-bold">{props.time}</p>
      <p className="text-[10px] text-gray-300">{props.title.toUpperCase()}</p>
    </div>
  );
}

export default TimeContainer;
