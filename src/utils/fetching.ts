export async function getData({
  url,
  headers,
}: {
  url: string;
  headers?: {};
}) {
  const response = await fetch(url, {
    cache: "no-store",
  });

  const data = await response.json();

  return { data: data.data, status: response.status };
}
