function TimeContainer(props: {
  time: number;
  title: string;
  alternate: boolean;
}) {
  if (props.alternate) {
    return (
      <div className="relative flex flex-col justify-center items-center w-14 py-1 rounded bg-gray-800 border-2 border-gray-600">
        <p className="absolute top-0 -translate-y-3/4 w-12 py-1 border border-white rounded text-[10px] font-bold text-center text-black bg-white">{props.title.toUpperCase()}</p>
        <p className="font-bold text-lg text-center text-white">{props.time}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-16 py-1 bg-gray-800 border-2 border-gray-600 rounded-md">
      <p className="font-bold">{props.time}</p>
      <p className="text-[10px] text-gray-300">{props.title.toUpperCase()}</p>
    </div>
  );
}

export default TimeContainer;
