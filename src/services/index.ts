export async function fetchAPIData(url: string | null) {
  if (!url) {
    throw new Error('API URL is required');
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}
