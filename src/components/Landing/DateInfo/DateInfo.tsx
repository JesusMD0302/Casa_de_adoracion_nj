function DateInfo({ date, title, ...props }: { date: string; title: string }) {
  return (
    <>
      <p className="text-lg md:text-xl font-bold">{date}</p>
      <p className="md:text-lg font-semibold">{title}</p>
    </>
  );
}

export default DateInfo;