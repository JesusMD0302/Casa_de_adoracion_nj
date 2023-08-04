function DateInfo({ date, title, ubication, ...props }: { date: string; title: string; ubication: string}) {
  return (
    <>
      <p className="text-lg md:text-xl font-bold">{date}</p>
      <p className="md:text-lg font-semibold">{title}</p>
      <p className="md:text-lg ">{ubication}</p>
    </>
  );
}

export default DateInfo;