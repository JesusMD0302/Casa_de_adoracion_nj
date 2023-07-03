export async function getData({
  url,
  headers,
  isSSR = false,
}: {
  url: string;
  headers?: {};
  isSSR?: boolean;
}) {
  let response;

  if (isSSR) {
    response = await fetch(url, {
      cache: "no-store",
    });
  } else {
    response = await fetch(url);
  }

  const data = await response.json();

  return { data: data.data, status: response.status };
}
