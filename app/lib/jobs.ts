export async function getJobs() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    {
      cache: "no-store",
    }
  );

  return response.json();
}