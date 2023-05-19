import Event from "./Event";

function EventsContainer() {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="w-full h-full grid grid-rows-[auto, 1fr] overflow-hidden">
      <h4 className="text-2xl font-bold text-center">Proximos Eventos</h4>
      {/* ---- */}
      <div className="mt-3 grid gap-3 overflow-y-scroll">
        {nums.map((num, index) => (
          <Event key={index} />
        ))}
      </div>
    </div>
  );
}

export default EventsContainer;
