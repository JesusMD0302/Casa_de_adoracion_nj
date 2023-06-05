function DateInfo({ date, title, ...props }: { date: string; title: string }) {
  return (
    <>
      <p className="text-lg font-bold">{date}</p>
      <p className="font-semibold">{title}</p>
    </>
  );
}

export default DateInfo;