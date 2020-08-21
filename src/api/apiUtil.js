export async function handleResponse(response) {
  return response.data;
}

export function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}
