import TimeContainer from "./TimeContainer";

interface TimeLeft {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  completed: boolean;
}

function CountdownTimer({
  days,
  hours,
  minutes,
  seconds,
  completed,
  ...props
}: TimeLeft) {
  if (seconds > 0 ) {
    minutes++;
  }

  if (completed) {
    // Render a completed state
    return (
      <>
        <div className="flex gap-2 mt-5">
          <TimeContainer time={0} title="Días" />
          <TimeContainer time={0} title="Horas" />
          <TimeContainer time={0} title="Minutos" />
        </div>
      </>
    );
  } else {
    // Render a countdown
    return (
      <>
        <div className="flex gap-2 mt-5">
          <TimeContainer time={days} title="Días" />
          <TimeContainer time={hours} title="Horas" />
          <TimeContainer time={minutes} title="Minutos" />
        </div>
      </>
    );
  }
}

export default CountdownTimer;
