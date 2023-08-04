export default function TinyReader({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={`w-full
  [&_h1]:text-3xl [&_h1]:font-bold 
  [&_h2]:text-2xl [&_h2]:font-bold
  [&_h3]:text-1xl [&_h3]:font-bold
  [&_h4]:text-lg [&_h4]:font-bold
  [&_h5]:text-sm [&_h5]:font-bold
  [&_h6]:text-xs [&_h6]:font-bold ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}
