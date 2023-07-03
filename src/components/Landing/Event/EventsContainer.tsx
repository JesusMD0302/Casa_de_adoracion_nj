import Event from "./Event";

function EventsContainer({
  events,
  isLoading,
  ...props
}: {
  events: [];
  isLoading: boolean;
}) {
  return (
    <div className="w-full h-full grid grid-rows-[auto, 1fr] overflow-hidden">
      <h4 className="text-2xl font-bold text-center">Proximos Eventos</h4>
      {/* ---- */}
      {isLoading && (
        <span className="loading loading-spinner loading-lg mx-auto"></span>
      )}

      {events.length === 0 && (
        <p className="text-center text-xl p-32">No hay eventos cercanos</p>
      )}

      {events.length !== 0 && (
        <div className="mt-3 grid gap-3 overflow-y-scroll">
          {events.map((num, index) => (
            <Event key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default EventsContainer;
