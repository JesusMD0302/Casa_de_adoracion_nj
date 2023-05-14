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
          <TimeContainer time={0} alternate={true} title="Días" />
          <TimeContainer time={0} alternate={true} title="Horas" />
          <TimeContainer time={0} alternate={true} title="Minutos" />
        </div>
      </>
    );
  } else {
    // Render a countdown
    return (
      <>
        <div className="flex gap-2 mt-5">
          <TimeContainer time={days} alternate={true} title="Días" />
          <TimeContainer time={hours} alternate={true} title="Horas" />
          <TimeContainer time={minutes} alternate={true} title="Minutos" />
        </div>
      </>
    );
  }
}

export default CountdownTimer;
